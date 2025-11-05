export default function Footer() {
  return (
    <footer className="border-t border-border py-12 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 px-12 sm:px-24 lg:px-48 xl:px-64 2xl:px-80">
        
        {/* LEFT */}
        <div className="flex items-center justify-start">
          <span className="text-xs text-muted font-mono">
            © 2025 Daniel Hardy C. Camacho
          </span>
        </div>

        {/* CENTER */}
        <div className="flex items-center justify-center">
          <span className="text-xs text-muted font-mono uppercase tracking-widest">
            Portfolio_v2.01
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end">
          <span className="text-xs text-muted font-mono uppercase tracking-wide">
            STATUS: 
          </span>
          <span className="text-xs text-foreground font-mono uppercase tracking-widest ml-1">
             ACTIVE
          </span>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse-blink ml-2"></div>
        </div>

      </div>
    </footer>
  );
}
