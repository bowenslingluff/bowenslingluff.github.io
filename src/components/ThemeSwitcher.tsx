// src/components/ThemeSwitcher.tsx

import React, { useState, useEffect } from 'react';

const ThemeSwitcher: React.FC = () => {
  // 'useState' to manage the theme. Defaults to 'light'.
  const [theme, setTheme] = useState('light');

  // 'useEffect' runs once when the component mounts to check localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // This 'useEffect' runs whenever the 'theme' state changes
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
        {theme === 'light' ? (
          <i className="bi bi-moon-fill"></i>
        ) : (
          <i className="bi bi-sun"></i>
        )}
        <input className="input" type="checkbox" checked={theme === 'dark'} readOnly />
      </label>
    </div>
  );
};

export default ThemeSwitcher;