// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';

// An array of objects to hold our navigation links (in-page scroll)
const navLinks = [
  { to: 'about', text: 'About' },
  { to: 'experience', text: 'Experience' },
  { to: 'projects', text: 'Projects' },
  { to: 'contact', text: 'Contact' },
];

const Navbar: React.FC = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              smooth={true}
              duration={500}
              offset={-50}
              className="site-pages"
              style={{ cursor: 'pointer' }}
            >
              {link.text}
            </Link>
          </li>
        ))}
        <li>
          <NavLink to="/favorites" className="site-pages" style={{ marginLeft: 16 }}>
            Favorites
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;