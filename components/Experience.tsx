'use client';

import { useState } from 'react';
import { experiences } from '@/lib/data';

export default function Experience() {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const activeExperience = experiences.find((experience) => experience.id === activeId) ?? experiences[0];

  return (
    <section
      id="experience"
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

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div className="flex items-center justify-center sm:justify-start gap-4 mb-8">
          <div className="w-20 h-px bg-border" />
          <span className="text-xs text-muted font-mono">03</span>
          <div className="w-20 h-px bg-border" />
        </div>

        <div className="flex items-center justify-center sm:justify-start mb-14">
          <span className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground">
            Experience
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 lg:gap-10">
          <div className="border border-border/60 p-6 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-4">
              {experiences.map((experience, index) => (
                <button
                  key={experience.id}
                  type="button"
                  onClick={() => setActiveId(experience.id)}
                  className={`w-full text-left px-4 py-3 transition-colors duration-200 border ${
                    activeId === experience.id
                      ? 'border-accent/60 bg-accent/10'
                      : 'border-border/40 hover:border-border/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rotate-45 border ${
                        activeId === experience.id ? 'bg-accent border-accent' : 'border-border/70'
                      }`}
                    />
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                      {`NODE ${String(index + 1).padStart(2, '0')}`}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-foreground">{experience.title}</p>
                </button>
              ))}
            </div>
          </div>

          <article className="border border-border/60 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <header className="space-y-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted">
                <span>{activeExperience.node}</span>
                <span className="h-1 w-1 rounded-full bg-border/70" />
                <span>{activeExperience.category}</span>
              </div>
              <div className="space-y-3.5">
                <h3 className="text-3xl sm:text-4xl font-light leading-tight text-foreground">
                  {activeExperience.title}
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 tracking-[0.01em]">
                  {activeExperience.subtitle}
                </p>
              </div>
            </header>

            <section className="mt-11">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-9">
                {[
                  { label: 'Location', value: activeExperience.location },
                  { label: 'Period', value: activeExperience.period },
                  { label: 'Company', value: activeExperience.company },
                ].map((item) => (
                  <div key={item.label} className="space-y-2.5">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted/90">{item.label}</p>
                    <p className="text-sm text-foreground/85 leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted/90">Summary</p>
              <p className="mt-4 text-sm sm:text-base text-foreground/80 leading-[1.9] tracking-[0.01em]">
                {activeExperience.summary}
              </p>
            </section>

            <section className="mt-11 border-t border-border/25 pt-8 grid grid-cols-1 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-9 lg:gap-12">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted/90">Highlights</p>
                <ul className="mt-4 space-y-3.5 list-disc pl-5 marker:text-foreground/45">
                  {activeExperience.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm text-foreground/80 leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:pl-5 lg:pl-7 md:border-l md:border-border/20">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted/90">Stack</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {activeExperience.stack.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-xs font-mono tracking-[0.08em] uppercase border border-border/50 text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </section>
  );
}
