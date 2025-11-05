import { skills } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-10 sm:px-8 md:px-12 lg:px-16 py-24">
      <div className="max-w-6xl w-full mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-center sm:justify-start gap-4 mb-8">
          <div className="w-20 h-px bg-border"></div>
          <span className="text-xs text-muted font-mono">03</span>
          <div className="w-20 h-px bg-border"></div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-center sm:justify-start mb-14" style={{ marginBottom: '3.5rem' }}>
          <span className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground">
            Technical_Skills
          </span>
        </div>

        {/* Skills Columns - Clean 4 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0" style={{ gap: '3.5rem' }}>
          {Object.entries(skills).map(([category, items], index) => (
            <div key={index} className="group flex flex-col items-center sm:items-start">
              {/* Category Header with Line */}
              <div className="flex flex-col items-center sm:items-start" style={{ marginBottom: '1.75rem' }}>
                <div className="flex items-center gap-3" style={{ marginBottom: '0.875rem' }}>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
                    {category}
                  </h3>
                </div>
                <div className="w-12 h-px bg-border"></div>
              </div>

              {/* Skills List */}
              <div className="flex flex-col items-center sm:items-start" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {items.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group/item"
                  >
                    <span className="text-sm text-muted font-light group-hover/item:text-accent transition-colors duration-300 text-center sm:text-left">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
