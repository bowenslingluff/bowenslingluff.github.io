// src/components/About.tsx

import React from 'react';
import sideshot from '../assets/sideshot.jpg'; // We'll add this image next

const About: React.FC = () => {
  return (
    <div className="container1">
      <div id="about" className="about-container">
        <h1 className="about-label">About me</h1>
        <div className="about-content">
          <p className="about-text">
            Hey, I’m Bowen. I'm a 4th year at the University of Virginia studying CS and Data Science. I’m passionate about coding and software engineering, and excited about the future of machine learning and AI.
          </p>
          <img src={sideshot} alt="Me" className="about-image rounded border border-2" />
          <p className="about-text">
            My hobbies include playing golf and basketball, lifting weights, cooking, ocean kayaking, and following professional golf. I’m a member of the club golf team at UVA. In the past, I’ve enjoyed working as a guide for kayak tours and as a boat ramp attendant around coastal Massachusetts. In the coming years, I plan to spend time traveling, exploring new cities and countries.
          </p>
          <p className="about-text">
            I’m beginning my journey into the professional world, starting with building cool software projects and gaining experience through internships. I'll occasionally add to this portfolio as a place to showcase my future projects and experiences. Look out for new stuff being added soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;