"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Initializing HCMS...",
  "Phase 1: Data .............. ✓",
  "Phase 2: Pattern ........... ✓",
  "Phase 3: Understanding ..... ✓",
  "Phase 4: Intelligence ...... ✓",
  "System ready.",
];

export function ActivationOverlay() {
  const [visible, setVisible] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const initialized = sessionStorage.getItem("hcms_initialized");
    if (initialized) {
      setShowOverlay(false);
      return;
    }

    // Start sequence
    setVisible(true);
    let timer: NodeJS.Timeout;

    const showNext = (index: number) => {
      if (index < LINES.length - 1) {
        timer = setTimeout(() => {
          setCurrentLine(index + 1);
        }, 500);
      } else {
        // After last line, pause then fade out
        timer = setTimeout(() => {
          setVisible(false);
          setTimeout(() => {
            sessionStorage.setItem("hcms_initialized", "true");
            setShowOverlay(false);
          }, 800);
        }, 500);
      }
    };

    // Kick off after 0.5s initial delay? The first line appears immediately? Spec: "Initializing HCMS..." then 0.5s pause before next.
    // We'll show first line immediately, then schedule next.
    timer = setTimeout(() => showNext(0), 500);

    return () => clearTimeout(timer);
  }, []);

  if (!showOverlay) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030303] font-mono text-sm text-[#00d4ff]"
        >
          <div className="flex flex-col items-start gap-2">
            {LINES.slice(0, currentLine + 1).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {line}
              </motion.div>
            ))}
            {/* Blinking cursor after current line */}
            {currentLine < LINES.length - 1 && (
              <span className="inline-block w-2 h-4 bg-[#00d4ff] ml-2 animate-pulse" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
