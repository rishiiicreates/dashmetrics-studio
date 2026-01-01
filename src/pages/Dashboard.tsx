import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';
import { LogOut, BarChart3, Users, Eye, TrendingUp, Youtube, Instagram, Twitter, Settings, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SocialConnection {
  platform: string;
  platform_username: string | null;
  connected_at: string;
}

interface ApiCredential {
  platform: string;
}

const platformIcons: Record<string, any> = {
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
};

const platformNames: Record<string, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  twitter: 'Twitter / X',
};

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [connections, setConnections] = useState<SocialConnection[]>([]);
  const [credentials, setCredentials] = useState<ApiCredential[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [connectionsRes, credentialsRes] = await Promise.all([
        supabase.from('social_connections').select('platform, platform_username, connected_at'),
        supabase.from('user_api_credentials').select('platform')
      ]);

      if (connectionsRes.data) setConnections(connectionsRes.data);
      if (credentialsRes.data) setCredentials(credentialsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasAnyConnection = connections.length > 0;
  const hasAnyCredentials = credentials.length > 0;

  const allPlatforms = ['youtube', 'instagram', 'twitter'];
  const platformStatus = allPlatforms.map(platform => {
    const connection = connections.find(c => c.platform === platform);
    const hasCredential = credentials.some(c => c.platform === platform);
    const Icon = platformIcons[platform];
    return {
      id: platform,
      name: platformNames[platform],
      icon: Icon,
      connected: !!connection,
      hasCredentials: hasCredential,
      username: connection?.platform_username
    };
  });

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
            <Link to="/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
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
            {hasAnyConnection 
              ? "Here's an overview of your social media performance."
              : "Connect your social platforms to start tracking your analytics."
            }
          </p>
        </AnimatedSection>

        {/* No connections state */}
        {!loading && !hasAnyConnection && (
          <AnimatedSection className="mb-10">
            <div className="p-8 rounded-2xl border border-dashed border-border bg-surface-subtle text-center">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Link2 className="w-8 h-8 text-text-tertiary" />
              </div>
              <h2 className="text-lg font-medium text-foreground mb-2">No platforms connected yet</h2>
              <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
                {hasAnyCredentials 
                  ? "You've added API credentials. Now connect your accounts to start fetching real analytics data."
                  : "Add your API credentials in Settings, then connect your social accounts to see real-time analytics."
                }
              </p>
              <Link to="/settings">
                <Button>
                  <Settings className="w-4 h-4 mr-2" />
                  {hasAnyCredentials ? 'Connect Platforms' : 'Add API Credentials'}
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        )}

        {/* Stats Grid - Only show when connected */}
        {hasAnyConnection && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Total Views', value: '—', icon: Eye },
              { label: 'Subscribers', value: '—', icon: Users },
              { label: 'Engagement', value: '—', icon: TrendingUp },
              { label: 'Posts', value: '—', icon: BarChart3 },
            ].map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 100}>
                <div className="p-6 rounded-2xl border border-border bg-card hover:bg-surface-subtle transition-colors duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-5 h-5 text-text-tertiary" />
                  </div>
                  <p className="text-2xl font-semibold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Platform Status */}
          <AnimatedSection delay={200} className="lg:col-span-1">
            <div className="p-6 rounded-2xl border border-border bg-card h-full">
              <h2 className="font-medium text-foreground mb-6">Platform Status</h2>
              <div className="space-y-4">
                {platformStatus.map((platform) => (
                  <div 
                    key={platform.id}
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
                          {platform.connected 
                            ? platform.username || 'Connected'
                            : platform.hasCredentials 
                              ? 'Ready to connect' 
                              : 'No credentials'
                          }
                        </p>
                      </div>
                    </div>
                    {!platform.connected && (
                      <Link to="/settings">
                        <Button variant="outline" size="sm">
                          {platform.hasCredentials ? 'Connect' : 'Setup'}
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Activity / Empty State */}
          <AnimatedSection delay={300} className="lg:col-span-2">
            <div className="p-6 rounded-2xl border border-border bg-card h-full">
              <h2 className="font-medium text-foreground mb-6">Recent Activity</h2>
              {hasAnyConnection ? (
                <p className="text-sm text-text-secondary">Activity data will appear here once platforms sync.</p>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-text-tertiary" />
                  </div>
                  <p className="text-sm text-text-secondary max-w-xs">
                    Connect your social platforms to see your recent activity and performance metrics.
                  </p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  );
}