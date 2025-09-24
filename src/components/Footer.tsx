// src/components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-text">
        © {currentYear} Bowen Slingluff
      </div>
    </footer>
  );
};

export default Footer;