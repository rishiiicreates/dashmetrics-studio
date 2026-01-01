import { AnimatedSection } from '@/components/AnimatedSection';
import { Bookmark, FolderOpen, Clock } from 'lucide-react';

export function Workflow() {
  return (
    <section id="workflow" className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-4 block">
              Streamlined workflow
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6 leading-tight">
              Your saved content,
              <br />
              <span className="text-text-tertiary">always within reach</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Access bookmarked posts, saved videos, and starred content across all platforms. 
              No more hunting through apps. Everything you've saved, organized in one place.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center flex-shrink-0">
                  <Bookmark className="w-4 h-4 text-text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Unified Bookmarks</h4>
                  <p className="text-sm text-text-secondary">All your saved content from every platform, one feed.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center flex-shrink-0">
                  <FolderOpen className="w-4 h-4 text-text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Smart Collections</h4>
                  <p className="text-sm text-text-secondary">Organize saves into custom collections for quick access.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Recent Activity</h4>
                  <p className="text-sm text-text-secondary">Quick-access your most recently viewed and saved items.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-border" />
                  <div className="w-3 h-3 rounded-full bg-border" />
                  <div className="w-3 h-3 rounded-full bg-border" />
                </div>
                
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-4 p-3 rounded-lg bg-surface-subtle border border-border/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-muted rounded w-3/4" />
                        <div className="h-2 bg-muted/60 rounded w-1/2" />
                      </div>
                      <div className="w-6 h-6 rounded bg-muted" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative gradient */}
              <div className="absolute -inset-4 bg-gradient-to-br from-surface-subtle/50 to-transparent rounded-3xl -z-10" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
