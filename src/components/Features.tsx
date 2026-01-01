import { AnimatedSection } from '@/components/AnimatedSection';
import { BarChart3, Layers, Zap, Eye } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: 'Unified View',
    description: 'YouTube, Instagram, and Twitter metrics in one clean interface. No more tab switching.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Watch your numbers update as they happen. Engagement, reach, and growth—all live.',
  },
  {
    icon: Eye,
    title: 'Focused Monitoring',
    description: 'A minimal interface designed for clarity. See what matters, nothing more.',
  },
  {
    icon: Zap,
    title: 'Quick Insights',
    description: 'Surface trends and patterns automatically. Data-driven decisions, faster.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Built for focus
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Every feature is designed to reduce noise and surface what matters most.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection 
              key={feature.title} 
              delay={index * 100}
              className="group"
            >
              <div className="p-8 rounded-2xl border border-border bg-card hover:bg-surface-subtle transition-all duration-500 ease-out-expo hover:border-foreground/10">
                <div className="w-12 h-12 rounded-xl bg-surface-subtle border border-border flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-background transition-all duration-500 ease-out-expo">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
