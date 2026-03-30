// src/components/Experience.tsx

import React from "react";
import { Element } from "react-scroll";

// import company logos (add these files in src/assets/)
import manitouLogo from "../assets/manitou-research-logo.png";
import ebscoLogo from "../assets/ebsco.png";
import uvaLogo from "../assets/uva.png";
import sideshot from "../assets/sideshot.jpg";
import a1Logo from "../assets/a1-logo.svg";

// Type for each experience entry
interface ExperienceItem {
  date: string;
  company: string;
  title: string;
  // optional URL to a logo image
  logoUrl?: string;
  // detailed description that will be shown when expanded
  description?: React.ReactNode;
}

interface ContactDetail {
  icon: string;
  text: string;
}

interface StackItem {
  name: string;
  iconSrc?: string;
}

// Your data here (add logo files under src/assets if you want them to appear)
const experiences: ExperienceItem[] = [
  {
    date: "Oct 2025 - Present",
    company: "Manitou Research",
    title: "Full Stack Developer",
    logoUrl: manitouLogo,
    description: (
      <div className="hero-current-project">
        <img src={a1Logo} alt="articleOne logo" className="hero-current-project-logo" />
        <p className="hero-current-project-text">
          Building{' '}
          <a
            href="https://www.articleone.ai"
            target="_blank"
            rel="noreferrer"
            className="hero-current-project-link"
          >
            articleOne
          </a>
        </p>
      </div>
    )
  },
  {
    date: "Jun 2025 - Aug 2025",
    company: "EBSCO Information Services",
    title: "Software Engineering Intern",
    logoUrl: ebscoLogo,
    description: "Java Spring Boot microservices + REST APIs."
  },
  {
    date: "Jan 2025 - May 2025",
    company: "Manitou Research",
    title: "Software Engineering Intern",
    logoUrl: manitouLogo,
    description: "Python data collection + processing, MongoDB, APIs, HTML + CSS."
  },
  {
    date: "2022 - 2026",
    company: "University of Virginia",
    title: "B.A. in Computer Science",
    logoUrl: uvaLogo,
    description: "GPA 3.8/4.0. Pursuing a Bachelor of Arts in CS with a Minor in Data Science."
  },
  {
    date: "2023 - 2024",
    company: "Town of Rockport, MA",
    title: "Ramp Attendant",
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9gFSm3E3Go6GZCQIyxB5gw5dYBAQ_drH_Ig&s',
    description: "Boat launch guy. Avid book reader and conversationalist."
  },
  {
    date: "2021 - 2024",
    company: "North Shore Adventures LLC",
    title: "Kayak Tour Guide",
    logoUrl: "https://images.squarespace-cdn.com/content/v1/61d9ce3e46d51b49b510bc83/0b5182d3-2548-40d9-b0d4-45ff9f097684/favicon.ico?format=100w",
    description: "Led ocean kayak tours in coastal Rockport, MA. Destinations included Straightsmouth Island, Thatcher Island, The Dry Salvages. Performed multiple rescues."
  },
];

const contactDetails: ContactDetail[] = [
  { icon: 'bi-phone-vibrate', text: '978-325-2295' },
  { icon: 'bi-envelope', text: 'bcslingluff@gmail.com' },
  { icon: 'bi-bank2', text: 'jdx7es@virginia.edu' },
];

const stackItems: StackItem[] = [
  { name: 'Python', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'HTML/CSS', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'Django', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'MongoDB', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg' },
  { name: 'PostgreSQL', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg' }, 
  { name: 'Java', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Spring Boot', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'Docker', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg' },
  { name: 'JavaScript', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
];

const toolItems: StackItem[] = [
  { name: 'GitHub', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'VS Code', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Postman', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
  { name: 'Figma', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Claude Code', iconSrc: 'https://img.icons8.com/fluent/512w/claude-ai.png'},
  { name: 'Perplexity', iconSrc: 'https://img.icons8.com/fluent/512w/perplexity-ai.png' },
  { name: 'Google Gemini', iconSrc: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/gemini-color.png' },
];

const Experience: React.FC = () => {
  return (
    <section className="combined-profile-shell">
      

      <div className="combined-profile-right">
        <Element name="about" className="combined-about-block">
          <p className="section-kicker">About</p>
          <div className="combined-about-content">
            <img src={sideshot} alt="Bowen" className="combined-about-image" />
            <p className="about-text combined-about-text">
              Hey, I’m Bowen. I'm a 4th year at the University of Virginia studying Computer Science and Data Science. I enjoy making websites and doing full-stack development. Currently, I'm at Manitou Research building articleOne, a policy platform for congressional officials. My hobbies include golfing, hooping, lifting, cooking, and vibe coding. I am an outdoor adventure enthusiast.
            </p>
          </div>
        </Element>

        <section className="combined-stack-block">
          <p className="section-kicker">Tech Stack</p>
          <div className="combined-stack-list">
            {stackItems.map((stack) => (
              <div key={stack.name} className="combined-stack-item">
                <div className="combined-stack-icon-slot" aria-hidden="true">
                  {stack.iconSrc ? (
                    <img src={stack.iconSrc} alt="" className="combined-stack-icon" />
                  ) : (
                    <span className="combined-stack-icon-placeholder"></span>
                  )}
                </div>
                <span className="combined-stack-label">{stack.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="combined-tools-block">
          <p className="section-kicker">Tools</p>
          <div className="combined-stack-list">
            {toolItems.map((tool) => (
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
        </section>

        <Element name="contact" className="combined-contact-block">
          <p className="section-kicker">Contact</p>
          <div className="combined-contact-list">
            {contactDetails.map((detail, index) => (
              <div key={index} className="combined-contact-item">
                <i className={`bi ${detail.icon} contact-right-icon`}></i>
                <p>{detail.text}</p>
              </div>
            ))}
          </div>
        </Element>
      </div>

      <Element name="experience" className="combined-profile-left">
        <p className="section-kicker">Experience</p>
        <div className="combined-experience-scroller">
          <div className="experience-modern-list">
            {experiences.map((exp, index) => (
              <article key={index} className="experience-modern-item">
                <p className="experience-modern-date">{exp.date}</p>

                <div className="experience-modern-main">
                  {exp.logoUrl && (
                    <img
                      src={exp.logoUrl}
                      alt={`${exp.company} logo`}
                      className="experience-modern-logo"
                    />
                  )}

                  <div className="experience-modern-card">
                    <h3 className="experience-modern-company">{exp.company}</h3>
                    <p className="experience-modern-title">{exp.title}</p>
                    {exp.description && <div className="experience-modern-description">{exp.description}</div>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Experience;
