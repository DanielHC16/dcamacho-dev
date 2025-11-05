import { aboutPoints, personalInfo } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-10 sm:px-8 md:px-12 lg:px-24 py-20 sm:py-28 bg-background relative overflow-hidden"
    >
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
            <span className="text-xs text-muted font-mono">01</span>
            <div className="w-16 sm:w-20 h-px bg-border" />
          </div>

          <h2 className="text-sm sm:text-base font-mono uppercase tracking-widest font-semibold text-foreground mb-12 sm:mb-16">
            About_Me
          </h2>
        </div>

        {/* Content area */}
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-12 sm:gap-16 lg:gap-24 
            w-full 
            justify-items-center 
            md:justify-items-start
            px-10 sm:px-0
          "
        >
          {/* Left Column - Description */}
          <div className="w-full max-w-md">
            <p className="text-sm sm:text-base text-foreground/80 font-normal leading-relaxed text-justify px-10 sm:px-0" style={{ lineHeight: '1.75', letterSpacing: '0.01em' }}>
              {personalInfo.bio}
            </p>
          </div>

          {/* Right Column - Key Points */}
          <div className="w-full max-w-md space-y-8 px-10 sm:px-0">
            {aboutPoints.map((point, index) => (
              <div key={index} className="group relative">
                {/* Mobile: Left decorative elements - absolutely positioned on side */}
                <div className="absolute left-0 top-0 flex items-center gap-3 sm:hidden">
                  <div className="w-2 h-2 border border-accent rotate-45 shrink-0 group-hover:bg-accent transition-colors duration-300"></div>
                  <div className="w-8 h-px bg-border"></div>
                </div>
                {/* Mobile: Right decorative elements - absolutely positioned on side */}
                <div className="absolute right-0 top-0 flex items-center gap-3 sm:hidden">
                  <div className="w-8 h-px bg-border"></div>
                  <div className="w-2 h-2 border border-accent rotate-45 shrink-0 group-hover:bg-accent transition-colors duration-300"></div>
                </div>
                {/* Desktop: Flex layout with decorative elements */}
                <div className="hidden sm:flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 border border-accent rotate-45 shrink-0 group-hover:bg-accent transition-colors duration-300"></div>
                  <div className="w-8 sm:w-12 md:w-12 h-px bg-border"></div>
                  <h3 className="text-base sm:text-lg font-normal text-foreground text-left" style={{ letterSpacing: '0.01em' }}>
                    {point.title}
                  </h3>
                </div>
                {/* Mobile: Title centered with padding to avoid overlap */}
                <h3 className="text-base font-normal text-foreground text-center mb-3 px-12 sm:hidden" style={{ letterSpacing: '0.01em' }}>
                  {point.title}
                </h3>
                <p className="text-base text-foreground/80 font-normal leading-relaxed text-justify ml-0 sm:ml-5" style={{ lineHeight: '1.75', letterSpacing: '0.01em' }}>
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider - now placed closer to the end of section */}
        <div className="flex items-center justify-center gap-4 w-full self-center" style={{ marginTop: '10rem' }}>
          <div className="w-16 h-px bg-border"></div>
          <div className="w-2 h-2 bg-accent rotate-45 animate-pulse hover:animate-spin transition-all duration-700"></div>
          <div className="w-16 h-px bg-border"></div>
        </div>
      </div>
    </section>
  );
}
