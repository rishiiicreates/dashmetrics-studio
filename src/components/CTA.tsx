import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-32 px-6 bg-surface-subtle">
      <div className="container mx-auto max-w-3xl text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-6 leading-tight">
            Ready to simplify your analytics?
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
            Join creators who've streamlined their workflow. 
            Connect your accounts and see your data come together.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Get started free
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <p className="text-xs text-text-tertiary mt-6">
            No credit card required · Free tier available
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
