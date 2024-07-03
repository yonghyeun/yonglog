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
    const contentColor = theme === 'light' ? 'rgb(248, 240, 252)' : '#111';

    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', contentColor);
    localStorage.setItem('theme', nextTheme);
  };

  return theme === 'light' ? (
    <button className='py-2' onClick={handleTheme} aria-label='Toggle Theme'>
      <FiSun size={20} />
    </button>
  ) : (
    <button className='py-2' onClick={handleTheme} aria-label='Toggle Theme'>
      <FiMoon size={20} />
    </button>
  );
};

export default ThemeButton;
