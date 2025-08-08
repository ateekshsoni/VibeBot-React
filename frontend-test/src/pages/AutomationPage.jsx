import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Users, 
  Hash, 
  Heart, 
  Clock, 
  Settings,
  Play,
  Pause,
  Plus,
  TrendingUp,
  Zap,
  Target,
  Calendar,
  Loader2,
  Bot,
  Send,
  Eye
} from 'lucide-react';
import api from '@/lib/api';

// Import configuration modals
import CommentToDmConfig from '@/components/automation/CommentToDmConfig';
import DmAutoReplyConfig from '@/components/automation/DmAutoReplyConfig';
import StoryMentionConfig from '@/components/automation/StoryMentionConfig';
import WelcomeMessageConfig from '@/components/automation/WelcomeMessageConfig';
import HashtagMonitoringConfig from '@/components/automation/HashtagMonitoringConfig';
import ScheduledPostsConfig from '@/components/automation/ScheduledPostsConfig';

const AutomationPage = () => {
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [automations, setAutomations] = useState({
    commentToDm: { enabled: false, count: 0, rules: [] },
    dmAutoReply: { enabled: false, count: 0, rules: [] },
    storyMention: { enabled: false, count: 0, rules: [] },
    welcomeMessage: { enabled: false, count: 0, template: '' },
    hashtagMonitor: { enabled: false, count: 0, hashtags: [] },
    scheduledPosts: { enabled: false, count: 0, posts: [] }
  });
  const [stats, setStats] = useState({
    totalAutomations: 6,
    activeAutomations: 2,
    messagesProcessed: 1247,
    engagementRate: 8.3
  });

  // Configuration modal states
  const [configModals, setConfigModals] = useState({
    commentToDm: false,
    dmAutoReply: false,
    storyMention: false,
    welcomeMessage: false,
    hashtagMonitor: false,
    scheduledPosts: false
  });

  // Fetch automation data
  useEffect(() => {
    if (isSignedIn) {
      fetchAutomationData();
    }
  }, [isSignedIn]);

  const fetchAutomationData = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demonstration
      setAutomations({
        commentToDm: { enabled: true, count: 45, rules: ['price', 'buy', 'cost'] },
        dmAutoReply: { enabled: true, count: 123, rules: ['info', 'help', 'support'] },
        storyMention: { enabled: false, count: 12, rules: [] },
        welcomeMessage: { enabled: false, count: 34, template: 'Welcome to our community!' },
        hashtagMonitor: { enabled: false, count: 67, hashtags: ['#fitness', '#health'] },
        scheduledPosts: { enabled: false, count: 8, posts: [] }
      });
    } catch (error) {
      console.error('Failed to fetch automation data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAutomation = async (type) => {
    try {
      const newState = !automations[type].enabled;
      
      // Update local state immediately for better UX
      setAutomations(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          enabled: newState
        }
      }));

      // Update stats
      setStats(prev => ({
        ...prev,
        activeAutomations: newState ? prev.activeAutomations + 1 : prev.activeAutomations - 1
      }));
      
      // TODO: Make API call to backend
      // await api.put(`/user/automations/${type}`, { enabled: newState });
      
      console.log(`${type} automation ${newState ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error(`Failed to toggle ${type} automation:`, error);
      // Revert on error
      setAutomations(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          enabled: !prev[type].enabled
        }
      }));
    }
  };

  // Modal management functions
  const openConfigModal = (type) => {
    setConfigModals(prev => ({ ...prev, [type]: true }));
  };

  const closeConfigModal = (type) => {
    setConfigModals(prev => ({ ...prev, [type]: false }));
  };

  const saveConfiguration = async (type, config) => {
    try {
      console.log(`Saving ${type} configuration:`, config);
      
      // TODO: Save to backend
      // await api.put(`/user/automations/${type}/config`, config);
      
      // Update local state if needed
      setAutomations(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          ...config
        }
      }));
      
      console.log(`${type} configuration saved successfully`);
    } catch (error) {
      console.error(`Failed to save ${type} configuration:`, error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-lg text-gray-400">Loading automation settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Automation Center
          </h1>
          <p className="text-gray-400 mt-2">
            Set up intelligent automation workflows to engage your audience 24/7
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          <Plus className="h-4 w-4 mr-2" />
          Create New Automation
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Total Automations</p>
                <p className="text-2xl font-bold text-white">{stats.totalAutomations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Active Now</p>
                <p className="text-2xl font-bold text-white">{stats.activeAutomations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Messages Processed</p>
                <p className="text-2xl font-bold text-white">{stats.messagesProcessed.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Engagement Rate</p>
                <p className="text-2xl font-bold text-white">{stats.engagementRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Comment-to-DM Automation */}
        <AutomationCard
          title="Comment-to-DM Automation"
          description="Automatically send DMs when users comment specific keywords on your posts"
          icon={<MessageSquare className="h-6 w-6" />}
          enabled={automations.commentToDm.enabled}
          count={automations.commentToDm.count}
          onToggle={() => toggleAutomation('commentToDm')}
          onConfigure={() => openConfigModal('commentToDm')}
          gradient="from-blue-500 to-cyan-500"
          features={[
            'Smart keyword detection',
            'Custom DM templates',
            'Anti-spam protection',
            'Performance analytics'
          ]}
          setupData={`${automations.commentToDm.rules?.length || 0} keywords configured`}
        />

        {/* DM Auto-Reply */}
        <AutomationCard
          title="DM Auto-Reply"
          description="Automatically respond to incoming DMs with smart keyword-based replies"
          icon={<Bot className="h-6 w-6" />}
          enabled={automations.dmAutoReply.enabled}
          count={automations.dmAutoReply.count}
          onToggle={() => toggleAutomation('dmAutoReply')}
          onConfigure={() => openConfigModal('dmAutoReply')}
          gradient="from-green-500 to-emerald-500"
          features={[
            'Instant response time',
            'Smart keyword matching',
            'Custom reply templates',
            'FAQ automation'
          ]}
          setupData={`${automations.dmAutoReply.rules?.length || 0} auto-replies active`}
        />

        {/* Story Mention Automation */}
        <AutomationCard
          title="Story Mention Automation"
          description="Auto-respond when someone mentions you in their Instagram stories"
          icon={<Users className="h-6 w-6" />}
          enabled={automations.storyMention.enabled}
          count={automations.storyMention.count}
          onToggle={() => toggleAutomation('storyMention')}
          onConfigure={() => openConfigModal('storyMention')}
          gradient="from-purple-500 to-pink-500"
          features={[
            'Real-time mention detection',
            'Personalized responses',
            'Thank you messages',
            'Engagement tracking'
          ]}
          setupData="Ready to configure"
        />

        {/* Welcome Message Automation */}
        <AutomationCard
          title="Welcome Message Automation"
          description="Send personalized welcome DMs to new followers automatically"
          icon={<Heart className="h-6 w-6" />}
          enabled={automations.welcomeMessage.enabled}
          count={automations.welcomeMessage.count}
          onToggle={() => toggleAutomation('welcomeMessage')}
          onConfigure={() => openConfigModal('welcomeMessage')}
          gradient="from-red-500 to-pink-500"
          features={[
            'New follower detection',
            'Personalized greetings',
            'Onboarding sequences',
            'Conversion tracking'
          ]}
          setupData={automations.welcomeMessage.template ? "Template configured" : "Setup required"}
        />

        {/* Hashtag Monitoring */}
        <AutomationCard
          title="Hashtag Monitoring"
          description="Monitor and auto-engage with posts using specific hashtags in your niche"
          icon={<Hash className="h-6 w-6" />}
          enabled={automations.hashtagMonitor.enabled}
          count={automations.hashtagMonitor.count}
          onToggle={() => toggleAutomation('hashtagMonitor')}
          onConfigure={() => openConfigModal('hashtagMonitor')}
          gradient="from-orange-500 to-red-500"
          features={[
            'Multi-hashtag tracking',
            'Smart engagement rules',
            'Competitor monitoring',
            'Growth analytics'
          ]}
          setupData={`${automations.hashtagMonitor.hashtags?.length || 0} hashtags monitored`}
        />

        {/* Scheduled Posts */}
        <AutomationCard
          title="Scheduled Posts"
          description="Schedule and automatically publish content at optimal times"
          icon={<Calendar className="h-6 w-6" />}
          enabled={automations.scheduledPosts.enabled}
          count={automations.scheduledPosts.count}
          onToggle={() => toggleAutomation('scheduledPosts')}
          onConfigure={() => openConfigModal('scheduledPosts')}
          gradient="from-indigo-500 to-blue-500"
          features={[
            'Smart scheduling',
            'Content calendar',
            'Optimal timing AI',
            'Performance insights'
          ]}
          setupData={`${automations.scheduledPosts.posts?.length || 0} posts scheduled`}
        />
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
          <CardDescription>Common automation management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Settings className="h-5 w-5" />
              <span>Global Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
              <TrendingUp className="h-5 w-5" />
              <span>View Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Clock className="h-5 w-5" />
              <span>Activity Log</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Eye className="h-5 w-5" />
              <span>Preview Mode</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Modals */}
      <CommentToDmConfig
        isOpen={configModals.commentToDm}
        onClose={() => closeConfigModal('commentToDm')}
        onSave={(config) => saveConfiguration('commentToDm', config)}
      />

      <DmAutoReplyConfig
        isOpen={configModals.dmAutoReply}
        onClose={() => closeConfigModal('dmAutoReply')}
        onSave={(config) => saveConfiguration('dmAutoReply', config)}
      />

      <StoryMentionConfig
        isOpen={configModals.storyMention}
        onClose={() => closeConfigModal('storyMention')}
        onSave={(config) => saveConfiguration('storyMention', config)}
      />

      <WelcomeMessageConfig
        isOpen={configModals.welcomeMessage}
        onClose={() => closeConfigModal('welcomeMessage')}
        onSave={(config) => saveConfiguration('welcomeMessage', config)}
      />

      <HashtagMonitoringConfig
        isOpen={configModals.hashtagMonitor}
        onClose={() => closeConfigModal('hashtagMonitor')}
        onSave={(config) => saveConfiguration('hashtagMonitor', config)}
      />

      <ScheduledPostsConfig
        isOpen={configModals.scheduledPosts}
        onClose={() => closeConfigModal('scheduledPosts')}
        onSave={(config) => saveConfiguration('scheduledPosts', config)}
      />
    </div>
  );
};

// Reusable Automation Card Component
const AutomationCard = ({ 
  title, 
  description, 
  icon, 
  enabled, 
  count, 
  onToggle, 
  onConfigure,
  gradient,
  features = [],
  setupData
}) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} text-white`}>
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg text-white">{title}</CardTitle>
              <CardDescription className="text-gray-400 text-sm mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant={enabled ? "default" : "secondary"}
              className={enabled ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}
            >
              {enabled ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Statistics */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Processed this month:</span>
            <span className="text-white font-medium">{count.toLocaleString()} actions</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Setup status:</span>
            <span className="text-blue-400 font-medium">{setupData}</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-300">Key Features:</p>
          <div className="grid grid-cols-1 gap-1">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs text-gray-400">
                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          <Button 
            size="sm" 
            onClick={onToggle}
            variant={enabled ? "secondary" : "default"}
            className={enabled ? 
              "bg-red-500/20 text-red-400 hover:bg-red-500/30" : 
              "bg-green-500/20 text-green-400 hover:bg-green-500/30"
            }
          >
            {enabled ? (
              <>
                <Pause className="h-3 w-3 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3 w-3 mr-1" />
                Activate
              </>
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-gray-600 text-gray-300"
            onClick={onConfigure}
          >
            <Settings className="h-3 w-3 mr-1" />
            Configure
          </Button>
          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
            <TrendingUp className="h-3 w-3 mr-1" />
            Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationPage;
