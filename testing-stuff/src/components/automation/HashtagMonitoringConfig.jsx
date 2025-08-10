import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  Hash,
  Search,
  Settings,
  Eye,
  Save,
  AlertCircle,
  X,
  TrendingUp,
  Target,
  Users,
  MessageCircle,
  Heart,
  Zap,
} from "lucide-react";

const HashtagMonitoringConfig = ({ isOpen, onClose, onSave }) => {
  const [hashtagRules, setHashtagRules] = useState([
    {
      id: 1,
      name: "Brand Mention Tracking",
      hashtags: ["#yourbrand", "#yourproduct", "#brandname"],
      actions: ["like", "comment", "dm_user", "follow"],
      commentTemplates: [
        "Love this! 😍 Thanks for featuring us!",
        "Amazing content! 🔥 Keep it up!",
        "This made our day! ✨ Thank you!",
      ],
      dmTemplate:
        "Hey! 👋 Saw your post with our hashtag - it's amazing! Thanks for the love! 💕",
      isActive: true,
      postsFound: 156,
      engagements: 89,
      followerGain: 23,
      priority: 1,
    },
    {
      id: 2,
      name: "Industry Keywords",
      hashtags: ["#digitalmarketing", "#socialmedia", "#contentcreator"],
      actions: ["like", "comment"],
      commentTemplates: [
        "Great insights! 👍",
        "So helpful! Thanks for sharing! 🙏",
        "Love this perspective! 💡",
      ],
      dmTemplate: "",
      isActive: true,
      postsFound: 342,
      engagements: 187,
      followerGain: 45,
      priority: 2,
    },
    {
      id: 3,
      name: "Competitor Analysis",
      hashtags: ["#competitor1", "#competitor2"],
      actions: ["like"],
      commentTemplates: [],
      dmTemplate: "",
      isActive: false,
      postsFound: 78,
      engagements: 34,
      followerGain: 8,
      priority: 3,
    },
  ]);

  const [newRule, setNewRule] = useState({
    name: "",
    hashtags: "",
    actions: ["like"],
    commentTemplates: [""],
    dmTemplate: "",
    isActive: true,
    priority: 1,
  });

  const [showPreview, setShowPreview] = useState(false);

  const actionTypes = [
    {
      value: "like",
      label: "Auto Like",
      description: "Automatically like posts with these hashtags",
      icon: Heart,
    },
    {
      value: "comment",
      label: "Auto Comment",
      description: "Leave engaging comments on posts",
      icon: MessageCircle,
    },
    {
      value: "dm_user",
      label: "Send DM",
      description: "Send a direct message to the poster",
      icon: MessageCircle,
    },
    {
      value: "follow",
      label: "Auto Follow",
      description: "Follow users who use these hashtags",
      icon: Users,
    },
    {
      value: "save_post",
      label: "Save Post",
      description: "Save posts for later reference",
      icon: Target,
    },
    {
      value: "repost_story",
      label: "Repost to Story",
      description: "Share relevant posts to your story",
      icon: Zap,
    },
  ];

  const addCommentTemplate = () => {
    setNewRule((prev) => ({
      ...prev,
      commentTemplates: [...prev.commentTemplates, ""],
    }));
  };

  const removeCommentTemplate = (index) => {
    if (newRule.commentTemplates.length > 1) {
      setNewRule((prev) => ({
        ...prev,
        commentTemplates: prev.commentTemplates.filter((_, i) => i !== index),
      }));
    }
  };

  const updateCommentTemplate = (index, value) => {
    setNewRule((prev) => ({
      ...prev,
      commentTemplates: prev.commentTemplates.map((template, i) =>
        i === index ? value : template
      ),
    }));
  };

  const toggleAction = (actionValue) => {
    setNewRule((prev) => ({
      ...prev,
      actions: prev.actions.includes(actionValue)
        ? prev.actions.filter((a) => a !== actionValue)
        : [...prev.actions, actionValue],
    }));
  };

  const addHashtagRule = () => {
    if (
      newRule.name.trim() &&
      newRule.hashtags.trim() &&
      newRule.actions.length > 0
    ) {
      const hashtags = newRule.hashtags
        .split(",")
        .map((h) => h.trim().replace(/^#?/, "#"))
        .filter((h) => h.length > 1);
      const validCommentTemplates = newRule.commentTemplates.filter((t) =>
        t.trim()
      );

      setHashtagRules((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newRule.name,
          hashtags,
          actions: newRule.actions,
          commentTemplates: validCommentTemplates,
          dmTemplate: newRule.dmTemplate,
          isActive: true,
          postsFound: 0,
          engagements: 0,
          followerGain: 0,
          priority: hashtagRules.length + 1,
        },
      ]);

      setNewRule({
        name: "",
        hashtags: "",
        actions: ["like"],
        commentTemplates: [""],
        dmTemplate: "",
        isActive: true,
        priority: 1,
      });
    }
  };

  const removeHashtagRule = (id) => {
    setHashtagRules((prev) => prev.filter((rule) => rule.id !== id));
  };

  const toggleHashtagRule = (id) => {
    setHashtagRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  const updatePriority = (id, direction) => {
    setHashtagRules((prev) => {
      const currentIndex = prev.findIndex((r) => r.id === id);
      if (
        (direction === "up" && currentIndex === 0) ||
        (direction === "down" && currentIndex === prev.length - 1)
      )
        return prev;

      const newRules = [...prev];
      const targetIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;

      [newRules[currentIndex], newRules[targetIndex]] = [
        newRules[targetIndex],
        newRules[currentIndex],
      ];

      return newRules.map((rule, index) => ({ ...rule, priority: index + 1 }));
    });
  };

  const handleSave = () => {
    onSave({ hashtagRules });
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
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <Hash className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Hashtag Monitoring & Engagement
                </h2>
                <p className="text-gray-400 text-sm">
                  Track hashtags and automatically engage with relevant content
                </p>
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
                  <Search className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {hashtagRules.reduce((sum, r) => sum + r.postsFound, 0)}
                    </p>
                    <p className="text-sm text-gray-400">Posts Monitored</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {hashtagRules.reduce((sum, r) => sum + r.engagements, 0)}
                    </p>
                    <p className="text-sm text-gray-400">Engagements Made</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {hashtagRules.reduce((sum, r) => sum + r.followerGain, 0)}
                    </p>
                    <p className="text-sm text-gray-400">Followers Gained</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {hashtagRules.filter((r) => r.isActive).length}
                    </p>
                    <p className="text-sm text-gray-400">Active Rules</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium">
                  Smart Hashtag Monitoring
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  Our system monitors hashtags in real-time and performs your
                  chosen actions automatically. Rules are processed in priority
                  order. Be strategic with your engagement to build authentic
                  connections.
                </p>
              </div>
            </div>
          </div>

          {/* Hashtag Rules */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Monitoring Rules ({hashtagRules.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="h-3 w-3 mr-1" />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
            </div>

            {hashtagRules.map((rule, index) => (
              <Card key={rule.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={rule.isActive ? "default" : "secondary"}
                        >
                          Priority #{rule.priority}
                        </Badge>
                        <Badge
                          variant={rule.isActive ? "default" : "secondary"}
                        >
                          {rule.isActive ? "Active" : "Paused"}
                        </Badge>
                        <span className="text-sm text-gray-400">
                          {rule.postsFound} posts | {rule.engagements}{" "}
                          engagements | +{rule.followerGain} followers
                        </span>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">
                          {rule.name}
                        </h4>
                      </div>

                      <div>
                        <p className="text-sm text-gray-300 font-medium mb-2">
                          Monitoring Hashtags:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {rule.hashtags.map((hashtag, hashtagIndex) => (
                            <Badge
                              key={hashtagIndex}
                              variant="outline"
                              className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30"
                            >
                              {hashtag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-300 font-medium mb-2">
                          Auto Actions:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {rule.actions.map((action) => {
                            const actionType = actionTypes.find(
                              (a) => a.value === action
                            );
                            const IconComponent = actionType?.icon || Heart;
                            return (
                              <div
                                key={action}
                                className="flex items-center space-x-1 bg-gray-700 px-2 py-1 rounded text-xs"
                              >
                                <IconComponent className="h-3 w-3 text-green-400" />
                                <span className="text-gray-300">
                                  {actionType?.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {rule.commentTemplates.length > 0 &&
                        rule.actions.includes("comment") && (
                          <div>
                            <p className="text-sm text-gray-300 font-medium mb-2">
                              Comment Templates:
                            </p>
                            <div className="space-y-1">
                              {rule.commentTemplates
                                .slice(0, 2)
                                .map((template, templateIndex) => (
                                  <div
                                    key={templateIndex}
                                    className="bg-gray-800 p-2 rounded border-l-4 border-green-500"
                                  >
                                    <p className="text-xs text-gray-300">
                                      "{template}"
                                    </p>
                                  </div>
                                ))}
                              {rule.commentTemplates.length > 2 && (
                                <p className="text-xs text-gray-500">
                                  +{rule.commentTemplates.length - 2} more
                                  templates
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                      {rule.dmTemplate && rule.actions.includes("dm_user") && (
                        <div>
                          <p className="text-sm text-gray-300 font-medium mb-2">
                            DM Template:
                          </p>
                          <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-500">
                            <p className="text-sm text-gray-300">
                              {rule.dmTemplate}
                            </p>
                          </div>
                        </div>
                      )}

                      {showPreview && (
                        <div className="bg-gray-900 p-3 rounded border border-gray-600">
                          <p className="text-xs text-gray-400 mb-2">
                            Preview: Automation workflow
                          </p>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center space-x-2">
                              <Search className="h-3 w-3 text-blue-400" />
                              <span className="text-blue-300">
                                System finds post with {rule.hashtags[0]}
                              </span>
                            </div>
                            {rule.actions.includes("like") && (
                              <div className="flex items-center space-x-2">
                                <Heart className="h-3 w-3 text-red-400" />
                                <span className="text-gray-300">
                                  Auto-like the post
                                </span>
                              </div>
                            )}
                            {rule.actions.includes("comment") &&
                              rule.commentTemplates.length > 0 && (
                                <div className="flex items-center space-x-2">
                                  <MessageCircle className="h-3 w-3 text-green-400" />
                                  <span className="text-gray-300">
                                    Comment: "{rule.commentTemplates[0]}"
                                  </span>
                                </div>
                              )}
                            {rule.actions.includes("follow") && (
                              <div className="flex items-center space-x-2">
                                <Users className="h-3 w-3 text-blue-400" />
                                <span className="text-gray-300">
                                  Follow the user
                                </span>
                              </div>
                            )}
                            {rule.actions.includes("dm_user") &&
                              rule.dmTemplate && (
                                <div className="flex items-center space-x-2">
                                  <MessageCircle className="h-3 w-3 text-purple-400" />
                                  <span className="text-gray-300">
                                    Send DM to user
                                  </span>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center space-y-2 ml-4">
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePriority(rule.id, "up")}
                          disabled={index === 0}
                          className="px-2"
                        >
                          ↑
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePriority(rule.id, "down")}
                          disabled={index === hashtagRules.length - 1}
                          className="px-2"
                        >
                          ↓
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleHashtagRule(rule.id)}
                        className={
                          rule.isActive
                            ? "text-red-400 hover:text-red-300 border-red-500/30"
                            : "text-green-400 hover:text-green-300 border-green-500/30"
                        }
                      >
                        {rule.isActive ? "Pause" : "Activate"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeHashtagRule(rule.id)}
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

          {/* Add New Hashtag Rule */}
          <Card className="bg-gray-800/30 border-gray-700 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Hashtag Monitoring Rule
              </CardTitle>
              <CardDescription>
                Set up automated engagement for specific hashtags
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
                    value={newRule.name}
                    onChange={(e) =>
                      setNewRule((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Brand Mentions, Industry Keywords, etc."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Hashtags to Monitor (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newRule.hashtags}
                    onChange={(e) =>
                      setNewRule((prev) => ({
                        ...prev,
                        hashtags: e.target.value,
                      }))
                    }
                    placeholder="#yourbrand, #yourproduct, #industry"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-3">
                  Auto Actions (select multiple)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {actionTypes.map((actionType) => {
                    const IconComponent = actionType.icon;
                    const isSelected = newRule.actions.includes(
                      actionType.value
                    );
                    return (
                      <div
                        key={actionType.value}
                        onClick={() => toggleAction(actionType.value)}
                        className={`p-3 rounded border cursor-pointer transition-colors ${
                          isSelected
                            ? "border-blue-500 bg-blue-500/10 text-blue-400"
                            : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <div>
                            <p className="text-sm font-medium">
                              {actionType.label}
                            </p>
                            <p className="text-xs opacity-70">
                              {actionType.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {newRule.actions.includes("comment") && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Comment Templates
                    </label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={addCommentTemplate}
                      className="text-blue-400 border-blue-500/30"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Template
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {newRule.commentTemplates.map((template, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={template}
                          onChange={(e) =>
                            updateCommentTemplate(index, e.target.value)
                          }
                          placeholder="Great post! Love this content! 😍"
                          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {newRule.commentTemplates.length > 1 && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => removeCommentTemplate(index)}
                            className="text-red-400 border-red-500/30"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {newRule.actions.includes("dm_user") && (
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    DM Template
                  </label>
                  <textarea
                    value={newRule.dmTemplate}
                    onChange={(e) =>
                      setNewRule((prev) => ({
                        ...prev,
                        dmTemplate: e.target.value,
                      }))
                    }
                    placeholder="Hey! Loved your post with our hashtag! Thanks for the mention! 😊"
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              )}

              <Button
                onClick={addHashtagRule}
                disabled={
                  !newRule.name.trim() ||
                  !newRule.hashtags.trim() ||
                  newRule.actions.length === 0
                }
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Monitoring Rule
              </Button>
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card className="bg-gray-800/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-md text-white">
                Quick Templates
              </CardTitle>
              <CardDescription>
                Pre-configured monitoring rules for common scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    name: "Brand Protection",
                    hashtags: "#yourbrand, #yourcompany, #yourproduct",
                    actions: ["like", "comment", "dm_user"],
                    commentTemplates: [
                      "Thank you for mentioning us! 🙏",
                      "We appreciate the support! ✨",
                    ],
                    dmTemplate:
                      "Thanks for featuring our brand! We love seeing our community grow! 💕",
                  },
                  {
                    name: "Industry Engagement",
                    hashtags: "#digitalmarketing, #socialmedia, #marketing",
                    actions: ["like", "comment"],
                    commentTemplates: [
                      "Great insights! 👍",
                      "So valuable! Thanks for sharing! 🙏",
                    ],
                    dmTemplate: "",
                  },
                  {
                    name: "Competitor Monitoring",
                    hashtags: "#competitor1, #competitor2",
                    actions: ["like"],
                    commentTemplates: [],
                    dmTemplate: "",
                  },
                  {
                    name: "Lead Generation",
                    hashtags: "#needhelp, #lookingfor, #recommendations",
                    actions: ["comment", "dm_user", "follow"],
                    commentTemplates: [
                      "We can help with this! 💪",
                      "Check your DMs! 📩",
                    ],
                    dmTemplate:
                      "Hey! Saw your post - we specialize in this area and would love to help! 😊",
                  },
                ].map((template, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setNewRule({
                        name: template.name,
                        hashtags: template.hashtags,
                        actions: template.actions,
                        commentTemplates:
                          template.commentTemplates.length > 0
                            ? template.commentTemplates
                            : [""],
                        dmTemplate: template.dmTemplate,
                        isActive: true,
                        priority: 1,
                      })
                    }
                    className="p-3 bg-gray-800 rounded border border-gray-600 hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-medium text-white mb-1">
                      {template.name}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">
                      Actions: {template.actions.join(", ")}
                    </p>
                    <p className="text-xs text-gray-300 bg-gray-900 p-2 rounded mb-2">
                      Hashtags: {template.hashtags}
                    </p>
                    {template.commentTemplates.length > 0 && (
                      <p className="text-xs text-gray-300 bg-gray-900 p-2 rounded">
                        Comments: {template.commentTemplates.join(" | ")}
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
              {hashtagRules.filter((r) => r.isActive).length} active monitoring
              rules tracking{" "}
              {hashtagRules.reduce((sum, r) => sum + r.hashtags.length, 0)}{" "}
              hashtags
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600"
              >
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

export default HashtagMonitoringConfig;
