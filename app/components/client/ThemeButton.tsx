'use client';

import { FiMoon, FiSun } from 'react-icons/fi';
import { useLayoutEffect, useState } from 'react';

const ThemeButton = () => {
  const [theme, setTheme] = useState('light');

  useLayoutEffect(() => {
    /* theme이 변경되고 나서 실행되어야 하는 LayoutEffect */
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useLayoutEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  const handleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
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
