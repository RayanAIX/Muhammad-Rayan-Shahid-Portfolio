"use client";

import React, { useEffect, useRef, useState } from "react";
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
        // Animate node container
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

        // Animate rect border opacity inside node
        const rect = (node as SVGGElement).querySelector("rect");
        if (rect) {
          gsap.fromTo(
            rect,
            { strokeOpacity: 0.3 },
            {
              strokeOpacity: 1,
              duration: 0.6,
              delay: i * 0.2,
              scrollTrigger: {
                trigger: node as Element,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
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

  const topicTags = [
    { label: "Human-Centered AI", href: "https://github.com/topics/human-centered-ai" },
    { label: "Cognitive Modeling", href: "https://github.com/topics/cognitive-modeling" },
    { label: "XAI", href: "https://github.com/topics/xai" },
    { label: "Psychometrics", href: "https://github.com/topics/psychometrics" },
    { label: "Confidence Calibration", href: "#" },
    { label: "EdTech", href: "https://github.com/topics/ai-for-education" },
    { label: "AI Evaluation", href: "https://github.com/topics/ai-evaluation" },
    { label: "Learning Analytics", href: "https://github.com/topics/learning-analytics" },
  ];

  const [activeTab, setActiveTab] = useState(0);

  // Citation data
  const bibTeX = `@article{shahid2026hcms,
  title={Beyond Correctness: Measuring Cognitive Stability and Confidence Calibration in Human Understanding},
  author={Shahid, Muhammad Rayan},
  year={2026},
  publisher={Zenodo},
  doi={10.5281/zenodo.18269740}
}`;

  const [copied, setCopied] = useState(false);

  const copyCitation = async () => {
    await navigator.clipboard.writeText(bibTeX);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            Every test you've ever taken assumed correctness equals understanding.
            HCMS proves it doesn't. Across 15 structured research phases, HCMS
            models the gap between getting something right and truly knowing it —
            measuring confidence calibration, reasoning consistency, and cognitive
            stability under pressure. This is what assessment looks like when the
            question matters more than the answer.
          </motion.p>

            {/* HCMS Detail Tabs */}
            <div className="mt-12">
              <div className="flex flex-wrap justify-center gap-4 border-b border-border mb-6">
                {["Confidence Calibration", "Reasoning Consistency", "Cognitive Stability", "Explainability"].map((tab, idx) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 text-sm font-mono relative transition-colors ${
                      activeTab === idx
                        ? "text-accent-primary border-b-2 border-accent-primary"
                        : "text-text-secondary hover:text-accent-primary"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="min-h-[200px]">
                {activeTab === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2L12 22M2 12L22 12" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-xl font-bold text-text-primary mb-2">Confidence Calibration</h4>
                      <p className="font-body text-text-secondary leading-relaxed mb-4">
                        Measures the alignment between a student&apos;s confidence and their accuracy. Misalignment indicates overconfidence or underconfidence, both signs of unstable understanding.
                      </p>
                      <div className="w-full max-w-xs h-8 bg-secondary/30 rounded overflow-hidden flex">
                        <div className="h-full bg-accent-primary" style={{ width: "70%" }}></div>
                        <div className="h-full bg-accent-secondary" style={{ width: "30%" }}></div>
                      </div>
                      <p className="text-xs text-text-dim mt-1 font-mono">Calibration gap visualization</p>
                    </div>
                  </motion.div>
                )}
                {activeTab === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 12h4l3-9 4 18 3-9h4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-xl font-bold text-text-primary mb-2">Reasoning Consistency</h4>
                      <p className="font-body text-text-secondary leading-relaxed mb-4">
                        Analyzes whether a student&apos;s reasoning process remains coherent across similar problems. Inconsistent reasoning suggests fragile knowledge that fails under variation.
                      </p>
                      <svg viewBox="0 0 100 30" className="w-full max-w-xs">
                        <polyline points="0,25 20,20 40,23 60,15 80,10 100,5" fill="none" stroke="var(--accent-primary)" strokeWidth="2"/>
                      </svg>
                      <p className="text-xs text-text-dim mt-1 font-mono">Consistency across attempts</p>
                    </div>
                  </motion.div>
                )}
                {activeTab === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="8" strokeLinecap="round"/>
                        <path d="M12 8v8M8 12h8" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-xl font-bold text-text-primary mb-2">Cognitive Stability</h4>
                      <p className="font-body text-text-secondary leading-relaxed mb-4">
                        Captures how performance varies over time and under pressure. A cognitively stable learner maintains accuracy despite perturbations, indicating robust understanding.
                      </p>
                      <div className="w-full max-w-xs h-8 bg-secondary/30 rounded p-1 flex gap-1">
                        {[60, 75, 50, 80, 90, 65, 70, 85].map((h, i) => (
                          <div key={i} className="flex-1 bg-accent-primary/60 rounded" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                      <p className="text-xs text-text-dim mt-1 font-mono">Performance stability</p>
                    </div>
                  </motion.div>
                )}
                {activeTab === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="4" strokeLinecap="round"/>
                        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-xl font-bold text-text-primary mb-2">Explainability</h4>
                      <p className="font-body text-text-secondary leading-relaxed mb-4">
                        Provides interpretable diagnostics for each assessment, showing why a response was classified as calibrated, consistent, or unstable. Transparent signals for educators and researchers.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-accent-primary animate-pulse"></div>
                        <span className="font-mono text-xs text-accent-primary">Explainable AI</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

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
                      fill="#111116"
                      stroke="rgba(0,212,255,0.3)"
                      strokeWidth="1"
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
                  y="530"
                  width="240"
                  height="70"
                  rx="6"
                  fill="rgba(0,212,255,0.05)"
                  stroke="rgba(0,212,255,0.5)"
                  strokeWidth="1.5"
                />
                {/* Line 1: Cognitive Profile */}
                <text
                  x="200"
                  y="555"
                  textAnchor="middle"
                  fill="#f0f0f5"
                  fontFamily="Syne, sans-serif"
                  fontSize="12"
                  fontWeight="600"
                >
                  Cognitive Profile
                </text>
                {/* Line 2: Partial | Miscalibrated */}
                <text
                  x="200"
                  y="575"
                  textAnchor="middle"
                  fill="#00d4ff"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="11"
                >
                  Partial | Miscalibrated
                </text>
                {/* Line 3: Consistency: 0.83 */}
                <text
                  x="200"
                  y="592"
                  textAnchor="middle"
                  fill="#00d4ff"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                >
                  Consistency: 0.83
                </text>
              </motion.g>
            </svg>
          </motion.div>
        </div>

        {/* HCMS Philosophy Laws */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          className="mb-12"
        >
          <h4 className="font-mono text-sm text-accent-primary mb-3">Three Laws of Understanding</h4>
          <div className="space-y-2 font-mono text-base">
            <p>Law I    &quot;Understanding requires more than correctness.&quot;</p>
            <p>Law II   &quot;Confidence without calibration is noise.&quot;</p>
            <p>Law III  &quot;Intelligence that cannot explain itself is incomplete.&quot;</p>
          </div>
        </motion.div>

        {/* Citation Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div className="bg-secondary/30 border border-border rounded-xl p-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🔬</span>
              <div className="flex-1">
                <p className="font-body text-text-primary mb-3">
                  This framework is open-source and citable.
                </p>
                <p className="font-mono text-sm text-text-secondary mb-4">
                  Shahid, M.R. (2026). Beyond Correctness: Measuring Cognitive
                  Stability and Confidence Calibration in Human Understanding.
                  <br />
                  Zenodo. DOI: 10.5281/zenodo.18269740
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={copyCitation}
                    className="btn btn-ghost text-sm"
                  >
                    {copied ? "Copied!" : "Copy Citation"}
                  </button>
                  <a
                    href={constants.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost text-sm"
                  >
                    View on Zenodo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Topic Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.2 }}
          className="border-t border-border pt-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {topicTags.map((tag) => (
              <a
                key={tag.label}
                href={tag.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full border border-accent-primary/20 bg-accent-primary/5 text-accent-primary text-xs hover:border-accent-primary/50 hover:bg-accent-primary/10 transition-colors"
              >
                {tag.label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HCMS;
