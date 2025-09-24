// src/App.tsx

import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact'; 
import Footer from './components/Footer';

function App() {
  return (
    <div className="gradient-background">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact /> 
      <Footer /> 
    </div>
  );
}

export default App;