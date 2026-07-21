// src/components/Hero.tsx

import React, { useState, useEffect } from 'react';
import { Link, Element as ScrollElement } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import Navbar from './Navbar';
import Logo3D from './Logo3D';
import featuredProjectImage from '../assets/portfolio/articleOne_platform_image_9.png';

const Hero: React.FC = () => {
  const [isScrollArrowVisible, setIsScrollArrowVisible] = useState(true);
  const [isFeaturedProjectVisible, setIsFeaturedProjectVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollArrowVisible(window.scrollY <= 50);

      const distanceFromBottom =
        document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      setIsFeaturedProjectVisible(distanceFromBottom > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="container1">
      <ScrollElement name="home" id="home" className="home">
        <Navbar />
        <ThemeSwitcher />
        <header className="hero-header">
          <div className="hero-visuals">
            <div className="spline-wrapper" aria-label="Interactive 3D scene">
              <Logo3D />
            </div>
            <div className="hero-copy">
              <h1 className="hero-title">
                <span className="hero-title-typing">Bowen Slingluff</span>
              </h1>
              <p className="hero-kicker">Full Stack Developer & Designer</p>
              
              <div className="social-links-container">
                <a href="https://www.linkedin.com/in/bowen-slingluff" target="_blank" className="link" rel="noreferrer">
                  <i className="bi bi-linkedin"></i>
                  <span className="linktext">linkedin.com/in/bowen-slingluff</span>
                </a>
                <a href="https://www.github.com/bowenslingluff" target="_blank" className="link" rel="noreferrer">
                  <i className="bi bi-github"></i>
                  <span className="linktext">github.com/bowenslingluff</span>
                </a>
                <a href="https://www.instagram.com/bslingluff14/" target="_blank" className="link" rel="noreferrer">
                  <i className="bi bi-instagram"></i>
                  <span className="linktext">instagram.com/bslingluff14</span>
                </a>
                <a href="https://twitter.com/SlingluffBowen" target="_blank" className="link" rel="noreferrer">
                  <i className="bi bi-twitter-x"></i>
                  <span className="linktext">twitter.com/SlingluffBowen</span>
                </a>
                <a href="https://music.apple.com/profile/bcslingluff" target="_blank" className="link" rel="noreferrer">
                  <i className="bi bi-music-note-beamed"></i>
                  <span className="linktext">music.apple.com/profile/bcslingluff</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <Link
          to="experience"
          smooth={true}
          duration={500}
          className="scroll"
          style={{ opacity: isScrollArrowVisible ? 1 : 0, cursor: 'pointer', fontWeight: 500, textTransform: 'uppercase', fontFamily: 'monospace' }}
        >
          View Experience ↓
        </Link>

        <RouterLink
          to="/portfolio/articleone_platform"
          className={`hero-featured-project${isFeaturedProjectVisible ? '' : ' hero-featured-project--hidden'}`}
        >
          <img
            src={featuredProjectImage}
            alt="ArticleOne Platform case study"
            className="hero-featured-project-image"
          />
          <span className="hero-featured-project-text">Featured Project: <br></br> articleOne</span>
        </RouterLink>
      </ScrollElement>
    </div>
  );
};

export default Hero;