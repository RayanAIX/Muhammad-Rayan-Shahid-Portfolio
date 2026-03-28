"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedNumberProps {
  end: number | string;
  duration?: number;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  end,
  duration = 2,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const numericEnd = typeof end === "number" ? end : parseInt(end, 10);
    const increment = numericEnd / (duration * 60);
    let animationFrameId: number;

    const animate = () => {
      start += increment;
      if (start < numericEnd) {
        setCount(Math.floor(start));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(numericEnd);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

const Numbers: React.FC = () => {
  const stats = [
    {
      value: 16,
      suffix: "",
      label: "Years old. Building what most wait decades to attempt.",
      accentColor: "var(--accent-primary)",
    },
    {
      value: 15,
      suffix: "",
      label: "Research phases in HCMS. Not iterations. Phases.",
      accentColor: "var(--accent-primary)",
    },
    {
      value: 23,
      suffix: "",
      label: "Public repositories. Every one shipped.",
      accentColor: "var(--accent-primary)",
    },
    {
      value: 1,
      suffix: "",
      label: "DOI-backed preprint. Published at 16.",
      accentColor: "var(--accent-primary)",
    },
    {
      value: 97,
      suffix: "%",
      label: "Peak model accuracy. Fake News Detector.",
      accentColor: "#10b981",
    },
    {
      value: 7,
      suffix: "",
      label: "Deployed AI systems. Real users. Real inference.",
      accentColor: "var(--accent-primary)",
    },
  ];

  return (
    <section className="min-h-screen bg-primary py-24 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-2xl md:text-3xl font-bold text-accent-primary mb-4">
            Proof, not promises.
          </p>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Every number below is a shipped output, a published result, or a real system.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative bg-secondary/20 border border-border rounded-xl p-6 hover:border-accent-primary/50 transition-all duration-300 group"
              style={{
                borderLeft: `3px solid ${stat.accentColor}`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-none"
                  style={{ color: stat.accentColor }}>
                  <AnimatedNumber end={stat.value} duration={2} suffix={stat.suffix} />
                </div>
              </div>
              <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Extra detail for age */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-xs text-text-dim">
            Born 2009 · Started building AI systems 2024
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Numbers;
