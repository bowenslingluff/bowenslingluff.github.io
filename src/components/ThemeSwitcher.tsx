// src/components/ThemeSwitcher.tsx

import React, { useState, useEffect } from 'react';

// Read any saved preference synchronously so the very first render already
// matches it - avoids a flash back to the default theme on every page mount.
const getInitialTheme = (): string => {
  if (typeof window === 'undefined') return 'dark';
  return localStorage.getItem('theme') || 'dark';
};

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  // Keep the document + localStorage in sync whenever the theme changes
  // (including on mount, so switching pages/components stays consistent).
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="mode">
      <label className="theme" onClick={toggleTheme}>
        {theme === 'dark' ? (
          <i className="bi bi-sun"></i>
        ) : (
          <i className="bi bi-moon-fill"></i>
        )}
        <input className="input" type="checkbox" checked={theme === 'light'} readOnly />
      </label>
    </div>
  );
};

export default ThemeSwitcher;