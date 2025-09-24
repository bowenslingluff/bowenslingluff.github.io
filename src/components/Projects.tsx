// src/components/Projects.tsx

import React, { useState } from 'react';

// Import your project images from the assets folder
import hooYouGotImg from '../assets/betting_project.png';
import techClaImg from '../assets/techCLA.png';
// Add an import for your third project image when you have one

// Define the type for a project
interface Project {
  title: string;
  imageUrl: string;
  githubUrl: string;
}

// Store your project data here
const projects: Project[] = [
  {
    title: "Hoo You Got",
    imageUrl: hooYouGotImg,
    githubUrl: "https://github.com/bowenslingluff/Hoo-You-Got",
  },
  {
    title: "Technology CLA",
    imageUrl: techClaImg,
    githubUrl: "https://github.com/bowenslingluff/technology-CLA",
  },
  {
    title: "Hoo's Reviews",
    imageUrl: '', // Add path to your image once you have it
    githubUrl: "https://github.com/bowenslingluff/CourseReview",
  },
];

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? projects.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === projects.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="container1">
      <div id="projects" className="projects-container-new">
        <h1 className="projects-label">Projects</h1>
        <div className="slideshow-container">
          {/* Left Arrow */}
          <div className="slideshow-arrow left" onClick={goToPrevious}>
            &#10094;
          </div>

          <a href={projects[currentIndex].githubUrl} target="_blank" rel="noopener noreferrer" className="slide-link">
            {projects[currentIndex].imageUrl ? (
              <img src={projects[currentIndex].imageUrl} alt={projects[currentIndex].title} className="slide-image" />
            ) : (
              <div className="slide-placeholder">Image Coming Soon</div>
            )}
            <div className="slide-caption">{projects[currentIndex].title}</div>
          </a>

          {/* Right Arrow */}
          <div className="slideshow-arrow right" onClick={goToNext}>
            &#10095;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;