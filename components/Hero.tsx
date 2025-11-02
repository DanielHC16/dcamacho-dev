'use client';

import { useState, useEffect } from 'react';
import { personalInfo } from '@/lib/data';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0">
          {/* Horizontal lines */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-border"
              style={{
                top: `${i * 5}%`,
                transform: `translateX(${mousePosition.x * 10}px)`,
                transition: 'transform 0.3s ease-out',
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
                transform: `translateY(${mousePosition.y * 10}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rotate-45"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) rotate(45deg)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-3 h-3 border border-accent"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-1 h-1 bg-foreground"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="space-y-8 animate-fadeIn">
          {/* Label */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-accent"></div>
            <span className="text-xs text-muted font-mono uppercase tracking-widest">
              Portfolio_v2.01
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tighter text-foreground leading-none">
              {personalInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted font-light tracking-wide">
              {personalInfo.role}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-muted font-light max-w-xl leading-relaxed">
            Building elegant solutions through clean code and thoughtful design.
            Passionate about creating exceptional digital experiences.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-6 pt-8">
            <a
              href="#contact"
              className="group relative px-8 py-4 border border-accent hover:bg-accent transition-all duration-300"
            >
              <span className="relative z-10 text-sm uppercase tracking-widest font-light text-foreground group-hover:text-background transition-colors duration-300">
                Get in touch
              </span>
              <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </a>

            <a
              href="#projects"
              className="text-sm uppercase tracking-widest font-light text-muted hover:text-foreground transition-colors duration-300"
            >
              View Work →
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-fadeIn">
        <span className="text-xs text-muted font-mono uppercase tracking-widest rotate-90">
          Scroll
        </span>
        <div className="w-px h-16 bg-border"></div>
      </div>
    </section>
  );
}
