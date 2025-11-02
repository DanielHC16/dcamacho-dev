import { aboutPoints, personalInfo } from '@/lib/data';

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-px bg-border"></div>
          <span className="text-xs text-muted font-mono">01</span>
          <div className="w-20 h-px bg-border"></div>
        </div>

        {/* Section title - bold and separated */}
        <div className="mb-20">
          <span className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground">About_Me</span>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-20 md:gap-32 mb-20">
          {/* Left Column - Description */}
          <div>
            <p className="text-sm md:text-base text-muted font-light leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Right Column - Key Points */}
          <div className="space-y-8">
            {aboutPoints.map((point, index) => (
              <div key={index} className="group">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-2 h-2 border border-accent rotate-45 shrink-0 group-hover:bg-accent transition-colors duration-300"></div>
                  <h3 className="text-base font-light text-foreground">
                    {point.title}
                  </h3>
                </div>
                <p className="text-sm text-muted font-light leading-relaxed ml-6">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Geometric divider with animation */}
        <div className="flex items-center justify-center gap-4" style={{ marginTop: '10rem' }}>
          <div className="w-16 h-px bg-border"></div>
          <div className="w-2 h-2 bg-accent rotate-45 animate-pulse hover:animate-spin transition-all duration-700"></div>
          <div className="w-16 h-px bg-border"></div>
        </div>
      </div>
    </section>
  );
}
