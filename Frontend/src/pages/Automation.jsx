import React, { useState } from "react";
import { Sidebar } from "../components/Layout/Sidebar";
import { Button } from "../components/ui/button";
import {
  Plus,
  Search,
  Filter,
  Menu,
  Instagram,
  MessageCircle,
  Zap,
  Star,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  ArrowLeft,
  Check,
  ChevronDown,
  X,
  Image,
  Play,
  Heart,
  MessageSquare,
  Share,
} from "lucide-react";

const Automation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isInstagramConnected, setIsInstagramConnected] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [automationType, setAutomationType] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [automationMessage, setAutomationMessage] = useState("");

  // Mock data for user's Instagram posts
  const userPosts = [
    {
      id: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400",
      caption: "New product launch! Check out our latest collection 🔥",
      likes: 245,
      comments: 18,
      shares: 12,
      timestamp: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      type: "reel",
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      caption: "Behind the scenes at our photoshoot 📸",
      likes: 532,
      comments: 45,
      shares: 28,
      timestamp: "2024-01-14T15:45:00Z",
    },
    {
      id: 3,
      type: "image",
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      caption: "Weekend vibes! What are your plans? ✨",
      likes: 189,
      comments: 23,
      shares: 7,
      timestamp: "2024-01-13T09:15:00Z",
    },
    {
      id: 4,
      type: "reel",
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      caption: "Quick tutorial on using our product 📱",
      likes: 678,
      comments: 67,
      shares: 45,
      timestamp: "2024-01-12T14:20:00Z",
    },
    {
      id: 5,
      type: "image",
      url: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400",
      caption: "Customer spotlight! Amazing transformation 💪",
      likes: 345,
      comments: 29,
      shares: 18,
      timestamp: "2024-01-11T11:10:00Z",
    },
    {
      id: 6,
      type: "reel",
      url: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?w=400",
      caption: "Day in the life of our team 🌟",
      likes: 456,
      comments: 34,
      shares: 22,
      timestamp: "2024-01-10T16:30:00Z",
    },
  ];

  const automationTypes = [
    {
      id: "post",
      title: "Post/Reel Comments",
      description: "Respond to comments on your posts automatically",
      icon: Instagram,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      id: "dm",
      title: "Direct Messages",
      description: "Send automated DMs when keywords are triggered",
      icon: MessageCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
  ];

  const handleAddKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddKeyword();
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Step Components
  const SetupStep1 = () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Automation Type
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select how you want to trigger your automation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {automationTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => setAutomationType(type.id)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              automationType === type.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl ${type.bgColor} flex items-center justify-center`}>
                <type.icon className={`w-6 h-6 ${type.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {type.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {type.description}
                </p>
              </div>
              {automationType === type.id && (
                <Check className="w-5 h-5 text-blue-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SetupStep2 = () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {automationType === "post" ? "Select Post/Reel" : "Setup Direct Message Trigger"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {automationType === "post" 
            ? "Choose which post or reel will trigger the automation"
            : "Configure when direct messages should be sent automatically"
          }
        </p>
      </div>

      {automationType === "post" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedPost?.id === post.id
                  ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900"
                  : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2 dark:hover:ring-offset-gray-900"
              }`}
            >
              <div className="aspect-square relative">
                <img
                  src={post.url}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
                {post.type === "reel" && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/60 backdrop-blur-sm rounded-full p-2">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                {selectedPost?.id === post.id && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <div className="bg-blue-500 rounded-full p-2">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 bg-white dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share className="w-3 h-3" />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                  <span>{formatTimeAgo(post.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              DM Automation Setup
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trigger Condition
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>When someone follows me</option>
                  <option>When someone messages me first</option>
                  <option>When someone mentions me in a story</option>
                  <option>When someone likes my post</option>
                </select>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Auto-DM Feature
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                      Automatically send direct messages based on user actions. This helps engage with your audience instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const SetupStep3 = () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Configure Keywords
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add keywords that will trigger your automation
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Add Keywords
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter keyword..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Button onClick={handleAddKeyword} className="px-4">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Press Enter or click + to add keywords
              </p>
            </div>

            {keywords.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Active Keywords ({keywords.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{keyword}</span>
                      <button
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100">
                    Keyword Tips
                  </h4>
                  <ul className="text-sm text-amber-700 dark:text-amber-200 mt-1 space-y-1">
                    <li>• Use specific keywords related to your product/service</li>
                    <li>• Include common questions your audience asks</li>
                    <li>• Add variations and synonyms</li>
                    <li>• Keep keywords relevant to avoid spam</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SetupStep4 = () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Customize Response Message
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create the message that will be sent automatically
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Automation Message
              </label>
              <textarea
                value={automationMessage}
                onChange={(e) => setAutomationMessage(e.target.value)}
                placeholder="Hi! Thanks for your interest. I'll send you more details right away..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {automationMessage.length}/500 characters
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-900 dark:text-green-100">
                    Message Preview
                  </h4>
                  <div className="mt-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {automationMessage || "Your automation message will appear here..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                Available Variables
              </h4>
              <div className="space-y-1 text-xs text-blue-700 dark:text-blue-200">
                <div>• <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">{"{{name}}"}</code> - User's name</div>
                <div>• <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">{"{{username}}"}</code> - User's username</div>
                <div>• <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">{"{{keyword}}"}</code> - Triggered keyword</div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Automation Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Type:</span>
              <span className="text-gray-900 dark:text-white">
                {automationType === "post" ? "Post/Reel Comments" : "Direct Messages"}
              </span>
            </div>
            {selectedPost && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Selected Post:</span>
                <span className="text-gray-900 dark:text-white">
                  {selectedPost.caption.slice(0, 30)}...
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Keywords:</span>
              <span className="text-gray-900 dark:text-white">
                {keywords.length} keyword{keywords.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Message Length:</span>
              <span className="text-gray-900 dark:text-white">
                {automationMessage.length} characters
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SetupStep1 />;
      case 2:
        return <SetupStep2 />;
      case 3:
        return <SetupStep3 />;
      case 4:
        return <SetupStep4 />;
      default:
        return <SetupStep1 />;
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return automationType !== "";
      case 2:
        return automationType === "dm" || selectedPost !== null;
      case 3:
        return keywords.length > 0;
      case 4:
        return automationMessage.trim().length > 0;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (canProceedToNextStep() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAutomation = () => {
    // Here you would typically save the automation to your backend
    console.log("Saving automation:", {
      type: automationType,
      post: selectedPost,
      keywords,
      message: automationMessage,
    });
    
    // Reset wizard
    setCurrentStep(1);
    setAutomationType("");
    setSelectedPost(null);
    setKeywords([]);
    setAutomationMessage("");
    
    // Show success message (you could use a toast notification)
    alert("Automation created successfully!");
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isInstagramConnected={isInstagramConnected}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create Automation
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Set up automated responses for your Instagram account
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentStep} of 4
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round((currentStep / 4) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === currentStep
                        ? "bg-blue-600 text-white"
                        : step < currentStep
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {step < currentStep ? <Check className="w-4 h-4" /> : step}
                  </div>
                ))}
              </div>

              {currentStep === 4 ? (
                <Button
                  onClick={handleSaveAutomation}
                  disabled={!canProceedToNextStep()}
                  className="flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Create Automation</span>
                </Button>
              ) : (
                <Button
                  onClick={handleNextStep}
                  disabled={!canProceedToNextStep()}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automation;
