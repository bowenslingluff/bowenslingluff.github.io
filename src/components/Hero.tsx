// src/components/Hero.tsx

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // We will build this next
import ThemeSwitcher from './ThemeSwitcher';
import headshot from '../assets/headshot.jpeg'; // We'll add this image soon

const Hero: React.FC = () => {
  const [isHomeLinkVisible, setIsHomeLinkVisible] = useState(false);
  const [isScrollArrowVisible, setIsScrollArrowVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsHomeLinkVisible(window.scrollY > 100);
      setIsScrollArrowVisible(window.scrollY <= 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  return (
    <div className="container1">
      <a href="#home" id="homeLink" className="home-link" style={{ opacity: isHomeLinkVisible ? 1 : 0 }}>
        Home
      </a>
      <div id="home" className="home">
        <ThemeSwitcher />

        <header>
          <img id="headshot" src={headshot} alt="Bowen Slingluff" className="rounded border border-4 mx-auto d-block my-4" />
          <h1 className="text-center">Bowen Slingluff</h1>
        </header>

        <Navbar />

        <div className="mx-auto">
          <a href="https://www.linkedin.com/in/bowen-slingluff" target="_blank" className="link">
            <i className="bi bi-linkedin"></i>
            <span className="linktext">linkedin.com/in/bowen-slingluff</span>
          </a>
          <a href="https://www.github.com/bowenslingluff" target="_blank" className="link">
            <i className="bi bi-github"></i>
            <span className="linktext">github.com/bowenslingluff</span>
          </a>
          {/* Add your other social links here following the same pattern */}
        </div>
        <p className="scroll" style={{ opacity: isScrollArrowVisible ? 1 : 0 }}>
          &darr; &darr; &darr;
        </p>
      </div>
    </div>
  );
};

export default Hero;