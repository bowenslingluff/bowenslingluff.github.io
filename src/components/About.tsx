// src/components/About.tsx

import React from 'react';
import sideshot from '../assets/sideshot.jpg';
import { Element } from 'react-scroll';

const About: React.FC = () => {
  return (
    <Element name="about" className="container1">
      <div id="about" className="about-container">
        <h1 className="about-label">About me</h1>
        <div className="about-content">
          <p className="about-text">
            Hey, I’m Bowen. I'm a 4th year at the University of Virginia studying Computer Science and Data Science. I enjoy making websites and doing full-stack development. Currently, I'm building articleOne, a policy platform for congressional officials.
          </p>
          <img src={sideshot} alt="Me" className="about-image" />
          <p className="about-text">
            My hobbies include playing golf and basketball, lifting weights, cooking, ocean kayaking, and watching professional sports. I’m a member of the club golf team at UVA. I'm currently reading the Game of Thrones. In the past, I’ve enjoyed working as a guide for kayak tours and as a boat ramp attendant in Rockport, MA. In the coming years, I plan to spend free time traveling and exploring new places. One of my goals is to visit one national park each year.
          </p>
          <p className="about-text">
            I'll occasionally add to this portfolio as a place to showcase my future projects and experiences. Look out for new stuff being added soon!
          </p>
        </div>
      </div>
    </Element>
  );
};

export default About;