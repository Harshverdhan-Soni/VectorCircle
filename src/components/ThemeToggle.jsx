import React from 'react';
import useTheme from '../lib/useTheme';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      title={dark ? 'Switch to paper' : 'Switch to dusk'}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`h-8 w-8 grid place-items-center rounded-full border border-line text-mist
                  hover:text-chalk hover:border-beam/60 transition ${className}`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        {dark ? (
          /* moon — tap for paper */
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
        ) : (
          /* sun — tap for dusk */
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M18.6 5.4l-1.5 1.5M6.9 17.1l-1.5 1.5" />
          </>
        )}
      </svg>
    </button>
  );
}
