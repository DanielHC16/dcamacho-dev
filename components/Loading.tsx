'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0">
          {/* Horizontal lines */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-border"
              style={{
                top: `${i * 5}%`,
              }}
            />
          ))}
          {/* Vertical lines */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-border"
              style={{
                left: `${i * 5}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Geometric divider */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-px bg-border"></div>
          <div className="w-2 h-2 bg-accent rotate-45 animate-pulse"></div>
          <div className="w-20 h-px bg-border"></div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-px bg-accent"></div>
            <span className="text-xs text-muted font-mono uppercase tracking-widest">
              Loading{dots}
            </span>
            <div className="w-10 h-px bg-accent"></div>
          </div>
          
          {/* Progress indicator */}
          <div className="w-32 h-px bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-accent animate-loading-bar"></div>
          </div>
        </div>

        {/* Portfolio version */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-border"></div>
          <span className="text-xs text-muted font-mono uppercase tracking-widest">
            Portfolio_v2.01
          </span>
          <div className="w-12 h-px bg-border"></div>
        </div>
      </div>
    </div>
  );
}

