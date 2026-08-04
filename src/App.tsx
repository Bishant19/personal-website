import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Services from "./components/Services";
import Offerings from "./components/Offerings";
import Portfolio from "./components/Portfolio";
import PortfolioTeaser from "./components/PortfolioTeaser";
import ScrollToTop from "./components/ScrollToTop";
import IntroAnimation from "./components/IntroAnimation";
import { useIntroGuard } from "./hooks/useIntroGuard";

export default function App() {
  const { shouldShowIntro, markIntroComplete } = useIntroGuard();

  // Wait until we know whether to show intro (prevents flash)
  if (shouldShowIntro === null) {
    return <div className="fixed inset-0 bg-black" />;
  }

  return (
    <Router>
      <ScrollToTop />
      {shouldShowIntro && <IntroAnimation onComplete={markIntroComplete} />}
      <div className="min-h-screen bg-slate-950 font-sans antialiased">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main>
                  <Hero />
                  <About />
                  <Services />
                  <Skills />
                  <Projects />
                  <Experience />
                  <PortfolioTeaser />
                  <Testimonials />
                  <Contact />
                </main>
                <Footer />
                <BackToTop />
              </>
            }
          />

          <Route path="/offerings" element={<Offerings />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}