'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { id: 'hero',        label: '00', name: 'Home'       },
  { id: 'about',       label: '01', name: 'About'      },
  { id: 'projects',    label: '02', name: 'Work'       },
  { id: 'experiences', label: '03', name: 'Experience' },
  { id: 'skills',      label: '04', name: 'Skills'     },
  { id: 'contact',     label: '05', name: 'Contact'    },
];

export default function MobileNav() {
  const [open, setOpen]                   = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted]             = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Track active section
  useEffect(() => {
    const onScroll = () => {
      const found = navItems.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 100 && bottom >= 100;
      });
      if (found) setActiveSection(found.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 420);
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── Hamburger button ───────────────────────────────────────
          Same visual language as ThemeToggle (border, backdrop-blur).
          Visible only below xl where the side-nav is hidden.
      ─────────────────────────────────────────────────────────── */}
      <button
        id="mobile-nav-toggle"
        onClick={() => setOpen(o => !o)}
        className="fixed top-4 left-4 z-[70] xl:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 border border-border bg-surface/60 backdrop-blur-sm hover:border-accent transition-all duration-300 cursor-pointer select-none"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <span
          style={{
            display: 'block', width: '15px', height: '1px',
            backgroundColor: 'var(--muted)',
            transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), background-color 0.2s',
            transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
          }}
        />
        <span
          style={{
            display: 'block', width: '15px', height: '1px',
            backgroundColor: 'var(--muted)',
            transition: 'opacity 0.2s, background-color 0.2s',
            opacity: open ? 0 : 1,
          }}
        />
        <span
          style={{
            display: 'block', width: '15px', height: '1px',
            backgroundColor: 'var(--muted)',
            transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), background-color 0.2s',
            transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* ── Full-screen overlay menu ────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="xl:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 65,
          backgroundColor: 'var(--background)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Decorative background grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }}>
          {[...Array(10)].map((_, i) => (
            <div key={`h${i}`} style={{ position: 'absolute', width: '100%', height: '1px', top: `${i * 10}%`, backgroundColor: 'var(--border)' }} />
          ))}
          {[...Array(10)].map((_, i) => (
            <div key={`v${i}`} style={{ position: 'absolute', height: '100%', width: '1px', left: `${i * 10}%`, backgroundColor: 'var(--border)' }} />
          ))}
        </div>

        {/* Top label */}
        <div style={{ position: 'absolute', top: '1.25rem', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Portfolio_v2.02&ensp;//&ensp;Navigation
          </span>
        </div>

        {/* Nav items */}
        <nav style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '340px', padding: '0 2rem' }}>
          {navItems.map((item, i) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.1rem 0',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  // Stagger entrance
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `opacity 0.4s cubic-bezier(0.22,1,0.36,1) ${80 + i * 55}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${80 + i * 55}ms`,
                }}
              >
                {/* Number label */}
                <span style={{
                  fontSize: '9px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.15em',
                  color: isActive ? 'var(--accent)' : 'var(--muted)',
                  minWidth: '20px',
                  flexShrink: 0,
                  transition: 'color 0.25s',
                }}>
                  {item.label}
                </span>

                {/* Accent bar */}
                <div style={{
                  width: '1px',
                  height: '22px',
                  flexShrink: 0,
                  backgroundColor: isActive ? 'var(--accent)' : 'var(--border)',
                  transition: 'background-color 0.25s',
                }} />

                {/* Section name */}
                <span style={{
                  fontSize: '1.75rem',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: isActive ? 'var(--foreground)' : 'var(--muted)',
                  transition: 'color 0.25s',
                  lineHeight: 1,
                }}>
                  {item.name}
                </span>

                {/* Active accent dot */}
                {isActive && (
                  <div style={{
                    marginLeft: 'auto',
                    width: '5px',
                    height: '5px',
                    backgroundColor: 'var(--accent)',
                    transform: 'rotate(45deg)',
                    flexShrink: 0,
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom label */}
        <div style={{
          position: 'absolute', bottom: '1.5rem', left: '50%',
          transform: 'translateX(-50%)', whiteSpace: 'nowrap',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.4s 0.35s',
        }}>
          <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Daniel Camacho
          </span>
        </div>
      </div>
    </>
  );
}
