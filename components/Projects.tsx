'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiX,
  FiTerminal,
  FiGlobe,
  FiActivity,
  FiCpu,
  FiCreditCard,
  FiSmartphone,
  FiGitBranch,
  FiCalendar,
  FiLayers,
  FiMaximize2,
} from 'react-icons/fi';
import { projects, type Project, type ProjectImage } from '@/lib/data';

const DETAIL_LABEL_CLASSNAME =
  'text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-foreground/55 font-mono';

function getProjectIcon(project: Project) {
  const title = project.title.toLowerCase();
  const tags = project.tags.join(' ').toLowerCase();

  if (title.includes('portia') || tags.includes('compiler')) {
    return <FiTerminal className="w-4 h-4" aria-hidden="true" />;
  }
  if (title.includes('587') || tags.includes('pwa')) {
    return <FiGlobe className="w-4 h-4" aria-hidden="true" />;
  }
  if (title.includes('medic') || tags.includes('care')) {
    return <FiActivity className="w-4 h-4" aria-hidden="true" />;
  }
  if (title.includes('alvin') || title.includes('queuing') || tags.includes('gemini')) {
    return <FiCpu className="w-4 h-4" aria-hidden="true" />;
  }
  if (title.includes('payflow') || tags.includes('payroll')) {
    return <FiCreditCard className="w-4 h-4" aria-hidden="true" />;
  }
  if (title.includes('tally') || tags.includes('flutter')) {
    return <FiSmartphone className="w-4 h-4" aria-hidden="true" />;
  }
  if (title.includes('gcn') || tags.includes('graph')) {
    return <FiGitBranch className="w-4 h-4" aria-hidden="true" />;
  }
  if (title.includes('saasified') || tags.includes('event')) {
    return <FiCalendar className="w-4 h-4" aria-hidden="true" />;
  }
  return <FiLayers className="w-4 h-4" aria-hidden="true" />;
}

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<number>(() => projects[0]?.id ?? 1);
  const [currentImgIdx, setCurrentImgIdx] = useState<number>(0);
  const [previewDir, setPreviewDir] = useState<'next' | 'prev'>('next');
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [activeGallery, setActiveGallery] = useState<{
    title: string;
    images: ProjectImage[];
    index: number;
  } | null>(null);
  const [galleryDir, setGalleryDir] = useState<'next' | 'prev'>('next');
  const isTransitioningRef = useRef(false);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === activeProjectId) ?? projects[0];
  }, [activeProjectId]);

  const activeProjectIndex = useMemo(() => {
    return projects.findIndex((p) => p.id === activeProject.id);
  }, [activeProject]);

  const activeImages = useMemo(() => {
    if (activeProject.images?.length) return activeProject.images;
    return [activeProject.image];
  }, [activeProject]);

  const changePreviewImage = useCallback(
    (newIdx: number, dir?: 'next' | 'prev') => {
      setPreviewDir(dir ?? (newIdx >= currentImgIdx ? 'next' : 'prev'));
      setCurrentImgIdx(newIdx);
    },
    [currentImgIdx]
  );

  // Auto-play slider for projects with multiple images
  useEffect(() => {
    if (activeImages.length <= 1 || isAutoPlayPaused || activeGallery !== null) return;

    const timer = setInterval(() => {
      setPreviewDir('next');
      setCurrentImgIdx((prev) => (prev + 1) % activeImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [activeImages.length, isAutoPlayPaused, activeGallery]);

  const openProjectGallery = (project: Project, initialIndex = 0) => {
    isTransitioningRef.current = false;
    setGalleryDir('next');
    const imgs = project.images?.length ? project.images : [project.image];
    setActiveGallery({
      title: project.title,
      images: imgs,
      index: initialIndex < imgs.length ? initialIndex : 0,
    });
  };

  const closeGallery = useCallback(() => {
    setActiveGallery(null);
    isTransitioningRef.current = false;
  }, []);

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
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 440);
  }, []);

  useEffect(() => {
    if (!activeGallery) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') moveGallery(-1);
      if (e.key === 'ArrowRight') moveGallery(1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeGallery, closeGallery, moveGallery]);

  const activeModalImage = activeGallery?.images[activeGallery.index];

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center pt-6 sm:pt-8 pb-10 sm:pb-12 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
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
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 34%), radial-gradient(circle at 80% 78%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 30%)',
        }}
      />

      {/* Single shared container — Header and 2-panel grid share exact left edge and max-width */}
      <div className="relative z-10 max-w-[1260px] w-full min-w-0 mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* 1. Global Section Header */}
        <div className="flex items-center justify-center sm:justify-start gap-4 mb-4">
          <div className="w-20 h-px bg-border" />
          <span className="text-xs text-muted font-mono">02</span>
          <div className="w-20 h-px bg-border" />
        </div>

        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground">
            Project_Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extralight tracking-tight text-foreground leading-[1.05] mt-2 uppercase">
            Projects
          </h2>
          <p className="text-sm text-muted font-light mt-2 max-w-md leading-relaxed">
            Select a project unit to inspect its architectural specifications and live preview.
          </p>
        </div>

        {/* 2. Symmetrical Two-Panel Grid (Natural hug height per column) */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[480px_1fr] items-start min-w-0">

          {/* ─────────────────────────────────────────────────────────
              LEFT CARD: Project Directory (Hugs Content Naturally)
          ───────────────────────────────────────────────────────── */}
          <div className="relative flex flex-col overflow-hidden border border-border/80 bg-surface/78 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--border)_60%,transparent)] backdrop-blur-sm min-w-0">
            {/* Card Header Bar */}
            <div className="flex items-center justify-between border-b border-border/40 px-4 sm:px-8 lg:px-10 py-3.5 sm:py-4 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 sm:w-10 h-px bg-accent" />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.32em] text-muted">
                  Project Directory
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.32em] text-muted whitespace-nowrap pl-2">
                {String(projects.length).padStart(2, '0')} Units
              </span>
            </div>

            {/* Unit Directory List — Hugs all items with no empty bottom void */}
            <div className="p-3 sm:p-4 space-y-2 focus:outline-none">
              {projects.map((project, idx) => {
                const isSelected = project.id === activeProject.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      setActiveProjectId(project.id);
                      setCurrentImgIdx(0);
                    }}
                    aria-pressed={isSelected}
                    className={`group relative flex w-full items-center justify-between border p-3 sm:p-3.5 text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-accent bg-background/95 shadow-[0_0_20px_color-mix(in_srgb,var(--accent)_14%,transparent)]'
                        : 'border-border/50 bg-surface/40 hover:border-accent/60 hover:bg-surface/80'
                    }`}
                  >
                    {/* Active Left Gold Accent Bar */}
                    {isSelected && (
                      <span className="absolute inset-y-0 left-0 w-1 bg-accent" />
                    )}

                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      {/* Geometric Icon Container */}
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-300 ${
                          isSelected
                            ? 'border-accent bg-accent/15 text-accent'
                            : 'border-border/60 bg-background/80 text-muted group-hover:border-accent/60 group-hover:text-accent'
                        }`}
                      >
                        {getProjectIcon(project)}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3
                          className={`text-sm font-medium tracking-tight truncate transition-colors duration-300 ${
                            isSelected ? 'text-foreground font-semibold' : 'text-foreground/80 group-hover:text-foreground'
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p
                          className={`font-mono text-[0.68rem] uppercase tracking-wider truncate mt-0.5 transition-colors duration-300 ${
                            isSelected ? 'text-accent font-medium' : 'text-muted group-hover:text-foreground/75'
                          }`}
                        >
                          {project.role ?? project.tags[0]}
                        </p>
                      </div>
                    </div>

                    {/* Unit Index */}
                    <span
                      className={`font-mono text-xs tracking-widest shrink-0 transition-colors duration-300 ${
                        isSelected ? 'text-accent font-semibold' : 'text-muted/60 group-hover:text-muted'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              RIGHT CARD: Project Specification (Panel 2)
          ───────────────────────────────────────────────────────── */}
          <div
            className="border border-border/80 bg-surface shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--border)_60%,transparent)] backdrop-blur-sm min-w-0 flex flex-col justify-between overflow-hidden"
            style={{ width: '100%', padding: '1rem 1.25rem' }}
          >
            <div
              key={activeProject.id}
              className="project-panel-enter flex flex-col justify-between h-full w-full"
            >
              {/* Header Block */}
              <header className="shrink-0">
                <div className="flex items-center gap-4 mb-1.5">
                  <span className="font-mono text-xs text-muted">
                    {String(activeProjectIndex + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                  <span className={DETAIL_LABEL_CLASSNAME}>{activeProject.role ?? 'Software Project'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light leading-tight text-foreground sm:text-[1.75rem] truncate">
                  {activeProject.title}
                </h3>
              </header>

              {/* Constrained Image Mockup Screen — Proportional Aspect Ratio with Object Contain */}
              <div className="relative border border-border/70 bg-black/40 overflow-hidden shadow-md my-2 shrink-0">
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-border/40 bg-surface/90 px-3 py-1 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-border" />
                    <span className="h-2 w-2 rounded-full bg-border" />
                    <span className="h-2 w-2 rounded-full bg-border" />
                    <span className="font-mono text-[10px] text-muted tracking-wider ml-2 truncate max-w-xs">
                      {activeProject.links.demo
                        ? activeProject.links.demo.replace(/^https?:\/\//, '')
                        : `${activeProject.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.local`}
                    </span>
                  </div>
                  {activeImages.length > 1 && (
                    <span className="font-mono text-[10px] text-muted tracking-widest">
                      {currentImgIdx + 1} / {activeImages.length}
                    </span>
                  )}
                </div>

                {/* Viewport Canvas — True Widescreen Aspect Ratio with Object-Contain (No Distortion), Auto-Slider & Hover Inspect */}
                <div
                  onMouseEnter={() => setIsAutoPlayPaused(true)}
                  onMouseLeave={() => setIsAutoPlayPaused(false)}
                  className="relative aspect-[16/9] w-full flex items-center justify-center p-2.5 bg-gradient-to-b from-black/20 to-black/60 overflow-hidden"
                >
                  {/* Clickable Image Button with Hover Inspect Overlay */}
                  <button
                    type="button"
                    onClick={() => openProjectGallery(activeProject, currentImgIdx)}
                    className="group/preview absolute inset-0 w-full h-full flex items-center justify-center p-2.5 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    aria-label={`Inspect ${activeProject.title} image gallery`}
                  >
                    <div
                      key={`${activeProject.id}-${currentImgIdx}`}
                      className="relative h-full w-full flex items-center justify-center transition-transform duration-500 group-hover/preview:scale-[1.025]"
                      style={{
                        animation: `${
                          previewDir === 'next' ? 'galleryEnterFromRight' : 'galleryEnterFromLeft'
                        } 0.42s cubic-bezier(0.16, 1, 0.3, 1) both`,
                        willChange: 'transform, opacity, filter',
                      }}
                    >
                      <Image
                        src={activeImages[currentImgIdx]?.src ?? activeProject.image.src}
                        alt={activeImages[currentImgIdx]?.alt ?? activeProject.image.alt}
                        fill
                        sizes="(min-width: 1280px) 700px, 90vw"
                        className="object-contain object-center"
                        priority
                      />
                    </div>

                    {/* Hover Inspect Overlay — Only triggers when hovering the image itself */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100">
                      <div className="flex items-center gap-2 border border-accent/70 bg-background/90 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-accent shadow-xl transform translate-y-1 group-hover/preview:translate-y-0 transition-transform duration-300">
                        <FiMaximize2 className="h-3 w-3" />
                        <span>Inspect View</span>
                      </div>
                    </div>
                  </button>

                  {/* Multi-Image Controls — Sibling elements with z-10 so hovering them cancels image hover effect */}
                  {activeImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          changePreviewImage(
                            (currentImgIdx - 1 + activeImages.length) % activeImages.length,
                            'prev'
                          )
                        }
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center border border-white/20 bg-black/60 text-white/70 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent cursor-pointer"
                        aria-label="Previous image"
                      >
                        <FiChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          changePreviewImage(
                            (currentImgIdx + 1) % activeImages.length,
                            'next'
                          )
                        }
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center border border-white/20 bg-black/60 text-white/70 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent cursor-pointer"
                        aria-label="Next image"
                      >
                        <FiChevronRight className="h-4 w-4" />
                      </button>

                      {/* Indicator Dots */}
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 border border-border/50 backdrop-blur-sm">
                        {activeImages.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => changePreviewImage(i, i >= currentImgIdx ? 'next' : 'prev')}
                            className={`h-[2px] transition-all duration-500 cursor-pointer ${
                              i === currentImgIdx ? 'w-5 bg-accent' : 'w-2 bg-white/30 hover:bg-white/60'
                            }`}
                            aria-label={`View image ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Columnar Structured Grid: Role & Tech Stack */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1.5 border-y border-border/40 my-0.5 shrink-0">
                <div>
                  <span className={DETAIL_LABEL_CLASSNAME}>Role</span>
                  <p className="text-xs sm:text-sm font-normal text-foreground/90 mt-0.5 truncate">{activeProject.role ?? 'Software Developer'}</p>
                </div>
                <div className="min-w-0">
                  <span className={DETAIL_LABEL_CLASSNAME}>Tags</span>
                  <div className="flex items-center gap-1.5 mt-0.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5 min-h-[26px]">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex h-5.5 sm:h-6 shrink-0 items-center justify-center border border-border bg-surface px-2 font-mono text-[0.68rem] text-muted hover:border-accent hover:text-accent transition-colors duration-300 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Structured Summary Section */}
              <section className="pt-1 pb-0.5 shrink-0">
                <span className={DETAIL_LABEL_CLASSNAME}>Summary</span>
                <p className="text-xs sm:text-sm font-normal text-foreground/90 mt-0.5 leading-snug line-clamp-2 min-h-[2.4rem]">
                  {activeProject.description}
                </p>
              </section>

              {/* Bottom Section: Centered Action Buttons */}
              <section className="pt-2 border-t border-border/40 mt-1 flex items-center justify-center gap-4 shrink-0 min-h-[36px]">
                {activeProject.links.demo && (
                  <a
                    href={activeProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-border/80 bg-surface/60 px-5 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground/80 hover:border-accent hover:text-accent hover:bg-surface/90 transition-all duration-300"
                  >
                    <FiExternalLink className="h-3 w-3" />
                    <span>Live View</span>
                  </a>
                )}
                {activeProject.links.github && (
                  <a
                    href={activeProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-border/80 bg-surface/60 px-5 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground/80 hover:border-accent hover:text-accent hover:bg-surface/90 transition-all duration-300"
                  >
                    <FaGithub className="h-3 w-3" />
                    <span>Source Code</span>
                  </a>
                )}
              </section>
            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          FULLSCREEN LIGHTBOX GALLERY MODAL
      ───────────────────────────────────────────────────────── */}
      {activeGallery && activeModalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-4 sm:px-8 py-8"
          style={{ backgroundColor: 'rgba(10, 10, 12, 0.88)' }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeGallery.title} image viewer`}
          onClick={closeGallery}
        >
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-end justify-between mb-4 px-0.5">
              <div>
                <p className="text-[10px] font-mono tracking-[0.32em] text-white/45 uppercase mb-1.5">
                  {String(activeGallery.index + 1).padStart(2, '0')}&ensp;/&ensp;
                  {String(activeGallery.images.length).padStart(2, '0')}
                </p>
                <h3 className="text-lg sm:text-xl font-light tracking-tight text-white/90">
                  {activeGallery.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeGallery}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/20 text-white/50 hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer"
                aria-label="Close image viewer"
              >
                <FiX className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Image stage */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10 bg-black/20">
              <div
                key={activeGallery.index}
                className="absolute inset-0"
                style={{
                  animation: `${
                    galleryDir === 'next' ? 'galleryEnterFromRight' : 'galleryEnterFromLeft'
                  } 0.42s cubic-bezier(0.16, 1, 0.3, 1) both`,
                  willChange: 'transform, opacity, filter',
                }}
              >
                <Image
                  src={activeModalImage.src}
                  alt={activeModalImage.alt}
                  fill
                  sizes="(min-width: 1536px) 1200px, (min-width: 1024px) 90vw, 100vw"
                  quality={100}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Prev / Next Controls */}
              {activeGallery.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => moveGallery(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/40 text-white/60 backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent cursor-pointer"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveGallery(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/40 text-white/60 backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent cursor-pointer"
                    aria-label="Next image"
                  >
                    <FiChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Indicator Dots */}
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
                    className={`h-[2px] transition-all duration-500 cursor-pointer ${
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
