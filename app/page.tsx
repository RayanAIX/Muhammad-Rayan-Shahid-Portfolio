"use client";

import React, { useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Lenis from "lenis";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { AtmosphericBackground } from "@/components/ui/AtmosphericBackground";
import Hero from "@/components/sections/Hero";
import StorytellingScroll from "@/components/sections/StorytellingScroll";
import HCMS from "@/components/sections/HCMS";
import Terminal from "@/components/sections/Terminal";
import Projects from "@/components/sections/Projects";
import Numbers from "@/components/sections/Numbers";
import Skills from "@/components/sections/Skills";
import Writing from "@/components/sections/Writing";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] bg-accent-primary origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const SectionDivider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-accent-primary/10 to-transparent my-8" />
);

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // smoothTouch: false, // Not available in this Lenis version
      touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Atmospheric Background */}
      <AtmosphericBackground />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="lenis-lenis-wrapper">
        {/* Section 1: Hero */}
        <Hero />
        <SectionDivider />

        {/* Section 2: Storytelling Scroll */}
        <StorytellingScroll />
        <SectionDivider />

        {/* Section 3: HCMS Research */}
        <HCMS />
        <SectionDivider />

        {/* Section 4: Terminal */}
        <Terminal />
        <SectionDivider />

        {/* Section 5: Projects */}
        <Projects />
        <SectionDivider />

        {/* Section 6: Numbers */}
        <Numbers />
        <SectionDivider />

        {/* Section 7: Skills */}
        <Skills />
        <SectionDivider />

        {/* Section 8: Writing */}
        <Writing />
        <SectionDivider />

        {/* Section 9: About */}
        <About />
        <SectionDivider />

        {/* Section 10: Contact */}
        <Contact />
        <SectionDivider />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
