'use client';

import { FiMoon, FiSun } from 'react-icons/fi';
import { useLayoutEffect, useState } from 'react';

const ThemeButton = () => {
  const [theme, setTheme] = useState('light');

  useLayoutEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  const handleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return theme === 'light' ? (
    <button className='py-2' onClick={handleTheme}>
      <FiSun size={20} />
    </button>
  ) : (
    <button className='py-2' onClick={handleTheme}>
      <FiMoon size={20} />
    </button>
  );
};

export default ThemeButton;
