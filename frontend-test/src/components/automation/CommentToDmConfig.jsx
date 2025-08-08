import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  MessageSquare, 
  Settings, 
  Eye,
  Save,
  AlertCircle,
  X,
  Copy
} from 'lucide-react';

const CommentToDmConfig = ({ isOpen, onClose, onSave }) => {
  const [rules, setRules] = useState([
    {
      id: 1,
      keywords: ['price', 'cost', 'buy'],
      dmTemplate: 'Hi! Thanks for your interest! 🎉 Check your DMs for special pricing info.',
      isActive: true,
      triggerCount: 45
    },
    {
      id: 2,
      keywords: ['info', 'details', 'more'],
      dmTemplate: 'Hey there! 👋 I\'ve sent you detailed information in your DMs. Check it out!',
      isActive: true,
      triggerCount: 23
    }
  ]);
  
  const [newRule, setNewRule] = useState({
    keywords: '',
    dmTemplate: '',
    isActive: true
  });

  const [showPreview, setShowPreview] = useState(false);

  const addRule = () => {
    if (newRule.keywords.trim() && newRule.dmTemplate.trim()) {
      const keywords = newRule.keywords.split(',').map(k => k.trim()).filter(k => k);
      
      setRules(prev => [...prev, {
        id: Date.now(),
        keywords,
        dmTemplate: newRule.dmTemplate,
        isActive: true,
        triggerCount: 0
      }]);
      
      setNewRule({ keywords: '', dmTemplate: '', isActive: true });
    }
  };

  const removeRule = (id) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };

  const toggleRule = (id) => {
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const handleSave = () => {
    onSave({ rules });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Comment-to-DM Automation</h2>
                <p className="text-gray-400 text-sm">Configure automatic DM responses to comments</p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          
          {/* Info Banner */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium">How it works</p>
                <p className="text-gray-300 text-sm mt-1">
                  When someone comments with your specified keywords, they'll automatically receive a DM with your custom message. 
                  This helps capture leads and provide instant responses to common questions.
                </p>
              </div>
            </div>
          </div>
          
          {/* Existing Rules */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Active Rules ({rules.length})</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="h-3 w-3 mr-1" />
                {showPreview ? 'Hide' : 'Preview'}
              </Button>
            </div>
            
            {rules.map((rule) => (
              <Card key={rule.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant={rule.isActive ? "default" : "secondary"}>
                          {rule.isActive ? "Active" : "Paused"}
                        </Badge>
                        <span className="text-sm text-gray-400">
                          Triggered {rule.triggerCount} times this month
                        </span>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-300 font-medium mb-2">Trigger Keywords:</p>
                        <div className="flex flex-wrap gap-1">
                          {rule.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                              "{keyword}"
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-300 font-medium mb-2">DM Template:</p>
                        <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-500">
                          <p className="text-sm text-gray-300">{rule.dmTemplate}</p>
                        </div>
                      </div>

                      {showPreview && (
                        <div className="bg-gray-900 p-3 rounded border border-gray-600">
                          <p className="text-xs text-gray-400 mb-2">Preview: How it appears to users</p>
                          <div className="flex items-start space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">YB</span>
                            </div>
                            <div className="bg-blue-500 text-white p-2 rounded-lg text-sm max-w-xs">
                              {rule.dmTemplate}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleRule(rule.id)}
                        className={rule.isActive ? 
                          "text-red-400 hover:text-red-300 border-red-500/30" : 
                          "text-green-400 hover:text-green-300 border-green-500/30"
                        }
                      >
                        {rule.isActive ? 'Pause' : 'Activate'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removeRule(rule.id)}
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

          {/* Add New Rule */}
          <Card className="bg-gray-800/30 border-gray-700 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Rule
              </CardTitle>
              <CardDescription>
                Create a new keyword trigger that will automatically send DMs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={newRule.keywords}
                  onChange={(e) => setNewRule(prev => ({ ...prev, keywords: e.target.value }))}
                  placeholder="price, cost, buy, order, interested"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  When someone comments any of these keywords, they'll receive your DM
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  DM Template
                </label>
                <textarea
                  value={newRule.dmTemplate}
                  onChange={(e) => setNewRule(prev => ({ ...prev, dmTemplate: e.target.value }))}
                  placeholder="Hi! Thanks for your interest! 🎉 I've sent you more details in your DMs. Check it out!"
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Keep it friendly and personal. Emojis are encouraged!
                  </p>
                  <span className="text-xs text-gray-500">
                    {newRule.dmTemplate.length}/1000 characters
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button 
                  onClick={addRule}
                  disabled={!newRule.keywords.trim() || !newRule.dmTemplate.trim()}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Rule
                </Button>
                <Button variant="outline">
                  <Copy className="h-3 w-3 mr-1" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Template Suggestions */}
          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-md text-white">Quick Templates</CardTitle>
              <CardDescription>Click to use these proven templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    name: "Pricing Inquiry",
                    keywords: "price, cost, buy, purchase",
                    template: "Hi! 👋 Thanks for your interest! I've sent you detailed pricing info in your DMs. Check it out! 💰"
                  },
                  {
                    name: "General Info",
                    keywords: "info, details, more, learn",
                    template: "Hey there! 🌟 I've sent you all the details in your DMs. Let me know if you have any questions!"
                  },
                  {
                    name: "Lead Magnet",
                    keywords: "download, free, guide, ebook",
                    template: "Amazing! 🎉 Your free guide is waiting in your DMs. Go grab it now!"
                  },
                  {
                    name: "Support",
                    keywords: "help, support, question, issue",
                    template: "Hi! 💬 I'm here to help! I've sent you some information in your DMs. Let's solve this together!"
                  }
                ].map((template, index) => (
                  <div 
                    key={index}
                    onClick={() => setNewRule({
                      keywords: template.keywords,
                      dmTemplate: template.template,
                      isActive: true
                    })}
                    className="p-3 bg-gray-800 rounded border border-gray-600 hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-medium text-white mb-1">{template.name}</p>
                    <p className="text-xs text-gray-400 mb-2">Keywords: {template.keywords}</p>
                    <p className="text-xs text-gray-300 bg-gray-900 p-2 rounded">
                      {template.template}
                    </p>
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
              {rules.filter(r => r.isActive).length} active rules will process incoming comments
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
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

export default CommentToDmConfig;
