import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <span className="text-background font-semibold text-sm">D</span>
          </div>
          <span className="font-semibold text-foreground tracking-tight">DashMetrics</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-200">
            Features
          </a>
          <a href="#platforms" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-200">
            Platforms
          </a>
          <a href="#workflow" className="text-sm text-text-secondary hover:text-foreground transition-colors duration-200">
            Workflow
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-text-secondary">
            Sign in
          </Button>
          <Button variant="default" size="sm">
            Get started
          </Button>
        </div>
      </nav>
    </header>
  );
}
