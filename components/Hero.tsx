'use client';

import { useState, useEffect } from 'react';
import { personalInfo } from '@/lib/data';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        });
      });
    };

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrolled(window.scrollY > 100);
        
        // Determine active section
        const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        if (current) setActiveSection(current);
      }, 50);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const navItems = [
    { id: 'hero', label: '00', name: 'Home' },
    { id: 'about', label: '01', name: 'About' },
    { id: 'projects', label: '02', name: 'Work' },
    { id: 'skills', label: '03', name: 'Skills' },
    { id: 'contact', label: '05', name: 'Contact' },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6" aria-label="Hero section">
      {/* Side Navigation */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block" aria-label="Main navigation">
        <div className="flex flex-col items-end gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-center gap-4 transition-all duration-300"
              aria-label={`Navigate to ${item.name} section`}
            >
              <span className={`text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                activeSection === item.id ? 'opacity-100 text-accent' : 'text-muted'
              }`}>
                {item.name}
              </span>
              <div className="flex items-center gap-2">
                <div className={`h-px transition-all duration-300 ${
                  activeSection === item.id ? 'w-8 bg-accent' : 'w-6 bg-border group-hover:w-8 group-hover:bg-accent'
                }`}></div>
                <span className={`text-xs font-mono transition-colors duration-300 ${
                  activeSection === item.id ? 'text-accent' : 'text-muted group-hover:text-accent'
                }`}>
                  {item.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </nav>

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
          className="absolute top-1/2 right-1/6 w-1 h-1 bg-foreground"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div
          className="absolute top-1/3 right-1/2 w-2 h-2 border border-muted"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) rotate(${mousePosition.x * 45}deg)`,
            transition: 'transform 0.6s ease-out',
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
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-foreground leading-none">
              {personalInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted font-light tracking-tight">
              {personalInfo.role}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-muted font-light max-w-xl leading-relaxed">
            {personalInfo.tagline}
          </p>
        </div>
      </div>

      {/* Scroll Indicator with Animation */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-all duration-500 ${
        scrolled ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <span className="text-xs text-muted font-mono uppercase tracking-widest rotate-90">
          Scroll
        </span>
        <div className="w-px h-16 bg-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-accent animate-scroll-line"></div>
        </div>
      </div>
    </section>
  );
}
