// src/App.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact'; 
import Footer from './components/Footer';

import { Routes, Route, Navigate } from 'react-router-dom';
import Rankings from './pages/Favorites';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle GitHub Pages 404.html redirect
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      navigate(redirect);
    }
  }, [navigate]);
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
              {/* <Projects /> */}
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/rankings" element={<Rankings />} />
        {/* catch-all redirects to home; helps with GitHub Pages fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;