'use client';

import { useState } from 'react';
import { projects } from '@/lib/data';

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProjects = projects.slice(
    currentSlide * projectsPerPage,
    (currentSlide + 1) * projectsPerPage
  );

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl w-full mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-px bg-border"></div>
          <span className="text-xs text-muted font-mono">02</span>
          <div className="w-20 h-px bg-border"></div>
        </div>

        {/* Section Title with Navigation */}
        <div className="flex items-start justify-between" style={{ marginBottom: '2.5rem' }}>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground">
              projects
            </span>
          </div>
          
          {/* Navigation Buttons - Top Right */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="group w-10 h-10 border border-border hover:border-accent transition-all duration-300 flex items-center justify-center"
              aria-label="Previous projects"
            >
              <span className="text-muted group-hover:text-accent transition-colors duration-300 text-sm">
                ←
              </span>
            </button>
            <button
              onClick={nextSlide}
              className="group w-10 h-10 border border-border hover:border-accent transition-all duration-300 flex items-center justify-center"
              aria-label="Next projects"
            >
              <span className="text-muted group-hover:text-accent transition-colors duration-300 text-sm">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {currentProjects.map((project, index) => (
            <div
              key={`${currentSlide}-${index}`}
              className="group border border-border hover:border-accent transition-all duration-300 bg-surface animate-fadeIn"
            >
              {/* Project Image Placeholder */}
              <div className="aspect-video bg-border/20 border-b border-border group-hover:border-accent transition-colors duration-300 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-extralight text-muted/20">
                    {String(currentSlide * projectsPerPage + index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-10">
                {/* Project Number & Divider */}
                <div className="flex items-center gap-4" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', marginBottom: '1.25rem' }}>
                  <span className="text-xs text-muted font-mono">
                    {String(currentSlide * projectsPerPage + index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-light text-foreground group-hover:text-accent transition-colors duration-300" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', marginBottom: '1.25rem' }}>
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-sm text-muted font-light leading-relaxed min-h-12" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', marginBottom: '1.5rem' }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', marginBottom: '1.5rem' }}>
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs text-muted font-mono border border-border px-3 py-1.5 hover:border-accent hover:text-accent transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-light text-muted hover:text-accent transition-colors duration-300"
                  style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                >
                  View Project
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots - Centered */}
        <div className="flex items-center justify-center gap-3" style={{ marginTop: '4rem' }}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-10 h-px transition-all duration-500 ${
                currentSlide === index ? 'bg-accent' : 'bg-border hover:bg-accent'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        {/* Geometric divider 
        <div className="flex items-center justify-center gap-4" style={{ marginTop: '10rem' }}>
          <div className="w-16 h-px bg-border"></div>
          <div className="w-2 h-2 bg-accent rotate-45 animate-pulse hover:animate-spin transition-all duration-700"></div>
          <div className="w-16 h-px bg-border"></div>
        </div>
        */}


      </div>      
    </section>
  );
}
