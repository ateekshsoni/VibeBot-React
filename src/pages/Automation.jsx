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
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [selectedAutomation, setSelectedAutomation] = useState(null);
  const [setupData, setSetupData] = useState({
    selectedPost: null,
    triggerKeyword: "",
    message: "",
  });
  /* Static post data (replace with real backend data later) */
  const userPosts = [
    {
      id: 1,
      type: "post",
      image:
        "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=400",
      caption: "Beautiful sunset at the beach 🌅 #sunset #beach #peaceful",
      likes: 1234,
      comments: 89,
      date: "2 days ago",
    },
    {
      id: 2,
      type: "reel",
      thumbnail:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
      caption: "Morning workout routine 💪 #fitness #motivation #workout",
      likes: 2567,
      comments: 156,
      date: "5 days ago",
    },
    {
      id: 3,
      type: "post",
      image:
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400",
      caption: "Delicious homemade pasta 🍝 Recipe in comments!",
      likes: 892,
      comments: 234,
      date: "1 week ago",
    },
    {
      id: 4,
      type: "reel",
      thumbnail:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      caption: "Mountain hiking adventure 🏔️ #adventure #hiking #nature",
      likes: 3456,
      comments: 287,
      date: "1 week ago",
    },
    {
      id: 5,
      type: "post",
      image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=400",
      caption: "Coffee and productivity ☕ #workfromhome #coffee #productivity",
      likes: 1789,
      comments: 134,
      date: "2 weeks ago",
    },
    {
      id: 6,
      type: "reel",
      thumbnail:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      caption: "Street art discovery 🎨 #streetart #urban #creativity",
      likes: 2134,
      comments: 198,
      date: "2 weeks ago",
    },
  ];
  const automationTypes = [
    {
      id: "post",
      title: "Post/Reel Automation",
      description: "Create automations triggered by comments on your posts",
      icon: Instagram,
      color: "from-purple-600 to-pink-600",
      stats: { active: 12, total: 15 },
    },
    {
      id: "dm",
      title: "DM Automation",
      description: "Automated responses for direct messages",
      icon: MessageCircle,
      color: "from-blue-600 to-cyan-600",
      stats: { active: 8, total: 10 },
    },
  ];
  const existingAutomations = [
    {
      id: 1,
      name: "Welcome Message",
      type: "DM",
      status: "Active",
      triggers: 156,
      responses: 142,
      conversionRate: "91%",
    },
    {
      id: 2,
      name: "Product Info",
      type: "Post",
      status: "Active",
      triggers: 89,
      responses: 76,
      conversionRate: "85%",
    },
    {
      id: 3,
      name: "Newsletter Signup",
      type: "Reel",
      status: "Paused",
      triggers: 234,
      responses: 198,
      conversionRate: "85%",
    },
  ];
  const handleCreateAutomation = (type) => {
    setSelectedAutomation(type);
    setShowSetupWizard(true);
    setSetupStep(1);
    setSetupData({ selectedPost: null, triggerKeyword: "", message: "" });
  };
  const handleNextStep = () => {
    if (setupStep < 4) {
      setSetupStep(setupStep + 1);
    }
  };
  const handlePrevStep = () => {
    if (setupStep > 1) {
      setSetupStep(setupStep - 1);
    }
  };
  const handleFinishSetup = () => {
    console.log("Creating automation with data:", setupData);
    setShowSetupWizard(false);
    setSetupStep(1);
    setSelectedAutomation(null);
    setSetupData({ selectedPost: null, triggerKeyword: "", message: "" });
  };
  const isStepValid = () => {
    switch (setupStep) {
      case 1:
        return setupData.selectedPost !== null;
      case 2:
        return setupData.triggerKeyword.trim() !== "";
      case 3:
        return setupData.message.trim() !== "";
      case 4:
        return true;
      default:
        return false;
    }
  };
  // Step 1: Select Post
  const SetupStep1 = () => {
    return (
      <div className="space-y-6">
        {" "}
        <div>
          {" "}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {" "}
            Choose a post or reel{" "}
          </h3>{" "}
          <p className="text-gray-600 dark:text-gray-400">
            {" "}
            Select which post or reel will trigger your automation{" "}
          </p>{" "}
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {" "}
          {userPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSetupData({ ...setupData, selectedPost: post })}
              className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                setupData.selectedPost?.id === post.id
                  ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {" "}
              <div className="aspect-square relative">
                {" "}
                <img
                  src={post.image || post.thumbnail}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />{" "}
                {post.type === "reel" && (
                  <div className="absolute top-2 right-2">
                    {" "}
                    <Play
                      className="w-4 h-4 text-white bg-black bg-opacity-50 rounded-full p-1"
                      size={20}
                    />{" "}
                  </div>
                )}
                {setupData.selectedPost?.id === post.id && (
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                    {" "}
                    <div className="bg-blue-500 rounded-full p-2">
                      {" "}
                      <Check className="w-4 h-4 text-white" />{" "}
                    </div>{" "}
                  </div>
                )}
              </div>{" "}
              <div className="p-3">
                {" "}
                <p className="text-sm text-gray-900 dark:text-white line-clamp-2 mb-2">
                  {" "}
                  {post.caption}{" "}
                </p>{" "}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  {" "}
                  <div className="flex items-center space-x-3">
                    {" "}
                    <span className="flex items-center space-x-1">
                      {" "}
                      <Heart className="w-3 h-3" />{" "}
                      <span>{post.likes.toLocaleString()}</span>{" "}
                    </span>{" "}
                    <span className="flex items-center space-x-1">
                      {" "}
                      <MessageSquare className="w-3 h-3" />{" "}
                      <span>{post.comments}</span>{" "}
                    </span>{" "}
                  </div>{" "}
                  <span>{post.date}</span>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
        {setupData.selectedPost && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            {" "}
            <div className="flex items-center space-x-2">
              {" "}
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />{" "}
              <span className="text-green-800 dark:text-green-200 font-medium">
                {" "}
                Selected:{" "}
                {setupData.selectedPost.type === "reel" ? "Reel" : "Post"}{" "}
              </span>{" "}
            </div>{" "}
            <p className="text-green-700 dark:text-green-300 text-sm mt-1 line-clamp-1">
              {" "}
              {setupData.selectedPost.caption}{" "}
            </p>{" "}
          </div>
        )}{" "}
      </div>
    );
  };
  // Step 2: Enter Trigger Keyword
  const SetupStep2 = () => {
    const keywordExamples = ["LINK", "INFO", "YES", "SUBSCRIBE", "MORE"];
    return (
      <div className="space-y-6">
        {" "}
        <div>
          {" "}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {" "}
            Set trigger keyword{" "}
          </h3>{" "}
          <p className="text-gray-600 dark:text-gray-400">
            {" "}
            Choose a keyword that users will comment to trigger your automation{" "}
          </p>{" "}
        </div>{" "}
        <div className="space-y-4">
          {" "}
          <div>
            {" "}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {" "}
              Trigger Keyword{" "}
            </label>{" "}
            <input
              type="text"
              value={setupData.triggerKeyword}
              onChange={(e) =>
                setSetupData({
                  ...setupData,
                  triggerKeyword: e.target.value.toUpperCase(),
                })
              }
              placeholder="Enter keyword (e.g., LINK, INFO)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />{" "}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {" "}
              Keep it short and memorable. It will be automatically converted to
              uppercase.{" "}
            </p>{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {" "}
              Popular keyword examples:{" "}
            </p>{" "}
            <div className="flex flex-wrap gap-2">
              {" "}
              {keywordExamples.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() =>
                    setSetupData({ ...setupData, triggerKeyword: keyword })
                  }
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    setupData.triggerKeyword === keyword
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {" "}
                  {keyword}{" "}
                </button>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {setupData.triggerKeyword && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            {" "}
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              💡 How it works:
            </h4>{" "}
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              {" "}
              <p>
                1. User comments "
                <strong>{setupData.triggerKeyword || "KEYWORD"}</strong>" on
                your post
              </p>{" "}
              <p>2. Your automation detects the keyword</p>{" "}
              <p>3. Automatically sends a DM with your custom message</p>{" "}
            </div>{" "}
          </div>
        )}{" "}
      </div>
    );
  };
  // Step 3: Customize Message
  const SetupStep3 = () => {
    return (
      <div className="space-y-6">
        {" "}
        <div>
          {" "}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {" "}
            Customize your auto-reply message{" "}
          </h3>{" "}
          <p className="text-gray-600 dark:text-gray-400">
            {" "}
            This message will be sent automatically when someone comments with
            your keyword{" "}
          </p>{" "}
        </div>{" "}
        {setupData.selectedPost && setupData.triggerKeyword && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            {" "}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Automation trigger:
            </p>{" "}
            <div className="flex items-center space-x-3">
              {" "}
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                {" "}
                <img
                  src={
                    setupData.selectedPost.image ||
                    setupData.selectedPost.thumbnail
                  }
                  alt=""
                  className="w-full h-full object-cover"
                />{" "}
              </div>{" "}
              <div className="flex-1 min-w-0">
                {" "}
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {" "}
                  {setupData.selectedPost.caption}{" "}
                </p>{" "}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {" "}
                  Keyword:{" "}
                  <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                    {setupData.triggerKeyword}
                  </span>{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        )}{" "}
        <div className="space-y-4">
          {" "}
          <div>
            {" "}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {" "}
              Auto-reply Message{" "}
            </label>{" "}
            <textarea
              value={setupData.message}
              onChange={(e) =>
                setSetupData({ ...setupData, message: e.target.value })
              }
              placeholder="Hi! Thanks for your interest. Here's the link you requested: [your-link]"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />{" "}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {" "}
              Keep it personal and helpful. You can include links, emojis, and
              personalized content.{" "}
            </p>{" "}
          </div>{" "}
          {setupData.message && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              {" "}
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message Preview:
              </p>{" "}
              <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-bl-md max-w-xs">
                {" "}
                <p className="text-sm">{setupData.message}</p>{" "}
              </div>{" "}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {" "}
                Sent automatically via DM{" "}
              </p>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>
    );
  };
  // Step 4: Review and Confirm
  const SetupStep4 = () => {
    return (
      <div className="space-y-6">
        {" "}
        <div>
          {" "}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {" "}
            Review your automation{" "}
          </h3>{" "}
          <p className="text-gray-600 dark:text-gray-400">
            {" "}
            Review all settings before activating your automation{" "}
          </p>{" "}
        </div>
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Selected Post/Reel
            </h4>
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src={
                    setupData.selectedPost?.image ||
                    setupData.selectedPost?.thumbnail
                  }
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
                  {setupData.selectedPost?.caption}
                </p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>
                      {setupData.selectedPost?.likes.toLocaleString()}
                    </span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>{setupData.selectedPost?.comments}</span>
                  </span>
                  <span className="capitalize">
                    {setupData.selectedPost?.type}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Trigger Keyword
            </h4>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-lg bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-gray-900 dark:text-white">
                {setupData.triggerKeyword}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                When users comment this keyword
              </span>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Auto-reply Message
            </h4>
            <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-bl-md max-w-md">
              <p className="text-sm">{setupData.message}</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              This message will be sent automatically via DM
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            🔄 Automation Flow
          </h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                User comments "
                <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded">
                  {setupData.triggerKeyword}
                </span>
                " on your post
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Automation detects the keyword instantly
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Auto-reply message sent to user's DM
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (showSetupWizard) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isInstagramConnected={isInstagramConnected}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowSetupWizard(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                      Create {selectedAutomation?.title}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Step {setupStep} of 4
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= setupStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step < setupStep ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step < setupStep
                          ? "bg-blue-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-2xl mx-auto">
              {setupStep === 1 && <SetupStep1 />}
              {setupStep === 2 && <SetupStep2 />}
              {setupStep === 3 && <SetupStep3 />}
              {setupStep === 4 && <SetupStep4 />}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="max-w-2xl mx-auto flex items-center justify-between">
              <button
                onClick={handlePrevStep}
                disabled={setupStep === 1}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {setupStep < 4 ? (
                <button
                  onClick={handleNextStep}
                  disabled={!isStepValid()}
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishSetup}
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  <Check className="w-4 h-4" />
                  <span>Create Automation</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isInstagramConnected={isInstagramConnected}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
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
                    Automation
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create and manage your automated responses
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search automations..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Automations
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      25
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Active
                    </p>
                    <p className="text-2xl font-bold text-green-600">20</p>
                  </div>
                  <Star className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Messages Sent
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      1,234
                    </p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Response Rate
                    </p>
                    <p className="text-2xl font-bold text-blue-600">89%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Create New Automation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {automationTypes.map((type) => (
                  <div
                    key={type.id}
                    className="relative group cursor-pointer"
                    onClick={() => handleCreateAutomation(type)}
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center`}
                        >
                          <type.icon className="w-6 h-6 text-white" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {type.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {type.stats.active} active
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {type.stats.total} total
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Your Automations
                  </h2>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="all">All Types</option>
                      <option value="post">Post Automations</option>
                      <option value="dm">DM Automations</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {existingAutomations.map((automation) => (
                  <div
                    key={automation.id}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-xl ${
                            automation.type === "DM"
                              ? "bg-blue-100 dark:bg-blue-900"
                              : "bg-purple-100 dark:bg-purple-900"
                          } flex items-center justify-center`}
                        >
                          {automation.type === "DM" ? (
                            <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Instagram className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {automation.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{automation.triggers} triggers</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{automation.responses} responses</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>{automation.conversionRate} rate</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            automation.status === "Active"
                              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                              : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          }`}
                        >
                          {automation.status}
                        </span>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                          <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automation;
