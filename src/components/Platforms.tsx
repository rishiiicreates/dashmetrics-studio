import { AnimatedSection } from '@/components/AnimatedSection';

const platforms = [
  {
    name: 'YouTube',
    metrics: ['Views', 'Watch time', 'Subscribers', 'Revenue'],
  },
  {
    name: 'Instagram',
    metrics: ['Reach', 'Engagement', 'Followers', 'Stories'],
  },
  {
    name: 'Twitter',
    metrics: ['Impressions', 'Engagements', 'Followers', 'Mentions'],
  },
];

export function Platforms() {
  return (
    <section id="platforms" className="py-32 px-6 bg-surface-subtle">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Three platforms. One truth.
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Connect once, monitor forever. All your critical metrics, synchronized.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <AnimatedSection key={platform.name} delay={index * 150}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-background border border-border flex items-center justify-center">
                  <span className="text-2xl font-semibold text-foreground">
                    {platform.name[0]}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-4">
                  {platform.name}
                </h3>
                <div className="space-y-2">
                  {platform.metrics.map((metric) => (
                    <div 
                      key={metric} 
                      className="text-sm text-text-secondary py-2 border-b border-border/50 last:border-0"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
