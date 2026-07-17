import { useEffect, useState } from 'react';

const KEY = 'vc.theme';
const PAGE = { light: '#E9F1FD', dark: '#101A2C' };

export const readTheme = () =>
  localStorage.getItem(KEY) ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function paint(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  // Keep the browser chrome and the PWA status bar in step with the page.
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', PAGE[theme]);
}

/**
 * Remembers an explicit choice. Until someone makes one, follows the phone's
 * own light/dark setting — including when it flips at sunset.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => { paint(theme); }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const follow = (e) => {
      if (!localStorage.getItem(KEY)) setTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', follow);
    return () => mq.removeEventListener('change', follow);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(KEY, next);
    setTheme(next);
  };

  return { theme, toggle };
}
