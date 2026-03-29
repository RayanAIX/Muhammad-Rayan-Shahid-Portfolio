"use client";

import React from "react";
import { motion } from "framer-motion";

const skillTree = {
  center: "MR",
  categories: [
    {
      label: "Languages",
      color: "#00d4ff",
      skills: ["Python", "TeX", "JavaScript"],
    },
    {
      label: "ML / DL",
      color: "#7c3aed",
      skills: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn"],
    },
    {
      label: "NLP",
      color: "#00d4ff",
      skills: ["NLTK", "TF-IDF", "Whisper", "GPT API"],
    },
    {
      label: "Deploy",
      color: "#10b981",
      skills: ["HuggingFace", "Vercel", "Streamlit", "Gradio"],
    },
    {
      label: "Research",
      color: "#f59e0b",
      skills: ["Zenodo", "LaTeX", "Jupyter"],
    },
    {
      label: "Data",
      color: "#ec4899",
      skills: ["Pandas", "NumPy", "Matplotlib"],
    },
  ],
};

const Skills: React.FC = () => {
  const categories = skillTree.categories;
  const catRadius = 140;
  const skillRadius = 240;
  const totalCategories = categories.length;
  const sectorAngle = (2 * Math.PI) / totalCategories;

  return (
    <section id="skills" className="min-h-screen bg-primary py-24 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            What I build with.
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            I don&apos;t list skills I&apos;ve read about. Every tool here has a GitHub commit or a published paper behind it.
          </p>
        </motion.div>

        {/* Interactive Network */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <svg viewBox="-250 -250 500 500" className="w-full max-w-2xl">
            <defs>
              <filter id="glowCenter">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connections from center to categories */}
            {categories.map((cat, i) => {
              const angle =
                (i / totalCategories) * 2 * Math.PI - Math.PI / 2;
              const cx = Math.cos(angle) * catRadius;
              const cy = Math.sin(angle) * catRadius;
              return (
                <line
                  key={`line-center-${i}`}
                  x1={0}
                  y1={0}
                  x2={cx}
                  y2={cy}
                  stroke={cat.color}
                  strokeWidth="1"
                  opacity="0.3"
                />
              );
            })}

            {/* Category nodes and their skills */}
            {categories.map((cat, i) => {
              const angle =
                (i / totalCategories) * 2 * Math.PI - Math.PI / 2;
              const cx = Math.cos(angle) * catRadius;
              const cy = Math.sin(angle) * catRadius;
              const skills = cat.skills;
              const skillCount = skills.length;

              return (
                <React.Fragment key={i}>
                  {/* Connection lines from category to each skill */}
                  {skills.map((skill, j) => {
                    const skillAngle =
                      angle - sectorAngle / 2 +
                      ((j + 1) / (skillCount + 1)) * sectorAngle;
                    const sx = Math.cos(skillAngle) * skillRadius;
                    const sy = Math.sin(skillAngle) * skillRadius;
                    return (
                      <line
                        key={`line-${i}-${j}`}
                        x1={cx}
                        y1={cy}
                        x2={sx}
                        y2={sy}
                        stroke={cat.color}
                        strokeWidth="0.5"
                        opacity="0.5"
                      />
                    );
                  })}

                  {/* Category node */}
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="12"
                    fill={cat.color}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  />
                  {/* Category label */}
                  <text
                    x={cx}
                    y={cy + 24}
                    textAnchor="middle"
                    fill="var(--text-secondary)"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="10"
                  >
                    {cat.label}
                  </text>

                  {/* Skill nodes */}
                  {skills.map((skill, j) => {
                    const skillAngle =
                      angle - sectorAngle / 2 +
                      ((j + 1) / (skillCount + 1)) * sectorAngle;
                    const sx = Math.cos(skillAngle) * skillRadius;
                    const sy = Math.sin(skillAngle) * skillRadius;
                    return (
                      <React.Fragment key={j}>
                        <motion.circle
                          cx={sx}
                          cy={sy}
                          r="5"
                          fill={cat.color}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: i * 0.1 + j * 0.05,
                            duration: 0.4,
                          }}
                        />
                        <text
                          x={sx}
                          y={sy + 18}
                          textAnchor="middle"
                          fill="var(--text-dim)"
                          fontFamily="JetBrains Mono, monospace"
                          fontSize="8"
                        >
                          {skill}
                        </text>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}

            {/* Center node */}
            <motion.circle
              cx={0}
              cy={0}
              r="20"
              fill="var(--accent-primary)"
              filter="url(#glowCenter)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
            <text
              x={0}
              y={6}
              textAnchor="middle"
              fill="black"
              fontFamily="Syne, sans-serif"
              fontSize="12"
              fontWeight="700"
              style={{ pointerEvents: "none" }}
            >
              MR
            </text>
          </svg>
        </motion.div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="font-mono text-xs text-text-dim">
            Hover nodes to explore connections
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
