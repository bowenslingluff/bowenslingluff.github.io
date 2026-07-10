import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink, useParams, Navigate } from 'react-router-dom';

import ThemeSwitcher from '../components/ThemeSwitcher';

import w1 from '../assets/portfolio/articleOne_website_image_1.png';
import w2 from '../assets/portfolio/articleOne_website_image_2.png';
import w3 from '../assets/portfolio/articleOne_website_image_3.png';
import w4 from '../assets/portfolio/articleOne_website_image_4.png';
import w5 from '../assets/portfolio/articleOne_website_image_5.png';
import w6 from '../assets/portfolio/articleOne_website_image_6.png';
import w7 from '../assets/portfolio/articleOne_website_image_7.png';

import p1 from '../assets/portfolio/articleOne_platform_image_1.png';
import p2 from '../assets/portfolio/articleOne_platform_image_2.png';
import p8 from '../assets/portfolio/articleOne_platform_image_8.png';
import p9 from '../assets/portfolio/articleOne_platform_image_9.png';
import p10 from '../assets/portfolio/articleOne_platform_image_10.png';
import p11 from '../assets/portfolio/articleOne_platform_image_11.png';
import p12 from '../assets/portfolio/articleOne_platform_image_12.png';
import p13 from '../assets/portfolio/articleOne_platform_image_13.png';
import p14 from '../assets/portfolio/articleOne_platform_image_14.png';
import p15 from '../assets/portfolio/articleOne_platform_image_15.png';
import p16 from '../assets/portfolio/articleOne_platform_image_16.png';
import p17 from '../assets/portfolio/articleOne_platform_image_17.png';
import p18 from '../assets/portfolio/articleOne_platform_image_18.png';

import n1 from '../assets/portfolio/amplified_naturals_1.png';
import n2 from '../assets/portfolio/amplified_naturals_2.png';
import n3 from '../assets/portfolio/amplified_naturals_3.png';
import n4 from '../assets/portfolio/amplified_naturals_4.png';

const projectData: Record<string, { title: string; description: string; images: string[] }> = {
  articleone_website: {
    title: 'ArticleOne Website',
    description: 'Marketing site and public-facing product pages for ArticleOne.',
    images: [w1, w2, w3, w4, w5, w6, w7],
  },
  articleone_platform: {
    title: 'ArticleOne Platform',
    description: 'Internal platform and dashboard UI for the ArticleOne product.',
    images: [p8, p9, p10, p1, p11, p12, p13, p2, p14, p15, p16, p17, p18],
  },
  amplified_naturals: {
    title: 'Amplified Naturals',
    description: 'E-commerce and brand presence for Amplified Naturals.',
    images: [n1, n2, n3, n4],
  },
};

const PAD = 48;

const ProjectGallery: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : null;

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [expanded, setExpanded] = useState(false);

  const openLightbox = (src: string, e: React.MouseEvent) => {
    const img = (e.currentTarget as HTMLElement).querySelector('img')!;
    const rect = img.getBoundingClientRect();
    setOriginRect(rect);
    setLightboxSrc(src);
    setExpanded(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setExpanded(true)));
  };

  const closeLightbox = useCallback(() => {
    setExpanded(false);
    setTimeout(() => { setLightboxSrc(null); setOriginRect(null); }, 360);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeLightbox]);

  if (!project) return <Navigate to="/portfolio" replace />;

  const expandedStyle = {
    top: PAD,
    left: PAD,
    width: window.innerWidth - PAD * 2,
    height: window.innerHeight - PAD * 2,
  };

  return (
    <div className="gradient-background portfolio-page">
      <ThemeSwitcher />
      <div className="portfolio-page-header">
        <RouterLink to="/portfolio" className="portfolio-back-link">← Back to Portfolio</RouterLink>
        <h1 className="portfolio-page-title">{project.title}</h1>
        <p className="portfolio-page-subtitle">{project.description}</p>
      </div>
      <div className="project-gallery-grid">
        {project.images.map((src, i) => (
          <div key={i} className="project-gallery-item" onClick={(e) => openLightbox(src, e)}>
            <img src={src} alt={`${project.title} screenshot ${i + 1}`} className="project-gallery-img" />
          </div>
        ))}
      </div>

      {lightboxSrc && originRect && (
        <div
          className={`lightbox-overlay${expanded ? ' lightbox-overlay--expanded' : ''}`}
          onClick={closeLightbox}
        >
          <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>✕</button>
          <img
            src={lightboxSrc}
            alt="Full screen view"
            className="lightbox-img"
            style={expanded ? expandedStyle : {
              top: originRect.top,
              left: originRect.left,
              width: originRect.width,
              height: originRect.height,
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
