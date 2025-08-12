import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Instagram, 
  Zap, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Calendar,
  BarChart3,
  Sparkles,
  ArrowRight,
  Play
} from 'lucide-react';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  buttonHover, 
  floatingAnimation,
  pulseAnimation,
  staggerContainer 
} from '@/lib/framerVariants';
import { navigateToRoute, scrollToElement } from '@/utils/navigation';

const Hero = () => {
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    // Use safe navigation utility
    navigateToRoute('/sign-up');
  };

  const handleViewFeatures = () => {
    // Scroll to features section safely
    scrollToElement('features');
  };

  const floatingIcons = [
    { icon: Instagram, color: 'text-pink-400', delay: 0 },
    { icon: Zap, color: 'text-yellow-400', delay: 2 },
    { icon: TrendingUp, color: 'text-green-400', delay: 4 },
    { icon: MessageSquare, color: 'text-blue-400', delay: 1 },
    { icon: BarChart3, color: 'text-purple-400', delay: 3 }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-10`}
            style={{
              top: `${20 + (index * 15)}%`,
              left: `${10 + (index * 18)}%`,
            }}
            variants={floatingAnimation}
            animate="animate"
            transition={{ delay: item.delay }}
          >
            <item.icon className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <Badge className="bg-gradient-to-r from-yellow-400/20 to-pink-500/20 text-yellow-400 border-yellow-400/30 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Instagram Automation
              </Badge>
            </motion.div>

            {/* Hero Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl lg:text-7xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Automate Your Instagram.
              </span>
              <br />
              <span className="text-white">
                Engage Like Never Before.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 leading-relaxed max-w-2xl"
            >
              AI-driven automations for comments, DMs, scheduling, analytics—and more. 
              Save time, grow authentically, and turn your Instagram into a conversion machine.
            </motion.p>

            {/* Feature Highlights */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center text-gray-300">
                <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                Comment-to-DM Automation
              </div>
              <div className="flex items-center text-gray-300">
                <BarChart3 className="w-5 h-5 text-green-400 mr-2" />
                Real-time Analytics
              </div>
              <div className="flex items-center text-gray-300">
                <Users className="w-5 h-5 text-blue-400 mr-2" />
                Multi-account Management
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black font-semibold px-8 py-4 text-lg shadow-lg shadow-yellow-400/25"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              <motion.div
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={handleViewFeatures}
                  className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  View Features
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              variants={fadeInUp}
              className="flex items-center space-x-6 text-sm text-gray-400"
            >
              <div className="flex items-center">
                <span className="text-2xl font-bold text-yellow-400">500+</span>
                <span className="ml-2">Active Users</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-green-400">2M+</span>
                <span className="ml-2">Messages Automated</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-400">95%</span>
                <span className="ml-2">Success Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Glassmorphism Card */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 shadow-2xl">
              <CardContent className="space-y-6 p-0">
                {/* Quick Start Form */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Start Your Free Trial
                  </h3>
                  <p className="text-gray-300">
                    Join 500+ creators growing with VibeBot
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                  />
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black font-semibold py-3"
                    onClick={handleGetStarted}
                  >
                    Start Free Trial
                  </Button>
                </div>

                {/* Feature Badges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-300">Post Scheduling</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <MessageSquare className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-300">Auto DMs</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <BarChart3 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-300">Analytics</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-300">AI Automation</span>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="text-center space-y-2">
                  <p className="text-xs text-gray-400">
                    ✓ 14-day free trial ✓ No credit card required ✓ Setup in 2 minutes
                  </p>
                  <div className="flex justify-center items-center space-x-2">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span className="text-xs text-gray-400">Instagram Certified Partner</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Particles */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400/20 rounded-full"
              variants={pulseAnimation}
              animate="animate"
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500/20 rounded-full"
              variants={pulseAnimation}
              animate="animate"
              transition={{ delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
