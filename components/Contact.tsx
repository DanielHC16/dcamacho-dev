import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { personalInfo } from '@/lib/data';

export default function Contact() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl w-full mx-auto">
        {/* Section header - perfectly centered */}
        <div className="flex items-center justify-center gap-4 mb-24">
          <div className="w-20 h-px bg-border"></div>
          <span className="text-xs text-muted font-mono">05</span>
          <div className="w-20 h-px bg-border"></div>
        </div>

        {/* Content container with consistent spacing */}
        <div className="flex flex-col items-center space-y-48">
          {/* Heading and description */}
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tight text-foreground">
              Let&apos;s Connect
            </h2>
            
            <p className="text-sm md:text-base text-muted font-light max-w-md mx-auto leading-relaxed">
              Open to new opportunities and collaborations. Reach out through any of these channels.
            </p>
          </div>

          {/* Social Links Grid - perfectly centered */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-4 p-8 border border-border hover:border-accent bg-surface transition-all duration-500 aspect-square"
            >
              <FaGithub className="w-12 h-12 text-foreground group-hover:text-accent transition-colors duration-500" />
              <span className="text-xs uppercase tracking-wider text-muted font-light group-hover:text-foreground transition-colors duration-300 text-center">
                GitHub
              </span>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-4 p-8 border border-border hover:border-accent bg-surface transition-all duration-500 aspect-square"
            >
              <FaLinkedin className="w-12 h-12 text-foreground group-hover:text-accent transition-colors duration-500" />
              <span className="text-xs uppercase tracking-wider text-muted font-light group-hover:text-foreground transition-colors duration-300 text-center">
                LinkedIn
              </span>
            </a>

            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-4 p-8 border border-border hover:border-accent bg-surface transition-all duration-500 aspect-square"
            >
              <FaInstagram className="w-12 h-12 text-foreground group-hover:text-accent transition-colors duration-500" />
              <span className="text-xs uppercase tracking-wider text-muted font-light group-hover:text-foreground transition-colors duration-300 text-center">
                Instagram
              </span>
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="group flex flex-col items-center justify-center gap-4 p-8 border border-border hover:border-accent bg-surface transition-all duration-500 aspect-square"
            >
              <FaEnvelope className="w-12 h-12 text-foreground group-hover:text-accent transition-colors duration-500" />
              <span className="text-xs uppercase tracking-wider text-muted font-light group-hover:text-foreground transition-colors duration-300 text-center">
                Email
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
