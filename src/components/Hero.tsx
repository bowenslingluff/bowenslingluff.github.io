// src/components/Hero.tsx

import React, { useState, useEffect } from 'react';
import { Link, Element as ScrollElement } from 'react-scroll';
import ThemeSwitcher from './ThemeSwitcher';

const Hero: React.FC = () => {
  const splineViewerScript = 'https://unpkg.com/@splinetool/viewer@1.12.73/build/spline-viewer.js';
  const splineSceneUrl = 'https://prod.spline.design/B4Z7aUeeh429rfDo/scene.splinecode';
  const [isScrollArrowVisible, setIsScrollArrowVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollArrowVisible(window.scrollY <= 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${splineViewerScript}"]`);

    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = splineViewerScript;
    document.body.appendChild(script);
  }, [splineViewerScript]);

  useEffect(() => {
    const hideSplineLogo = (viewer: Element): boolean => {
      const host = viewer as HTMLElement;
      let wasHidden = false;

      const logoInLightDom = host.querySelector('#logo') as HTMLElement | null;
      if (logoInLightDom) {
        logoInLightDom.style.display = 'none';
        wasHidden = true;
      }

      const logoInShadowDom = host.shadowRoot?.querySelector('#logo') as HTMLElement | null;
      if (logoInShadowDom) {
        logoInShadowDom.style.display = 'none';
        wasHidden = true;
      }

      return wasHidden;
    };

    const hideAllSplineLogos = (): boolean => {
      const viewers = document.querySelectorAll('spline-viewer');
      let foundAndHiddenAny = false;

      viewers.forEach((viewer) => {
        if (hideSplineLogo(viewer)) {
          foundAndHiddenAny = true;
        }
      });

      return foundAndHiddenAny;
    };

    hideAllSplineLogos();

    let attempts = 0;
    const maxAttempts = 40;
    const intervalId = window.setInterval(() => {
      attempts += 1;
      const done = hideAllSplineLogos();
      if (done || attempts >= maxAttempts) {
        window.clearInterval(intervalId);
      }
    }, 250);

    const observer = new MutationObserver(() => {
      hideAllSplineLogos();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearInterval(intervalId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="container1">
      <ScrollElement name="home" id="home" className="home">
        <ThemeSwitcher />
        <header className="hero-header">
          <div className="hero-visuals">
            <div className="spline-wrapper" aria-label="Interactive 3D scene">
              {React.createElement('spline-viewer', {
                url: splineSceneUrl,
              })}
            </div>
            <div className="hero-copy">
              <h1 className="hero-title">
                <span className="hero-title-typing">Bowen Slingluff</span>
              </h1>
              <p className="hero-kicker">Full Stack Developer</p>
              
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
          style={{ opacity: isScrollArrowVisible ? 1 : 0, cursor: 'pointer' }}
        >
          View Experience ↓
        </Link>
      </ScrollElement>
    </div>
  );
};

export default Hero;