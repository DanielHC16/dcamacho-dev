export default function Footer() {
  return (
    <footer className="border-t border-border px-10 sm:px-8 md:px-12 lg:px-16 py-12">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* Left side - Copyright */}
          <div className="flex items-center order-1">
            <span className="text-xs text-muted font-mono">
              © 2025 Daniel Hardy C. Camacho
            </span>
          </div>

          {/* Center - Portfolio Version - Absolutely centered */}
          <div className="absolute left-1/2 -translate-x-1/2 order-2 hidden md:block">
            <span className="text-xs text-muted font-mono uppercase tracking-widest">
              Portfolio_v2.01
            </span>
          </div>
          <div className="order-2 md:hidden">
            <span className="text-xs text-muted font-mono uppercase tracking-widest">
              Portfolio_v2.01
            </span>
          </div>

          {/* Right side - Status */}
          <div className="flex items-center gap-2 order-3">
            <span className="text-xs text-muted font-mono uppercase tracking-widest">
              STATUS:
            </span>
            <span className="text-xs text-foreground font-mono uppercase tracking-widest">
              ACTIVE
            </span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse-blink"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
