import React, { useState, useEffect, useCallback, useRef } from 'react';
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

import f1 from '../assets/portfolio/finnfunn_1.png';
import f2 from '../assets/portfolio/finnfunn_2.png';
import f3 from '../assets/portfolio/finnfunn_3.png';
import f4 from '../assets/portfolio/finnfunn_4.png';
import f5 from '../assets/portfolio/finnfunn_5.png';
import f6 from '../assets/portfolio/finnfunn_6.png';

// Simple image-only galleries (projects that haven't been converted to a case study yet)
const projectData: Record<string, { title: string; description: string; images: string[] }> = {
  articleone_website: {
    title: 'ArticleOne Website',
    description: 'Marketing site and public-facing product pages for ArticleOne.',
    images: [w1, w2, w3, w4, w5, w6, w7],
  },
  amplified_naturals: {
    title: 'Amplified Naturals',
    description: 'E-commerce and brand presence for Amplified Naturals.',
    images: [n1, n2, n3, n4],
  },
  finnfunn: {
    title: 'FinnFunn',
    description: 'Event website for FinnFunn Weekend 2026, built with Wix.',
    images: [f1, f2, f3, f4, f5, f6],
  },
};

// Case study layout: walks the reader through problem -> process -> solution -> outcomes
type CaseStudySection = {
  id: string;
  kicker: string;
  heading: string;
  paragraphs: string[];
  images?: string[];
};

type StackItem = {
  name: string;
  iconSrc?: string;
};

type CaseStudy = {
  title: string;
  subtitle: string;
  meta: { label: string; value: string; href?: string }[];
  tools: StackItem[];
  sections: CaseStudySection[];
};

const caseStudyData: Record<string, CaseStudy> = {
  articleone_platform: {
    title: 'ArticleOne Platform',
    subtitle: 'Internal platform and dashboard UI for policy intelligence workflows.',
    meta: [
      { label: 'Role', value: 'Full Stack Developer' },
      { label: 'Timeline', value: 'Oct 2025 - Present' },
      { label: 'Link', value: 'articleone.ai ↗', href: 'https://articleone.ai' },
    ],
    tools: [
      { name: 'Figma', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'React', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'TypeScript', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Python', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Django', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'PostgreSQL', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg' },
      { name: 'Docker', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg' },
    ],
    sections: [
      {
        id: 'problem',
        kicker: 'The Problem',
        heading: 'Defining the problem',
        paragraphs: [
          'Placeholder — describe the business or user problem that existed before this project began.',
          'Placeholder — outline the goals and constraints that shaped the work (timeline, stakeholders, technical limitations).',
        ],
        images: [p1, p2],
      },
      {
        id: 'research',
        kicker: 'The Process / 01',
        heading: 'Research & insights',
        paragraphs: [
          'Placeholder — summarize the research methods used (interviews, analytics review, competitive audits) and the key insight that came out of it.',
        ],
        images: [p8, p9],
      },
      {
        id: 'decisions',
        kicker: 'The Process / 02',
        heading: 'Key decisions',
        paragraphs: [
          'Placeholder — walk through the major UX decisions made and the reasoning behind them. Call out any tradeoffs or rejected directions.',
        ],
        images: [p10, p11, p12],
      },
      {
        id: 'iterations',
        kicker: 'The Process / 03',
        heading: 'Iterations',
        paragraphs: [
          'Placeholder — show how the design evolved from early concepts to the final product, and what changed along the way.',
        ],
        images: [p13, p14],
      },
      {
        id: 'solution',
        kicker: 'The Solution',
        heading: 'The final product',
        paragraphs: [
          'Placeholder — describe the solution that shipped and how it addresses the problem defined above.',
        ],
        images: [p15, p16, p17, p18],
      },
      {
        id: 'outcomes',
        kicker: 'Outcomes',
        heading: 'Impact',
        paragraphs: [
          'Placeholder — share measurable outcomes (metrics, launch details) and any qualitative feedback from users or stakeholders.',
        ],
      },
      {
        id: 'reflection',
        kicker: 'Reflection',
        heading: 'What I learned',
        paragraphs: [
          "Placeholder — reflect on what worked, what you'd do differently, and what you took away from the project.",
        ],
      },
    ],
  },
};

const PAD = 48;

const ProjectGallery: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : null;
  const caseStudy = slug ? caseStudyData[slug] : null;

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [expanded, setExpanded] = useState(false);

  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

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

  useEffect(() => {
    if (!caseStudy) return;

    const infoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            infoObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );
    infoRefs.current.forEach((el) => el && infoObserver.observe(el));

    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            imgObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );
    imgRefs.current.forEach((el) => el && imgObserver.observe(el));

    return () => {
      infoObserver.disconnect();
      imgObserver.disconnect();
    };
  }, [caseStudy]);

  if (!project && !caseStudy) return <Navigate to="/portfolio" replace />;

  const expandedStyle = {
    top: PAD,
    left: PAD,
    width: window.innerWidth - PAD * 2,
    height: window.innerHeight - PAD * 2,
  };

  if (caseStudy) {
    let imgCounter = -1;
    return (
      <div className="gradient-background portfolio-page">
        <ThemeSwitcher />
        <div className="portfolio-page-header">
          <RouterLink to="/" className="portfolio-back-link">← Home</RouterLink>
          <RouterLink to="/portfolio" className="portfolio-back-link">← Portfolio</RouterLink>
          <h1 className="portfolio-page-title">{caseStudy.title}</h1>
          <p className="portfolio-page-subtitle">{caseStudy.subtitle}</p>

          <div className="case-study-meta">
            <dl className="portfolio-section-meta case-study-meta-info">
              {caseStudy.meta.map((row) => (
                <div className="portfolio-section-meta-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    {row.href ? (
                      <a href={row.href} target="_blank" rel="noopener noreferrer" className="portfolio-section-meta-link">
                        {row.value}
                      </a>
                    ) : row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="case-study-meta-tools">
              <span className="case-study-meta-tools-label">Tools</span>
              <div className="combined-stack-list">
                {caseStudy.tools.map((tool) => (
                  <div key={tool.name} className="combined-stack-item">
                    <div className="combined-stack-icon-slot" aria-hidden="true">
                      {tool.iconSrc ? (
                        <img src={tool.iconSrc} alt="" className="combined-stack-icon" />
                      ) : (
                        <span className="combined-stack-icon-placeholder"></span>
                      )}
                    </div>
                    <span className="combined-stack-label">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="portfolio-sections">
          {caseStudy.sections.map((section, i) => (
            <div
              key={section.id}
              id={section.id}
              className={`portfolio-section${!section.images?.length ? ' case-study-section--text-only' : ''}`}
            >
              <div
                className="portfolio-section-info"
                ref={(el) => { infoRefs.current[i] = el; }}
              >
                <p className="section-kicker">{section.kicker}</p>
                <h2 className="portfolio-section-title">{section.heading}</h2>
                {section.paragraphs.map((para, pi) => (
                  <p className="portfolio-section-desc" key={pi}>{para}</p>
                ))}
              </div>

              {!!section.images?.length && (
                <div className="portfolio-section-gallery">
                  {section.images.map((src, j) => {
                    imgCounter += 1;
                    const imgIndex = imgCounter;
                    return (
                      <div key={j} className="portfolio-section-img-link" onClick={(e) => openLightbox(src, e)}>
                        <img
                          src={src}
                          alt={`${caseStudy.title} ${section.heading} example ${j + 1}`}
                          className="portfolio-section-img"
                          ref={(el) => { imgRefs.current[imgIndex] = el; }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
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
  }

  return (
    <div className="gradient-background portfolio-page">
      <ThemeSwitcher />
      <div className="portfolio-page-header">
        <RouterLink to="/" className="portfolio-back-link">← Home</RouterLink>
        <RouterLink to="/portfolio" className="portfolio-back-link">← Portfolio</RouterLink>
        <h1 className="portfolio-page-title">{project!.title}</h1>
        <p className="portfolio-page-subtitle">{project!.description}</p>
      </div>
      <div className="project-gallery-grid">
        {project!.images.map((src, i) => (
          <div key={i} className="project-gallery-item" onClick={(e) => openLightbox(src, e)}>
            <img src={src} alt={`${project!.title} screenshot ${i + 1}`} className="project-gallery-img" />
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
