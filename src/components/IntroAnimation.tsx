"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WelcomeIntroProps {
  onComplete: () => void;
}

export default function WelcomeIntro({ onComplete }: WelcomeIntroProps) {
  const [phase, setPhase] = useState<"show" | "textOut" | "bgOut">("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("textOut"), 750);  // text fades first
    const t2 = setTimeout(() => setPhase("bgOut"), 1100);   // then bg fades
    const t3 = setTimeout(onComplete, 1500);                // unmount
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "bgOut" ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-black"
    >
      {/* BOTTOM-LEFT peach → violet aura */}
      <motion.div
        className="absolute -bottom-40 -left-40 h-[70vh] w-[70vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,190,160,0.55) 0%, rgba(139,92,246,0.45) 35%, rgba(76,29,149,0.25) 60%, transparent 75%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 30, -10, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.08, 0.98, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* BOTTOM-RIGHT bright violet aura */}
      <motion.div
        className="absolute -bottom-32 -right-32 h-[65vh] w-[65vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(167,139,250,0.7) 0%, rgba(124,58,237,0.4) 40%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 15, -20, 0],
          scale: [1.05, 0.95, 1.1, 1.05],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top-left soft violet extension (matches reference) */}
      <motion.div
        className="absolute -left-32 top-[-10%] h-[55vh] w-[55vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(139,92,246,0.35) 0%, rgba(67,56,202,0.2) 45%, transparent 75%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 20, -10, 0],
          y: [0, 15, 5, 0],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Deep vignette for depth */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />

      {/* Welcome text */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: phase === "show" ? 1 : 0,
            y: phase === "show" ? 0 : -6,
          }}
          transition={{
            duration: phase === "show" ? 0.5 : 0.35,
            ease: "easeOut",
          }}
          className="text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Welcome
        </motion.h1>
      </div>
    </motion.div>
  );
}