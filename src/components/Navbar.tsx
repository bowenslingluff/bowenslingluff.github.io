import React from 'react';
import { Link } from 'react-router-dom';

const RAY_COUNT = 12;
const INNER_RX = 65;
const INNER_RY = 16;
const OUTER_RX = 85;
const OUTER_RY = 28;

const rays = Array.from({ length: RAY_COUNT }, (_, i) => {
  const angle = (i * (360 / RAY_COUNT) * Math.PI) / 180;
  return {
    x1: 100 + INNER_RX * Math.cos(angle),
    y1: 100 + INNER_RY * Math.sin(angle),
    x2: 100 + OUTER_RX * Math.cos(angle),
    y2: 100 + OUTER_RY * Math.sin(angle),
  };
});

const Navbar: React.FC = () => {
  return (
    <div className="navbar-container">
      <div className="portfolio-link-wrapper">
        <svg className="portfolio-rays" viewBox="0 0 200 200" aria-hidden="true">
          {rays.map((r, i) => (
            <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
          ))}
        </svg>
        <Link to="/portfolio" className="portfolio-link">
          Portfolio
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
