'use client';

import { useState, useEffect } from 'react';
import { personalInfo } from '@/lib/data';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
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
        const scrollThreshold = window.innerWidth < 640 ? 50 : 100;
        setScrolled(window.scrollY > scrollThreshold);

        const sections = ['hero', 'about', 'projects', 'experiences', 'skills', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            const threshold = window.innerWidth < 640 ? 50 : 100;
            return rect.top <= threshold && rect.bottom >= threshold;
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
    { id: 'experiences', label: '03', name: 'Experience' },
    { id: 'skills', label: '04', name: 'Skills' },
    { id: 'contact', label: '05', name: 'Contact' },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-10 sm:px-8 md:px-16 lg:px-24 xl:px-32"
      aria-label="Hero section"
    >

      {/* ── Side Navigation ─────────────────────────────── */}
      <nav
        className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden xl:block"
        aria-label="Main navigation"
      >
        <div className="flex flex-col items-end gap-5">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-center gap-2.5 transition-all duration-300"
              aria-label={`Navigate to ${item.name} section`}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-muted">
                {item.name}
              </span>
              <div className="flex items-center gap-2">
                <div className="h-px transition-all duration-300 w-4 bg-border group-hover:w-6 group-hover:bg-accent" />
                <span className="text-[10px] font-mono transition-colors duration-300 text-muted group-hover:text-accent">
                  {item.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </nav>

      {/* ── Animated background grid ──────────────────────── */}
      <div className="absolute inset-0 opacity-25" aria-hidden="true">
        <div className="absolute inset-0">
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

      {/* ── Floating geometric shapes ────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        >
          <div className="w-2 h-2 bg-accent rotate-45 animate-float" />
        </div>
        <div
          className="absolute bottom-1/3 right-1/3"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        >
          <div className="w-3 h-3 border border-muted animate-float-reverse" />
        </div>
        <div
          className="absolute top-1/2 right-1/6"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        >
          <div className="w-1.5 h-1.5 bg-muted animate-float" />
        </div>
        <div
          className="absolute top-1/3 right-1/2"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) rotate(${mousePosition.x * 45}deg)`,
            transition: 'transform 0.6s ease-out',
          }}
        >
          <div className="w-2 h-2 border border-muted/50 animate-float-reverse" />
        </div>
      </div>

      {/* ── Hero Content ─────────────────────────────────── */}
      {/*
        All children in this stack are block-level with no left offset,
        so every text element shares the exact same left edge.
      */}
      <div className={`relative z-10 w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>

        {/* 1. Pre-title ─────────────────────────────────── */}
        {/*
          No leading accent line — text starts flush with the name below.
          A short accent line trails the text to keep the decorative feel.
        */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10 md:mb-12">
          <span className="text-[10px] sm:text-xs text-muted font-mono uppercase tracking-[0.22em] select-none">
            Portfolio_v2.02&ensp;&#x2F;&#x2F;&ensp;
          </span>
          <div className="flex-1 h-px bg-border max-w-[4rem]" />
        </div>

        {/* 2. Name + hook — all in one left-aligned block ── */}
        <div className="relative mb-8 sm:mb-10">
          {/* Corner accent brackets */}
          <div className="absolute -top-5 -left-3 w-5 h-5 border-l border-t border-border/60" aria-hidden="true" />
          <div className="absolute -top-5 -right-3 w-5 h-5 border-r border-t border-border/60" aria-hidden="true" />
          <div className="absolute -bottom-5 -left-3 w-5 h-5 border-l border-b border-border/60" aria-hidden="true" />
          <div className="absolute -bottom-5 -right-3 w-5 h-5 border-r border-b border-border/60" aria-hidden="true" />

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[6rem] font-extralight tracking-tight text-foreground leading-[1.0] mb-4 sm:mb-5">
            Daniel Camacho
          </h1>

          {/* Hook sub-headline */}
          <p className="text-lg sm:text-xl md:text-1xl text-muted font-light tracking-tight leading-snug">
            Software engineer building scalable architecture and clean code.
            <br className="hidden sm:block" />
            Every system is structured, thoughtful, and built with intentional detail.
          </p>
        </div>

        {/* 3. Download Resume ────────────────────────────────── */}
        <div className="mt-10 sm:mt-12">
          <a
            href="/resume/CAMACHO DH, C. - RESUME 2026.pdf"
            download="CAMACHO_Daniel_Resume_2026.pdf"
            className="group inline-flex items-center gap-4 border border-border px-8 py-4 text-xs font-mono uppercase tracking-widest text-muted hover:border-accent hover:text-accent transition-all duration-300"
            aria-label="Download Daniel Camacho's resume"
          >
            {/* Download icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>

            Download Resume

            <span className="block h-px w-5 bg-border group-hover:bg-accent group-hover:w-8 transition-all duration-300" />
          </a>
        </div>

      </div>

      {/* ── Scroll Indicator ─────────────────────────────── */}
      <div
        className={`scroll-indicator-mobile absolute bottom-10 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-500 z-20 ${scrolled ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        aria-hidden="true"
      >
        <span className="text-[10px] text-muted font-mono uppercase tracking-widest rotate-90 select-none">
          Scroll
        </span>
        <div className="w-px h-10 sm:h-12 md:h-16 bg-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-accent animate-scroll-line" />
        </div>
      </div>

    </section>
  );
}
