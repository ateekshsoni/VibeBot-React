import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  Camera, 
  Bell,
  Settings, 
  Eye,
  Save,
  AlertCircle,
  X,
  Users,
  Heart,
  MessageCircle,
  Share,
  AtSign
} from 'lucide-react';

const StoryMentionConfig = ({ isOpen, onClose, onSave }) => {
  const [storyActions, setStoryActions] = useState([
    {
      id: 1,
      name: "Thank & Repost",
      actionType: "repost_and_dm",
      dmTemplate: "Thank you so much for mentioning us in your story! 🙏✨ We've reposted it with love!",
      repostText: "Thanks for the love! 💕 #{originalPoster}",
      autoRepost: true,
      isActive: true,
      triggerCount: 78,
      followers_min: 100
    },
    {
      id: 2,
      name: "VIP Response",
      actionType: "dm_only",
      dmTemplate: "WOW! 🌟 Thank you for featuring us, {username}! We're sending you a special VIP discount code: STORY20 for 20% off your next order! Valid for 48 hours only! 🎉",
      autoRepost: false,
      isActive: true,
      triggerCount: 23,
      followers_min: 1000
    },
    {
      id: 3,
      name: "Collaboration Invite",
      actionType: "dm_and_flag",
      dmTemplate: "Hey {username}! 👋 Loved your story mention! We'd love to explore a potential collaboration. DMing you some exciting opportunities! 💼✨",
      autoRepost: false,
      isActive: false,
      triggerCount: 12,
      followers_min: 5000
    }
  ]);
  
  const [newAction, setNewAction] = useState({
    name: '',
    actionType: 'dm_only',
    dmTemplate: '',
    repostText: '',
    autoRepost: false,
    isActive: true,
    followers_min: 0
  });

  const [showPreview, setShowPreview] = useState(false);

  const actionTypes = [
    { value: 'dm_only', label: 'Send DM Only', description: 'Send a personalized thank you message' },
    { value: 'repost_and_dm', label: 'Repost & DM', description: 'Repost their story and send a DM' },
    { value: 'dm_and_flag', label: 'DM & Flag for Review', description: 'Send DM and flag for team review' },
    { value: 'auto_story_reply', label: 'Auto Story Reply', description: 'Reply to their story automatically' }
  ];

  const addStoryAction = () => {
    if (newAction.name.trim() && newAction.dmTemplate.trim()) {
      setStoryActions(prev => [...prev, {
        id: Date.now(),
        name: newAction.name,
        actionType: newAction.actionType,
        dmTemplate: newAction.dmTemplate,
        repostText: newAction.repostText,
        autoRepost: newAction.autoRepost,
        isActive: true,
        triggerCount: 0,
        followers_min: parseInt(newAction.followers_min) || 0
      }]);
      
      setNewAction({
        name: '',
        actionType: 'dm_only',
        dmTemplate: '',
        repostText: '',
        autoRepost: false,
        isActive: true,
        followers_min: 0
      });
    }
  };

  const removeStoryAction = (id) => {
    setStoryActions(prev => prev.filter(action => action.id !== id));
  };

  const toggleStoryAction = (id) => {
    setStoryActions(prev => prev.map(action => 
      action.id === id ? { ...action, isActive: !action.isActive } : action
    ));
  };

  const handleSave = () => {
    onSave({ storyActions });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-700 w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Camera className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Story Mention Automation</h2>
                <p className="text-gray-400 text-sm">Automatically respond when users mention you in their stories</p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AtSign className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {storyActions.reduce((sum, a) => sum + a.triggerCount, 0)}
                    </p>
                    <p className="text-sm text-gray-400">Total Mentions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Share className="h-5 w-5 text-pink-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {storyActions.filter(a => a.autoRepost && a.isActive).length}
                    </p>
                    <p className="text-sm text-gray-400">Auto Reposts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {storyActions.filter(a => a.isActive).length}
                    </p>
                    <p className="text-sm text-gray-400">Active Rules</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {storyActions.filter(a => a.actionType === 'dm_and_flag').length}
                    </p>
                    <p className="text-sm text-gray-400">Review Flags</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Banner */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-purple-400 mt-0.5" />
              <div>
                <p className="text-purple-400 font-medium">Story Mention Detection</p>
                <p className="text-gray-300 text-sm mt-1">
                  We'll automatically detect when users mention your account in their Instagram stories and trigger the appropriate response.
                  You can set different actions based on follower count and engagement.
                </p>
              </div>
            </div>
          </div>
          
          {/* Story Actions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Mention Response Rules ({storyActions.length})
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="h-3 w-3 mr-1" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </div>
            
            {storyActions.map((action) => (
              <Card key={action.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant={action.isActive ? "default" : "secondary"}>
                          {action.isActive ? "Active" : "Paused"}
                        </Badge>
                        <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                          {actionTypes.find(t => t.value === action.actionType)?.label}
                        </Badge>
                        <span className="text-sm text-gray-400">
                          {action.triggerCount} mentions processed
                        </span>
                        {action.followers_min > 0 && (
                          <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
                            Min {action.followers_min} followers
                          </Badge>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-2">{action.name}</h4>
                        <p className="text-sm text-gray-400">
                          {actionTypes.find(t => t.value === action.actionType)?.description}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-300 font-medium mb-2">DM Response:</p>
                        <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-500">
                          <p className="text-sm text-gray-300">{action.dmTemplate}</p>
                        </div>
                      </div>

                      {action.autoRepost && action.repostText && (
                        <div>
                          <p className="text-sm text-gray-300 font-medium mb-2">Repost Caption:</p>
                          <div className="bg-gray-800 p-3 rounded border-l-4 border-pink-500">
                            <p className="text-sm text-gray-300">{action.repostText}</p>
                          </div>
                        </div>
                      )}

                      {showPreview && (
                        <div className="bg-gray-900 p-3 rounded border border-gray-600">
                          <p className="text-xs text-gray-400 mb-3">Preview: User story mention workflow</p>
                          <div className="space-y-3">
                            {/* Step 1: Story Mention */}
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <Camera className="h-4 w-4 text-white" />
                              </div>
                              <div className="bg-purple-500/20 p-2 rounded text-sm text-purple-300">
                                User mentions @yourbrand in their story
                              </div>
                            </div>

                            {/* Step 2: Auto Response */}
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <MessageCircle className="h-4 w-4 text-white" />
                              </div>
                              <div className="bg-blue-500/20 p-2 rounded text-sm text-blue-300 max-w-md">
                                {action.dmTemplate.replace('{username}', 'john_doe')}
                              </div>
                            </div>

                            {/* Step 3: Repost (if enabled) */}
                            {action.autoRepost && (
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                                  <Share className="h-4 w-4 text-white" />
                                </div>
                                <div className="bg-pink-500/20 p-2 rounded text-sm text-pink-300">
                                  Auto-repost with: "{action.repostText?.replace('{originalPoster}', 'john_doe')}"
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleStoryAction(action.id)}
                        className={action.isActive ? 
                          "text-red-400 hover:text-red-300 border-red-500/30" : 
                          "text-green-400 hover:text-green-300 border-green-500/30"
                        }
                      >
                        {action.isActive ? 'Pause' : 'Activate'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removeStoryAction(action.id)}
                        className="text-red-400 hover:text-red-300 border-red-500/30"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Story Action */}
          <Card className="bg-gray-800/30 border-gray-700 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Story Mention Rule
              </CardTitle>
              <CardDescription>
                Define how to respond when users mention you in their Instagram stories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Rule Name
                  </label>
                  <input
                    type="text"
                    value={newAction.name}
                    onChange={(e) => setNewAction(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="VIP Thank You, Collaboration Outreach, etc."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Minimum Followers
                  </label>
                  <input
                    type="number"
                    value={newAction.followers_min}
                    onChange={(e) => setNewAction(prev => ({ ...prev, followers_min: e.target.value }))}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Action Type
                </label>
                <select
                  value={newAction.actionType}
                  onChange={(e) => setNewAction(prev => ({ ...prev, actionType: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {actionTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  DM Response Template
                </label>
                <textarea
                  value={newAction.dmTemplate}
                  onChange={(e) => setNewAction(prev => ({ ...prev, dmTemplate: e.target.value }))}
                  placeholder="Thank you for mentioning us, {username}! 🙏 We appreciate the love!"
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use {"{username}"} to personalize with their username
                </p>
              </div>

              {(newAction.actionType === 'repost_and_dm') && (
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Repost Caption
                  </label>
                  <input
                    type="text"
                    value={newAction.repostText}
                    onChange={(e) => setNewAction(prev => ({ ...prev, repostText: e.target.value }))}
                    placeholder="Thanks for the love! 💕 #{originalPoster}"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use {"{originalPoster}"} to tag the original user
                  </p>
                </div>
              )}

              <Button 
                onClick={addStoryAction}
                disabled={!newAction.name.trim() || !newAction.dmTemplate.trim()}
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Story Action
              </Button>
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-md text-white">Quick Templates</CardTitle>
              <CardDescription>Pre-built responses for different scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    name: "Appreciation + Repost",
                    actionType: "repost_and_dm",
                    dmTemplate: "Thank you so much for the story mention! 🙏✨ We've shared it with our community because we love the support!",
                    repostText: "Story love from @{originalPoster} 💕 Thank you!",
                    followers_min: 50
                  },
                  {
                    name: "VIP Discount",
                    actionType: "dm_only",
                    dmTemplate: "WOW! 🌟 Thanks for featuring us, {username}! Here's a special 15% discount code just for you: STORY15 ✨ Valid for 24 hours!",
                    followers_min: 500
                  },
                  {
                    name: "Influencer Outreach",
                    actionType: "dm_and_flag",
                    dmTemplate: "Hey {username}! 👋 Loved your story mention! We'd love to explore a potential partnership. DMing you some exciting opportunities! 💼",
                    followers_min: 2000
                  },
                  {
                    name: "Simple Thanks",
                    actionType: "dm_only",
                    dmTemplate: "Thanks for the story shoutout, {username}! 😊 It means the world to us! ❤️",
                    followers_min: 0
                  }
                ].map((template, index) => (
                  <div 
                    key={index}
                    onClick={() => setNewAction({
                      name: template.name,
                      actionType: template.actionType,
                      dmTemplate: template.dmTemplate,
                      repostText: template.repostText || '',
                      autoRepost: template.actionType === 'repost_and_dm',
                      isActive: true,
                      followers_min: template.followers_min
                    })}
                    className="p-3 bg-gray-800 rounded border border-gray-600 hover:border-purple-500 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-medium text-white mb-1">{template.name}</p>
                    <p className="text-xs text-gray-400 mb-2">
                      {actionTypes.find(t => t.value === template.actionType)?.label} | 
                      Min {template.followers_min} followers
                    </p>
                    <p className="text-xs text-gray-300 bg-gray-900 p-2 rounded">
                      {template.dmTemplate}
                    </p>
                    {template.repostText && (
                      <p className="text-xs text-gray-300 bg-gray-900 p-2 rounded mt-1">
                        Repost: {template.repostText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              {storyActions.filter(a => a.isActive).length} active story mention rules
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-purple-500 hover:bg-purple-600">
                <Save className="h-3 w-3 mr-1" />
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryMentionConfig;
