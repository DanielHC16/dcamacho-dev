import { aboutPoints, personalInfo } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-10 sm:px-8 md:px-12 lg:px-24 py-20 sm:py-28 bg-background"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center md:items-start text-center md:text-left px-10 sm:px-0">
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
            <p className="text-sm sm:text-base text-muted font-light leading-relaxed text-justify pl-10 sm:pl-0">
              {personalInfo.bio}
            </p>
          </div>

          {/* Right Column - Key Points */}
          <div className="w-full max-w-md space-y-8 pl-10 sm:pl-0">
            {aboutPoints.map((point, index) => (
              <div key={index} className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 border border-accent rotate-45 shrink-0 group-hover:bg-accent transition-colors duration-300" />
                  <h3 className="text-base sm:text-lg font-light text-foreground">
                    {point.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted font-light leading-relaxed text-justify ml-5">
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
