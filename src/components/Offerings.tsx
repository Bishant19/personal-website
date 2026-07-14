import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Offerings.css";

interface Tier {
  label: string;
  desc: string;
  onetime: number;
  monthly: number;
  delivery: string;
  revisions: string;
  features: string[];
  recommended?: boolean;
}

interface Service {
  name: string;
  icon: string;
  tagline: string;
  tiers: { [key: string]: Tier };
}

const servicesData: { [key: string]: Service } = {
  video: {
    name: "Video Editing", icon: "🎬",
    tagline: "Professional cuts, color grading & sound design for YouTube, ads and socials.",
    tiers: {
      basic: { label: "Basic", desc: "Simple cuts for short clips", onetime: 49, monthly: 149, delivery: "2 days", revisions: "1 revision", features: ["Up to 3 min final video", "Basic color correction", "Background music", "1080p export", "Simple text overlays"] },
      standard: { label: "Standard", desc: "Polished edits with effects", recommended: true, onetime: 129, monthly: 349, delivery: "4 days", revisions: "3 revisions", features: ["Up to 8 min final video", "Advanced color grading", "Sound design & SFX", "4K export", "Motion titles & transitions", "Multi-cam sync"] },
      premium: { label: "Premium", desc: "Full production pipeline", onetime: 249, monthly: 699, delivery: "6 days", revisions: "Unlimited", features: ["Unlimited length", "Cinematic color grading", "Custom sound mix", "4K/8K export", "Advanced VFX shots", "Dedicated project manager", "Source project files"] }
    }
  },
  motion: {
    name: "Motion Design", icon: "🌀",
    tagline: "Eye-catching motion graphics for social media, explainer videos & branding.",
    tiers: {
      basic: { label: "Basic", desc: "Simple animated graphic", onetime: 59, monthly: 169, delivery: "2 days", revisions: "1 revision", features: ["1 animated scene", "Basic shape animation", "Royalty-free music", "1080p export"] },
      standard: { label: "Standard", desc: "Multi-scene animation", recommended: true, onetime: 149, monthly: 399, delivery: "5 days", revisions: "3 revisions", features: ["Up to 4 scenes", "Custom kinetic typography", "Character/icon animation", "Sound sync", "4K export"] },
      premium: { label: "Premium", desc: "Full explainer video", onetime: 299, monthly: 799, delivery: "7 days", revisions: "Unlimited", features: ["Up to 10 scenes", "Custom illustrations", "Advanced rigging", "Voice-over sync", "Brand style guide", "Source AE/Figma files"] }
    }
  },
  threed: {
    name: "3D Product Modeling", icon: "🧊",
    tagline: "Photo-realistic 3D models & renders for e-commerce, ads and prototypes.",
    tiers: {
      basic: { label: "Basic", desc: "Single product model", onetime: 79, monthly: 219, delivery: "3 days", revisions: "1 revision", features: ["1 product model", "Basic texturing", "3 static renders", "Standard lighting"] },
      standard: { label: "Standard", desc: "Detailed model + turntable", recommended: true, onetime: 199, monthly: 499, delivery: "6 days", revisions: "3 revisions", features: ["High-poly detailed model", "PBR texturing", "360° turntable animation", "6 render angles", "Studio lighting setup"] },
      premium: { label: "Premium", desc: "Full render package", onetime: 399, monthly: 999, delivery: "9 days", revisions: "Unlimited", features: ["Multiple product variants", "Ultra-detailed textures", "Animated showcase video", "Unlimited render angles", "AR/VR ready export", "Source .blend/.fbx files"] }
    }
  },
  logo: {
    name: "Logo Animations", icon: "⚡",
    tagline: "Bring your brand identity to life with a dynamic animated logo reveal.",
    tiers: {
      basic: { label: "Basic", desc: "Simple fade/scale reveal", onetime: 39, monthly: 119, delivery: "1 day", revisions: "1 revision", features: ["2D logo animation", "Simple transitions", "5 sec duration", "1080p export"] },
      standard: { label: "Standard", desc: "Creative animated reveal", recommended: true, onetime: 89, monthly: 249, delivery: "3 days", revisions: "2 revisions", features: ["Custom motion path", "Particle/light effects", "Sound effect sync", "10 sec duration", "4K export"] },
      premium: { label: "Premium", desc: "Cinematic 3D reveal", onetime: 179, monthly: 459, delivery: "5 days", revisions: "Unlimited", features: ["3D animated logo", "Cinematic camera moves", "Custom sound design", "15+ sec duration", "Multiple format exports", "Source files included"] }
    }
  },
  graphic: {
    name: "Graphic Designing", icon: "🎨",
    tagline: "Branding, social media kits, posters and print-ready designs.",
    tiers: {
      basic: { label: "Basic", desc: "Single design asset", onetime: 29, monthly: 89, delivery: "1 day", revisions: "2 revisions", features: ["1 custom design", "Source file (PSD/AI)", "High-res export", "Basic concept"] },
      standard: { label: "Standard", desc: "Full social media kit", recommended: true, onetime: 79, monthly: 219, delivery: "3 days", revisions: "4 revisions", features: ["5 design assets", "Brand color palette", "Social media templates", "Print & web ready", "Source files"] },
      premium: { label: "Premium", desc: "Complete brand identity", onetime: 199, monthly: 549, delivery: "6 days", revisions: "Unlimited", features: ["Full brand identity kit", "Logo + guidelines", "15+ design assets", "Business card & letterhead", "Unlimited concepts", "All source files"] }
    }
  },
  vfx: {
    name: "Visual Effects (VFX)", icon: "🌌",
    tagline: "Cinematic compositing, green screen and special effects for film & ads.",
    tiers: {
      basic: { label: "Basic", desc: "Simple compositing", onetime: 89, monthly: 249, delivery: "3 days", revisions: "1 revision", features: ["Green screen removal", "Basic compositing", "1 effect shot", "1080p export"] },
      standard: { label: "Standard", desc: "Multi-shot VFX", recommended: true, onetime: 219, monthly: 549, delivery: "6 days", revisions: "3 revisions", features: ["Up to 5 effect shots", "Particle simulations", "Color/light matching", "Motion tracking", "4K export"] },
      premium: { label: "Premium", desc: "Full cinematic VFX", onetime: 449, monthly: 1099, delivery: "10 days", revisions: "Unlimited", features: ["Unlimited effect shots", "3D element integration", "Advanced simulations (fire/smoke/water)", "Full CGI compositing", "Dedicated VFX supervisor", "Source project files"] }
    }
  }
};

const TIER_ORDER = ["basic", "standard", "premium"];

function formatPrice(n: number) {
  return "$" + n.toLocaleString();
}

// Minimal service card entrance
const serviceCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  })
};

// Pricing cards - smoother entrance without 3D
const priceCardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  })
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

export default function Offerings() {
  const [currentService, setCurrentService] = useState<string | null>(null);
  const [pricingMode, setPricingMode] = useState<"onetime" | "monthly">("onetime");
  const [order, setOrder] = useState<{ serviceKey: string; tierKey: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", details: "" });
  const [toast, setToast] = useState<string | null>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleSelectService = (key: string) => {
    setCurrentService(key);
    setTimeout(() => pricingRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  const handleOrder = (serviceKey: string, tierKey: string) => {
    setOrder({ serviceKey, tierKey });
    setSubmitted(false);
    setForm({ name: "", email: "", details: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setToast("✅ Order request sent successfully!");
    setTimeout(() => {
      setOrder(null);
      setToast(null);
    }, 2500);
  };

  useEffect(() => {
    document.body.style.overflow = order ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [order]);

  const service = currentService ? servicesData[currentService] : null;

  return (
    <div className="offerings-page">
      <div className="bg-fx">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <div className="noise-overlay"></div>

      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav>
          <Link to="/" className="logo">
            Bishant<span className="gradient-text">.RB</span>
          </Link>
          <Link to="/" className="back-link">← Back to Home</Link>
        </nav>
      </motion.header>

      <section className="section" id="services" style={{ paddingTop: "70px" }}>
        <motion.div
          className="section-head"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.span className="section-tag" variants={titleVariants}>What I Offer</motion.span>
          <motion.h2 variants={titleVariants}>
            Pick a <span className="gradient-text">Service</span>
          </motion.h2>
          <motion.p variants={titleVariants}>
            Click any service to reveal tailored Fiverr-style pricing packages instantly.
          </motion.p>
        </motion.div>

        <div className="services-grid">
          {Object.keys(servicesData).map((key, idx) => {
            const s = servicesData[key];
            const isActive = currentService === key;
            return (
              <motion.div
                key={key}
                className={`service-card ${isActive ? "active" : ""}`}
                onClick={() => handleSelectService(key)}
                custom={idx}
                variants={serviceCardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                style={{ opacity: 1, transform: "none", animation: "none" }}
              >
                <motion.div
                  className="service-icon"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  {s.icon}
                </motion.div>
                <h3>{s.name}</h3>
                <p>{s.tagline}</p>
                <motion.span
                  className="arrow"
                  whileHover={{ x: 4, transition: { duration: 0.15 } }}
                >
                  View Pricing →
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section" id="pricing" ref={pricingRef}>
        <motion.div
          className="pricing-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Packages</span>
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentService || "empty"}
              className="pricing-service-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {service ? (
                <>{service.icon} {service.name} <span className="gradient-text">Packages</span></>
              ) : (
                "Select a service to view pricing"
              )}
            </motion.h2>
          </AnimatePresence>
          <p className="pricing-service-sub">
            {service ? service.tagline : "Every package includes revisions, source files and dedicated support."}
          </p>

          <div className="toggle-wrap">
            <span className={`toggle-label ${pricingMode === "onetime" ? "active" : ""}`}>One-time</span>
            <div
              className={`switch ${pricingMode === "monthly" ? "on" : ""}`}
              onClick={() => setPricingMode(pricingMode === "onetime" ? "monthly" : "onetime")}
            >
              <div className="knob"></div>
            </div>
            <span className={`toggle-label ${pricingMode === "monthly" ? "active" : ""}`}>Monthly</span>
            <span className="save-badge">Save 15%</span>
          </div>
        </motion.div>

        {!service ? (
          <motion.div
            className="placeholder-pricing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="big-emoji"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🎬
            </motion.div>
            <p>Select a service above to view its custom pricing tiers (Basic / Standard / Premium).</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              className="pricing-grid"
              key={`${currentService}-${pricingMode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {TIER_ORDER.map((tierKey, i) => {
                const t = service.tiers[tierKey];
                const price = t[pricingMode];
                return (
                  <motion.div
                    key={tierKey}
                    className={`price-card ${t.recommended ? "recommended" : ""}`}
                    custom={i}
                    variants={priceCardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    style={{ opacity: 1, transform: "none", animation: "none" }}
                  >
                    {t.recommended && <div className="badge-top">⭐ Most Popular</div>}
                    <div className="tier-name">{t.label}</div>
                    <div className="tier-desc">{t.desc}</div>
                    <motion.div
                      className="tier-price"
                      key={price}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {formatPrice(price)}
                      <span>/ {pricingMode === "monthly" ? "month" : "project"}</span>
                    </motion.div>
                    <div className="tier-meta">
                      <div><strong>{t.delivery}</strong><span>Delivery</span></div>
                      <div><strong>{t.revisions}</strong><span>Revisions</span></div>
                    </div>
                    <ul className="tier-features">
                      {t.features.map((f, j) => <li key={j}>{f}</li>)}
                    </ul>
                    <motion.button
                      className="order-btn"
                      onClick={() => handleOrder(currentService!, tierKey)}
                      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                    >
                      Order Now
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      <AnimatePresence>
        {order && (
          <motion.div
            className="modal-overlay show"
            onClick={(e) => { if (e.target === e.currentTarget) setOrder(null); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="modal-box"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <button className="modal-close" onClick={() => setOrder(null)}>✕</button>
              {!submitted ? (
                <>
                  <h3>Complete Your Order</h3>
                  <div className="modal-summary">
                    <h4>{servicesData[order.serviceKey].icon} {servicesData[order.serviceKey].name}</h4>
                    <div className="pkg-name">{servicesData[order.serviceKey].tiers[order.tierKey].label} Package</div>
                    <div className="pkg-price">
                      {formatPrice(servicesData[order.serviceKey].tiers[order.tierKey][pricingMode])}
                      <span> / {pricingMode === "monthly" ? "month" : "project"}</span>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                      <label>Project Details</label>
                      <textarea rows={4} required value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Tell me about your project..."></textarea>
                    </div>
                    <motion.button
                      type="submit"
                      className="modal-submit"
                      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Confirm Order — {formatPrice(servicesData[order.serviceKey].tiers[order.tierKey][pricingMode])}
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  className="success-msg"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="checkmark"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    ✓
                  </motion.div>
                  <h3>Thank you, {form.name.split(" ")[0] || "there"}!</h3>
                  <p>Your order request has been received. I'll reach out within 24 hours. 🎉</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast show"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}