import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  Heart, 
  Clock,
  Settings, 
  Eye,
  Save,
  AlertCircle,
  X,
  Users,
  MessageSquare,
  Gift,
  Sparkles,
  UserPlus
} from 'lucide-react';

const WelcomeMessageConfig = ({ isOpen, onClose, onSave }) => {
  const [welcomeFlows, setWelcomeFlows] = useState([
    {
      id: 1,
      name: "New Follower Welcome",
      triggerType: "new_follower",
      sequences: [
        {
          id: 1,
          delay: 60, // 1 minute
          message: "Hey there! 👋 Welcome to our community! Thanks for following us - you're awesome! ✨"
        },
        {
          id: 2,
          delay: 1440, // 24 hours
          message: "Hope you're loving our content so far! 😊 Here's a special 10% discount code just for new followers: WELCOME10 🎉"
        }
      ],
      isActive: true,
      triggerCount: 234,
      completionRate: 87
    },
    {
      id: 2,
      name: "VIP Follower Welcome",
      triggerType: "verified_follower",
      sequences: [
        {
          id: 1,
          delay: 30, // 30 seconds
          message: "Welcome to our VIP community! 🌟 Thanks for following us! We've got some exclusive content coming your way! 💎"
        }
      ],
      isActive: true,
      triggerCount: 45,
      completionRate: 95
    },
    {
      id: 3,
      name: "Engagement Booster",
      triggerType: "inactive_follower",
      sequences: [
        {
          id: 1,
          delay: 10080, // 7 days
          message: "Hey! 👋 We noticed you haven't engaged with our content lately. Here's what you've missed + a special comeback offer! 🔥"
        },
        {
          id: 2,
          delay: 20160, // 14 days
          message: "We miss you! 💔 Last chance to grab this exclusive offer before it expires: COMEBACK20 for 20% off! 🏃‍♀️"
        }
      ],
      isActive: false,
      triggerCount: 123,
      completionRate: 62
    }
  ]);
  
  const [newFlow, setNewFlow] = useState({
    name: '',
    triggerType: 'new_follower',
    sequences: [{ delay: 60, message: '' }],
    isActive: true
  });

  const [showPreview, setShowPreview] = useState(false);

  const triggerTypes = [
    { value: 'new_follower', label: 'New Follower', description: 'When someone follows your account' },
    { value: 'verified_follower', label: 'Verified User Follow', description: 'When a verified user follows you' },
    { value: 'high_engagement_follower', label: 'High Engagement Follow', description: 'When someone with high engagement follows' },
    { value: 'inactive_follower', label: 'Inactive Follower', description: 'For followers who haven\'t engaged recently' },
    { value: 'returning_follower', label: 'Returning Follower', description: 'When someone follows you again' }
  ];

  const addSequenceStep = (flowIndex) => {
    const updatedFlows = [...welcomeFlows];
    updatedFlows[flowIndex].sequences.push({
      id: Date.now(),
      delay: 1440, // 24 hours default
      message: ''
    });
    setWelcomeFlows(updatedFlows);
  };

  const addNewFlowStep = () => {
    setNewFlow(prev => ({
      ...prev,
      sequences: [...prev.sequences, { delay: 1440, message: '' }]
    }));
  };

  const removeNewFlowStep = (index) => {
    if (newFlow.sequences.length > 1) {
      setNewFlow(prev => ({
        ...prev,
        sequences: prev.sequences.filter((_, i) => i !== index)
      }));
    }
  };

  const updateNewFlowStep = (index, field, value) => {
    setNewFlow(prev => ({
      ...prev,
      sequences: prev.sequences.map((seq, i) => 
        i === index ? { ...seq, [field]: value } : seq
      )
    }));
  };

  const addWelcomeFlow = () => {
    if (newFlow.name.trim() && newFlow.sequences.every(seq => seq.message.trim())) {
      setWelcomeFlows(prev => [...prev, {
        id: Date.now(),
        name: newFlow.name,
        triggerType: newFlow.triggerType,
        sequences: newFlow.sequences.map((seq, index) => ({
          id: Date.now() + index,
          delay: parseInt(seq.delay) || 60,
          message: seq.message
        })),
        isActive: true,
        triggerCount: 0,
        completionRate: 0
      }]);
      
      setNewFlow({
        name: '',
        triggerType: 'new_follower',
        sequences: [{ delay: 60, message: '' }],
        isActive: true
      });
    }
  };

  const removeWelcomeFlow = (id) => {
    setWelcomeFlows(prev => prev.filter(flow => flow.id !== id));
  };

  const toggleWelcomeFlow = (id) => {
    setWelcomeFlows(prev => prev.map(flow => 
      flow.id === id ? { ...flow, isActive: !flow.isActive } : flow
    ));
  };

  const formatDelay = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h`;
    return `${Math.round(minutes / 1440)}d`;
  };

  const handleSave = () => {
    onSave({ welcomeFlows });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-700 w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Welcome Message Automation</h2>
                <p className="text-gray-400 text-sm">Create personalized welcome sequences for new followers</p>
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
                  <UserPlus className="h-5 w-5 text-pink-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {welcomeFlows.reduce((sum, f) => sum + f.triggerCount, 0)}
                    </p>
                    <p className="text-sm text-gray-400">Messages Sent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {Math.round(welcomeFlows.reduce((sum, f) => sum + f.completionRate, 0) / welcomeFlows.length)}%
                    </p>
                    <p className="text-sm text-gray-400">Avg Completion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {welcomeFlows.filter(f => f.isActive).length}
                    </p>
                    <p className="text-sm text-gray-400">Active Flows</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {welcomeFlows.reduce((sum, f) => sum + f.sequences.length, 0)}
                    </p>
                    <p className="text-sm text-gray-400">Total Steps</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Banner */}
          <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-pink-400 mt-0.5" />
              <div>
                <p className="text-pink-400 font-medium">Welcome Flow Strategy</p>
                <p className="text-gray-300 text-sm mt-1">
                  Create multi-step welcome sequences that nurture new followers into engaged community members.
                  Space out messages strategically to avoid overwhelming users while maintaining engagement.
                </p>
              </div>
            </div>
          </div>
          
          {/* Welcome Flows */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Welcome Flows ({welcomeFlows.length})
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
            
            {welcomeFlows.map((flow) => (
              <Card key={flow.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h4 className="text-white font-medium">{flow.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={flow.isActive ? "default" : "secondary"}>
                            {flow.isActive ? "Active" : "Paused"}
                          </Badge>
                          <Badge variant="outline" className="text-pink-400 border-pink-500/30">
                            {triggerTypes.find(t => t.value === flow.triggerType)?.label}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {flow.triggerCount} triggered | {flow.completionRate}% completion
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleWelcomeFlow(flow.id)}
                        className={flow.isActive ? 
                          "text-red-400 hover:text-red-300 border-red-500/30" : 
                          "text-green-400 hover:text-green-300 border-green-500/30"
                        }
                      >
                        {flow.isActive ? 'Pause' : 'Activate'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removeWelcomeFlow(flow.id)}
                        className="text-red-400 hover:text-red-300 border-red-500/30"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Sequence Steps */}
                  <div className="space-y-3">
                    {flow.sequences.map((sequence, index) => (
                      <div key={sequence.id} className="flex items-start space-x-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          {index < flow.sequences.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-600 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDelay(sequence.delay)} delay
                            </Badge>
                          </div>
                          <div className="bg-gray-800 p-3 rounded border-l-4 border-pink-500">
                            <p className="text-sm text-gray-300">{sequence.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {showPreview && (
                    <div className="mt-4 bg-gray-900 p-3 rounded border border-gray-600">
                      <p className="text-xs text-gray-400 mb-3">Preview: Welcome flow timeline</p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <UserPlus className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm text-blue-300">User follows your account</span>
                        </div>
                        {flow.sequences.map((seq, index) => (
                          <div key={seq.id} className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs">
                              {index + 1}
                            </div>
                            <span className="text-sm text-gray-300">
                              After {formatDelay(seq.delay)}: "{seq.message.substring(0, 50)}..."
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Welcome Flow */}
          <Card className="bg-gray-800/30 border-gray-700 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Create New Welcome Flow
              </CardTitle>
              <CardDescription>
                Design a multi-step welcome sequence for new followers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Flow Name
                  </label>
                  <input
                    type="text"
                    value={newFlow.name}
                    onChange={(e) => setNewFlow(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="New Follower Welcome, VIP Onboarding, etc."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Trigger Event
                  </label>
                  <select
                    value={newFlow.triggerType}
                    onChange={(e) => setNewFlow(prev => ({ ...prev, triggerType: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    {triggerTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label} - {type.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sequence Steps */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-300">
                    Welcome Sequence Steps
                  </label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addNewFlowStep}
                    className="text-pink-400 border-pink-500/30 hover:bg-pink-500/10"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Step
                  </Button>
                </div>

                <div className="space-y-3">
                  {newFlow.sequences.map((sequence, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800 rounded border border-gray-600">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                          <div className="md:col-span-1">
                            <label className="text-xs text-gray-400 block mb-1">Delay (minutes)</label>
                            <input
                              type="number"
                              value={sequence.delay}
                              onChange={(e) => updateNewFlowStep(index, 'delay', e.target.value)}
                              min="1"
                              className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label className="text-xs text-gray-400 block mb-1">Message</label>
                            <textarea
                              value={sequence.message}
                              onChange={(e) => updateNewFlowStep(index, 'message', e.target.value)}
                              placeholder="Welcome message for this step..."
                              rows={2}
                              className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500 resize-none"
                            />
                          </div>
                        </div>
                      </div>
                      {newFlow.sequences.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => removeNewFlowStep(index)}
                          className="text-red-400 border-red-500/30 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={addWelcomeFlow}
                disabled={!newFlow.name.trim() || !newFlow.sequences.every(seq => seq.message.trim())}
                className="bg-pink-500 hover:bg-pink-600"
              >
                <Plus className="h-3 w-3 mr-1" />
                Create Welcome Flow
              </Button>
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-md text-white">Quick Templates</CardTitle>
              <CardDescription>Pre-built welcome sequences you can customize</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "Simple Welcome + Discount",
                    triggerType: "new_follower",
                    sequences: [
                      { delay: 60, message: "Hey! 👋 Welcome to our community! So glad you're here! ✨" },
                      { delay: 1440, message: "Hope you're loving our content! Here's a 10% welcome discount: WELCOME10 🎉" }
                    ]
                  },
                  {
                    name: "Value-First Nurture",
                    triggerType: "new_follower",
                    sequences: [
                      { delay: 30, message: "Welcome! 🌟 Thanks for joining our community of [niche] enthusiasts!" },
                      { delay: 720, message: "Here's a free guide that our community loves: [Link] 📚" },
                      { delay: 2880, message: "How are you finding our content so far? Any questions? Just reply! 💬" }
                    ]
                  },
                  {
                    name: "VIP Treatment",
                    triggerType: "verified_follower",
                    sequences: [
                      { delay: 15, message: "WOW! 🤩 A verified account just followed us! Welcome to our VIP circle! ✨" },
                      { delay: 60, message: "As a VIP member, you get early access to all our launches! Stay tuned! 🚀" }
                    ]
                  },
                  {
                    name: "Re-engagement",
                    triggerType: "inactive_follower",
                    sequences: [
                      { delay: 10080, message: "We miss you! 💔 Here's what's been happening while you were away... [summary]" },
                      { delay: 20160, message: "Come back! Here's a special 20% discount just for you: COMEBACK20 🏃‍♀️" }
                    ]
                  }
                ].map((template, index) => (
                  <div 
                    key={index}
                    onClick={() => setNewFlow({
                      name: template.name,
                      triggerType: template.triggerType,
                      sequences: template.sequences,
                      isActive: true
                    })}
                    className="p-4 bg-gray-800 rounded border border-gray-600 hover:border-pink-500 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-medium text-white mb-2">{template.name}</p>
                    <p className="text-xs text-gray-400 mb-3">
                      {triggerTypes.find(t => t.value === template.triggerType)?.label} | 
                      {template.sequences.length} steps
                    </p>
                    <div className="space-y-2">
                      {template.sequences.map((seq, seqIndex) => (
                        <div key={seqIndex} className="text-xs text-gray-300 bg-gray-900 p-2 rounded">
                          <span className="text-yellow-400">Step {seqIndex + 1} ({formatDelay(seq.delay)}):</span>
                          <br />
                          {seq.message}
                        </div>
                      ))}
                    </div>
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
              {welcomeFlows.filter(f => f.isActive).length} active welcome flows will engage new followers
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-pink-500 hover:bg-pink-600">
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

export default WelcomeMessageConfig;
