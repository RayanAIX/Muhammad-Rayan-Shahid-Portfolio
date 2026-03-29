"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { constants } from "@/lib/constants";

const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const socialLinks = [
    { name: "GitHub", href: constants.social.github, handle: "@RayanAIX" },
    { name: "LinkedIn", href: constants.social.linkedin, handle: "Muhammad Rayan Shahid" },
    { name: "Kaggle", href: constants.social.kaggle, handle: "muhammadrayanshahid" },
    { name: "HuggingFace", href: constants.social.huggingface, handle: "RayNetic" },
    { name: "YouTube", href: constants.social.youtube, handle: "@ByteBrillianceAI" },
    { name: "Substack", href: constants.social.substack, handle: "@muhammedrayanshahid" },
  ];

  return (
    <section id="about" className="min-h-screen bg-primary py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="relative">
              {/* Glow border */}
              <motion.div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-primary opacity-50 blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Photo container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border-2 border-accent-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10" />
                {imgError ? (
                  <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                    <span className="font-display text-4xl md:text-5xl text-accent-primary">MR</span>
                  </div>
                ) : (
                  <Image
                    src="/images/rayan.jpg"
                    alt="Muhammad Rayan Shahid"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 20rem, 24rem"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 px-6 py-3 rounded-full bg-accent-primary/10 border border-accent-primary/30 font-mono text-accent-primary text-sm"
            >
              Independent AI Researcher · Karachi, Pakistan
            </motion.div>
          </motion.div>

          {/* Right: Manifesto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-8">
              The Manifesto
            </h2>

            <div className="space-y-6 text-lg leading-relaxed">
              <p className="font-body text-text-secondary">
                Most people spend years preparing to do research.
                <br />
                <span className="text-accent-primary font-semibold">
                  I started doing it.
                </span>
              </p>

              <p className="font-body text-text-secondary">
                At {constants.age}, I published a DOI-backed cognitive science preprint — HCMS, the Human Cognition Measurement System. Not because a professor told me to. Because I realized that every exam I'd taken was measuring the wrong thing. Correctness is easy to fake.
                <span className="text-accent-primary font-semibold">
                  Deep understanding isn't.
                </span>
              </p>

              <p className="font-body text-text-secondary">
                I work at the intersection of machine learning, cognitive science, and human-centered AI. My research asks: can we formally measure how a person understands something — not just whether they answered correctly? HCMS is the first answer to that question.
              </p>

              <p className="font-body text-text-secondary">
                My thesis is simple: intelligence is a stability, not a score.
                A calibration. A consistency under pressure.
              </p>

              <p className="font-body text-text-secondary">
                I'm not building AI to get a job.
                <br />
                <span className="text-accent-primary font-semibold">
                  I'm building things that don't exist yet.
                  That's the only reason worth having.
                </span>
              </p>
            </div>

            {/* GitHub stats teaser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <p className="font-mono text-xs text-text-dim mb-3">
                229 contributions in 2025 · Joined GitHub Jun 2025 · 23 public repos
              </p>
              {/* Mini heatmap: 7 rows x 52 columns */}
              <div className="flex gap-[3px] w-full max-w-md mx-auto">
                {Array.from({ length: 52 }).map((_, week) => (
                  <div key={week} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }).map((_, day) => {
                      // Generate a fixed pseudo-random pattern based on week and day
                      const value = Math.sin(week * 0.5 + day * 0.3) * 0.5 + 0.5;
                      const level = value < 0.25 ? 0 : value < 0.5 ? 1 : value < 0.75 ? 2 : 3;
                      const colors = ["#111116", "#0a4d76", "#0095c7", "#00d4ff"];
                      return (
                        <div
                          key={day}
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: colors[level] }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <h3 className="font-mono text-text-dim text-sm uppercase tracking-wider mb-4">
                Connect With Me
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border hover:border-accent-primary/50 transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                        <div className="w-4 h-4 rounded-full bg-accent-primary/30" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-xs text-text-dim">
                          {social.name}
                        </p>
                        <p className="font-mono text-sm text-text-primary truncate">
                          {social.handle}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
