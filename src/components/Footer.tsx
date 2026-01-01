export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center">
              <span className="text-background font-semibold text-xs">D</span>
            </div>
            <span className="text-sm font-medium text-foreground">DashMetrics</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-text-secondary hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-text-secondary hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-text-secondary hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          <p className="text-sm text-text-tertiary">
            © 2026 DashMetrics
          </p>
        </div>
      </div>
    </footer>
  );
}
