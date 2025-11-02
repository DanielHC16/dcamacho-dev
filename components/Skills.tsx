import { skills } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-6xl w-full mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-px bg-border"></div>
          <span className="text-xs text-muted font-mono">03</span>
          <div className="w-20 h-px bg-border"></div>
        </div>

        {/* Section Title */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="text-xs font-mono uppercase tracking-widest font-semibold text-foreground">
            Technical_Skills
          </span>
        </div>

        {/* Skills Columns - Clean 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: '3.5rem' }}>
          {Object.entries(skills).map(([category, items], index) => (
            <div key={index} className="group">
              {/* Category Header with Line */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div className="flex items-center gap-3" style={{ marginBottom: '0.875rem' }}>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
                    {category}
                  </h3>
                </div>
                <div className="w-12 h-px bg-border"></div>
              </div>

              {/* Skills List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {items.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group/item"
                  >
                    <span className="text-sm text-muted font-light group-hover/item:text-accent transition-colors duration-300">
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
