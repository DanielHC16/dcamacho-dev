import { skills } from '@/lib/data';

export default function Skills() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-24">
          <div className="w-20 h-px bg-border"></div>
          <span className="text-xs text-muted font-mono">03</span>
          <div className="w-20 h-px bg-border"></div>
        </div>

        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-extralight tracking-tight text-foreground mb-6">
            Technical Skills
          </h2>
          <div className="w-16 h-px bg-accent"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(skills).map(([category, items], index) => (
            <div key={index} className="group space-y-6">
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 border border-accent rotate-45 group-hover:bg-accent transition-colors duration-300"></div>
                <h3 className="text-xl font-light text-foreground uppercase tracking-wider">
                  {category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="pl-6 space-y-3">
                {items.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-px h-4 bg-border group-hover/item:bg-accent transition-colors duration-300"></div>
                    <span className="text-sm text-muted font-light group-hover/item:text-foreground transition-colors duration-300">
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
