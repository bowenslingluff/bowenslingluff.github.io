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
            Hey, I’m Bowen. I'm a 4th year at the University of Virginia studying Computer Science and Data Science. I enjoy learning new technologies and building full-stack web applications. I'm also interested in the intersection between software and finance.
          </p>
          <img src={sideshot} alt="Me" className="about-image rounded border border-2" />
          <p className="about-text">
            My hobbies include playing golf (6 H.I.) and basketball, lifting weights, cooking, ocean kayaking, and watching professional sports. I’m a member of the club golf team at UVA. In the past, I’ve enjoyed working as a guide for kayak tours and as a boat ramp attendant around Rockport, MA. In the coming years, I plan to spend time traveling and exploring new places. One of my goals is to visit one national park each year.
          </p>
          <p className="about-text">
            I love picking up new skills and building cool projects. I'll occasionally add to this portfolio as a place to showcase my future projects and experiences. Look out for new stuff being added soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;