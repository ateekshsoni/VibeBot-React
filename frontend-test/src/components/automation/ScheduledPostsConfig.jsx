import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  Clock,
  Settings, 
  Eye,
  Save,
  AlertCircle,
  X,
  Image,
  Video,
  FileText,
  Send,
  Edit,
  Copy,
  Play,
  Pause
} from 'lucide-react';

const ScheduledPostsConfig = ({ isOpen, onClose, onSave }) => {
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: 1,
      title: "Monday Motivation Quote",
      type: "image",
      content: "Rise and grind! 💪 Monday is a fresh start to chase your dreams! What's your goal for this week? 🌟 #MondayMotivation #Goals #Success",
      scheduledTime: "2024-01-15T09:00:00",
      recurring: "weekly",
      status: "scheduled",
      mediaUrl: "/placeholder-image.jpg",
      hashtags: ["#MondayMotivation", "#Goals", "#Success"],
      estimatedReach: 1250,
      bestTimeToPost: true
    },
    {
      id: 2,
      title: "Product Feature Highlight",
      type: "video",
      content: "✨ NEW FEATURE ALERT! ✨ Check out our latest update that's going to revolutionize your workflow! Swipe to see it in action 👉 #ProductUpdate #Innovation #TechLife",
      scheduledTime: "2024-01-16T14:30:00",
      recurring: "none",
      status: "scheduled",
      mediaUrl: "/placeholder-video.mp4",
      hashtags: ["#ProductUpdate", "#Innovation", "#TechLife"],
      estimatedReach: 2100,
      bestTimeToPost: true
    },
    {
      id: 3,
      title: "Behind the Scenes",
      type: "carousel",
      content: "Take a peek behind the curtain! 👀 Here's how we create the magic that you see every day. Swipe through our creative process! 🎨 #BehindTheScenes #CreativeProcess #TeamWork",
      scheduledTime: "2024-01-17T16:00:00",
      recurring: "none",
      status: "draft",
      mediaUrl: "/placeholder-carousel.jpg",
      hashtags: ["#BehindTheScenes", "#CreativeProcess", "#TeamWork"],
      estimatedReach: 980,
      bestTimeToPost: false
    }
  ]);
  
  const [newPost, setNewPost] = useState({
    title: '',
    type: 'image',
    content: '',
    scheduledTime: '',
    recurring: 'none',
    hashtags: '',
    mediaUrl: '',
    bestTimeToPost: true
  });

  const [showPreview, setShowPreview] = useState(false);
  const [selectedTab, setSelectedTab] = useState('scheduled');

  const postTypes = [
    { value: 'image', label: 'Single Image', icon: Image },
    { value: 'video', label: 'Video', icon: Video },
    { value: 'carousel', label: 'Carousel', icon: Copy },
    { value: 'text', label: 'Text Only', icon: FileText }
  ];

  const recurringOptions = [
    { value: 'none', label: 'One-time' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft', color: 'gray' },
    { value: 'scheduled', label: 'Scheduled', color: 'blue' },
    { value: 'published', label: 'Published', color: 'green' },
    { value: 'failed', label: 'Failed', color: 'red' }
  ];

  const addScheduledPost = () => {
    if (newPost.title.trim() && newPost.content.trim() && newPost.scheduledTime) {
      const hashtags = newPost.hashtags.split(',').map(h => h.trim().replace(/^#?/, '#')).filter(h => h.length > 1);
      
      setScheduledPosts(prev => [...prev, {
        id: Date.now(),
        title: newPost.title,
        type: newPost.type,
        content: newPost.content,
        scheduledTime: newPost.scheduledTime,
        recurring: newPost.recurring,
        status: 'scheduled',
        mediaUrl: newPost.mediaUrl || '/placeholder-image.jpg',
        hashtags,
        estimatedReach: Math.floor(Math.random() * 2000) + 500,
        bestTimeToPost: newPost.bestTimeToPost
      }]);
      
      setNewPost({
        title: '',
        type: 'image',
        content: '',
        scheduledTime: '',
        recurring: 'none',
        hashtags: '',
        mediaUrl: '',
        bestTimeToPost: true
      });
    }
  };

  const removeScheduledPost = (id) => {
    setScheduledPosts(prev => prev.filter(post => post.id !== id));
  };

  const updatePostStatus = (id, newStatus) => {
    setScheduledPosts(prev => prev.map(post => 
      post.id === id ? { ...post, status: newStatus } : post
    ));
  };

  const duplicatePost = (id) => {
    const postToDuplicate = scheduledPosts.find(post => post.id === id);
    if (postToDuplicate) {
      const duplicatedPost = {
        ...postToDuplicate,
        id: Date.now(),
        title: `${postToDuplicate.title} (Copy)`,
        status: 'draft',
        scheduledTime: ''
      };
      setScheduledPosts(prev => [...prev, duplicatedPost]);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getFilteredPosts = () => {
    switch (selectedTab) {
      case 'scheduled':
        return scheduledPosts.filter(post => post.status === 'scheduled');
      case 'drafts':
        return scheduledPosts.filter(post => post.status === 'draft');
      case 'published':
        return scheduledPosts.filter(post => post.status === 'published');
      default:
        return scheduledPosts;
    }
  };

  const handleSave = () => {
    onSave({ scheduledPosts });
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
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Scheduled Posts Management</h2>
                <p className="text-gray-400 text-sm">Plan, schedule, and manage your Instagram content</p>
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
                  <Calendar className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {scheduledPosts.filter(p => p.status === 'scheduled').length}
                    </p>
                    <p className="text-sm text-gray-400">Scheduled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {scheduledPosts.filter(p => p.status === 'draft').length}
                    </p>
                    <p className="text-sm text-gray-400">Drafts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Send className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {scheduledPosts.filter(p => p.status === 'published').length}
                    </p>
                    <p className="text-sm text-gray-400">Published</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {Math.round(scheduledPosts.reduce((sum, p) => sum + p.estimatedReach, 0) / scheduledPosts.length)}
                    </p>
                    <p className="text-sm text-gray-400">Avg Reach</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Banner */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-indigo-400 mt-0.5" />
              <div>
                <p className="text-indigo-400 font-medium">Smart Scheduling</p>
                <p className="text-gray-300 text-sm mt-1">
                  Posts are automatically optimized for your audience's peak engagement times. 
                  Enable "Best Time to Post" for maximum reach and engagement.
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            {[
              { key: 'all', label: 'All Posts', count: scheduledPosts.length },
              { key: 'scheduled', label: 'Scheduled', count: scheduledPosts.filter(p => p.status === 'scheduled').length },
              { key: 'drafts', label: 'Drafts', count: scheduledPosts.filter(p => p.status === 'draft').length },
              { key: 'published', label: 'Published', count: scheduledPosts.filter(p => p.status === 'published').length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                  selectedTab === tab.key
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          
          {/* Posts List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {selectedTab === 'all' ? 'All Posts' : 
                 selectedTab === 'scheduled' ? 'Scheduled Posts' :
                 selectedTab === 'drafts' ? 'Draft Posts' : 'Published Posts'} 
                ({getFilteredPosts().length})
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
            
            {getFilteredPosts().map((post) => {
              const PostTypeIcon = postTypes.find(t => t.value === post.type)?.icon || Image;
              const statusConfig = statusOptions.find(s => s.value === post.status);
              
              return (
                <Card key={post.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                          <PostTypeIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-white font-medium">{post.title}</h4>
                            <Badge variant={statusConfig?.color === 'green' ? 'default' : 'secondary'} 
                                   className={`text-${statusConfig?.color}-400 border-${statusConfig?.color}-500/30`}>
                              {statusConfig?.label}
                            </Badge>
                            {post.recurring !== 'none' && (
                              <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                                {recurringOptions.find(r => r.value === post.recurring)?.label}
                              </Badge>
                            )}
                            {post.bestTimeToPost && (
                              <Badge variant="outline" className="text-green-400 border-green-500/30">
                                Optimized
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center space-x-1">
                              <PostTypeIcon className="h-3 w-3" />
                              <span>{postTypes.find(t => t.value === post.type)?.label}</span>
                            </span>
                            {post.scheduledTime && (
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatDateTime(post.scheduledTime)}</span>
                              </span>
                            )}
                            <span className="flex items-center space-x-1">
                              <Send className="h-3 w-3" />
                              <span>~{post.estimatedReach} reach</span>
                            </span>
                          </div>
                          
                          <div className="bg-gray-800 p-3 rounded border-l-4 border-indigo-500">
                            <p className="text-sm text-gray-300">{post.content}</p>
                          </div>
                          
                          {post.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {post.hashtags.map((hashtag, index) => (
                                <Badge key={index} variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                                  {hashtag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {showPreview && (
                            <div className="bg-gray-900 p-3 rounded border border-gray-600">
                              <p className="text-xs text-gray-400 mb-2">Instagram Preview:</p>
                              <div className="bg-black p-3 rounded-lg max-w-sm">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                                  <div>
                                    <p className="text-white text-sm font-medium">your_brand</p>
                                    <p className="text-gray-400 text-xs">{formatDateTime(post.scheduledTime)}</p>
                                  </div>
                                </div>
                                <div className="bg-gray-800 aspect-square rounded mb-2 flex items-center justify-center">
                                  <PostTypeIcon className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="text-white text-sm">{post.content.substring(0, 100)}...</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => duplicatePost(post.id)}
                          className="text-blue-400 border-blue-500/30"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        
                        {post.status === 'scheduled' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updatePostStatus(post.id, 'draft')}
                            className="text-yellow-400 border-yellow-500/30"
                          >
                            <Pause className="h-3 w-3" />
                          </Button>
                        )}
                        
                        {post.status === 'draft' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updatePostStatus(post.id, 'scheduled')}
                            className="text-green-400 border-green-500/30"
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        )}
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => removeScheduledPost(post.id)}
                          className="text-red-400 hover:text-red-300 border-red-500/30"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Add New Post */}
          <Card className="bg-gray-800/30 border-gray-700 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Schedule New Post
              </CardTitle>
              <CardDescription>
                Create and schedule content for optimal engagement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Post Title
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Monday Motivation, Product Launch, etc."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Post Type
                  </label>
                  <select
                    value={newPost.type}
                    onChange={(e) => setNewPost(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {postTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Scheduled Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newPost.scheduledTime}
                    onChange={(e) => setNewPost(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Recurring Schedule
                  </label>
                  <select
                    value={newPost.recurring}
                    onChange={(e) => setNewPost(prev => ({ ...prev, recurring: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {recurringOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Post Content
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your engaging caption here... Don't forget to include relevant hashtags! ✨"
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Engaging captions get more interaction
                  </p>
                  <span className="text-xs text-gray-500">
                    {newPost.content.length}/2200 characters
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Hashtags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newPost.hashtags}
                  onChange={(e) => setNewPost(prev => ({ ...prev, hashtags: e.target.value }))}
                  placeholder="#yourbrand, #motivation, #success, #mondayvibes"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newPost.bestTimeToPost}
                    onChange={(e) => setNewPost(prev => ({ ...prev, bestTimeToPost: e.target.checked }))}
                    className="w-4 h-4 text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-300">Optimize for best posting time</span>
                </label>
              </div>

              <Button 
                onClick={addScheduledPost}
                disabled={!newPost.title.trim() || !newPost.content.trim() || !newPost.scheduledTime}
                className="bg-indigo-500 hover:bg-indigo-600"
              >
                <Plus className="h-3 w-3 mr-1" />
                Schedule Post
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              {scheduledPosts.filter(p => p.status === 'scheduled').length} posts scheduled for publication
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-indigo-500 hover:bg-indigo-600">
                <Save className="h-3 w-3 mr-1" />
                Save Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledPostsConfig;
