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
  MessageCircle,
  Clock,
  Settings,
  Eye,
  Save,
  AlertCircle,
  X,
  Bot,
  Users,
} from "lucide-react";

const DmAutoReplyConfig = ({ isOpen, onClose, onSave }) => {
  const [autoReplies, setAutoReplies] = useState([
    {
      id: 1,
      name: "Welcome Message",
      triggers: ["hello", "hi", "hey", "start"],
      response:
        "Hey there! 👋 Welcome to our community! How can I help you today?",
      delay: 0,
      isActive: true,
      triggerCount: 156,
      priority: 1,
    },
    {
      id: 2,
      name: "Business Hours",
      triggers: ["support", "help", "customer service"],
      response:
        "Thanks for reaching out! 🕐 Our team typically responds within 2-4 hours during business hours (9AM-6PM EST). For urgent matters, please mention 'URGENT' in your message.",
      delay: 30,
      isActive: true,
      triggerCount: 89,
      priority: 2,
    },
    {
      id: 3,
      name: "FAQ Auto-Response",
      triggers: ["price", "pricing", "cost", "how much"],
      response:
        "Great question! 💰 Our pricing varies based on your needs. I'll connect you with our team who can provide personalized pricing. In the meantime, check out our packages: [Link]",
      delay: 15,
      isActive: false,
      triggerCount: 67,
      priority: 3,
    },
  ]);

  const [newReply, setNewReply] = useState({
    name: "",
    triggers: "",
    response: "",
    delay: 0,
    isActive: true,
    priority: 1,
  });

  const [showPreview, setShowPreview] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("24h");

  const addAutoReply = () => {
    if (
      newReply.name.trim() &&
      newReply.triggers.trim() &&
      newReply.response.trim()
    ) {
      const triggers = newReply.triggers
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

      setAutoReplies((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newReply.name,
          triggers,
          response: newReply.response,
          delay: parseInt(newReply.delay) || 0,
          isActive: true,
          triggerCount: 0,
          priority: autoReplies.length + 1,
        },
      ]);

      setNewReply({
        name: "",
        triggers: "",
        response: "",
        delay: 0,
        isActive: true,
        priority: 1,
      });
    }
  };

  const removeAutoReply = (id) => {
    setAutoReplies((prev) => prev.filter((reply) => reply.id !== id));
  };

  const toggleAutoReply = (id) => {
    setAutoReplies((prev) =>
      prev.map((reply) =>
        reply.id === id ? { ...reply, isActive: !reply.isActive } : reply
      )
    );
  };

  const updatePriority = (id, direction) => {
    setAutoReplies((prev) => {
      const currentIndex = prev.findIndex((r) => r.id === id);
      if (
        (direction === "up" && currentIndex === 0) ||
        (direction === "down" && currentIndex === prev.length - 1)
      )
        return prev;

      const newReplies = [...prev];
      const targetIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;

      [newReplies[currentIndex], newReplies[targetIndex]] = [
        newReplies[targetIndex],
        newReplies[currentIndex],
      ];

      return newReplies.map((reply, index) => ({
        ...reply,
        priority: index + 1,
      }));
    });
  };

  const handleSave = () => {
    onSave({ autoReplies });
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
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  DM Auto-Reply Configuration
                </h2>
                <p className="text-gray-400 text-sm">
                  Set up intelligent automatic responses to direct messages
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
          {/* Stats & Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {autoReplies.filter((r) => r.isActive).length}
                    </p>
                    <p className="text-sm text-gray-400">Active Rules</p>
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
                      {autoReplies.reduce((sum, r) => sum + r.triggerCount, 0)}
                    </p>
                    <p className="text-sm text-gray-400">
                      Total Responses (30d)
                    </p>
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
                      {Math.round(
                        autoReplies.reduce((sum, r) => sum + r.delay, 0) /
                          autoReplies.length
                      )}
                      s
                    </p>
                    <p className="text-sm text-gray-400">Avg Response Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Banner */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-green-400 font-medium">
                  Smart Auto-Reply System
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  Responses are processed in priority order. First matching
                  trigger wins. Add delays to make responses feel more natural.
                  Use specific triggers for better accuracy.
                </p>
              </div>
            </div>
          </div>

          {/* Response Rules */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Auto-Reply Rules ({autoReplies.length})
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
              </div>
            </div>

            {autoReplies.map((reply, index) => (
              <Card key={reply.id} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={reply.isActive ? "default" : "secondary"}
                        >
                          Priority #{reply.priority}
                        </Badge>
                        <Badge
                          variant={reply.isActive ? "default" : "secondary"}
                        >
                          {reply.isActive ? "Active" : "Paused"}
                        </Badge>
                        <span className="text-sm text-gray-400">
                          {reply.triggerCount} responses sent
                        </span>
                        {reply.delay > 0 && (
                          <Badge
                            variant="outline"
                            className="text-yellow-400 border-yellow-500/30"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {reply.delay}s delay
                          </Badge>
                        )}
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">
                          {reply.name}
                        </h4>
                      </div>

                      <div>
                        <p className="text-sm text-gray-300 font-medium mb-2">
                          Trigger Keywords:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {reply.triggers.map((trigger, triggerIndex) => (
                            <Badge
                              key={triggerIndex}
                              variant="outline"
                              className="text-xs bg-green-500/10 text-green-400 border-green-500/30"
                            >
                              "{trigger}"
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-300 font-medium mb-2">
                          Auto-Response:
                        </p>
                        <div className="bg-gray-800 p-3 rounded border-l-4 border-green-500">
                          <p className="text-sm text-gray-300">
                            {reply.response}
                          </p>
                        </div>
                      </div>

                      {showPreview && (
                        <div className="bg-gray-900 p-3 rounded border border-gray-600">
                          <p className="text-xs text-gray-400 mb-2">
                            Preview: How users see the response
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-start space-x-2 justify-end">
                              <div className="bg-blue-500 text-white p-2 rounded-lg text-sm max-w-xs">
                                {reply.triggers[0]}
                              </div>
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <Users className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                <Bot className="h-4 w-4 text-white" />
                              </div>
                              <div className="bg-gray-700 text-white p-2 rounded-lg text-sm max-w-xs">
                                {reply.response}
                                {reply.delay > 0 && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    Sent after {reply.delay}s delay
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center space-y-2 ml-4">
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePriority(reply.id, "up")}
                          disabled={index === 0}
                          className="px-2"
                        >
                          ↑
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePriority(reply.id, "down")}
                          disabled={index === autoReplies.length - 1}
                          className="px-2"
                        >
                          ↓
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAutoReply(reply.id)}
                        className={
                          reply.isActive
                            ? "text-red-400 hover:text-red-300 border-red-500/30"
                            : "text-green-400 hover:text-green-300 border-green-500/30"
                        }
                      >
                        {reply.isActive ? "Pause" : "Activate"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeAutoReply(reply.id)}
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

          {/* Add New Auto-Reply */}
          <Card className="bg-gray-800/30 border-gray-700 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Auto-Reply Rule
              </CardTitle>
              <CardDescription>
                Create intelligent responses that trigger automatically based on
                message content
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
                    value={newReply.name}
                    onChange={(e) =>
                      setNewReply((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Welcome Message, FAQ Response, etc."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">
                    Response Delay (seconds)
                  </label>
                  <input
                    type="number"
                    value={newReply.delay}
                    onChange={(e) =>
                      setNewReply((prev) => ({
                        ...prev,
                        delay: e.target.value,
                      }))
                    }
                    placeholder="0"
                    min="0"
                    max="300"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Trigger Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={newReply.triggers}
                  onChange={(e) =>
                    setNewReply((prev) => ({
                      ...prev,
                      triggers: e.target.value,
                    }))
                  }
                  placeholder="hello, hi, start, welcome"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Messages containing any of these words will trigger this
                  response
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Auto-Response Message
                </label>
                <textarea
                  value={newReply.response}
                  onChange={(e) =>
                    setNewReply((prev) => ({
                      ...prev,
                      response: e.target.value,
                    }))
                  }
                  placeholder="Thanks for your message! I'll get back to you soon. 😊"
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Keep responses helpful and personal
                  </p>
                  <span className="text-xs text-gray-500">
                    {newReply.response.length}/1000 characters
                  </span>
                </div>
              </div>

              <Button
                onClick={addAutoReply}
                disabled={
                  !newReply.name.trim() ||
                  !newReply.triggers.trim() ||
                  !newReply.response.trim()
                }
                className="bg-green-500 hover:bg-green-600"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Auto-Reply Rule
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
                Pre-built responses for common scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    name: "Out of Office",
                    triggers: "support, help, urgent",
                    response:
                      "Thanks for reaching out! 🕐 I'm currently away but will respond within 24 hours. For urgent matters, please email support@company.com",
                    delay: 60,
                  },
                  {
                    name: "Product Inquiry",
                    triggers: "product, features, demo",
                    response:
                      "Great question! 🚀 I'd love to show you our features. Let me send you a quick demo link: [Demo Link]",
                    delay: 30,
                  },
                  {
                    name: "Thank You",
                    triggers: "thanks, thank you, appreciate",
                    response:
                      "You're so welcome! 😊 I'm here if you need anything else. Have an amazing day!",
                    delay: 0,
                  },
                  {
                    name: "Consultation Booking",
                    triggers: "book, schedule, consultation, call",
                    response:
                      "Perfect! 📅 I'd love to chat. Here's my calendar link to book a free 15-min consultation: [Calendar Link]",
                    delay: 15,
                  },
                ].map((template, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      setNewReply({
                        name: template.name,
                        triggers: template.triggers,
                        response: template.response,
                        delay: template.delay,
                        isActive: true,
                        priority: 1,
                      })
                    }
                    className="p-3 bg-gray-800 rounded border border-gray-600 hover:border-green-500 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-medium text-white mb-1">
                      {template.name}
                    </p>
                    <p className="text-xs text-gray-400 mb-1">
                      Delay: {template.delay}s
                    </p>
                    <p className="text-xs text-gray-400 mb-2">
                      Triggers: {template.triggers}
                    </p>
                    <p className="text-xs text-gray-300 bg-gray-900 p-2 rounded">
                      {template.response}
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
              {autoReplies.filter((r) => r.isActive).length} active auto-reply
              rules
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600"
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

export default DmAutoReplyConfig;
