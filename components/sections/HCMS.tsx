"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { constants } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const HCMS: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<SVGSVGElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1], [0, -100]);

  // Animate pipeline diagram on scroll
  useEffect(() => {
    if (!diagramRef.current) return;

    const ctx = gsap.context(() => {
      const nodes = diagramRef.current?.querySelectorAll(".pipeline-node");
      const lines = diagramRef.current?.querySelectorAll(".pipeline-line");

      nodes?.forEach((node, i) => {
        gsap.fromTo(
          node,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: node as Element,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      lines?.forEach((line, i) => {
        const path = line as SVGLineElement;
        const length = path.getTotalLength?.() || 0;

        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            delay: i * 0.15 + 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const metrics = [
    { label: "Research Phases", value: "15" },
    { label: "Methodology", value: "Python + TeX" },
    { label: "Validation", value: "DOI-Backed" },
    { label: "Status", value: "Phase 1–15 Complete" },
  ];

  const contributions = [
    {
      icon: "✦",
      text: "Introduces cognitive stability as a measurable dimension beyond correctness",
    },
    {
      icon: "✦",
      text: "Demonstrates confidence–accuracy misalignment predicts reasoning degradation",
    },
    {
      icon: "✦",
      text: "Provides diagnostic framework vs predictive scoring model",
    },
    {
      icon: "✦",
      text: "Interpretable, reproducible signals for education & cognitive research",
    },
  ];

  const topics = [
    "#HumanCenteredAI",
    "#CognitiveModeling",
    "#XAI",
    "#Psychometrics",
    "#ConfidenceCalibration",
    "#EdTech",
    "#AIEvaluation",
    "#LearningAnalytics",
  ];

  return (
    <section
      id="research"
      ref={(node) => {
        sectionRef.current = node as HTMLDivElement;
        if (typeof ref === 'function') ref(node);
      }}
      className="relative min-h-screen bg-primary py-24 overflow-hidden"
    >
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/30 bg-accent-primary/5 mb-6">
            <span className="font-mono text-xs text-accent-primary">
              PUBLISHED RESEARCH · ZENODO DOI
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Human Cognition<br />
            <span className="text-accent-primary">Measurement System</span>
          </h2>

          {/* Pull Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-4xl mx-auto border-l-2 border-accent-primary/50 pl-6 mb-10"
          >
            <p className="font-mono text-base md:text-lg text-text-secondary leading-relaxed">
              &quot;Beyond Correctness: Measuring Cognitive Stability
              <br />
              and Confidence Calibration in Human Understanding&quot;
              <br />
              <span className="text-text-dim">Shahid, M.R. (2026). Zenodo.</span>
              <br />
              <a
                href={constants.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-primary hover:underline"
              >
                DOI: {constants.doi}
              </a>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-body text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-12"
          >
            Traditional assessment systems equate correctness with understanding.
            HCMS challenges this. It models understanding as a multidimensional
            construct: accuracy, confidence calibration, reasoning consistency,
            and robustness under perturbation — across 15 structured research phases.
          </motion.p>

          {/* Animated Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-secondary/30 border border-border rounded-xl p-6 text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-accent-primary mb-2">
                  {metric.value}
                </div>
                <div className="font-mono text-xs text-text-dim uppercase tracking-wider">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Split Layout: Content + Pipeline Diagram */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left: Contributions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h3 className="font-display text-2xl font-bold text-text-primary mb-6">
              Research Contributions
            </h3>
            <div className="space-y-6">
              {contributions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  className="flex gap-4"
                >
                  <span className="text-accent-primary text-xl mt-1">{item.icon}</span>
                  <p className="font-body text-text-secondary leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Sub-systems note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 2 }}
              className="mt-8 p-4 rounded-lg border border-border/50 bg-secondary/20"
            >
              <p className="font-mono text-xs text-text-dim leading-relaxed">
                Includes sub-systems: <span className="text-text-secondary">Cognitive Robustness Benchmark, Learning Analytics Engine, Confidence Calibration Module</span>
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <a
                href={constants.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Read Preprint →
              </a>
              <a
                href={constants.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                View Repository →
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Pipeline Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative"
          >
            <svg
              ref={diagramRef}
              viewBox="0 0 400 600"
              className="w-full h-auto"
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Pipeline nodes */}
              {[
                { id: "input", y: 40, label: "Input Question" },
                { id: "understanding", y: 120, label: "Understanding Analysis" },
                { id: "confidence", y: 200, label: "Confidence Calibration" },
                { id: "consistency", y: 280, label: "Consistency Check" },
                { id: "robustness", y: 360, label: "Robustness Testing" },
                { id: "explainability", y: 440, label: "Explainability Layer" },
                { id: "output", y: 530, label: "Cognitive Profile Output" },
              ].map((node, i) => (
                <React.Fragment key={node.id}>
                  <motion.g
                    className="pipeline-node"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Connector line */}
                    {i < 6 && (
                      <line
                        className="pipeline-line"
                        x1="200"
                        y1={node.y + 50}
                        x2="200"
                        y2={node.y + 70}
                        stroke="#00d4ff"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    )}

                    {/* Box */}
                    <rect
                      x="80"
                      y={node.y}
                      width="240"
                      height="60"
                      rx="8"
                      fill="rgba(17, 17, 22, 0.8)"
                      stroke="#00d4ff"
                      strokeWidth="2"
                      filter="url(#glow)"
                    />

                    {/* Label */}
                    <text
                      x="200"
                      y={node.y + 37}
                      textAnchor="middle"
                      fill="#f0f0f5"
                      fontFamily="Syne, sans-serif"
                      fontSize="14"
                      fontWeight="600"
                    >
                      {node.label}
                    </text>
                  </motion.g>
                </React.Fragment>
              ))}

              {/* Output detail */}
              <motion.g
                className="pipeline-node"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <rect
                  x="80"
                  y="540"
                  width="240"
                  height="45"
                  rx="6"
                  fill="#111116"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                />
                <text
                  x="200"
                  y="568"
                  textAnchor="middle"
                  fill="#00d4ff"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="11"
                >
                  Partial | Miscalibrated | Consistency: 0.83
                </text>
              </motion.g>
            </svg>
          </motion.div>
        </div>

        {/* Topic Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.2 }}
          className="border-t border-border pt-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {topics.map((topic, index) => (
              <motion.span
                key={topic}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 2.2 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-sm font-mono hover:bg-accent-primary/20 transition-all duration-300"
              >
                {topic}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HCMS;
