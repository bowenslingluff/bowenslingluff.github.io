// src/App.tsx

// We will create these component files in the next steps
import Hero from './components/Hero';
// import About from './components/About';
// import Experience from './components/Experience';
// import Projects from './components/Projects';
// import Contact from './components/Contact';
// import Footer from './components/Footer';

function App() {
  return (
    <div className="gradient-background">
      <Hero />
      {/* <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer /> */}
      <p>App shell is ready. Components will go here!</p>
    </div>
  );
}

export default App;