import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { personalInfo } from '@/lib/data';

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-10 sm:px-8 md:px-12 lg:px-16 py-24 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0">
          {/* Horizontal lines */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-border"
              style={{
                top: `${i * 5}%`,
              }}
            />
          ))}
          {/* Vertical lines */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-border"
              style={{
                left: `${i * 5}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center md:items-start text-center md:text-left px-10 sm:px-0">
        {/* Section header */}
        <div className="w-full flex flex-col items-center md:items-start">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="w-16 sm:w-20 h-px bg-border" />
            <span className="text-xs text-muted font-mono">05</span>
            <div className="w-16 sm:w-20 h-px bg-border" />
          </div>

          {/* Section Title */}
          <div className="mb-12 sm:mb-20">
            <span className="text-sm sm:text-base font-mono uppercase tracking-widest font-semibold text-foreground">
              Let&apos;s_Connect
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted font-light leading-relaxed max-w-2xl px-10 sm:px-0 text-center md:text-left" style={{ marginBottom: '3.5rem' }}>
          Open to new opportunities and collaborations. Reach out through any of these channels.
        </p>

        {/* Social Links - Clean List */}
        <div className="max-w-xl w-full px-10 sm:px-0 flex flex-col items-center md:items-start" style={{ gap: '2rem' }}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-6 border-b border-border hover:border-accent transition-all duration-300 w-full"
            style={{ paddingBottom: '1.5rem' }}
          >
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <FaGithub className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
            </div>
            <div className="flex flex-col gap-1 text-justify md:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-muted group-hover:text-foreground transition-colors duration-300">
                GitHub
              </span>
              <span className="text-sm text-foreground font-light group-hover:text-accent transition-colors duration-300">
                @DanielHC16
              </span>
            </div>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-6 border-b border-border hover:border-accent transition-all duration-300 w-full"
            style={{ paddingBottom: '1.5rem' }}
          >
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <FaLinkedin className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
            </div>
            <div className="flex flex-col gap-1 text-justify md:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-muted group-hover:text-foreground transition-colors duration-300">
                LinkedIn
              </span>
              <span className="text-sm text-foreground font-light group-hover:text-accent transition-colors duration-300">
                Daniel Camacho
              </span>
            </div>
          </a>

          <a
            href={personalInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-6 border-b border-border hover:border-accent transition-all duration-300 w-full"
            style={{ paddingBottom: '1.5rem' }}
          >
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <FaInstagram className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
            </div>
            <div className="flex flex-col gap-1 text-justify md:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-muted group-hover:text-foreground transition-colors duration-300">
                Instagram
              </span>
              <span className="text-sm text-foreground font-light group-hover:text-accent transition-colors duration-300">
                @https.hajin
              </span>
            </div>
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            className="group flex items-center gap-6 border-b border-border hover:border-accent transition-all duration-300 w-full"
            style={{ paddingBottom: '1.5rem' }}
          >
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <FaEnvelope className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
            </div>
            <div className="flex flex-col gap-1 text-justify md:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-muted group-hover:text-foreground transition-colors duration-300">
                Email
              </span>
              <span className="text-sm text-foreground font-light group-hover:text-accent transition-colors duration-300">
                {personalInfo.email}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
