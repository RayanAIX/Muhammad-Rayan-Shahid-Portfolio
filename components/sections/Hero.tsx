"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import NeuralNetworkCanvas from "@/components/three/NeuralNetwork";
import { constants } from "@/lib/constants";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const blur = useTransform(scrollY, [0, 300], [0, 10]);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Headline configuration - exact spec
  const headlineLines = [
    { words: ["Intelligence", "isn't"], accent: false },
    { words: ["what", "you", "know."], accent: false },
    { words: ["It's", "whether", "you"], accent: true },
    { words: ["know", "that", "you", "know."], accent: true },
  ];
  const totalWords = headlineLines.reduce((sum, line) => sum + line.words.length, 0);
  const baseDelay = 0.4;
  const staggerDelay = 0.15;

  const sublineWords = [
    `${constants.location} · ${constants.organization} Founder`,
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Background */}
      <motion.div style={{ opacity, scale, filter: blur }}>
        <NeuralNetworkCanvas />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-5"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-primary/30 bg-transparent">
            <span className="font-mono text-xs tracking-widest uppercase text-text-secondary">
              {constants.title} · Age {constants.age}
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                when: "beforeChildren",
              },
            },
          }}
          className="mb-6"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-text-primary mb-4">
            {headlineLines.map((line, lineIndex) => {
              const startIndex = headlineLines.slice(0, lineIndex).reduce((sum, l) => sum + l.words.length, 0);
              return (
                <div
                  key={lineIndex}
                  className="flex flex-wrap justify-center gap-x-4 gap-y-2"
                  style={{ marginTop: lineIndex === 0 ? 0 : '0.5rem' }}
                >
                  {line.words.map((word, wordIndex) => (
                    <motion.span
                      key={`${lineIndex}-${wordIndex}`}
                      initial={{ y: 60, opacity: 0 }}
                      animate={inView ? { y: 0, opacity: 1 } : {}}
                      transition={{
                        duration: 0.8,
                        delay: baseDelay + (startIndex + wordIndex) * staggerDelay,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="inline-block"
                      style={{ color: line.accent ? "var(--accent-primary)" : "inherit" }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              );
            })}
          </h1>
        </motion.div>

        {/* Subline */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: totalWords * staggerDelay + 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="font-body text-lg md:text-xl text-text-secondary mb-2">
            {constants.tagline}
          </p>
          <p className="font-body text-lg md:text-xl text-text-secondary">
            {constants.location} · {constants.organization} Founder
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: totalWords * staggerDelay + 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#research"
            className="btn btn-primary text-lg px-8 py-4"
          >
            Read the Research
          </a>
          <a
            href="#projects"
            className="btn btn-ghost text-lg px-8 py-4"
          >
            See My Work
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg
                className="w-6 h-6 text-accent-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
            <span className="font-mono text-xs text-text-dim">scroll to explore</span>
          </motion.div>
        )}
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default Hero;
