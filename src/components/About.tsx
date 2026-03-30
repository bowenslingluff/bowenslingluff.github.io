// src/components/About.tsx

import React from 'react';
import sideshot from '../assets/sideshot.jpg';
import { Element } from 'react-scroll';

const About: React.FC = () => {
  return (
    <Element name="about" className="container1">
      <section id="about" className="about-shell">
        <div className="about-heading">
          <p className="section-kicker">Background</p>
          <h1 className="section-title">About Me</h1>
        </div>

        <div className="about-content">
          <article className="about-card">
            <p className="about-text">
              Hey, I’m Bowen. I'm a 4th year at the University of Virginia studying Computer Science and Data Science. I enjoy making websites and doing full-stack development. Currently, I'm building articleOne, a policy platform for congressional officials.
            </p>
            <p className="about-text">
              My hobbies include playing golf and basketball, lifting weights, cooking, ocean kayaking, and watching professional sports. I’m a member of the club golf team at UVA. I'm currently reading Game of Thrones. In the past, I’ve enjoyed working as a guide for kayak tours and as a boat ramp attendant in Rockport, MA.
            </p>
            <p className="about-text">
              In the coming years, I plan to spend free time traveling and exploring new places. One goal is to visit one national park each year.
            </p>
          </article>

          <aside className="about-image-wrap">
            <img src={sideshot} alt="Bowen" className="about-image" />
          </aside>
        </div>
      </section>
    </Element>
  );
};

export default About;