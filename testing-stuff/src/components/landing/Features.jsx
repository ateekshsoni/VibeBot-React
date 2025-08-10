import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  BarChart3,
  Calendar,
  Users,
  Zap,
  Hash,
  Camera,
  Heart,
  Target,
  Clock,
  TrendingUp,
  Bot,
} from "lucide-react";
import { fadeInUp, cardHover, staggerContainer } from "@/lib/framerVariants";

const Features = () => {
  const features = [
    {
      title: "Comment → DM Automation",
      description:
        "Convert comments into private conversations automatically. Set keyword triggers to instantly DM users who comment specific words.",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
      badge: "Most Popular",
      stats: "94% success rate",
      highlights: ["Keyword triggers", "Auto responses", "Lead capture"],
    },
    {
      title: "Real-time Analytics Dashboard",
      description:
        "Track engagement, growth, and automation performance with comprehensive analytics. Monitor ROI and optimize your strategy.",
      icon: BarChart3,
      color: "from-green-500 to-emerald-500",
      badge: "Data-Driven",
      stats: "6 analytics sections",
      highlights: ["Live monitoring", "Custom reports", "Export data"],
    },
    {
      title: "Post Scheduling & Management",
      description:
        "Plan and auto-post to multiple accounts with ease. Schedule posts, stories, and reels with our intuitive calendar.",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      badge: "Time Saver",
      stats: "Save 10+ hours/week",
      highlights: ["Multi-account", "Content calendar", "Bulk upload"],
    },
    {
      title: "Multi-Account Management",
      description:
        "Switch and manage several client or creator accounts from one dashboard. Perfect for agencies and social media managers.",
      icon: Users,
      color: "from-orange-500 to-red-500",
      badge: "Pro Feature",
      stats: "Unlimited accounts",
      highlights: [
        "Team collaboration",
        "Client management",
        "Role permissions",
      ],
    },
    {
      title: "Story Mention Automation",
      description:
        "Automatically respond when mentioned in stories. Engage with your audience 24/7 and never miss an opportunity.",
      icon: Camera,
      color: "from-pink-500 to-rose-500",
      badge: "Engagement",
      stats: "95% mention capture",
      highlights: ["Auto detection", "Custom responses", "Story analytics"],
    },
    {
      title: "AI-Powered Welcome Messages",
      description:
        "Greet new followers with personalized welcome messages. Build relationships from the first interaction.",
      icon: Bot,
      color: "from-yellow-500 to-orange-500",
      badge: "AI-Powered",
      stats: "89% response rate",
      highlights: ["Personalization", "Smart timing", "A/B testing"],
    },
    {
      title: "Hashtag Monitoring",
      description:
        "Monitor hashtags and automatically engage with relevant posts. Grow your audience by finding your ideal customers.",
      icon: Hash,
      color: "from-indigo-500 to-blue-500",
      badge: "Growth Tool",
      stats: "3x faster growth",
      highlights: ["Smart targeting", "Auto engagement", "Competitor tracking"],
    },
    {
      title: "DM Auto-Reply System",
      description:
        "Set up intelligent auto-replies for common questions. Provide instant customer support even when you're offline.",
      icon: Zap,
      color: "from-cyan-500 to-blue-500",
      badge: "Customer Support",
      stats: "24/7 availability",
      highlights: ["Smart routing", "FAQ automation", "Human handoff"],
    },
    {
      title: "Live Performance Monitoring",
      description:
        "Monitor your automations in real-time. Get instant alerts for performance issues and optimization opportunities.",
      icon: TrendingUp,
      color: "from-emerald-500 to-green-500",
      badge: "Real-time",
      stats: "5-second updates",
      highlights: ["Live alerts", "Performance tracking", "Error detection"],
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-yellow-400/20 to-pink-500/20 text-yellow-400 border-yellow-400/30 px-4 py-2 mb-6">
              Powerful Features
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-white">to Automate Instagram</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            From comment automation to advanced analytics, VibeBot provides all
            the tools you need to grow your Instagram presence and convert
            followers into customers.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <motion.div
                key={index}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                whileInView={fadeInUp}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 h-full group cursor-pointer">
                  <CardHeader className="space-y-4">
                    {/* Icon and Badge */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs bg-white/5 border-white/20 text-gray-300"
                      >
                        {feature.badge}
                      </Badge>
                    </div>

                    {/* Title */}
                    <CardTitle className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center text-sm">
                      <Target className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-green-400 font-medium">
                        {feature.stats}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {feature.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full mr-3" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {/* Hover Effect - Action Button */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                      <button className="text-sm text-yellow-400 hover:text-yellow-300 font-medium flex items-center">
                        Learn more
                        <motion.span
                          className="ml-1"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Want to see all features in action?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/sign-up")}
            className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black font-semibold px-8 py-3 rounded-lg shadow-lg"
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
