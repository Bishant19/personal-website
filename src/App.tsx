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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-950 font-sans antialiased">
        <Routes>
          <Route path="/" element={
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
          } />

          <Route path="/offerings" element={<Offerings />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}