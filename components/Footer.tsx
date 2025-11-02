export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-8">
          {/* Left side - Copyright */}
          <div className="flex items-center gap-3 order-1 md:order-1">
            <div></div>
            <span className="text-xs text-muted font-mono">
              © 2025 Daniel Hardy C. Camacho
            </span>
          </div>

          {/* Center - Portfolio Version */}
          <div className="order-3 md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2">
            <span className="text-xs text-muted font-mono uppercase tracking-widest">
              Portfolio_v2.01
            </span>
          </div>

          
        </div>
      </div>
    </footer>
  );
}
