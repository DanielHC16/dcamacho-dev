'use client';

import { useState } from 'react';
import { experiences, type Experience } from '@/lib/data';

type GraphPoint = {
  x: number;
  y: number;
};

type GraphLayout = {
  points: GraphPoint[];
  rows: number;
};

const SELECTABLE_NODE_LIMIT = 3;
const DETAIL_LABEL_CLASSNAME = 'text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-foreground/55';

const ambientNodes = [
  { x: 12, y: 28, size: 8, className: 'animate-float', delay: '0s', duration: '8s' },
  { x: 34, y: 16, size: 10, className: 'animate-float-reverse', delay: '0.9s', duration: '10s' },
  { x: 66, y: 80, size: 8, className: 'animate-float', delay: '1.8s', duration: '9s' },
  { x: 88, y: 24, size: 9, className: 'animate-float-reverse', delay: '1.1s', duration: '11s' },
  { x: 80, y: 86, size: 7, className: 'animate-float', delay: '2.2s', duration: '8.5s' },
];

function getGraphLayout(count: number): GraphLayout {
  if (count <= 3) {
    return {
      rows: 1,
      points: [
        { x: 20, y: 58 },
        { x: 48, y: 46 },
        { x: 78, y: 56 },
      ].slice(0, count),
    };
  }

  const columns = Math.min(count, 4);
  const rows = Math.ceil(count / columns);
  const xStart = 18;
  const xEnd = 82;
  const yStart = 22;
  const yEnd = 78;
  const rowGap = rows === 1 ? 0 : (yEnd - yStart) / (rows - 1);

  const points = Array.from({ length: count }, (_, index) => {
    const row = Math.floor(index / columns);
    const indexInRow = index % columns;
    const itemsInRow = row === rows - 1 && count % columns !== 0 ? count % columns : columns;
    const directionIndex = row % 2 === 0 ? indexInRow : itemsInRow - 1 - indexInRow;
    const x = itemsInRow === 1
      ? 50
      : xStart + (directionIndex * (xEnd - xStart)) / (itemsInRow - 1);
    const yOffset = directionIndex % 2 === 0 ? -3.5 : 3.5;

    return {
      x,
      y: yStart + row * rowGap + yOffset,
    };
  });

  return { points, rows };
}

function getCurvePath(start: GraphPoint, end: GraphPoint, index: number) {
  const controlX = (start.x + end.x) / 2;
  const controlY = index % 2 === 0
    ? Math.min(start.y, end.y) - 12
    : Math.max(start.y, end.y) + 12;

  return `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
}

function getNodeNumber(experience: Experience, index: number) {
  return experience.nodeNumber ?? index + 1;
}

export default function Experiences() {
  const [activeIndex, setActiveIndex] = useState(() => {
    const defaultActiveIndex = experiences.findIndex((experience) => experience.defaultActive);
    return defaultActiveIndex === -1 ? 0 : defaultActiveIndex;
  });

  if (experiences.length === 0) {
    return (
      <section
        id="experiences"
        className="min-h-screen flex items-center justify-center px-10 sm:px-8 md:px-12 lg:px-16 py-24 relative overflow-hidden"
      >
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

        <div className="relative z-10 max-w-4xl w-full mx-auto">
          <div className="flex items-center justify-center sm:justify-start gap-4 mb-8">
            <div className="w-20 h-px bg-border" />
            <span className="text-xs text-muted font-mono">03</span>
            <div className="w-20 h-px bg-border" />
          </div>

          <div className="border border-border bg-surface/80 backdrop-blur-sm p-8 sm:p-12 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground">
              Experience_Network
            </span>
            <p className="text-2xl sm:text-3xl font-extralight text-foreground mt-5 mb-4">
              Add entries to the <span className="font-mono text-accent">experiences</span> array in
              <span className="font-mono text-accent"> lib/data.ts</span> to populate this section.
            </p>
            <p className="text-sm sm:text-base text-muted font-light max-w-2xl leading-relaxed">
              Each entry becomes a node in the graph and its details appear in the focus panel.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const activeExperience = experiences[activeIndex] ?? experiences[0];
  const { points: graphPoints } = getGraphLayout(experiences.length);
  const activeNodeNumber = getNodeNumber(activeExperience, activeIndex);

  return (
    <section
      id="experiences"
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-24 relative overflow-hidden"
    >
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

      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 34%), radial-gradient(circle at 80% 78%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 30%)',
        }}
      />

      <div className="relative z-10 max-w-[1320px] w-full mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8 sm:justify-start xl:mx-auto xl:w-[1292px]">
          <div className="w-20 h-px bg-border" />
          <span className="text-xs text-muted font-mono">03</span>
          <div className="w-20 h-px bg-border" />
        </div>

        <div className="mb-6 max-w-xl xl:mx-auto xl:w-[1292px] xl:max-w-none">
          <span className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground">
            Experience_Network
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extralight tracking-tight text-foreground leading-[1.05] mt-3 uppercase">
            Experience
          </h2>
          <p className="text-sm text-muted font-light mt-3 max-w-md leading-relaxed">
            Select a node to inspect the corresponding role and details.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[500px_760px] xl:justify-center">
          
          {/* LEFT CARD - GRAPH */}
          <div
            className="relative flex h-[620px] flex-col overflow-hidden border border-border/80 bg-surface/78 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--border)_60%,transparent)] backdrop-blur-sm"
            style={{ width: '100%' }}
          >
            {/* Top Header */}
            <div className="flex items-center justify-between border-b border-border/40 px-8 py-6 lg:px-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-accent" />
                <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-muted">
                  Interactive Graph
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-muted">
                {String(experiences.length).padStart(2, '0')} Nodes
              </span>
            </div>

            {/* Canvas Area */}
            <div className="relative flex-1 overflow-hidden">
              <div className="absolute inset-x-5 inset-y-6 sm:inset-x-6 sm:inset-y-7">
                <div
                  className="absolute inset-0 opacity-75"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, color-mix(in srgb, var(--border) 58%, transparent) 1px, transparent 1px),
                      linear-gradient(to bottom, color-mix(in srgb, var(--border) 58%, transparent) 1px, transparent 1px)
                    `,
                    backgroundSize: '5rem 5rem',
                  }}
                />

                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="experience-line" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="var(--border)" />
                      <stop offset="50%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="var(--border)" />
                    </linearGradient>
                  </defs>

                  {graphPoints.map((point, index) => {
                    const nextPoint = graphPoints[index + 1];
                    if (!nextPoint) return null;

                    return (
                      <path
                        key={`path-${index}`}
                        d={getCurvePath(point, nextPoint, index)}
                        fill="none"
                        stroke="url(#experience-line)"
                        strokeOpacity={index === activeIndex || index + 1 === activeIndex ? '0.92' : '0.48'}
                        strokeWidth="0.38"
                        strokeDasharray={index === activeIndex || index + 1 === activeIndex ? '0' : '1.2 2'}
                      />
                    );
                  })}
                </svg>

                {ambientNodes.map((point, index) => (
                  <div
                    key={`ambient-${index}`}
                    className={`pointer-events-none absolute rounded-full bg-border/70 ${point.className}`}
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      width: `${point.size}px`,
                      height: `${point.size}px`,
                      animationDelay: point.delay,
                      animationDuration: point.duration,
                    }}
                  />
                ))}

                {experiences.map((experience, index) => {
                  const point = graphPoints[index];
                  const isSelected = index === activeIndex;
                  const isSelectable = getNodeNumber(experience, index) <= SELECTABLE_NODE_LIMIT;

                  return (
                    <button
                      key={experience.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-pressed={isSelected}
                      aria-label={`Show details for node ${getNodeNumber(experience, index)}: ${experience.title}`}
                      className="group absolute -translate-x-1/2 -translate-y-10 flex flex-col items-center gap-2"
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    >
                      <span className="relative grid place-items-center h-20 w-20">
                        {isSelected && (
                          <span className="pointer-events-none absolute inset-1 rounded-full bg-accent/20 blur-2xl" />
                        )}

                        {isSelectable && (
                          <>
                            <span className="pointer-events-none absolute inset-1 rounded-full border border-accent/28 animate-node-available-ring" />
                            <span
                              className="pointer-events-none absolute inset-1 rounded-full border border-accent/16 animate-node-available-ring"
                              style={{ animationDelay: `${index * 0.45}s` }}
                            />
                          </>
                        )}

                        {isSelected && (
                          <span className="pointer-events-none absolute inset-0 rounded-full border border-accent/32 animate-node-selected-ring" />
                        )}

                        <span
                          className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                            isSelected
                              ? 'border-accent bg-background shadow-[0_0_0_12px_color-mix(in_srgb,var(--accent)_10%,transparent)]'
                              : isSelectable
                                ? 'border-accent/60 bg-background/96 hover:border-accent'
                                : 'border-border bg-background/92 hover:border-accent'
                          }`}
                        >
                          <span
                            className={`absolute rounded-full border transition-all duration-300 ${
                              isSelected
                                ? 'inset-[-0.55rem] border-accent/28'
                                : isSelectable
                                  ? '-inset-2 border-accent/24 group-hover:border-accent/34'
                                  : 'inset-[-0.45rem] border-border/58 group-hover:border-accent/26'
                            }`}
                          />
                          <span
                            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                              isSelected
                                ? 'bg-accent animate-node-core-pulse'
                                : isSelectable
                                  ? 'bg-accent/78 animate-node-idle-pulse group-hover:bg-accent'
                                  : 'bg-muted/60 group-hover:bg-accent'
                            }`}
                          />
                        </span>
                      </span>

                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.32em] transition-colors duration-300 ${
                          isSelected ? 'text-accent' : isSelectable ? 'text-foreground/72' : 'text-muted'
                        }`}
                      >
                        {String(getNodeNumber(experience, index)).padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="absolute inset-x-0 bottom-14 flex items-center justify-center">
                <div className="flex items-center justify-center gap-2.5 bg-surface/80 px-4 py-2 backdrop-blur-sm">
                  {experiences.map((experience, index) => {
                    const isSelected = index === activeIndex;
                    return (
                      <button
                        key={experience.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 w-8 transition-colors duration-300 ${
                          isSelected ? 'bg-accent' : 'bg-border hover:bg-accent/70'
                        }`}
                        aria-label={`Focus experience ${getNodeNumber(experience, index)}: ${experience.title}`}
                        aria-pressed={isSelected}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div
            key={activeExperience.id}
            className="h-[620px] overflow-hidden border border-border/80 bg-surface shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--border)_60%,transparent)] backdrop-blur-sm"
            style={{
              width: '100%',
              padding: '2rem',
            }}
          >
            <div
              className="grid h-full grid-rows-[7.75rem_4.75rem_5.75rem_minmax(0,1fr)] gap-7"
              style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
            >
              <header>
                <div className="flex items-center gap-4" style={{ marginBottom: '1.25rem' }}>
                  <span className="font-mono text-xs text-muted">
                    {String(activeNodeNumber).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                  <span className={DETAIL_LABEL_CLASSNAME}>
                    {activeExperience.type}
                  </span>
                </div>

                <h3 className="text-[2rem] font-light leading-tight text-foreground sm:text-[2.25rem] lg:text-[2.45rem]">
                  {activeExperience.title}
                </h3>
                <p
                  className="max-w-[34rem] text-sm font-normal text-foreground/80"
                  style={{ marginTop: '0.75rem', lineHeight: '1.7' }}
                >
                  {activeExperience.company}
                </p>
              </header>

              <section className="grid grid-cols-1 gap-7 sm:grid-cols-3">
                <div>
                  <span className={`block ${DETAIL_LABEL_CLASSNAME}`}>
                    Location
                  </span>
                  <p
                    className="text-sm font-normal text-foreground/90"
                    style={{ marginTop: '0.85rem', lineHeight: '1.6' }}
                  >
                    {activeExperience.location}
                  </p>
                </div>

                <div>
                  <span className={`block ${DETAIL_LABEL_CLASSNAME}`}>
                    Period
                  </span>
                  <p
                    className="text-sm font-normal text-foreground/90"
                    style={{ marginTop: '0.85rem', lineHeight: '1.6' }}
                  >
                    {activeExperience.period}
                  </p>
                </div>

                <div>
                  <span className={`block ${DETAIL_LABEL_CLASSNAME}`}>
                    Company
                  </span>
                  <p
                    className="text-sm font-normal text-foreground/90"
                    style={{ marginTop: '0.85rem', lineHeight: '1.6' }}
                  >
                    {activeExperience.company}
                  </p>
                </div>
              </section>

              <section>
                <span className={DETAIL_LABEL_CLASSNAME}>
                  Summary
                </span>
                <p
                  className="max-w-[42rem] text-sm font-normal text-foreground/90"
                  style={{ marginTop: '0.85rem', lineHeight: '1.7' }}
                >
                  {activeExperience.summary}
                </p>
              </section>

              <section className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
                <div>
                  <span className={DETAIL_LABEL_CLASSNAME}>
                    Highlights
                  </span>

                  <ul
                    className="list-outside list-disc space-y-2.5 pl-5 marker:text-accent"
                    style={{ marginTop: '0.85rem' }}
                  >
                    {activeExperience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="pl-2 text-sm font-normal text-foreground/90"
                        style={{ lineHeight: '1.65' }}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className={DETAIL_LABEL_CLASSNAME}>
                    Stack
                  </span>

                  <div
                    className="grid grid-cols-2 gap-2.5"
                    style={{ marginTop: '0.85rem' }}
                  >
                    {activeExperience.stack.map((item) => (
                      <span
                        key={item}
                        className="flex h-8 items-center justify-center border border-border bg-surface px-3 font-mono text-xs text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
