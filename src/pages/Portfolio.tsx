import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ThemeSwitcher from '../components/ThemeSwitcher';

import websiteHighlight from '../assets/portfolio/articleOne_website_image_1.png';
import platformHighlight from '../assets/portfolio/articleOne_platform_image_16.png';
import naturalsHighlight from '../assets/portfolio/amplified_naturals_1.png';

const projects = [
  {
    title: 'articleOne Website',
    description: 'Marketing site and public-facing product pages for articleOne. JavaScript animations, clear messaging and sales conversions.',
    image: websiteHighlight,
    slug: 'articleone_website',
    side: 'right' as const,
    externalUrl: 'https://articleone.ai',
    externalLabel: 'articleone.ai',
  },
  {
    title: 'articleOne Platform',
    description: 'Internal platform and dashboard UI for articleOne. Modern interfaces built for policy intelligence workflows.',
    image: platformHighlight,
    slug: 'articleone_platform',
    side: 'left' as const,
    externalUrl: 'https://articleone.ai',
    externalLabel: 'articleone.ai',
  },
  {
    title: 'Amplified Naturals',
    description: 'E-commerce site for Amplified Naturals. Customized checkout flows and connected third party marketplaces such as TikTok Shop.',
    image: naturalsHighlight,
    slug: 'amplified_naturals',
    side: 'right' as const,
    externalUrl: 'https://amplifiednaturals.com',
    externalLabel: 'amplifiednaturals.com',
  },
];

const Portfolio: React.FC = () => {
  return (
    <div className="gradient-background portfolio-page">
      <ThemeSwitcher />
      <div className="portfolio-page-header">
        <RouterLink to="/" className="portfolio-link">← Back</RouterLink>
        <h1 className="portfolio-page-title">UI/UX Portfolio</h1>
        <p className="portfolio-page-subtitle">My UI/UX and web design work. Includes a B2B SaaS platform as well as e-commerce, marketing, and community event websites.</p>
        <nav className="portfolio-page-nav">
          {projects.map((project) => (
            <a key={project.slug} href={`#${project.slug}`} className="portfolio-page-nav-link">
              {project.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="portfolio-sections">
        {projects.map((project, i) => (
          <div key={i} id={project.slug} className={`portfolio-section portfolio-section--${project.side}`}>
            <div className="portfolio-section-gallery">
              <RouterLink to={`/portfolio/${project.slug}`}>
                <img src={project.image} alt={project.title} className="portfolio-section-img" />
              </RouterLink>
            </div>
            <div className="portfolio-section-info">
              <h2 className="portfolio-section-title">
                {project.externalUrl ? (
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="portfolio-section-external-link">
                    {project.title}
                  </a>
                ) : project.title}
              </h2>
              <p className="portfolio-section-desc">{project.description}</p>
              <RouterLink to={`/portfolio/${project.slug}`} className="portfolio-section-link">
                View gallery →
              </RouterLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
