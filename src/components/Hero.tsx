import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <span className="inline-block px-3 py-1.5 text-xs font-medium text-text-secondary bg-surface-subtle rounded-full border border-border mb-8">
            Analytics, unified
          </span>
        </div>

        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-foreground leading-[0.95] mb-8 opacity-0 animate-fade-in text-balance"
          style={{ animationDelay: '200ms' }}
        >
          One dashboard.
          <br />
          <span className="text-text-tertiary">All your metrics.</span>
        </h1>

        <p 
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in"
          style={{ animationDelay: '400ms' }}
        >
          DashMetrics brings YouTube, Instagram, and Twitter analytics into a single, 
          distraction-free space. Monitor performance. Make decisions. Stay focused.
        </p>

        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '600ms' }}
        >
          <Button variant="hero" size="xl">
            Start for free
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button variant="subtle" size="xl">
            View demo
          </Button>
        </div>
      </div>

      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
        style={{ animationDelay: '1000ms' }}
      >
        <div className="w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-text-tertiary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
