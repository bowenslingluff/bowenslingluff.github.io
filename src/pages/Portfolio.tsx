import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ThemeSwitcher from '../components/ThemeSwitcher';

import websiteHighlight from '../assets/portfolio/articleOne_website_image_8.png';
import websiteSecondary from '../assets/portfolio/articleOne_website_image_3.png';
import platformHighlight from '../assets/portfolio/articleOne_platform_image_16.png';
import platformSecondary from '../assets/portfolio/articleOne_platform_image_9.png';
import naturalsHighlight from '../assets/portfolio/amplified_naturals_1.png';
import naturalsSecondary from '../assets/portfolio/amplified_naturals_2.png';
import finnfunnHighlight from '../assets/portfolio/finnfunn_1.png';
import finnfunnSecondary from '../assets/portfolio/finnfunn_2.png';


const projects = [
  {
    title: 'articleOne Website',
    description: 'Marketing site and public-facing product pages for articleOne. JavaScript animations, clear messaging and sales conversions.',
    images: [websiteHighlight],
    slug: 'articleone_website',
    years: 'Oct 2025 - Present',
    role: 'UX/UI Designer & Front-End Developer',
    scope: 'Marketing Site, UI/UX Design, JS Animation',
    externalUrl: 'https://articleone.ai',
    externalLabel: 'articleone.ai',
  },
  {
    title: 'articleOne Platform',
    description: 'Internal platform and dashboard UI for articleOne. Modern interfaces built for policy intelligence workflows.',
    images: [platformSecondary],
    slug: 'articleone_platform',
    years: 'Oct 2025 - Present',
    role: 'Full Stack Developer',
    scope: 'Product Strategy, UI/UX Design, Full Stack Development',
    externalUrl: 'https://articleone.ai',
    externalLabel: 'articleone.ai',
  },
  {
    title: 'Amplified Naturals',
    description: 'E-commerce site for Amplified Naturals. Customized checkout flows and connected third party marketplaces such as TikTok Shop.',
    images: [naturalsHighlight],
    slug: 'amplified_naturals',
    years: 'Oct 2025 - Feb 2026',
    role: 'Web Developer',
    scope: 'E-commerce, Checkout Flows, Marketplace Integrations',
    externalUrl: 'https://amplifiednaturals.com',
    externalLabel: 'amplifiednaturals.com',
  },
  {
    title: 'FinnFunn',
    description: 'Event website for FinnFunn Weekend 2026. Acted as website manager and designer, built with Wix.',
    images: [finnfunnHighlight],
    slug: 'finnfunn',
    years: 'Jun 2026 - Present',
    role: 'Website Designer',
    scope: 'Website Design, Event Branding',
    externalUrl: 'https://finnfunn.org',
    externalLabel: 'finnfunn.org',
  }
];

const Portfolio: React.FC = () => {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActiveSlug(projects[index].slug);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="gradient-background portfolio-page">
      <ThemeSwitcher />
      <div className="portfolio-page-header">
        <RouterLink to="/" className="portfolio-link">← Home</RouterLink>
        <h1 className="portfolio-page-title">UI/UX Portfolio</h1>
        <p className="portfolio-page-subtitle">My UI/UX and web design work. Includes a B2B SaaS platform as well as e-commerce, marketing, and community event websites.</p>
      </div>

      <div className="portfolio-sections">
        {projects.map((project, i) => (
          <div
            key={i}
            id={project.slug}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="portfolio-section"
          >
            <div className="portfolio-section-info">
              <h2 className="portfolio-section-title">
                {project.externalUrl ? (
                  <a href={`/portfolio/${project.slug}`} rel="noopener noreferrer" className="portfolio-section-external-link">
                    {project.title}
                  </a>
                ) : project.title}
              </h2>
              <p className="portfolio-section-desc">{project.description}</p>

              <dl className="portfolio-section-meta">
                <div className="portfolio-section-meta-row">
                  <dt>Years</dt>
                  <dd>{project.years}</dd>
                </div>
                <div className="portfolio-section-meta-row">
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
                <div className="portfolio-section-meta-row">
                  <dt>Scope</dt>
                  <dd>{project.scope}</dd>
                </div>
                <div className="portfolio-section-meta-row">
                  <dt>Link</dt>
                  <dd>
                    <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="portfolio-section-meta-link">
                      {project.externalLabel} ↗
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="portfolio-section-gallery">
              {project.images.map((src, j) => (
                <RouterLink key={j} to={`/portfolio/${project.slug}`} className="portfolio-section-img-link">
                  <img src={src} alt={`${project.title} screenshot ${j + 1}`} className="portfolio-section-img" />
                </RouterLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      <nav className="portfolio-page-dots" aria-label="Project navigation">
        {projects.map((project) => (
          <a
            key={project.slug}
            href={`#${project.slug}`}
            className={`portfolio-page-dot${project.slug === activeSlug ? ' portfolio-page-dot--active' : ''}`}
            aria-label={project.title}
          />
        ))}
      </nav>
    </div>
  );
};

export default Portfolio;
