// src/components/Hero.tsx

import React, { useState, useEffect } from 'react';
import { Link, Element } from 'react-scroll';
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
      <Link
        to="home"
        smooth={true}
        duration={500}
        className="home-link"
        style={{ opacity: isHomeLinkVisible ? 1 : 0, cursor: 'pointer' }}
      >
        Home
      </Link>
      <Element name="home" id="home" className="home">
        <ThemeSwitcher />

        <header>
          <img id="headshot" src={headshot} alt="Bowen Slingluff" className="headshot-image" />
          <h1 className="hero-title">Bowen Slingluff</h1>
        </header>

        <Navbar />

        <div className="social-links-container">
          <a href="https://www.linkedin.com/in/bowen-slingluff" target="_blank" className="link">
            <i className="bi bi-linkedin"></i>
            <span className="linktext">linkedin.com/in/bowen-slingluff</span>
          </a>
          <a href="https://www.github.com/bowenslingluff" target="_blank" className="link">
            <i className="bi bi-github"></i>
            <span className="linktext">github.com/bowenslingluff</span>
          </a>
          <a href="https://www.instagram.com/bslingluff14/" target="_blank" className="link">
            <i className="bi bi-instagram"></i>
            <span className="linktext">instagram.com/bslingluff14</span>
          </a>
          <a href="https://twitter.com/SlingluffBowen" target="_blank" className="link">
            <i className="bi bi-twitter-x"></i>
            <span className="linktext">twitter.com/SlingluffBowen</span>
          </a>
          <a href="https://music.apple.com/profile/bcslingluff" target="_blank" className="link">
            <i className="bi bi-music-note-beamed"></i>
            <span className="linktext">music.apple.com/profile/bcslingluff</span>
          </a>
        </div>
        <p className="scroll" style={{ opacity: isScrollArrowVisible ? 1 : 0 }}>
          &darr; &darr; &darr;
        </p>
      </Element>
    </div>
  );
};

export default Hero;