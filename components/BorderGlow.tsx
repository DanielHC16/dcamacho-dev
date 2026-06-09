'use client';

import { useRef, useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import styles from './BorderGlow.module.css';

type GlowStyle = CSSProperties & Record<`--${string}`, string | number>;

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
  /** Degrees per frame — controls orbit speed (default 0.6 ≈ 10s/revolution) */
  speed?: number;
}

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 38, s: 40, l: 68 };
  return {
    h: Number.parseFloat(match[1]),
    s: Number.parseFloat(match[2]),
    l: Number.parseFloat(match[3]),
  };
}

function buildGlowVars(glowColor: string, intensity: number): GlowStyle {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  return opacities.reduce<GlowStyle>((vars, opacity, index) => {
    vars[`--glow-color${keys[index]}`] = `hsl(${base} / ${Math.min(opacity * intensity, 100)}%)`;
    return vars;
  }, {});
}

const gradientPositions = [
  '80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%',
] as const;
const gradientKeys = [
  '--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four',
  '--gradient-five', '--gradient-six', '--gradient-seven',
] as const;
const colorMap = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]): GlowStyle {
  return gradientKeys.reduce<GlowStyle>((vars, key, index) => {
    const color = colors[Math.min(colorMap[index], colors.length - 1)];
    vars[key] = `radial-gradient(at ${gradientPositions[index]}, ${color} 0px, transparent 50%)`;
    vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
    return vars;
  }, {});
}

export default function BorderGlow({
  children,
  className = '',
  // Warm gold → matches --accent: #c9b896 (HSL ≈ 38° 30% 69%)
  // Boosted saturation so glow is visible
  glowColor = '46 62 72',       // yellow-gold — warm, visible on both themes, close to dark-mode aesthetic
  backgroundColor = 'var(--surface)',
  borderRadius = 2,
  glowRadius = 44,
  glowIntensity = 1.2,
  coneSpread = 13,
  animated = true,
  // Use CSS vars → auto-adapts light (#c9b896 gold, #6f8f8a teal, #9d88b8 purple)
  //              and dark  (#d6c49e gold, #78c7bd teal, #b59ada lavender)
  colors = ['var(--accent)', 'var(--project-glow-two)', 'var(--project-glow-three)'],
  fillOpacity = 0.06,
  speed = 0.6,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── JS animation loop — bypasses @property CSS Module limitation ── */
  useEffect(() => {
    if (!animated) return;
    const card = cardRef.current;
    if (!card) return;

    // Respect accessibility preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let angle = 0;
    let rafId: number;

    const tick = () => {
      angle = (angle + speed) % 360;
      card.style.setProperty('--cursor-angle', `${angle.toFixed(2)}deg`);
      card.style.setProperty('--cursor-angle-b', `${((angle + 180) % 360).toFixed(2)}deg`);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [animated, speed]);

  const style: GlowStyle = {
    '--card-bg': backgroundColor,
    '--border-radius': `${borderRadius}px`,
    '--glow-padding': `${glowRadius}px`,
    '--cone-spread': coneSpread,
    '--fill-opacity': fillOpacity,
    '--cursor-angle': '0deg',
    '--cursor-angle-b': '180deg',
    ...buildGlowVars(glowColor, glowIntensity),
    // NOTE: gradient vars use CSS vars → no JS-side color resolution needed
    ...buildGradientVars(colors),
  };

  return (
    <div ref={cardRef} className={`${styles.card} ${className}`} style={style}>
      <span className={styles.edgeLight} />
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
