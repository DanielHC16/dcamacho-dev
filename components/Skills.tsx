'use client';

import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { skills, softSkills } from '@/lib/data';

const VIEWS = ['TECHNICAL_SKILLS', 'SOFT_SKILLS'] as const;
type ViewType = typeof VIEWS[number];

const skillsData: Record<ViewType, Record<string, string[]>> = {
  TECHNICAL_SKILLS: skills as Record<string, string[]>,
  SOFT_SKILLS: softSkills as Record<string, string[]>,
};

export default function Skills() {
  const [currentIndex, setCurrentIndex]             = useState(0);
  const [isAnimating, setIsAnimating]               = useState(false);
  const [animDir, setAnimDir]                       = useState<'left' | 'right'>('right');
  const [activeMobileCategory, setActiveMobileCategory] = useState(0);
  // Track previous view so we can reset mobile category on view change
  const [prevIndex, setPrevIndex]                   = useState(0);

  const currentView = VIEWS[currentIndex];
  const data        = skillsData[currentView];
  const categories  = Object.keys(data);

  // Reset mobile category tab when the top-level view changes
  useEffect(() => {
    if (currentIndex !== prevIndex) {
      setActiveMobileCategory(0);
      setPrevIndex(currentIndex);
    }
  }, [currentIndex, prevIndex]);

  const navigate = (dir: 'prev' | 'next') => {
    if (isAnimating) return;
    const nextIndex =
      dir === 'next'
        ? (currentIndex + 1) % VIEWS.length
        : (currentIndex - 1 + VIEWS.length) % VIEWS.length;
    setAnimDir(dir === 'next' ? 'right' : 'left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsAnimating(false);
    }, 280);
  };

  const goTo = (i: number) => {
    if (i === currentIndex || isAnimating) return;
    setAnimDir(i > currentIndex ? 'right' : 'left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(i);
      setIsAnimating(false);
    }, 280);
  };

  const activeCategorySkills = data[categories[activeMobileCategory]] ?? [];

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-10 sm:px-8 md:px-12 lg:px-16 py-24 relative overflow-hidden"
    >
      {/* ── Background Grid ─────────────────────────────────────── */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-border" style={{ top: `${i * 5}%` }} />
          ))}
          {[...Array(20)].map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-border" style={{ left: `${i * 5}%` }} />
          ))}
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl w-full mx-auto">

        {/* Section number divider */}
        <div className="flex items-center justify-center sm:justify-start gap-4 mb-8">
          <div className="w-20 h-px bg-border" />
          <span className="text-xs text-muted font-mono">04</span>
          <div className="w-20 h-px bg-border" />
        </div>

        {/* Section title */}
        <div className="flex items-center justify-center sm:justify-start" style={{ marginBottom: '3.5rem' }}>
          <span
            key={currentView}
            className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground skills-label-enter"
          >
            {currentView}
          </span>
        </div>

        {/* ─────────────────────────────────────────────────────────
            MOBILE LAYOUT  (hidden on sm+)
            Category pill tabs → focused skill list for active tab
        ───────────────────────────────────────────────────────── */}
        <div
          className="sm:hidden"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? `translateX(${animDir === 'right' ? '-14px' : '14px'})`
              : 'translateX(0)',
            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Category pill tabs — centered, horizontal scroll */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '1rem',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {categories.map((cat, i) => {
              const isActive = i === activeMobileCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveMobileCategory(i)}
                  style={{
                    flexShrink: 0,
                    padding: '0.5rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                    color: isActive ? 'var(--accent)' : 'var(--muted)',
                    background: isActive ? 'color-mix(in srgb, var(--accent) 8%, transparent)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    whiteSpace: 'nowrap',
                  }}
                  aria-pressed={isActive}
                  aria-label={`Show ${cat} skills`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Centered accent rule */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0 1.75rem' }}>
            <div style={{ width: '2rem', height: '1px', backgroundColor: 'var(--accent)' }} />
          </div>

          {/* Skill items — About-style diamond bullets, centered */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {activeCategorySkills.map((skill, i) => (
              <div
                key={skill}
                className="group/item"
                style={{
                  animation: `skillItemIn 0.3s cubic-bezier(0.22,1,0.36,1) ${i * 40}ms both`,
                }}
              >
                {/* Diamond + line — left side / title / line + diamond — right side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', marginBottom: '0.4rem' }}>
                  <div
                    style={{
                      width: '7px', height: '7px',
                      border: '1px solid var(--accent)',
                      transform: 'rotate(45deg)',
                      flexShrink: 0,
                      transition: 'background-color 0.2s',
                    }}
                    className="group-hover/item:bg-accent"
                  />
                  <div style={{ width: '2rem', height: '1px', backgroundColor: 'var(--border)', flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      color: 'var(--foreground)',
                      letterSpacing: '0.01em',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                    className="group-hover/item:text-accent transition-colors duration-300"
                  >
                    {skill}
                  </span>
                  <div style={{ width: '2rem', height: '1px', backgroundColor: 'var(--border)', flexShrink: 0 }} />
                  <div
                    style={{
                      width: '7px', height: '7px',
                      border: '1px solid var(--accent)',
                      transform: 'rotate(45deg)',
                      flexShrink: 0,
                      transition: 'background-color 0.2s',
                    }}
                    className="group-hover/item:bg-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            DESKTOP LAYOUT  (hidden on mobile — original untouched)
        ───────────────────────────────────────────────────────── */}
        <div
          className="hidden sm:block"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? `translateX(${animDir === 'right' ? '-14px' : '14px'})`
              : 'translateX(0)',
            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            minHeight: '320px',
          }}
        >
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 px-0"
            style={{ gap: '3.5rem' }}
          >
            {Object.entries(data).map(([category, items], index) => (
              <div key={`${currentView}-${index}`} className="group flex flex-col items-start">
                {/* Category heading + rule */}
                <div className="flex flex-col items-start" style={{ marginBottom: '1.75rem' }}>
                  <div className="flex items-center gap-3" style={{ marginBottom: '0.875rem' }}>
                    <h3 className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
                      {category}
                    </h3>
                  </div>
                  <div className="w-12 h-px bg-border" />
                </div>

                {/* Skill items */}
                <div className="flex flex-col items-start" style={{ gap: '0.875rem' }}>
                  {items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group/item">
                      <span className="text-sm text-muted font-light group-hover/item:text-accent transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom controls: arrows + dots (shared) ──────────── */}
        <div className="flex flex-col items-center gap-3" style={{ marginTop: '3rem' }}>

          {/* Row 1: < > arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('prev')}
              className="group flex h-7 w-7 items-center justify-center border border-border hover:border-accent transition-all duration-300"
              aria-label="Previous skill set"
            >
              <FiChevronLeft className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors duration-300" aria-hidden="true" />
            </button>
            <button
              onClick={() => navigate('next')}
              className="group flex h-7 w-7 items-center justify-center border border-border hover:border-accent transition-all duration-300"
              aria-label="Next skill set"
            >
              <FiChevronRight className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors duration-300" aria-hidden="true" />
            </button>
          </div>

          {/* Row 2: pill indicators */}
          <div className="flex items-center gap-3">
            {VIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to ${VIEWS[i]}`}
                style={{
                  height: '3px',
                  borderRadius: '9999px',
                  width: currentIndex === i ? '2.5rem' : '1.5rem',
                  backgroundColor: currentIndex === i ? 'var(--accent)' : '#71717a',
                  transition: 'width 0.5s ease, background-color 0.5s ease',
                  flexShrink: 0,
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
