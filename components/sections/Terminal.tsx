"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  type: "prompt" | "response";
  text?: string;
  lines?: string[];
}

const Terminal: React.FC = () => {
  const terminalLines: TerminalLine[] = [
    { type: "prompt", text: "whoami" },
    {
      type: "response",
      lines: [
        "Muhammad Rayan Shahid",
        "Independent AI Researcher · Age 16 · Karachi, Pakistan",
      ],
    },
    { type: "prompt", text: "describe --self" },
    {
      type: "response",
      lines: [
        "I don't wait for permission to research.",
        "I find the gap. I build the framework. I publish.",
        "Then I do it again.",
      ],
    },
    { type: "prompt", text: "ls ./research" },
    {
      type: "response",
      lines: [
        "HCMS/                  CognitiveBenchmark/",
        "LearningAnalytics/     ConfidenceCalibration/",
      ],
    },
    { type: "prompt", text: "ls ./projects" },
    {
      type: "response",
      lines: [
        "FakeNewsDetector/      EmotionClassifier/",
        "MedicalImaging/        SpeechTranslator/",
        "SocialAutomation/      ... +16 more",
      ],
    },
    { type: "prompt", text: "cat mission.txt" },
    {
      type: "response",
      lines: [
        "Build AI that measures human cognition,",
        "not just human performance.",
        "Then publish the framework. At any age.",
      ],
    },
    { type: "prompt", text: "echo $CURRENT_STATUS" },
    {
      type: "response",
      lines: [
        "Building. Researching. Publishing.",
        "Age 16. No permission required.",
      ],
    },
  ];

  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentPromptText, setCurrentPromptText] = useState("");
  const [currentResponseText, setCurrentResponseText] = useState<string[]>([]);
  const [isTypingPrompt, setIsTypingPrompt] = useState(true);
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing animation logic
  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      // Loop after pause
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentPromptText("");
        setCurrentResponseText([]);
        setIsTypingPrompt(true);
        setIsTypingResponse(false);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const currentLine = terminalLines[currentLineIndex];

    if (isTypingPrompt) {
      if (currentLine.type === "prompt" && currentLine.text) {
        if (currentPromptText.length < currentLine.text.length) {
          const timer = setTimeout(() => {
            setCurrentPromptText(currentLine.text.slice(0, currentPromptText.length + 1));
          }, 35);
          return () => clearTimeout(timer);
        } else {
          setIsTypingPrompt(false);
          setTimeout(() => setIsTypingResponse(true), 200);
        }
      }
    } else if (isTypingResponse) {
      if (currentLine.type === "response" && currentLine.lines) {
        const targetLines = currentLine.lines;
        if (currentResponseText.length < targetLines.length) {
          // We reveal line by line, not character by character for responses
          const timer = setTimeout(() => {
            setCurrentResponseText(targetLines.slice(0, currentResponseText.length + 1));
          }, 150); // slight delay between lines
          return () => clearTimeout(timer);
        } else {
          // Response complete, move to next line
          setDisplayedLines([...displayedLines, currentLine]);
          setCurrentLineIndex(currentLineIndex + 1);
          setIsTypingPrompt(true);
          setIsTypingResponse(false);
          setCurrentPromptText("");
          setCurrentResponseText([]);
        }
      }
    }
  }, [
    currentLineIndex,
    isTypingPrompt,
    isTypingResponse,
    currentPromptText,
    currentResponseText,
    displayedLines,
  ]);

  return (
    <section className="min-h-screen bg-primary py-24 flex items-center justify-center overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="terminal"
        >
          {/* Window header */}
          <div className="terminal-header">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="ml-4 font-mono text-text-dim text-sm">
              rayan@bytebrilliance:~ — zsh
            </span>
          </div>

          {/* Terminal body */}
          <div className="terminal-body" ref={containerRef}>
            {/* Previously completed lines */}
            {displayedLines.map((line, idx) => (
              <div key={idx} className="command-group mb-4">
                {line.type === "prompt" && line.text && (
                  <div className="flex items-start gap-2">
                    <span className="terminal-prompt font-mono text-accent-primary">
                      rayan@bytebrilliance:~$
                    </span>
                    <span className="terminal-command font-mono text-text-primary">
                      {line.text}
                    </span>
                  </div>
                )}
                {line.type === "response" && line.lines && (
                  <div className="terminal-output ml-4 space-y-1">
                    {line.lines.map((lineText, lineIdx) => (
                      <p key={lineIdx} className="font-mono text-sm text-text-secondary">
                        {lineText}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Current line being typed */}
            {currentLineIndex < terminalLines.length && (
              <div className="command-group">
                {isTypingPrompt && (
                  <div className="flex items-start gap-2">
                    <span className="terminal-prompt font-mono text-accent-primary">
                      rayan@bytebrilliance:~$
                    </span>
                    <span className="terminal-command font-mono text-text-primary">
                      {currentPromptText}
                      {showCursor && (
                        <span className="inline-block w-2 h-4 bg-accent-primary ml-1 animate-pulse" />
                      )}
                    </span>
                  </div>
                )}
                {isTypingResponse && currentResponseText.length > 0 && (
                  <div className="terminal-output ml-4 space-y-1">
                    {currentResponseText.map((lineText, idx) => (
                      <p key={idx} className="font-mono text-sm text-text-secondary">
                        {lineText}
                      </p>
                    ))}
                    {showCursor && (
                      <span className="inline-block w-2 h-4 bg-accent-primary ml-1 animate-pulse" />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <span className="font-mono text-sm text-text-dim">
            AI Identity Terminal
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;
