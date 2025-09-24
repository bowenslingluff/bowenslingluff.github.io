// src/components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer text-center">
      <div className="text-center p-3 opacity-75">
        © {currentYear} Bowen Slingluff
      </div>
    </footer>
  );
};

export default Footer;