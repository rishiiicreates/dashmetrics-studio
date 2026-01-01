import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';
import { LogOut, BarChart3, Users, Eye, TrendingUp, Youtube, Instagram, Twitter } from 'lucide-react';

const stats = [
  { label: 'Total Views', value: '1.2M', change: '+12.5%', icon: Eye },
  { label: 'Subscribers', value: '48.2K', change: '+3.2%', icon: Users },
  { label: 'Engagement', value: '4.8%', change: '+0.8%', icon: TrendingUp },
  { label: 'Posts', value: '342', change: '+15', icon: BarChart3 },
];

const platforms = [
  { name: 'YouTube', icon: Youtube, connected: true, followers: '32.1K' },
  { name: 'Instagram', icon: Instagram, connected: true, followers: '12.4K' },
  { name: 'Twitter', icon: Twitter, connected: false, followers: '—' },
];

const recentActivity = [
  { platform: 'YouTube', title: 'New video reached 10K views', time: '2 hours ago' },
  { platform: 'Instagram', title: 'Story engagement up 15%', time: '5 hours ago' },
  { platform: 'YouTube', title: 'Subscriber milestone: 32K', time: '1 day ago' },
  { platform: 'Instagram', title: 'Post saved 200+ times', time: '2 days ago' },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background font-semibold text-sm">D</span>
            </div>
            <span className="font-semibold text-foreground">DashMetrics</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary hidden sm:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {/* Welcome */}
        <AnimatedSection className="mb-10">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-text-secondary">
            Here's an overview of your social media performance.
          </p>
        </AnimatedSection>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 100}>
              <div className="p-6 rounded-2xl border border-border bg-card hover:bg-surface-subtle transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-5 h-5 text-text-tertiary" />
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Connected Platforms */}
          <AnimatedSection delay={200} className="lg:col-span-1">
            <div className="p-6 rounded-2xl border border-border bg-card h-full">
              <h2 className="font-medium text-foreground mb-6">Connected Platforms</h2>
              <div className="space-y-4">
                {platforms.map((platform) => (
                  <div 
                    key={platform.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        platform.connected ? 'bg-foreground text-background' : 'bg-muted text-text-tertiary'
                      }`}>
                        <platform.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{platform.name}</p>
                        <p className="text-xs text-text-tertiary">
                          {platform.connected ? platform.followers + ' followers' : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    {!platform.connected && (
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Recent Activity */}
          <AnimatedSection delay={300} className="lg:col-span-2">
            <div className="p-6 rounded-2xl border border-border bg-card h-full">
              <h2 className="font-medium text-foreground mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-subtle"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium text-text-secondary">
                        {activity.platform[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-text-tertiary">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Saved Content Teaser */}
        <AnimatedSection delay={400} className="mt-6">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-foreground mb-1">Saved Content</h2>
                <p className="text-sm text-text-secondary">
                  Access your bookmarked posts and saved videos across all platforms.
                </p>
              </div>
              <Button variant="subtle">
                View all →
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
