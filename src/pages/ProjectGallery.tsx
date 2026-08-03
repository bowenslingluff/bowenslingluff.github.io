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
  // Optional full design-process case study (Problem & Goal -> Research ->
  // Planning -> Decisions -> Component System -> Final Product -> Conclusion)
  // used in place of the standard text + image-grid format for a section.
  deepDive?: DeepDiveCaseStudy;
};

type DeepDiveDecision = {
  title: string;
  description: string;
};

type DeepDiveCaseStudy = {
  kicker: string;
  title: string;
  // 2. The Problem & The Goal
  problem: string;
  goal: string;
  // 3. Research & Discovery
  insights: string[];
  targetUser: string;
  discoveryImage?: string;
  // 4. Planning & User Flow
  informationArchitecture: string;
  coreFlow: string;
  flowImage?: string;
  // 5. Design Decisions & Tradeoffs
  decisions: DeepDiveDecision[];
  tradeoff: string;
  decisionsImage?: string;
  // 6. Component System & Visual Identity
  designSystem: string;
  componentsFocus: string;
  componentsImage?: string;
  // 7. The Final Product
  walkthrough: string[];
  finalImages?: string[];
  // 8. Conclusion & Takeaways
  impact: string;
  takeaway: string;
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
        kicker: '',
        heading: 'Project Overview',
        paragraphs: [
          'I worked on the Django application and UX/UI for articleOne, an AI-native policy research platform. The platform is designed to streamline workflows for policy analysts, policy researchers, and congressional staff. I built, improved, and maintained core modules of the product, handling everything from UI component designs to data integrations to cloud deployments.',
        ],
      },
      {
        id: 'design-case-studies',
        kicker: '',
        heading: 'UX/UI Design Case Studies',
        paragraphs: [
          'Placeholder — a closer look at four pieces of the platform: the UX/UI thinking behind each one, from the problem it solved to the interface that shipped.',
        ],
      },
      {
        id: 'ui-components',
        kicker: '',
        heading: '',
        paragraphs: [],
        deepDive: {
          kicker: 'Case Study / 01',
          title: 'UI Components & Design System',
          problem: 'Placeholder — describe the user pain point or business challenge that made a dedicated component system necessary (e.g. inconsistent UI, slow feature development, users getting lost in dense data).',
          goal: 'Placeholder — describe what success looked like (e.g. a consistent, reusable component library that speeds up development and gives the platform a coherent visual language).',
          insights: [
            'Placeholder — top insight #1 from research, analytics, or existing product feedback.',
            'Placeholder — top insight #2 from research, analytics, or existing product feedback.',
            'Placeholder — top insight #3 from research, analytics, or existing product feedback.',
          ],
          targetUser: 'Placeholder — one-sentence summary of the target user (e.g. policy analysts and researchers working across dense, data-heavy screens).',
          discoveryImage: p1,
          informationArchitecture: 'Placeholder — briefly explain how the component library and platform UI were organized.',
          coreFlow: 'Placeholder — walk through the main path a user takes to accomplish their goal using these components.',
          flowImage: p2,
          decisions: [
            { title: 'Placeholder decision title', description: 'Placeholder — describe a specific feature or screen and why it was designed this way.' },
            { title: 'Placeholder decision title', description: 'Placeholder — highlight another major choice, e.g. navigation, data visualization, or accessibility.' },
          ],
          tradeoff: 'Placeholder — discuss a moment where you had to compromise, and why the tradeoff was worth it.',
          decisionsImage: undefined,
          designSystem: 'Placeholder — briefly mention typography, color palette, and spacing rules.',
          componentsFocus: 'Placeholder — explain how specific interactive elements (buttons, cards, modals, loading states) were designed to be reusable and intuitive.',
          componentsImage: p8,
          walkthrough: [
            'Placeholder — paragraph 1 guiding the reader through the component system as if they were a user seeing it for the first time.',
            'Placeholder — paragraph 2 highlighting the polish and consistency across the platform.',
          ],
          finalImages: [],
          impact: 'Placeholder — share measurable outcomes if available, or results from internal/user testing.',
          takeaway: 'Placeholder — one or two sentences on a personal takeaway from building this system.',
        },
      },
      {
        id: 'user-workflows',
        kicker: '',
        heading: '',
        paragraphs: [],
        deepDive: {
          kicker: 'Case Study / 02',
          title: 'User Workflows',
          problem: 'Placeholder — describe the user pain point or business challenge around how users moved through the platform (e.g. a confusing multi-step research process).',
          goal: 'Placeholder — describe what success looked like (e.g. a streamlined workflow with a clear sense of progress and fewer dead ends).',
          insights: [
            'Placeholder — top insight #1 from research, analytics, or existing product feedback.',
            'Placeholder — top insight #2 from research, analytics, or existing product feedback.',
            'Placeholder — top insight #3 from research, analytics, or existing product feedback.',
          ],
          targetUser: 'Placeholder — one-sentence summary of the target user (e.g. researchers moving from a broad search down to a specific finding).',
          discoveryImage: p9,
          informationArchitecture: 'Placeholder — briefly explain how the workflow was organized into steps or stages.',
          coreFlow: 'Placeholder — walk through the main path a user takes to complete a workflow end to end.',
          flowImage: p10,
          decisions: [
            { title: 'Placeholder decision title', description: 'Placeholder — describe a specific step or screen and why it was designed this way.' },
            { title: 'Placeholder decision title', description: 'Placeholder — highlight another major choice, e.g. how progress or state was surfaced to the user.' },
          ],
          tradeoff: 'Placeholder — discuss a moment where you had to compromise on the flow, and why the tradeoff was worth it.',
          decisionsImage: undefined,
          designSystem: 'Placeholder — briefly mention any workflow-specific patterns (steppers, status indicators, etc.) and how they extended the base design system.',
          componentsFocus: 'Placeholder — explain how workflow-specific components (e.g. step indicators, review panels) were designed to be reusable and intuitive.',
          componentsImage: p11,
          walkthrough: [
            'Placeholder — paragraph 1 guiding the reader through a full workflow as if they were a user experiencing it for the first time.',
            'Placeholder — paragraph 2 highlighting the polish and seamlessness of the finished flow.',
          ],
          finalImages: [],
          impact: 'Placeholder — share measurable outcomes if available, or results from internal/user testing.',
          takeaway: 'Placeholder — one or two sentences on a personal takeaway from designing this workflow.',
        },
      },
      {
        id: 'agentic-workflows',
        kicker: '',
        heading: '',
        paragraphs: [],
        deepDive: {
          kicker: 'Case Study / 03',
          title: 'Agentic AI Workflows',
          problem: 'Placeholder — describe the user pain point or business challenge around trusting and controlling AI-generated output.',
          goal: 'Placeholder — describe what success looked like (e.g. users can direct an AI agent and verify its output with confidence).',
          insights: [
            'Placeholder — top insight #1 from research, analytics, or existing product feedback.',
            'Placeholder — top insight #2 from research, analytics, or existing product feedback.',
            'Placeholder — top insight #3 from research, analytics, or existing product feedback.',
          ],
          targetUser: 'Placeholder — one-sentence summary of the target user (e.g. staff who need AI assistance but must be able to verify every claim).',
          discoveryImage: p12,
          informationArchitecture: 'Placeholder — briefly explain how agent interactions were organized in the UI (e.g. chat, review queue, source citations).',
          coreFlow: 'Placeholder — walk through the main path a user takes to task an agent, review its output, and confirm or correct it.',
          flowImage: p13,
          decisions: [
            { title: 'Placeholder decision title', description: 'Placeholder — describe a specific feature or screen (e.g. citation highlighting) and why it was designed this way.' },
            { title: 'Placeholder decision title', description: 'Placeholder — highlight another major choice, e.g. how agent confidence or uncertainty was communicated.' },
          ],
          tradeoff: 'Placeholder — discuss a moment where you had to compromise between automation and user control, and why the tradeoff was worth it.',
          decisionsImage: undefined,
          designSystem: 'Placeholder — briefly mention any AI-specific visual patterns (loading/thinking states, confidence indicators) and how they extended the base design system.',
          componentsFocus: 'Placeholder — explain how AI-specific components (e.g. agent messages, source cards, review actions) were designed to be reusable and intuitive.',
          componentsImage: p14,
          walkthrough: [
            'Placeholder — paragraph 1 guiding the reader through an agentic workflow as if they were a user experiencing it for the first time.',
            'Placeholder — paragraph 2 highlighting how the design kept the user in control while still feeling fast.',
          ],
          finalImages: [],
          impact: 'Placeholder — share measurable outcomes if available, or results from internal/user testing.',
          takeaway: 'Placeholder — one or two sentences on a personal takeaway from designing this experience.',
        },
      },
      {
        id: 'backend-integrations',
        kicker: '',
        heading: '',
        paragraphs: [],
        deepDive: {
          kicker: 'Case Study / 04',
          title: 'Backend Tools & Data',
          problem: 'Placeholder — describe the internal pain point or business challenge these backend tools and integrations needed to solve (e.g. manual data entry, disconnected data sources).',
          goal: 'Placeholder — describe what success looked like (e.g. reliable data pipelines and admin tooling that internal teams could trust and use without hand-holding).',
          insights: [
            'Placeholder — top insight #1 from research, analytics, or existing internal feedback.',
            'Placeholder — top insight #2 from research, analytics, or existing internal feedback.',
            'Placeholder — top insight #3 from research, analytics, or existing internal feedback.',
          ],
          targetUser: 'Placeholder — one-sentence summary of the target user (e.g. internal admins and engineers managing platform data).',
          discoveryImage: p15,
          informationArchitecture: 'Placeholder — briefly explain how the admin tooling and data integrations were organized.',
          coreFlow: 'Placeholder — walk through the main path an internal user takes to manage or troubleshoot data through these tools.',
          flowImage: p16,
          decisions: [
            { title: 'Placeholder decision title', description: 'Placeholder — describe a specific tool or screen and why it was designed this way.' },
            { title: 'Placeholder decision title', description: 'Placeholder — highlight another major choice, e.g. around data validation, error handling, or observability.' },
          ],
          tradeoff: 'Placeholder — discuss a moment where you had to compromise on scope or polish for these internal tools, and why the tradeoff was worth it.',
          decisionsImage: p17,
          designSystem: 'Placeholder — briefly mention how the internal tooling reused or diverged from the platform’s core design system.',
          componentsFocus: 'Placeholder — explain how internal-tooling components (e.g. data tables, status badges, pipeline monitors) were designed to be reusable and intuitive.',
          componentsImage: p18,
          walkthrough: [
            'Placeholder — paragraph 1 guiding the reader through the backend tooling as if they were an internal user experiencing it for the first time.',
            'Placeholder — paragraph 2 highlighting how the tooling made data integrations easier to manage.',
          ],
          finalImages: [],
          impact: 'Placeholder — share measurable outcomes if available, or results from internal usage.',
          takeaway: 'Placeholder — one or two sentences on a personal takeaway from building these tools.',
        },
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
      { name: 'Liquid', iconSrc: 'https://repository-images.githubusercontent.com/504051433/dbab2f42-150c-4eaf-8e30-4bce79758e16' },
      { name: 'CSS3', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
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

type RegisterImage = (src: string) => {
  ref: (el: HTMLImageElement | null) => void;
  onClick: (e: React.MouseEvent) => void;
};

const DeepDiveImage: React.FC<{
  src?: string;
  alt: string;
  caption: string;
  registerImage: RegisterImage;
}> = ({ src, alt, caption, registerImage }) => {
  if (!src) {
    return (
      <div className="case-study-deepdive-image-slot case-study-deepdive-image-slot--empty">
        <span className="case-study-deepdive-image-slot-label">{caption}</span>
      </div>
    );
  }

  const { ref, onClick } = registerImage(src);
  return (
    <div className="case-study-deepdive-image-slot portfolio-section-img-link" onClick={onClick}>
      <img src={src} alt={alt} className="portfolio-section-img" ref={ref} />
    </div>
  );
};

const DeepDiveSection: React.FC<{
  dd: DeepDiveCaseStudy;
  caseStudyTitle: string;
  infoRef: (el: HTMLDivElement | null) => void;
  registerImage: RegisterImage;
}> = ({ dd, caseStudyTitle, infoRef, registerImage }) => (
  <>
    <div className="portfolio-section-info" ref={infoRef}>
      <p className="section-kicker">{dd.kicker}</p>
      <h2 className="portfolio-section-title">{dd.title}</h2>
    </div>

    <div className="case-study-deepdive-body">
      <section className="case-study-deepdive-chapter">
        <h3 className="case-study-deepdive-chapter-title">The Problem &amp; The Goal</h3>
        <div className="case-study-deepdive-fields">
          <div className="case-study-deepdive-field">
            <span className="case-study-deepdive-field-label">The Problem</span>
            <p>{dd.problem}</p>
          </div>
          <div className="case-study-deepdive-field">
            <span className="case-study-deepdive-field-label">The Goal</span>
            <p>{dd.goal}</p>
          </div>
        </div>
      </section>

      <section className="case-study-deepdive-chapter">
        <h3 className="case-study-deepdive-chapter-title">Research &amp; Discovery</h3>
        <div className="case-study-deepdive-chapter-grid">
          <div className="case-study-deepdive-fields">
            <div className="case-study-deepdive-field">
              <span className="case-study-deepdive-field-label">Key Insights</span>
              <ul className="case-study-deepdive-list">
                {dd.insights.map((insight, idx) => <li key={idx}>{insight}</li>)}
              </ul>
            </div>
            <div className="case-study-deepdive-field">
              <span className="case-study-deepdive-field-label">Who is this for?</span>
              <p>{dd.targetUser}</p>
            </div>
          </div>
          <DeepDiveImage
            src={dd.discoveryImage}
            alt={`${caseStudyTitle} ${dd.title} discovery artifact`}
            caption="Discovery artifact"
            registerImage={registerImage}
          />
        </div>
      </section>

      <section className="case-study-deepdive-chapter">
        <h3 className="case-study-deepdive-chapter-title">Planning &amp; User Flow</h3>
        <div className="case-study-deepdive-chapter-grid">
          <div className="case-study-deepdive-fields">
            <div className="case-study-deepdive-field">
              <span className="case-study-deepdive-field-label">Information Architecture</span>
              <p>{dd.informationArchitecture}</p>
            </div>
            <div className="case-study-deepdive-field">
              <span className="case-study-deepdive-field-label">The Core Flow</span>
              <p>{dd.coreFlow}</p>
            </div>
          </div>
          <DeepDiveImage
            src={dd.flowImage}
            alt={`${caseStudyTitle} ${dd.title} user flow`}
            caption="User flow / wireframes"
            registerImage={registerImage}
          />
        </div>
      </section>

      <section className="case-study-deepdive-chapter">
        <h3 className="case-study-deepdive-chapter-title">Design Decisions &amp; Tradeoffs</h3>
        <div className="case-study-deepdive-chapter-grid">
          <div className="case-study-deepdive-fields">
            {dd.decisions.map((decision, idx) => (
              <div className="case-study-deepdive-field" key={idx}>
                <span className="case-study-deepdive-field-label">{`Key UX/UI Decision ${idx + 1}: ${decision.title}`}</span>
                <p>{decision.description}</p>
              </div>
            ))}
            <div className="case-study-deepdive-field">
              <span className="case-study-deepdive-field-label">The Tradeoff</span>
              <p>{dd.tradeoff}</p>
            </div>
          </div>
          <DeepDiveImage
            src={dd.decisionsImage}
            alt={`${caseStudyTitle} ${dd.title} before and after comparison`}
            caption="Before / after comparison"
            registerImage={registerImage}
          />
        </div>
      </section>

      <section className="case-study-deepdive-chapter">
        <h3 className="case-study-deepdive-chapter-title">Component System &amp; Visual Identity</h3>
        <div className="case-study-deepdive-chapter-grid">
          <div className="case-study-deepdive-fields">
            <div className="case-study-deepdive-field">
              <span className="case-study-deepdive-field-label">Design System / UI Kit</span>
              <p>{dd.designSystem}</p>
            </div>
            <div className="case-study-deepdive-field">
              <span className="case-study-deepdive-field-label">Focus on Components</span>
              <p>{dd.componentsFocus}</p>
            </div>
          </div>
          <DeepDiveImage
            src={dd.componentsImage}
            alt={`${caseStudyTitle} ${dd.title} component states`}
            caption="Component states (default / hover / active)"
            registerImage={registerImage}
          />
        </div>
      </section>

      <section className="case-study-deepdive-chapter">
        <h3 className="case-study-deepdive-chapter-title">The Final Product</h3>
        {dd.walkthrough.map((para, idx) => (
          <p className="portfolio-section-desc" key={idx}>{para}</p>
        ))}
        <div className="case-study-deepdive-final-gallery">
          {dd.finalImages?.length ? (
            dd.finalImages.map((src, idx) => (
              <DeepDiveImage
                key={idx}
                src={src}
                alt={`${caseStudyTitle} ${dd.title} final screen ${idx + 1}`}
                caption="High-fidelity screenshot"
                registerImage={registerImage}
              />
            ))
          ) : (
            <DeepDiveImage
              alt={`${caseStudyTitle} ${dd.title} final screens`}
              caption="High-fidelity platform screenshots"
              registerImage={registerImage}
            />
          )}
        </div>
      </section>

      <section className="case-study-deepdive-chapter">
        <h3 className="case-study-deepdive-chapter-title">Conclusion &amp; Takeaways</h3>
        <div className="case-study-deepdive-fields">
          <div className="case-study-deepdive-field">
            <span className="case-study-deepdive-field-label">Impact / Results</span>
            <p>{dd.impact}</p>
          </div>
          <div className="case-study-deepdive-field">
            <span className="case-study-deepdive-field-label">What I Learned</span>
            <p>{dd.takeaway}</p>
          </div>
        </div>
      </section>
    </div>
  </>
);

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
  const registerImage: RegisterImage = (src) => {
    imgCounter += 1;
    const imgIndex = imgCounter;
    return {
      ref: (el) => { imgRefs.current[imgIndex] = el; },
      onClick: (e) => openLightbox(src, e),
    };
  };

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
          if (section.deepDive) {
            return (
              <div
                key={section.id}
                id={section.id}
                className="portfolio-section case-study-section--text-only case-study-deepdive-section"
              >
                <DeepDiveSection
                  dd={section.deepDive}
                  caseStudyTitle={caseStudy.title}
                  infoRef={(el) => { infoRefs.current[i] = el; }}
                  registerImage={registerImage}
                />
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
