import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Youtube, 
  Instagram, 
  Twitter, 
  Eye, 
  EyeOff, 
  Save, 
  Trash2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlatformCredential {
  platform: string;
  client_id: string;
  client_secret: string;
  saved: boolean;
}

const platformConfig = [
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: Youtube,
    description: 'Connect your YouTube channel to track video performance, subscribers, and engagement.',
    helpUrl: 'https://console.cloud.google.com/apis/credentials'
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: Instagram,
    description: 'Link your Instagram account to monitor posts, stories, and follower growth.',
    helpUrl: 'https://developers.facebook.com/apps/'
  },
  { 
    id: 'twitter', 
    name: 'Twitter / X', 
    icon: Twitter,
    description: 'Connect Twitter to track tweets, retweets, and audience engagement.',
    helpUrl: 'https://developer.twitter.com/en/portal/dashboard'
  },
];

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState<Record<string, PlatformCredential>>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const { data, error } = await supabase
        .from('user_api_credentials')
        .select('*');

      if (error) throw error;

      const creds: Record<string, PlatformCredential> = {};
      platformConfig.forEach(p => {
        const existing = data?.find(d => d.platform === p.id);
        creds[p.id] = {
          platform: p.id,
          client_id: existing?.client_id || '',
          client_secret: existing?.client_secret || '',
          saved: !!existing
        };
      });
      setCredentials(creds);
    } catch (error) {
      console.error('Error fetching credentials:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (platform: string, field: 'client_id' | 'client_secret', value: string) => {
    setCredentials(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
  };

  const handleSave = async (platform: string) => {
    const cred = credentials[platform];
    if (!cred.client_id || !cred.client_secret) {
      toast({
        title: 'Missing credentials',
        description: 'Please enter both Client ID and Client Secret.',
        variant: 'destructive'
      });
      return;
    }

    setLoading(prev => ({ ...prev, [platform]: true }));

    try {
      if (cred.saved) {
        // Update existing
        const { error } = await supabase
          .from('user_api_credentials')
          .update({
            client_id: cred.client_id,
            client_secret: cred.client_secret
          })
          .eq('platform', platform)
          .eq('user_id', user?.id);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('user_api_credentials')
          .insert({
            user_id: user?.id,
            platform,
            client_id: cred.client_id,
            client_secret: cred.client_secret
          });

        if (error) throw error;
      }

      setCredentials(prev => ({
        ...prev,
        [platform]: { ...prev[platform], saved: true }
      }));

      toast({
        title: 'Credentials saved',
        description: `Your ${platform} API credentials have been saved securely.`
      });
    } catch (error: any) {
      toast({
        title: 'Error saving credentials',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(prev => ({ ...prev, [platform]: false }));
    }
  };

  const handleDelete = async (platform: string) => {
    setLoading(prev => ({ ...prev, [platform]: true }));

    try {
      const { error } = await supabase
        .from('user_api_credentials')
        .delete()
        .eq('platform', platform)
        .eq('user_id', user?.id);

      if (error) throw error;

      setCredentials(prev => ({
        ...prev,
        [platform]: {
          platform,
          client_id: '',
          client_secret: '',
          saved: false
        }
      }));

      toast({
        title: 'Credentials deleted',
        description: `Your ${platform} API credentials have been removed.`
      });
    } catch (error: any) {
      toast({
        title: 'Error deleting credentials',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(prev => ({ ...prev, [platform]: false }));
    }
  };

  const toggleShowSecret = (platform: string) => {
    setShowSecrets(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-text-secondary">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <span className="font-semibold text-foreground">API Settings</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-4xl">
        <AnimatedSection className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Connect Your Platforms
          </h1>
          <p className="text-text-secondary">
            Add your API credentials to connect social platforms and fetch real-time analytics data.
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {platformConfig.map((platform, index) => {
            const cred = credentials[platform.id] || { client_id: '', client_secret: '', saved: false };
            const isLoading = loading[platform.id];
            const showSecret = showSecrets[platform.id];

            return (
              <AnimatedSection key={platform.id} delay={index * 100}>
                <div className="p-6 rounded-2xl border border-border bg-card">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      cred.saved 
                        ? 'bg-foreground text-background' 
                        : 'bg-muted text-text-tertiary'
                    }`}>
                      <platform.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{platform.name}</h3>
                        {cred.saved ? (
                          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Connected
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-text-tertiary bg-muted px-2 py-0.5 rounded-full">
                            <XCircle className="w-3 h-3" />
                            Not configured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary mt-1">
                        {platform.description}
                      </p>
                      <a 
                        href={platform.helpUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary underline hover:no-underline mt-1 inline-block"
                      >
                        Get API credentials →
                      </a>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${platform.id}-client-id`}>Client ID</Label>
                      <Input
                        id={`${platform.id}-client-id`}
                        type="text"
                        placeholder="Enter your Client ID"
                        value={cred.client_id}
                        onChange={(e) => handleInputChange(platform.id, 'client_id', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${platform.id}-client-secret`}>Client Secret</Label>
                      <div className="relative">
                        <Input
                          id={`${platform.id}-client-secret`}
                          type={showSecret ? 'text' : 'password'}
                          placeholder="Enter your Client Secret"
                          value={cred.client_secret}
                          onChange={(e) => handleInputChange(platform.id, 'client_secret', e.target.value)}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => toggleShowSecret(platform.id)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-foreground transition-colors"
                        >
                          {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => handleSave(platform.id)}
                      disabled={isLoading || (!cred.client_id && !cred.client_secret)}
                      size="sm"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Credentials'}
                    </Button>
                    {cred.saved && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(platform.id)}
                        disabled={isLoading}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={400} className="mt-8">
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm text-text-secondary">
              <strong className="text-foreground">Security note:</strong> Your API credentials are encrypted and stored securely. 
              Only you can access them through your authenticated session.
            </p>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
