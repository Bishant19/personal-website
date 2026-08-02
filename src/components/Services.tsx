"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Services() {
  const services = [
    {
      title: "Video Editing",
      description:
        "Professional cinematic edits with color grading, smooth transitions, and storytelling that captivates your audience from start to finish."
    },
    {
      title: "Motion Designs",
      description:
        "Eye-catching motion graphics and animated visuals that bring your brand to life with fluid, dynamic movement and creative flair."
    },
    {
      title: "3D Product Modeling",
      description:
        "Photorealistic 3D product renders and models perfect for advertisements, e-commerce, and immersive product showcases."
    },
    {
      title: "Logo Animations",
      description:
        "Memorable animated logo intros and outros that give your brand a professional, modern signature across all your videos."
    },
    {
      title: "Graphics Designing",
      description:
        "Custom thumbnails, posters, and social media graphics designed to boost engagement and elevate your visual identity."
    },
    {
      title: "Visual Effects / VFX",
      description:
        "Hollywood-style VFX including compositing, particle effects, and seamless integrations that make the impossible look real."
    }
  ];

  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (!isMobile) setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setActiveIndex(null);
  };

  const handleClick = (index: number) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <section
      id="Services"
      className="py-28 px-6 bg-slate-950 text-white"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

        {/* LEFT SIDE */}
        <div>
          <p className="text-sm text-purple-400 mb-4 tracking-widest">
            SERVICES / MY EXPERTISE
          </p>

          <h2 className="text-5xl md:text-6xl font-semibold leading-tight mb-8">
            Choose what matters to your{" "}
            <span className="text-purple-500 italic">
              Business
            </span>
          </h2>

          {/* GLOWING ANIMATED BUTTON */}
          <a href="/offerings" target="_blank" rel="noopener noreferrer">
            <motion.div
              className="relative inline-block cursor-pointer"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <motion.div
                className="absolute -inset-3 rounded-full opacity-50"
                style={{
                  background:
                    "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(236,72,153,0.3) 40%, transparent 70%)",
                  filter: "blur(15px)",
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -inset-1.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #a855f7, #ec4899, #8b5cf6, #a855f7)",
                  backgroundSize: "300% 100%",
                  filter: "blur(8px)",
                  opacity: 0.6,
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative rounded-full p-[1.5px] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #a855f7, #ec4899, #d946ef, #8b5cf6, #a855f7)",
                    backgroundSize: "300% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <div className="relative bg-slate-950 px-8 py-3 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)",
                    }}
                  />

                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                    }}
                    initial={{ x: "-100%" }}
                    animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative flex items-center gap-2 z-10">
                    <span
                      className="font-medium text-white"
                      style={{
                        textShadow:
                          "0 0 8px rgba(216,180,254,0.8), 0 0 16px rgba(168,85,247,0.5)",
                      }}
                    >
                      Learn More
                    </span>
                    <motion.span
                      animate={isHovered ? { x: 4 } : { x: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{
                        color: "#e9d5ff",
                        textShadow:
                          "0 0 8px rgba(216,180,254,0.9), 0 0 16px rgba(168,85,247,0.6)",
                      }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          </a>
        </div>

        {/* RIGHT SIDE - INTERACTIVE SERVICES */}
        <div className="space-y-2">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* FLOWING GRADIENT BORDER WRAPPER */}
                <motion.div
                  animate={{
                    padding: isActive ? "1.5px" : "0px",
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl overflow-hidden"
                >
                  {/* Animated Gradient Border */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background:
                            "linear-gradient(90deg, #a855f7, #ec4899, #d946ef, #8b5cf6, #a855f7)",
                          backgroundSize: "300% 100%",
                        }}
                      >
                        <motion.div
                          className="w-full h-full"
                          style={{
                            background:
                              "linear-gradient(90deg, #a855f7, #ec4899, #d946ef, #8b5cf6, #a855f7)",
                            backgroundSize: "300% 100%",
                          }}
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CARD CONTENT */}
                  <motion.div
                    animate={{
                      backgroundColor: isActive
                        ? "rgba(15, 10, 30, 0.95)"
                        : "rgba(0, 0, 0, 0)",
                      borderColor: isActive
                        ? "rgba(0,0,0,0)"
                        : "rgba(31,41,55,1)",
                    }}
                    transition={{ duration: 0.4 }}
                    className="relative border-b rounded-xl overflow-hidden"
                  >
                    {/* FLOWING INNER GLOW */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(168,85,247,0.2), rgba(236,72,153,0.15), rgba(139,92,246,0.2), rgba(217,70,239,0.15), rgba(168,85,247,0.2))",
                              backgroundSize: "300% 100%",
                              filter: "blur(30px)",
                            }}
                            animate={{
                              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* TITLE ROW */}
                    <div
                      className="relative flex justify-between items-center py-6 px-4 cursor-pointer z-10"
                      onClick={() => handleClick(index)}
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-gray-500 text-lg">
                          0{index + 1}.
                        </span>
                        <motion.span
                          animate={{
                            color: isActive ? "#c084fc" : "#ffffff",
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-xl font-medium"
                        >
                          {service.title}
                        </motion.span>
                      </div>

                      {/* ANIMATED ARROW BUTTON */}
                      <motion.div
                        animate={{
                          borderColor: isActive
                            ? "rgba(168,85,247,1)"
                            : "rgba(55,65,81,1)",
                          color: isActive ? "#c084fc" : "#ffffff",
                          boxShadow: isActive
                            ? "0 0 20px rgba(168,85,247,0.6), 0 0 40px rgba(168,85,247,0.3)"
                            : "0 0 0px rgba(168,85,247,0)",
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 flex items-center justify-center border-2 rounded-full flex-shrink-0"
                      >
                        <motion.span
                          animate={{ rotate: isActive ? 0 : -45 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                          className="inline-block text-sm leading-none"
                          style={{
                            textShadow: isActive
                              ? "0 0 8px rgba(216,180,254,0.9), 0 0 16px rgba(168,85,247,0.6)"
                              : "none",
                          }}
                        >
                          ▼
                        </motion.span>
                      </motion.div>
                    </div>

                    {/* EXPANDABLE DESCRIPTION */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.4, ease: "easeInOut" },
                            opacity: { duration: 0.3, ease: "easeInOut" },
                          }}
                          className="relative overflow-hidden z-10"
                        >
                          <motion.p
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="pl-16 pr-6 pb-6 text-gray-400 leading-relaxed"
                          >
                            {service.description}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}