// src/components/Navbar.tsx

import React from 'react';

// An array of objects to hold our navigation links
const navLinks = [
  { href: '#about', text: 'About' },
  { href: '#experience', text: 'Experience' },
  { href: '#projects', text: 'Projects' },
  { href: '#contact', text: 'Contact' },
];

const Navbar: React.FC = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="site-pages">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;