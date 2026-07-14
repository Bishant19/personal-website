import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Offerings from "./components/Offerings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-slate-950 font-sans antialiased">
            <Navbar />
            <main>
              <Hero />
              <About />
              <Services />
              <Skills />
              <Projects />
              <Experience />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
            <BackToTop />
          </div>
        } />
        <Route path="/offerings" element={<Offerings />} />
      </Routes>
    </Router>
  );
}