import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";

// Lazy load everything below the fold
const About = lazy(() => import("./sections/About"));
const Skills = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const Logo = lazy(() => import("./sections/Logo"));
const Videos = lazy(() => import("./sections/Videos"));
const Experience = lazy(() => import("./sections/Experience"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

export default function App() {
  return (
    <div className="relative" style={{ background: "#0B0B0C" }}>
      <a href="#main-content" className="sr-only focus:not-sr-only" style={{ position: 'absolute', top: 0, left: 0, zIndex: 9999, padding: '1rem', background: '#FF4B26', color: '#0B0B0C', fontWeight: 'bold' }}>
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Home />
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <About />
          <Skills />
          <Projects />
          <Logo />
          <Videos />
          <Experience />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
