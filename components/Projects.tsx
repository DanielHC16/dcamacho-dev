'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
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

const PROJECTS_PER_PAGE = 4;
const PANEL_FADE_OUT_MS = 200;

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
  const [directoryPage, setDirectoryPage] = useState<number>(0);
  const [currentImgIdx, setCurrentImgIdx] = useState<number>(0);
  // The panel shows `displayedProjectId`; it follows `activeProjectId` after a short fade-out,
  // so the content (and any height change) swaps while the panel is invisible.
  const [displayedProjectId, setDisplayedProjectId] = useState<number>(() => projects[0]?.id ?? 1);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const panelSwapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [activeGallery, setActiveGallery] = useState<{
    title: string;
    images: ProjectImage[];
    index: number;
  } | null>(null);
  const [galleryDir, setGalleryDir] = useState<'next' | 'prev'>('next');
  const isTransitioningRef = useRef(false);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === displayedProjectId) ?? projects[0];
  }, [displayedProjectId]);

  const activeProjectIndex = useMemo(() => {
    return projects.findIndex((p) => p.id === activeProject.id);
  }, [activeProject]);

  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const directoryPages = Array.from({ length: totalPages }, (_, page) => {
    const start = page * PROJECTS_PER_PAGE;
    return { start, items: projects.slice(start, start + PROJECTS_PER_PAGE) };
  });

  const activeImages = useMemo(() => {
    if (activeProject.images?.length) return activeProject.images;
    return [activeProject.image];
  }, [activeProject]);

  const changePreviewImage = useCallback((newIdx: number) => {
    setCurrentImgIdx(newIdx);
  }, []);

  // Fade-through project switch: fade the panel out, swap content, fade it back in.
  // Rapid clicks just retarget the pending swap, so the panel never flickers.
  const selectProject = useCallback(
    (id: number) => {
      if (id === activeProjectId) return;
      setActiveProjectId(id);
      setIsPanelVisible(false);
      if (panelSwapTimerRef.current) clearTimeout(panelSwapTimerRef.current);
      panelSwapTimerRef.current = setTimeout(() => {
        setDisplayedProjectId(id);
        setCurrentImgIdx(0);
        setIsPanelVisible(true);
        panelSwapTimerRef.current = null;
      }, PANEL_FADE_OUT_MS);
    },
    [activeProjectId]
  );

  useEffect(() => {
    return () => {
      if (panelSwapTimerRef.current) clearTimeout(panelSwapTimerRef.current);
    };
  }, []);

  // Auto-play slider for projects with multiple images
  useEffect(() => {
    if (activeImages.length <= 1 || isAutoPlayPaused || activeGallery !== null) return;

    const timer = setInterval(() => {
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
    }, 600);
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

  const renderStableSlot = (render: (project: Project, index: number) => ReactNode) => (
    <div className="grid min-w-0">
      {projects.map((project, index) => (
        <div key={project.id} aria-hidden="true" className="[grid-area:1/1] min-w-0 invisible pointer-events-none select-none">
          {render(project, index)}
        </div>
      ))}
      <div className="[grid-area:1/1] min-w-0">{render(activeProject, activeProjectIndex)}</div>
    </div>
  );

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center pt-20 sm:pt-8 xl:pt-6 pb-10 sm:pb-12 xl:pb-6 relative overflow-hidden"
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
        <div className="flex items-center justify-center sm:justify-start gap-4 mb-4 xl:mb-2">
          <div className="w-20 h-px bg-border" />
          <span className="text-xs text-muted font-mono">02</span>
          <div className="w-20 h-px bg-border" />
        </div>

        <div className="mb-4 xl:mb-3">
          <span className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground">
            Project_Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[1.75rem] font-extralight tracking-tight text-foreground leading-[1.05] mt-2 xl:mt-1 uppercase">
            Projects
          </h2>
          <p className="text-sm text-muted font-light mt-2 xl:mt-1 max-w-md xl:max-w-none leading-relaxed">
            Select a project unit to inspect its architectural specifications and live preview.
          </p>
        </div>

        {/* 2. Symmetrical Two-Panel Grid (Natural hug height per column) */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[480px_1fr] min-w-0">

          {/* ─────────────────────────────────────────────────────────
              LEFT CARD: Project Directory (Paginated, matches preview height)
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

            {/* Unit Directory List — one page of units, evenly spaced to fill the card */}
            {/* Every page is stacked in the same grid cell; only the current one is visible.
                The cell is as tall as the tallest page, so paging never resizes the card. */}
            <div className="grid flex-1 p-3 sm:p-4">
              {directoryPages.map((page, pageNumber) => {
                const isCurrentPage = pageNumber === directoryPage;
                return (
            <div
              key={`page-${pageNumber}`}
              aria-hidden={!isCurrentPage}
              className={`[grid-area:1/1] flex flex-col gap-2 min-w-0 transition-[opacity,transform,visibility] motion-reduce:transition-none ${
                isCurrentPage
                  ? 'visible opacity-100 translate-y-0 duration-[420ms] delay-[160ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
                  : `invisible pointer-events-none opacity-0 duration-[160ms] delay-0 ease-[cubic-bezier(0.4,0,1,1)] translate-y-1`
              }`}
            >
              {page.items.map((project, pageIdx) => {
                const idx = page.start + pageIdx;
                const isSelected = project.id === activeProjectId;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => selectProject(project.id)}
                    aria-pressed={isSelected}
                    className={`group relative flex w-full flex-1 items-center justify-between border p-3 sm:p-3.5 text-left transition-all duration-300 cursor-pointer ${
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
                          className={`text-sm font-medium tracking-tight leading-snug transition-colors duration-300 ${
                            isSelected ? 'text-foreground font-semibold' : 'text-foreground/80 group-hover:text-foreground'
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p
                          className={`font-mono text-[0.68rem] uppercase tracking-wider mt-0.5 transition-colors duration-300 ${
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
              {/* Keep row height identical on a partially filled last page */}
              {Array.from({ length: PROJECTS_PER_PAGE - page.items.length }, (_, i) => (
                <div key={`empty-${i}`} aria-hidden="true" className="flex-1" />
              ))}
            </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border/40 px-4 sm:px-8 lg:px-10 py-3 shrink-0">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.32em] text-muted whitespace-nowrap">
                  Page {String(directoryPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDirectoryPage((p) => (p - 1 + totalPages) % totalPages)}
                    className="group flex h-7 w-7 items-center justify-center border border-border transition-all duration-300 hover:border-accent cursor-pointer"
                    aria-label="Previous page"
                  >
                    <FiChevronLeft className="h-3.5 w-3.5 text-muted transition-colors duration-300 group-hover:text-accent" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirectoryPage((p) => (p + 1) % totalPages)}
                    className="group flex h-7 w-7 items-center justify-center border border-border transition-all duration-300 hover:border-accent cursor-pointer"
                    aria-label="Next page"
                  >
                    <FiChevronRight className="h-3.5 w-3.5 text-muted transition-colors duration-300 group-hover:text-accent" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────
              RIGHT CARD: Project Specification (Panel 2)
          ───────────────────────────────────────────────────────── */}
          <div
            className="border border-border/80 bg-surface shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--border)_60%,transparent)] backdrop-blur-sm min-w-0 flex flex-col justify-between overflow-hidden"
            style={{ width: '100%', padding: '1rem 1.25rem' }}
          >
            <div
              className={`flex flex-col justify-between h-full w-full transition-[opacity,transform] motion-reduce:transition-none ${
                isPanelVisible
                  ? 'opacity-100 translate-y-0 duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
                  : 'opacity-0 translate-y-1 duration-200 ease-[cubic-bezier(0.4,0,1,1)]'
              }`}
            >
              {/* Header Block */}
              <header className="shrink-0">
                {renderStableSlot((project, index) => (
                  <>
                    <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-1.5">
                      <span className="font-mono text-xs text-muted">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-border" />
                      <span className={`hidden sm:inline ${DETAIL_LABEL_CLASSNAME}`}>{project.role ?? 'Software Project'}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-light leading-tight text-foreground sm:text-[1.75rem] xl:text-[1.25rem]">
                      {project.title}
                    </h3>
                  </>
                ))}
              </header>

              {/* Constrained Image Mockup Screen — Proportional Aspect Ratio with Object Contain */}
              <div className="relative border border-border/70 bg-black/40 overflow-hidden shadow-md my-3 sm:my-2 shrink-0">
                {/* Window Header */}
                <div className="flex items-center justify-between gap-2 border-b border-border/40 bg-surface/90 px-3 py-1.5 sm:py-1 shrink-0">
                  <div className="flex min-w-0 flex-1 items-center gap-1.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-border" />
                    <span className="h-2 w-2 shrink-0 rounded-full bg-border" />
                    <span className="h-2 w-2 shrink-0 rounded-full bg-border" />
                    <span className="min-w-0 font-mono text-[10px] text-muted tracking-wider ml-2 truncate sm:max-w-xs">
                      {activeProject.links.demo
                        ? activeProject.links.demo.replace(/^https?:\/\//, '')
                        : `${activeProject.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.local`}
                    </span>
                  </div>
                  {activeImages.length > 1 && (
                    <span className="shrink-0 font-mono text-[10px] text-muted tracking-widest">
                      {currentImgIdx + 1} / {activeImages.length}
                    </span>
                  )}
                </div>

                {/* Viewport Canvas — True Widescreen Aspect Ratio with Object-Contain (No Distortion), Auto-Slider & Hover Inspect */}
                <div
                  onMouseEnter={() => setIsAutoPlayPaused(true)}
                  onMouseLeave={() => setIsAutoPlayPaused(false)}
                  className="relative aspect-[16/9] xl:aspect-[2/1] w-full flex items-center justify-center p-0 sm:p-2.5 bg-gradient-to-b from-black/20 to-black/60 overflow-hidden"
                >
                  {/* Clickable Image Button with Hover Inspect Overlay */}
                  <button
                    type="button"
                    onClick={() => openProjectGallery(activeProject, currentImgIdx)}
                    className="group/preview absolute inset-0 w-full h-full flex items-center justify-center p-0 sm:p-2.5 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    aria-label={`Inspect ${activeProject.title} image gallery`}
                  >
                    <div className="relative h-full w-full transition-transform duration-500 group-hover/preview:scale-[1.025]">
                      {activeImages.map((img, i) => {
                        const isCurrent = i === currentImgIdx;
                        return (
                          <div
                            key={`${activeProject.id}-${i}`}
                            aria-hidden={!isCurrent}
                            className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
                              isCurrent ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <Image
                              src={img.src}
                              alt={isCurrent ? img.alt : ''}
                              fill
                              sizes="(min-width: 1280px) 700px, 90vw"
                              className="object-contain object-center"
                              priority={i === 0}
                            />
                          </div>
                        );
                      })}
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
                            (currentImgIdx - 1 + activeImages.length) % activeImages.length
                          )
                        }
                        className="absolute left-1.5 sm:left-2.5 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center border border-white/20 bg-black/60 text-white/70 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent cursor-pointer"
                        aria-label="Previous image"
                      >
                        <FiChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          changePreviewImage((currentImgIdx + 1) % activeImages.length)
                        }
                        className="absolute right-1.5 sm:right-2.5 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center border border-white/20 bg-black/60 text-white/70 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent cursor-pointer"
                        aria-label="Next image"
                      >
                        <FiChevronRight className="h-4 w-4" />
                      </button>

                      {/* Indicator Dots */}
                      <div className="absolute bottom-1.5 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 border border-border/50 backdrop-blur-sm">
                        {activeImages.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => changePreviewImage(i)}
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
              <section className="py-2.5 sm:py-1.5 border-y border-border/40 my-0.5 shrink-0">
                {renderStableSlot((project) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="min-w-0">
                  <span className={DETAIL_LABEL_CLASSNAME}>Role</span>
                  <p className="text-xs sm:text-sm font-normal text-foreground/90 mt-0.5 leading-snug">{project.role ?? 'Software Developer'}</p>
                </div>
                <div className="min-w-0">
                  <span className={DETAIL_LABEL_CLASSNAME}>Tags</span>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mt-1 sm:mt-0.5 py-0.5 sm:min-h-[26px]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex h-5 sm:h-6 shrink-0 items-center justify-center border border-border bg-surface px-1.5 sm:px-2 font-mono text-[0.625rem] sm:text-[0.68rem] text-muted hover:border-accent hover:text-accent transition-colors duration-300 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
                ))}
              </section>

              {/* Structured Summary Section */}
              <section className="pt-3 pb-3 sm:pt-1 sm:pb-0.5 shrink-0">
                <span className={DETAIL_LABEL_CLASSNAME}>Summary</span>
                {renderStableSlot((project) => (
                  <p className="text-[0.8125rem] sm:text-sm font-normal text-foreground/90 mt-1 sm:mt-0.5 leading-relaxed sm:leading-snug sm:line-clamp-2 sm:min-h-[2.4rem]">
                    {project.description}
                  </p>
                ))}
              </section>

              {/* Bottom Section: Centered Action Buttons */}
              <section className="pt-3 sm:pt-2 border-t border-border/40 mt-1 flex items-center justify-center gap-2 sm:gap-4 shrink-0 min-h-[36px]">
                {activeProject.links.demo && (
                  <a
                    href={activeProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 whitespace-nowrap border border-border/80 bg-surface/60 px-3 sm:px-5 py-2.5 sm:py-1.5 font-mono text-xs uppercase tracking-wider text-foreground/80 hover:border-accent hover:text-accent hover:bg-surface/90 transition-all duration-300"
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
                    className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 whitespace-nowrap border border-border/80 bg-surface/60 px-3 sm:px-5 py-2.5 sm:py-1.5 font-mono text-xs uppercase tracking-wider text-foreground/80 hover:border-accent hover:text-accent hover:bg-surface/90 transition-all duration-300"
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
                  } 0.6s cubic-bezier(0.22, 1, 0.36, 1) both`,
                  willChange: 'transform, opacity',
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
