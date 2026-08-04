import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const frames = [
  {
    label: "VIDEO EDITING",
    gradient: "from-slate-900 via-violet-950 to-black",
    rotation: -3,
    x: -80,
  },
  {
    label: "MOTION DESIGN",
    gradient: "from-black via-slate-900 to-violet-950",
    rotation: 2,
    x: 100,
  },
  {
    label: "3D MODELING",
    gradient: "from-violet-950 via-black to-fuchsia-950",
    rotation: -2,
    x: -60,
  },
  {
    label: "LOGO ANIMATION",
    gradient: "from-slate-950 via-purple-950 to-black",
    rotation: 3,
    x: 70,
  },
  {
    label: "GRAPHICS DESIGN",
    gradient: "from-fuchsia-950 via-black to-slate-900",
    rotation: -2,
    x: -90,
  },
  {
    label: "VFX / COMPOSITING",
    gradient: "from-black via-violet-950 to-slate-950",
    rotation: 1,
    x: 50,
  },
];

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [phase, setPhase] = useState<"flipping" | "reveal" | "nameFade" | "bgFade">("flipping");
  const buildupRef = useRef<HTMLAudioElement | null>(null);
  const impactRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const buildup = new Audio("/sounds/buildup.mp3");
    const impact = new Audio("/sounds/impact.mp3");

    buildup.volume = 0.35;
    impact.volume = 0.7;

    buildup.preload = "auto";
    impact.preload = "auto";

    buildup.load();
    impact.load();

    buildupRef.current = buildup;
    impactRef.current = impact;

    return () => {
      buildup.pause();
      impact.pause();
    };
  }, []);

  // Frame flipping — KEEP ORIGINAL PACE
  useEffect(() => {
    if (phase !== "flipping") return;

    if (frameIndex < frames.length) {
      const buildup = buildupRef.current;
      if (buildup) {
        buildup.currentTime = 0;
        buildup.play().catch(() => {});
      }

      const speed =
        frameIndex < 3 ? 130 : frameIndex === 3 ? 150 : frameIndex === 4 ? 200 : 250;

      const timer = setTimeout(() => {
        setFrameIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setPhase("reveal");
      const impact = impactRef.current;
      if (impact) {
        impact.currentTime = 0;
        impact.play().catch(() => {});
      }
    }
  }, [frameIndex, phase]);

  // Reveal → NameFade → BgFade — SPEED UP THE ENDING
  useEffect(() => {
    if (phase === "reveal") {
      const timer = setTimeout(() => setPhase("nameFade"), 800); // Name shown briefly
      return () => clearTimeout(timer);
    }
    if (phase === "nameFade") {
      const timer = setTimeout(() => setPhase("bgFade"), 350); // Name fades quick
      return () => clearTimeout(timer);
    }
    if (phase === "bgFade") {
      const timer = setTimeout(onComplete, 500); // Bg fades → homepage
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "bgFade" ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-slate-950"
    >
      {/* FULL PAGE FLIPPING FRAMES */}
      <AnimatePresence mode="popLayout">
        {phase === "flipping" && frameIndex < frames.length && (
          <motion.div
            key={frameIndex}
            initial={{
              opacity: 0,
              scale: 1.15,
              x: frames[frameIndex].x,
              rotate: frames[frameIndex].rotation * 1.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              rotate: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              rotate: frames[frameIndex].rotation * -1,
            }}
            transition={{
              duration: 0.15,
              ease: [0.19, 1, 0.22, 1],
            }}
            className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${frames[frameIndex].gradient}`}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(168,85,247,0.15) 0%, transparent 60%)",
              }}
            />

            <div
              className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.15) 80px, rgba(255,255,255,0.15) 81px), repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(255,255,255,0.1) 80px, rgba(255,255,255,0.1) 81px)",
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
              }}
            />

            <h2 className="relative z-10 px-6 text-center text-5xl font-black tracking-tighter text-white/90 sm:text-7xl md:text-8xl lg:text-9xl">
              {frames[frameIndex].label}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUBTLE AURA (during reveal & fade phases) */}
      {(phase === "reveal" || phase === "nameFade" || phase === "bgFade") && (
        <>
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, rgba(168,85,247,0.15), transparent 50%), radial-gradient(circle at 70% 60%, rgba(236,72,153,0.12), transparent 50%)",
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, rgba(168,85,247,0.15), rgba(236,72,153,0.15), rgba(139,92,246,0.15), rgba(168,85,247,0.15))",
              filter: "blur(80px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      {/* NAME REVEAL — matches frame animation style */}
<div className="absolute inset-0 flex items-center justify-center">
  <AnimatePresence>
    {(phase === "reveal" || phase === "nameFade") && (
      <motion.div
        key="name"
        initial={{
          opacity: 0,
          scale: 1.15,
          x: 60,
          rotate: 2,
        }}
        animate={{
          opacity: phase === "nameFade" ? 0 : 1,
          scale: 1,
          x: 0,
          rotate: 0,
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: phase === "nameFade" ? 0.35 : 0.25,
          ease: [0.19, 1, 0.22, 1],
        }}
        className="relative z-10 text-center"
      >
            
              <h1 className="font-display text-6xl font-semibold tracking-tight text-white sm:text-8xl md:text-9xl">
                Bishant<span className="text-violet-400">.</span> RB
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* UNDERLINE SWEEP */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {(phase === "reveal" || phase === "nameFade") && (
            <motion.div
              key="underline"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: phase === "nameFade" ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              className="mt-40 h-[2px] w-48 bg-gradient-to-r from-transparent via-violet-400 to-transparent sm:w-64"
              style={{
                boxShadow: "0 0 20px rgba(168,85,247,0.8)",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* VIGNETTE */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </motion.div>
  );
}