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
    <div className="rounded border border-4 my-3 mx-auto py-3">
      <ul className="nav justify-content-center">
        {navLinks.map((link) => (
          <li className="nav-item" key={link.href}>
            <a href={link.href} className="nav-link site_pages fw-semibold">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;