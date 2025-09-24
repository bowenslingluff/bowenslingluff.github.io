// src/components/Experience.tsx

import React from 'react';
import { Element } from 'react-scroll';

// Define the type for a single experience item for TypeScript
interface ExperienceItem {
  date: string;
  company: string;
  title: string;
}

// Store your experience data in this array.
// To add a new job, just add a new object to this array.
const experiences: ExperienceItem[] = [
  {
    date: 'Jun 2025 - Aug 2025',
    company: 'EBSCO Information Services',
    title: 'Software Engineering Intern',
  },
  {
    date: 'Jan 2025 - May 2025',
    company: 'Manitou Research',
    title: 'Software Engineering Intern',
  },
  {
    date: '2022 - 2026',
    company: 'University of Virginia',
    title: 'B.A. in Computer Science'
  },
];

const Experience: React.FC = () => {
  return (
    <Element name="experience" className="container1">
      <div id="experience" className="experience-container-new">
        <h1 className="experience-label">Experience</h1>
        <div className="experience-cards-container">
          {experiences.map((exp, index) => (
            <div className="experience-card" key={index}>
              <p className="experience-date">{exp.date}</p>
              <h3 className="experience-company">{exp.company}</h3>
              <h4 className="experience-title">{exp.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </Element>
  );
};

export default Experience;