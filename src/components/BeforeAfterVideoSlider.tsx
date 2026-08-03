import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { cn } from "../utils/cn";

export interface BeforeAfterVideoSliderProps {
  beforeVideo: string;
  afterVideo: string;
  title?: string;
  description?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function BeforeAfterVideoSlider({
  beforeVideo,
  afterVideo,
  title,
  description,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterVideoSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderId = useId();

  const position = useMotionValue(50);
  const springPosition = useSpring(position, {
    stiffness: isDragging ? 900 : 220,
    damping: isDragging ? 60 : 26,
    mass: 0.4,
  });
  const [displayValue, setDisplayValue] = useState(50);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const unsubscribe = springPosition.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [springPosition]);

  // Play both videos synced
  const playVideos = useCallback(() => {
    const before = beforeVideoRef.current;
    const after = afterVideoRef.current;
    if (!before || !after) return;
    after.currentTime = before.currentTime;
    before.play().catch(() => {});
    after.play().catch(() => {});
  }, []);

  const pauseVideos = useCallback(() => {
    beforeVideoRef.current?.pause();
    afterVideoRef.current?.pause();
  }, []);

  // Mobile: autoplay when in viewport
  useEffect(() => {
    if (!isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideos();
        } else {
          pauseVideos();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile, playVideos, pauseVideos]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (!isMobile) playVideos();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (!isMobile) pauseVideos();
  };

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const percent = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      position.set(percent);
    },
    [position]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => setIsDragging(false);

  const nudge = (delta: number) => {
    const next = clamp(position.get() + delta, 0, 100);
    animate(position, next, { type: "spring", stiffness: 400, damping: 30 });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        nudge(-5);
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        nudge(5);
        break;
      case "Home":
        e.preventDefault();
        animate(position, 0, { type: "spring", stiffness: 400, damping: 30 });
        break;
      case "End":
        e.preventDefault();
        animate(position, 100, { type: "spring", stiffness: 400, damping: 30 });
        break;
      default:
        break;
    }
  };

  return (
    <div className={cn("group w-full", className)}>
      <div
        ref={containerRef}
        role="slider"
        aria-label={title ? `Before and after comparison: ${title}` : "Before and after video comparison"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(displayValue)}
        aria-valuetext={`${Math.round(displayValue)}% after video revealed`}
        tabIndex={0}
        id={sliderId}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-3xl",
          "border border-white/10 bg-black/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]",
          "outline-none ring-0 focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050308]",
          "cursor-ew-resize"
        )}
      >
        {/* Before video (base layer) */}
        <video
          ref={beforeVideoRef}
          src={beforeVideo}
          muted
          loop
          playsInline
          preload="metadata"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        />

        {/* After video, clipped */}
        <div
          className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - displayValue}% 0 0)` }}
        >
          <video
            ref={afterVideoRef}
            src={afterVideo}
            muted
            loop
            playsInline
            preload="metadata"
            className="pointer-events-none h-full w-full select-none object-cover"
          />
        </div>

        {/* Top gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        {/* Play indicator (desktop hint) */}
        {!isMobile && !isHovering && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/70 backdrop-blur-md">
            Hover to play
          </div>
        )}

        {/* Labels */}
        <div
          className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur-md transition-opacity duration-200"
          style={{ opacity: displayValue < 88 ? 1 : 0 }}
        >
          {beforeLabel}
        </div>
        <div
          className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur-md transition-opacity duration-200"
          style={{ opacity: displayValue > 12 ? 1 : 0 }}
        >
          {afterLabel}
        </div>

        {/* Divider line */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-white/80 shadow-[0_0_14px_rgba(196,181,253,0.9)]"
          style={{ left: `${displayValue}%` }}
        />

        {/* Draggable handle */}
        <div
          className="pointer-events-none absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${displayValue}%` }}
        >
          <motion.div
            animate={{
              scale: isDragging ? 1.15 : isHovering ? 1.06 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative flex h-12 w-12 items-center justify-center rounded-full"
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full bg-gradient-to-br from-violet-400/50 to-cyan-300/50 blur-xl transition-opacity duration-300",
                isHovering || isDragging ? "opacity-100" : "opacity-0"
              )}
            />
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <motion.div
                className="absolute inset-0"
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
                }}
              />
              <div className="relative flex items-center gap-0.5 text-white">
                <ChevronIcon direction="left" />
                <ChevronIcon direction="right" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {(title || description) && (
        <div className="mt-4 space-y-1 px-1">
          {title && (
            <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
          )}
          {description && (
            <p className="text-sm leading-relaxed text-white/60">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}