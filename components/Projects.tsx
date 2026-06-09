'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiX } from 'react-icons/fi';
import { projects } from '@/lib/data';
import BorderGlow from './BorderGlow';
import type { Project, ProjectImage } from '@/lib/data';

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeGallery, setActiveGallery] = useState<{
    title: string;
    images: ProjectImage[];
    index: number;
  } | null>(null);
  // Per-card image index for the thumbnail slider
  const [cardImageIndices, setCardImageIndices] = useState<Record<number, number>>({});
  // Tracks slide direction for modal carousel entry animation
  const [galleryDir, setGalleryDir] = useState<'next' | 'prev'>('next');
  const isTransitioningRef = useRef(false);

  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const goToSlide = (next: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(next);
      setIsAnimating(false);
    }, 280);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % totalPages);
  const prevSlide = () => goToSlide((currentSlide - 1 + totalPages) % totalPages);


  // Auto-slide card thumbnails every 4 s (staggered so they don't all change at once)
  useEffect(() => {
    if (activeGallery) return;
    const timers: ReturnType<typeof setInterval>[] = [];
    projects.forEach((project, idx) => {
      const imgs = (project.images?.length ? project.images : [project.image]).slice(0, 3);
      if (imgs.length < 2) return;
      const timer = setInterval(() => {
        setCardImageIndices(prev => ({
          ...prev,
          [project.id]: ((prev[project.id] ?? 0) + 1) % imgs.length,
        }));
      }, 4000 + idx * 600);
      timers.push(timer);
    });
    return () => timers.forEach(clearInterval);
  }, [activeGallery]);

  const getProjectImages = (project: Project) =>
    (project.images?.length ? project.images : [project.image]).slice(0, 3);

  const openProjectGallery = (project: Project) => {
    isTransitioningRef.current = false;
    setGalleryDir('next');
    setActiveGallery({
      title: project.title,
      images: getProjectImages(project),
      index: 0,
    });
  };

  const closeGallery = useCallback(() => {
    setActiveGallery(null);
    isTransitioningRef.current = false;
  }, []);

  /** Advance the gallery image with a debounced transition guard */
  const moveGallery = useCallback((step: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setGalleryDir(step > 0 ? 'next' : 'prev');
    setActiveGallery((gallery) => {
      if (!gallery || gallery.images.length < 2) return gallery;
      return {
        ...gallery,
        index: (gallery.index + step + gallery.images.length) % gallery.images.length,
      };
    });
    // Allow next transition after the CSS animation completes (~300 ms)
    setTimeout(() => { isTransitioningRef.current = false; }, 320);
  }, []);

  const currentProjects = projects.slice(
    currentSlide * projectsPerPage,
    (currentSlide + 1) * projectsPerPage
  );
  const activeImage = activeGallery?.images[activeGallery.index];

  useEffect(() => {
    if (!activeGallery) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      closeGallery();
      if (e.key === 'ArrowLeft')   moveGallery(-1);
      if (e.key === 'ArrowRight')  moveGallery(1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeGallery, closeGallery, moveGallery]);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-start justify-center px-10 sm:px-8 md:px-12 lg:px-16 py-16 relative"
      style={{ overflow: 'clip', scrollMarginTop: '5rem' }}
    >
      {/* Background grid */}
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

        {/* Section header */}
        <div className="flex items-center justify-center sm:justify-start gap-4 mb-8">
          <div className="w-20 h-px bg-border" />
          <span className="text-xs text-muted font-mono">02</span>
          <div className="w-20 h-px bg-border" />
        </div>

        <div
          className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4"
          style={{ marginBottom: '3rem' }}
        >
          <span className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground">
            projects
          </span>
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="group w-10 h-10 border border-border hover:border-accent transition-all duration-300 flex items-center justify-center"
              aria-label="Previous projects"
            >
              <FiChevronLeft className="w-4 h-4 text-muted group-hover:text-accent transition-colors duration-300" aria-hidden="true" />
            </button>
            <button
              onClick={nextSlide}
              className="group w-10 h-10 border border-border hover:border-accent transition-all duration-300 flex items-center justify-center"
              aria-label="Next projects"
            >
              <FiChevronRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors duration-300" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Project cards grid */}
        <div
          style={{
            marginBottom: '3rem',
            opacity: isAnimating ? 0 : 1,
            transition: 'opacity 0.28s ease',
          }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {currentProjects.map((project) => {
              const projectImages = getProjectImages(project);
              return (
                <div
                  key={project.id}
                  className="h-[560px] transition-all duration-300 hover:-translate-y-1"
                >
                  <BorderGlow className="h-full">
                    <div className="group flex h-full flex-col">

                      {/* Thumbnail — CSS sliding strip, fixed height for pixel-perfect consistency */}
                      <button
                        type="button"
                        onClick={() => openProjectGallery(project)}
                        className="relative h-[185px] w-full shrink-0 cursor-pointer overflow-hidden border-b border-border/60 bg-border/10 transition-colors duration-300 group-hover:border-accent/60"
                        aria-label={`View ${project.title} images`}
                      >
                        {/* Sliding strip: translates by one full width per step */}
                        <div
                          className="absolute inset-0 flex"
                          style={{
                            transform: `translateX(-${(cardImageIndices[project.id] ?? 0) * 100}%)`,
                            transition: 'transform 0.7s ease-in-out',
                          }}
                        >
                          {projectImages.map((img, i) => (
                            <div key={i} className="relative h-full w-full shrink-0">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(min-width: 768px) 33vw, 100vw"
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.015]"
                              />
                            </div>
                          ))}
                        </div>
                        {/* Pagination dots — tracks current card image */}
                        {projectImages.length > 1 && (
                          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 bg-background/80 border border-border/70 px-3 py-2 backdrop-blur-sm">
                            {projectImages.map((_, imageIndex) => (
                              <span
                                key={imageIndex}
                                className={`h-[3px] rounded-full transition-all duration-300 ${
                                  imageIndex === (cardImageIndices[project.id] ?? 0)
                                    ? 'w-6 bg-accent'
                                    : 'w-3 bg-foreground/30'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </button>

                      {/* Card body */}
                      <div className="flex flex-1 flex-col" style={{ padding: '1.5rem', gap: '1rem' }}>
                        <h3
                          className="text-[1.2rem] sm:text-[1.3rem] font-medium tracking-tight leading-snug text-foreground group-hover:text-accent transition-colors duration-300"
                          style={{ minHeight: '2.5rem' }}
                        >
                          {project.title}
                        </h3>

                        <p
                          className="text-sm leading-relaxed text-foreground/80"
                          style={{ minHeight: '4rem' }}
                        >
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-flex items-center border border-border bg-surface font-mono text-[0.68rem] text-muted hover:border-accent hover:text-accent transition-colors duration-300"
                              style={{ padding: '0.35rem 0.75rem' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions — each button only renders when its link exists;
                            solo button stretches full width automatically via flex-1 */}
                        <div
                          className="flex gap-3 border-t border-border/60"
                          style={{ marginTop: 'auto', paddingTop: '1.25rem' }}
                        >
                          {project.links.demo && (
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex flex-1 min-h-11 items-center justify-center gap-2 border border-border px-5 text-[0.65rem] uppercase tracking-widest font-light text-muted hover:border-accent hover:text-accent transition-colors duration-300"
                            >
                              <FiExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                              View Project
                            </a>
                          )}
                          {project.links.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.title} GitHub repository`}
                              className={`inline-flex flex-1 min-h-11 items-center justify-center gap-2 border border-border text-muted hover:border-accent hover:text-accent transition-colors duration-300 ${
                                project.links.demo
                                  ? '' // side-by-side: icon only
                                  : 'px-5 text-[0.65rem] uppercase tracking-widest font-light' // solo: full label
                              }`}
                            >
                              <FaGithub className="w-4 h-4" aria-hidden="true" />
                              {!project.links.demo && <span>GitHub</span>}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </BorderGlow>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Page indicator ───────────────────────────────────────
            h-[3px] pill bars. Active = accent. Inactive = explicit
            bg-black/30 in light mode, dark:bg-white/30 in dark — so
            both themes have clearly visible bars.
        ─────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-3" style={{ marginTop: '3rem' }}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to page ${index + 1}`}
              style={{
                height: '3px',
                borderRadius: '9999px',
                width: currentSlide === index ? '2.5rem' : '1.5rem',
                backgroundColor: currentSlide === index ? 'var(--accent)' : '#71717a',
                transition: 'width 0.5s ease, background-color 0.5s ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Image viewer modal ─────────────────────────────────
          Dark overlay, carousel with smooth slide animation.
          `key={activeGallery.index}` on the image wrapper causes
          React to remount it on index change → CSS entry anim plays.
      ───────────────────────────────────────────────────────── */}
      {activeGallery && activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-4 sm:px-8 py-8"
          style={{ backgroundColor: 'rgba(10, 10, 12, 0.88)' }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeGallery.title} image viewer`}
          onClick={closeGallery}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div className="flex items-end justify-between mb-4 px-0.5">
              <div>
                <p className="text-[10px] font-mono tracking-[0.32em] text-white/45 uppercase mb-1.5">
                  {String(activeGallery.index + 1).padStart(2, '0')}&ensp;/&ensp;{String(activeGallery.images.length).padStart(2, '0')}
                </p>
                <h3 className="text-lg sm:text-xl font-light tracking-tight text-white/90">
                  {activeGallery.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeGallery}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/20 text-white/50 hover:border-accent hover:text-accent transition-colors duration-300"
                aria-label="Close image viewer"
              >
                <FiX className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* ── Image stage ── */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10 bg-black/20">
              {/*
                key={activeGallery.index} → remounts on every index change,
                triggering the CSS entry animation defined in globals.css.
              */}
              <div
                key={activeGallery.index}
                className="absolute inset-0"
                style={{
                  animation: `${
                    galleryDir === 'next'
                      ? 'galleryEnterFromRight'
                      : 'galleryEnterFromLeft'
                  } 0.3s ease both`,
                }}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(min-width: 1536px) 1200px, (min-width: 1024px) 90vw, 100vw"
                  quality={100}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Prev / Next */}
              {activeGallery.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => moveGallery(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/40 text-white/60 backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveGallery(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/40 text-white/60 backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent"
                    aria-label="Next image"
                  >
                    <FiChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* ── Dot indicators ── */}
            {activeGallery.images.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-5">
                {activeGallery.images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      const step = i - activeGallery.index;
                      if (step !== 0) moveGallery(step);
                    }}
                    className={`h-[2px] transition-all duration-500 ${
                      i === activeGallery.index
                        ? 'w-10 bg-accent'
                        : 'w-5 bg-white/25 hover:w-7 hover:bg-accent/70'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
