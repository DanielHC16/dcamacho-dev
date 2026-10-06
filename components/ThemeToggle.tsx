'use client';

import { useSyncExternalStore } from 'react';

// The theme lives on <html class="dark">, set before first paint by the inline
// script in app/layout.tsx. Subscribe to that class instead of mirroring it in state.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};
const getSnapshot = () => document.documentElement.classList.contains('dark');
// Server render (and hydration) assumes light; the client re-renders with the real value.
const getServerSnapshot = () => false;

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const newTheme = !isDark;

    const apply = () => {
      document.documentElement.classList.toggle('dark', newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    // Cross-fade the whole page in one composited pass (View Transitions API).
    // Falls back to an instant switch when unsupported or reduced motion is requested.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof document.startViewTransition === 'function' && !reduceMotion) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 group flex items-center justify-center w-10 h-10 border border-border bg-surface/50 backdrop-blur-sm hover:border-accent transition-all duration-500 ease-out cursor-pointer select-none"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      suppressHydrationWarning
    >
      {/* Sun icon (light mode) */}
      {!isDark && (
        <svg
          className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
      {/* Moon icon (dark mode) */}
      {isDark && (
        <svg
          className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}

