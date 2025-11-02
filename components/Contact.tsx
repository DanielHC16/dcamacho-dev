import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { personalInfo } from '@/lib/data';

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl w-full mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-px bg-border"></div>
          <span className="text-xs text-muted font-mono">05</span>
          <div className="w-20 h-px bg-border"></div>
        </div>

        {/* Section Title */}
        <div className="mb-20">
          <span className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground">
            Let&apos;s_Connect
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted font-light leading-relaxed max-w-2xl" style={{ marginBottom: '3.5rem' }}>
          Open to new opportunities and collaborations. Reach out through any of these channels.
        </p>

        {/* Social Links - Clean List */}
        <div className="max-w-xl" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-6 border-b border-border hover:border-accent transition-all duration-300"
            style={{ paddingBottom: '1.5rem' }}
          >
            <FaGithub className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
            <div className="flex flex-col gap-1">
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
            className="group flex items-center gap-6 border-b border-border hover:border-accent transition-all duration-300"
            style={{ paddingBottom: '1.5rem' }}
          >
            <FaLinkedin className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
            <div className="flex flex-col gap-1">
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
            className="group flex items-center gap-6 border-b border-border hover:border-accent transition-all duration-300"
            style={{ paddingBottom: '1.5rem' }}
          >
            <FaInstagram className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
            <div className="flex flex-col gap-1">
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
            className="group flex items-center gap-6 border-b border-border hover:border-accent transition-all duration-300"
            style={{ paddingBottom: '1.5rem' }}
          >
            <FaEnvelope className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
            <div className="flex flex-col gap-1">
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
