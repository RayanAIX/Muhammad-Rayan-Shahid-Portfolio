"use client";

import React, { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface Node {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

interface NeuralNetworkProps {
  mousePosition: { x: number; y: number };
}

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ mousePosition }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Create nodes
  const nodes = useMemo<Node[]>(() => {
    const count = 200;
    const createdNodes: Node[] = [];

    for (let i = 0; i < count; i++) {
      createdNodes.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * viewport.width * 1.5,
          (Math.random() - 0.5) * viewport.height * 1.5,
          (Math.random() - 0.5) * 30
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.0004,
          (Math.random() - 0.5) * 0.0004,
          (Math.random() - 0.5) * 0.0001
        ),
      });
    }

    return createdNodes;
  }, [viewport]);

  // Create line geometry for connections
  const linePositions = useMemo<THREE.BufferAttribute>(() => {
    const positions: number[] = [];
    const maxDistance = 8;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < maxDistance) {
          positions.push(
            nodes[i].position.x,
            nodes[i].position.y,
            nodes[i].position.z,
            nodes[j].position.x,
            nodes[j].position.y,
            nodes[j].position.z
          );
        }
      }
    }

    return new THREE.Float32BufferAttribute(positions, 3);
  }, [nodes]);

  // Convert mouse from screen coords to 3D world coords
  const mouseWorldPos = useMemo(() => {
    const vector = new THREE.Vector3(
      (mousePosition.x / window.innerWidth) * 2 - 1,
      -(mousePosition.y / window.innerHeight) * 2 + 1,
      0
    );
    vector.unproject(
      new THREE.OrthographicCamera(
        -viewport.width / 2,
        viewport.width / 2,
        viewport.height / 2,
        -viewport.height / 2,
        0.1,
        1000
      )
    );
    return vector;
  }, [mousePosition, viewport]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();

    // Move nodes
    nodes.forEach((node, i) => {
      node.position.add(node.velocity);

      // Boundary check
      if (Math.abs(node.position.x) > viewport.width / 2) {
        node.velocity.x *= -1;
      }
      if (Math.abs(node.position.y) > viewport.height / 2) {
        node.velocity.y *= -1;
      }
      if (Math.abs(node.position.z) > 20) {
        node.velocity.z *= -1;
      }

      // Mouse repulsion
      const repulsionRadius = 8;
      const mousePos = new THREE.Vector3(
        -viewport.width / 2 + (mousePosition.x / window.innerWidth) * viewport.width,
        viewport.height / 2 - (mousePosition.y / window.innerHeight) * viewport.height,
        0
      );

      const distToMouse = node.position.distanceTo(mousePos);
      if (distToMouse < repulsionRadius) {
        const force = new THREE.Vector3()
          .subVectors(node.position, mousePos)
          .normalize()
          .multiplyScalar((repulsionRadius - distToMouse) * 0.02);
        node.position.add(force);
      }

      // Slow rotation
      node.position.x += Math.sin(time * 0.0002 + i) * 0.0005;
      node.position.y += Math.cos(time * 0.0002 + i) * 0.0005;
    });

    // Update points geometry
    const positions = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;
    });

    const geometry = pointsRef.current.geometry;
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Could animate line opacity here
  });

  // Create initial positions array for Points component
  const initialPositions = useMemo(() => {
    const positions = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;
    });
    return positions;
  }, [nodes]);

  return (
    <group>
      {/* Nodes */}
      <Points ref={pointsRef} positions={initialPositions} stride={3}>
        <PointMaterial
          transparent
          color="#00d4ff"
          size={2}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>

      {/* Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.count}
            array={linePositions.array as Float32Array}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial transparent color="#00d4ff" opacity={0.12} />
      </lineSegments>
    </group>
  );
};

const NeuralNetworkCanvas: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Only render Canvas on client side after dimensions are set
  if (dimensions.width === 0 || dimensions.height === 0) {
    return <div className="fixed top-0 left-0 w-full h-full -z-10" />;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas
        camera={{
          position: [0, 0, 50],
          left: -dimensions.width / 2,
          right: dimensions.width / 2,
          top: dimensions.height / 2,
          bottom: -dimensions.height / 2,
        }}
        orthographic
      >
        <ambientLight intensity={0.5} />
        <NeuralNetwork mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default NeuralNetworkCanvas;
