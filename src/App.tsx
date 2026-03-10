// src/App.tsx

import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact'; 
import Footer from './components/Footer';

import { Routes, Route, Navigate } from 'react-router-dom';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="gradient-background">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/favorites" element={<Favorites />} />
        {/* catch-all redirects to home; helps with GitHub Pages fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;