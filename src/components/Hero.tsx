// src/components/Hero.tsx

import React, { useState, useEffect } from 'react';
import { Link, Element as ScrollElement } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import Navbar from './Navbar';
import Logo3D from './Logo3D';
import SectionScribbleDivider from './SectionScribbleDivider';

interface SocialLink {
  name: string;
  href: string;
  label: string;
  iconSrc: string;
}

const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/bowen-slingluff', label: 'linkedin.com/in/bowen-slingluff', iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/3840px-LinkedIn_icon.svg.png' },
  { name: 'GitHub', href: 'https://www.github.com/bowenslingluff', label: 'github.com/bowenslingluff', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Instagram', href: 'https://www.instagram.com/bslingluff14/', label: 'instagram.com/bslingluff14', iconSrc: 'https://cdn-icons-png.flaticon.com/512/1384/1384063.png' },
  { name: 'X', href: 'https://twitter.com/SlingluffBowen', label: 'twitter.com/SlingluffBowen', iconSrc: 'https://cdn.simpleicons.org/x' },
  { name: 'Apple Music', href: 'https://music.apple.com/profile/bcslingluff', label: 'music.apple.com/profile/bcslingluff', iconSrc: 'https://cdn.simpleicons.org/applemusic' },
];

const Hero: React.FC = () => {
  const [isScrollArrowVisible, setIsScrollArrowVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrollArrowVisible(window.scrollY <= 50);

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
        <div className="hero-navbar">
          <div className="hero-navbar-logo" aria-label="Interactive 3D scene">
            <Logo3D />
          </div>
          <Navbar />
          <ThemeSwitcher />
        </div>
        <header className="hero-header">
          <div className="hero-copy">
            <h1 className="hero-title">
              <span className="hero-title-typing">Bowen Slingluff</span>
            </h1>
            <p className="hero-kicker"><span className="hero-kicker-developer">Full Stack Software Engineer</span> | <span className="hero-kicker-designer">UX/UI Designer</span> | <span className="hero-kicker-ai">AI-Native Developer</span></p>

            <div className="social-links-container">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" className="link" rel="noreferrer">
                  <img src={social.iconSrc} alt={social.name} className="social-link-icon" />
                  <span className="linktext">{social.label}</span>
                </a>
              ))}
            </div>

            <p className="hero-statement">
              I build clean, thoughtful web products from idea to launch, blending solid engineering with an eye for design.
            </p>

            <p className="hero-featured-project">
              Check out my latest work:{' '}
              <RouterLink to="/portfolio/articleone_platform" className="featured-project-link">
                articleOne
              </RouterLink>
            </p>
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

        <SectionScribbleDivider />
      </ScrollElement>
    </div>
  );
};

export default Hero;