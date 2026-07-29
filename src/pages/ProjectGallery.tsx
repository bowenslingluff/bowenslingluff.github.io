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

// Case study layout: walks the reader through problem -> process -> solution -> outcomes
type CaseStudySection = {
  id: string;
  kicker: string;
  heading: string;
  paragraphs: string[];
  images?: string[];
  // Optional richer layout for a single section that deserves its own mini
  // case study (e.g. a deep-dive on design process) instead of the standard
  // text + image-grid format used by every other section.
  process?: {
    highlights: { label: string; value: string }[];
    steps: {
      id: string;
      label: string;
      heading: string;
      description: string;
      image?: string;
    }[];
  };
};

type StackItem = {
  name: string;
  iconSrc?: string;
};

type CaseStudy = {
  title: string;
  meta: { label: string; value: string; href?: string }[];
  tools: StackItem[];
  // Optional table-of-contents linking to a subset of sections below (used for
  // larger projects made up of multiple concepts/sub-projects on one page).
  nav?: { id: string; label: string }[];
  sections: CaseStudySection[];
};

// Every case study walks through the same outline; only the images differ per project.
const makeSections = (imgs: {
  problem?: string[];
  research?: string[];
  decisions?: string[];
  iterations?: string[];
  solution?: string[];
}): CaseStudySection[] => [
  {
    id: 'problem',
    kicker: 'The Problem',
    heading: 'Defining the problem',
    paragraphs: [
      'Placeholder — describe the business or user problem that existed before this project began.',
      'Placeholder — outline the goals and constraints that shaped the work (timeline, stakeholders, technical limitations).',
    ],
    images: imgs.problem,
  },
  {
    id: 'research',
    kicker: 'The Process / 01',
    heading: 'Research & insights',
    paragraphs: [
      'Placeholder — summarize the research methods used (interviews, analytics review, competitive audits) and the key insight that came out of it.',
    ],
    images: imgs.research,
  },
  {
    id: 'decisions',
    kicker: 'The Process / 02',
    heading: 'Key decisions',
    paragraphs: [
      'Placeholder — walk through the major UX decisions made and the reasoning behind them. Call out any tradeoffs or rejected directions.',
    ],
    images: imgs.decisions,
  },
  {
    id: 'iterations',
    kicker: 'The Process / 03',
    heading: 'Iterations',
    paragraphs: [
      'Placeholder — show how the design evolved from early concepts to the final product, and what changed along the way.',
    ],
    images: imgs.iterations,
  },
  {
    id: 'solution',
    kicker: 'The Solution',
    heading: 'The final product',
    paragraphs: [
      'Placeholder — describe the solution that shipped and how it addresses the problem defined above.',
    ],
    images: imgs.solution,
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
];

const caseStudyData: Record<string, CaseStudy> = {
  articleone_website: {
    title: 'ArticleOne Website',
    meta: [
      { label: 'Role', value: 'UX/UI Designer & Front-End Developer' },
      { label: 'Timeline', value: 'Oct 2025 - Present' },
      { label: 'Link', value: 'articleone.ai ↗', href: 'https://articleone.ai' },
    ],
    tools: [
      { name: 'Figma', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'React', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'TypeScript', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'GitHub', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    ],
    sections: makeSections({
      problem: [w1],
      research: [w2],
      decisions: [w3, w4],
      iterations: [w5],
      solution: [w6, w7],
    }),
  },
  articleone_platform: {
    title: 'ArticleOne Platform',
    meta: [
      { label: 'Role', value: 'Full Stack Developer' },
      { label: 'Timeline', value: 'Oct 2025 - Present' },
      { label: 'Link', value: 'articleone.ai ↗', href: 'https://articleone.ai' },
    ],
    tools: [
      { name: 'Python', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Django', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'HTML5', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Figma', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'MongoDB', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },      
      { name: 'PostgreSQL', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg' },
      { name: 'Docker', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg' },
      { name: 'GCP', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
      { name: 'Postman', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    ],
    // Bigger project made up of several concepts, all shown on one page with a jump-nav.
    nav: [
      { id: 'ui-components', label: 'UI Components' },
      { id: 'user-workflows', label: 'User Workflows' },
      { id: 'agentic-workflows', label: 'Agentic AI Workflows' },
      { id: 'backend-integrations', label: 'Backend & Data' },
    ],
    sections: [
      {
        id: 'overview',
        kicker: 'Overview',
        heading: 'Project Overview',
        paragraphs: [
          'I worked on the Django application and UX/UI for articleOne, an AI-native policy research platform. The platform is designed to streamline workflows for policy analysts, policy researchers, and congressional staff. I built, improved, and maintained core modules of the product, handling everything from UI component designs to data integrations to cloud deployments.',
        ],
      },
      {
        id: 'ui-components',
        kicker: '01',
        heading: 'UX/UI Design',
        paragraphs: [
          'Placeholder — a closer look at how I approached the UX/UI design for the platform: understanding how analysts and researchers actually worked, building a consistent component system around that, and refining it against real usage.',
        ],
        process: {
          highlights: [
            { label: 'Approach', value: 'Component-driven design system' },
            { label: 'Focus', value: 'Clarity for dense policy data' },
            { label: 'Outcome', value: 'Reusable UI kit across the platform' },
          ],
          steps: [
            {
              id: 'discover',
              label: '01 — Discover',
              heading: 'Understanding the workflows',
              description: 'Placeholder — describe the research into how policy analysts, researchers, and congressional staff actually worked, and the pain points that shaped the design direction.',
              image: p1,
            },
            {
              id: 'design',
              label: '02 — Design',
              heading: 'Building the component system',
              description: 'Placeholder — walk through the core UI components and design system built for the platform (navigation, data tables, forms, etc.) and the principles behind them.',
              image: p2,
            },
            {
              id: 'refine',
              label: '03 — Refine',
              heading: 'Iterating against real use',
              description: 'Placeholder — describe how the components were tested and refined against real policy data and user feedback, and what changed as a result.',
              image: p8,
            },
          ],
        },
      },
      {
        id: 'user-workflows',
        kicker: '02',
        heading: 'User Workflows',
        paragraphs: [
          'Placeholder — map out the key user workflows and journeys the platform supports, and the UX decisions that shaped how users move through them.',
        ],
        images: [p9, p10, p11],
      },
      {
        id: 'agentic-workflows',
        kicker: '03',
        heading: 'Agentic AI',
        paragraphs: [
          'Placeholder — describe the agentic AI workflows designed for the platform: how users interact with AI agents, review and verify outputs, and stay in control.',
        ],
        images: [p12, p13, p14],
      },
      {
        id: 'backend-integrations',
        kicker: '04',
        heading: 'Backend Tools & Data',
        paragraphs: [
          'Placeholder — describe the internal tools and data integrations built to support the platform (data pipelines, admin tooling, third-party integrations).',
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
  amplified_naturals: {
    title: 'Amplified Naturals',
    meta: [
      { label: 'Role', value: 'Web Developer' },
      { label: 'Timeline', value: 'Oct 2025 - Feb 2026' },
      { label: 'Link', value: 'amplifiednaturals.com ↗', href: 'https://amplifiednaturals.com' },
    ],
    tools: [
      { name: 'Shopify', iconSrc: 'https://cdn.simpleicons.org/shopify' },
      { name: 'HTML5', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ],
    sections: makeSections({
      problem: [n1],
      decisions: [n2],
      iterations: [n3],
      solution: [n4],
    }),
  },
  finnfunn: {
    title: 'FinnFunn',
    meta: [
      { label: 'Role', value: 'Website Designer' },
      { label: 'Timeline', value: 'Jun 2026 - Present' },
      { label: 'Link', value: 'finnfunn.org ↗', href: 'https://finnfunn.org' },
    ],
    tools: [
      { name: 'Wix', iconSrc: 'https://cdn.simpleicons.org/wix' },
      { name: 'Figma', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    ],
    sections: makeSections({
      problem: [f1],
      research: [f2],
      decisions: [f3, f4],
      iterations: [f5],
      solution: [f6],
    }),
  },
};

const PAD = 48;

const ProjectGallery: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
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

  if (!caseStudy) return <Navigate to="/portfolio" replace />;

  const expandedStyle = {
    top: PAD,
    left: PAD,
    width: window.innerWidth - PAD * 2,
    height: window.innerHeight - PAD * 2,
  };

  let imgCounter = -1;
  return (
    <div className="gradient-background portfolio-page">
      <ThemeSwitcher />
      <div className="portfolio-page-header">
        <RouterLink to="/" className="portfolio-back-link">← Home</RouterLink>
        <RouterLink to="/portfolio" className="portfolio-back-link">← Portfolio</RouterLink>
        <h1 className="portfolio-page-title">{caseStudy.title}</h1>

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
            <span className="case-study-meta-tools-label">Tool Stack</span>
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
        {caseStudy.sections.map((section, i) => {
          if (section.process) {
            return (
              <div
                key={section.id}
                id={section.id}
                className="portfolio-section case-study-section--text-only case-study-process-section"
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

                  {!!section.process.highlights.length && (
                    <div className="case-study-process-highlights">
                      {section.process.highlights.map((h) => (
                        <div className="case-study-process-highlight" key={h.label}>
                          <span className="case-study-process-highlight-label">{h.label}</span>
                          <span className="case-study-process-highlight-value">{h.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="case-study-process-steps">
                  {section.process.steps.map((step, si) => {
                    if (step.image) imgCounter += 1;
                    const imgIndex = imgCounter;
                    return (
                      <div className="case-study-process-step" key={step.id}>
                        <div className="case-study-process-step-text">
                          <span className="case-study-process-step-number">{String(si + 1).padStart(2, '0')}</span>
                          <p className="case-study-process-step-label">{step.label}</p>
                          <h3 className="case-study-process-step-heading">{step.heading}</h3>
                          <p className="case-study-process-step-desc">{step.description}</p>
                        </div>
                        {step.image && (
                          <div
                            className="case-study-process-step-image portfolio-section-img-link"
                            onClick={(e) => openLightbox(step.image!, e)}
                          >
                            <img
                              src={step.image}
                              alt={`${caseStudy.title} ${step.heading} example`}
                              className="portfolio-section-img"
                              ref={(el) => { imgRefs.current[imgIndex] = el; }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          return (
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
          );
        })}
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
