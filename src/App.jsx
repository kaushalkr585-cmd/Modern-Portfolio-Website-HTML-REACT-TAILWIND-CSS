import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Logo from "./sections/Logo";
import Videos from "./sections/Videos";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="relative" style={{ background: "#0B0B0C" }}>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Logo />
      <Videos />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
