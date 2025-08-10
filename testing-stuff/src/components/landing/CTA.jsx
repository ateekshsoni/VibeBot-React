import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Star,
  Zap,
  Clock,
  Shield,
  TrendingUp,
  Heart,
  Instagram
} from 'lucide-react';
import { 
  fadeInUp, 
  buttonHover, 
  staggerContainer,
  pulseAnimation,
  floatingAnimation
} from '@/lib/framerVariants';

const CTA = () => {
  const [email, setEmail] = useState('');

  const features = [
    "14-day free trial",
    "No credit card required", 
    "Setup in under 5 minutes",
    "Cancel anytime",
    "24/7 customer support",
    "Instagram certified"
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Save 10+ Hours Weekly",
      description: "Automate repetitive tasks"
    },
    {
      icon: TrendingUp,
      title: "Increase Engagement 300%",
      description: "Never miss an opportunity"
    },
    {
      icon: Heart,
      title: "Build Authentic Relationships", 
      description: "Connect with your audience 24/7"
    }
  ];

  const handleGetStarted = () => {
    if (email) {
      // Store email and redirect to signup with pre-filled email
      localStorage.setItem('vibebot_email', email);
      window.location.href = `/sign-up?email=${encodeURIComponent(email)}`;
    } else {
      window.location.href = '/sign-up';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-pink-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
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

        {/* Floating Particles */}
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            style={{
              top: `${20 + (index * 10)}%`,
              left: `${15 + (index * 12)}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-yellow-400/20 to-pink-500/20 text-yellow-400 border-yellow-400/30 px-6 py-3 text-lg mb-8">
              <Sparkles className="w-5 h-5 mr-2" />
              Limited Time Offer
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            variants={fadeInUp}
            className="text-5xl lg:text-7xl font-bold mb-8"
          >
            <span className="text-white">Ready to</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Vibe with Your Audience?
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p 
            variants={fadeInUp}
            className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Join 500+ creators and businesses who are already growing their Instagram 
            with AI-powered automation. Start your free trial today and see results in 24 hours.
          </motion.p>

          {/* Benefits Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main CTA Card */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 lg:p-12 relative overflow-hidden">
              <CardContent className="p-0 space-y-8">
                {/* Special Offer */}
                <div className="text-center">
                  <motion.div 
                    variants={pulseAnimation}
                    animate="animate"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full px-6 py-3 mb-6"
                  >
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-green-400 font-medium">
                      Free 14-Day Trial • No Credit Card Required
                    </span>
                  </motion.div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    Start Automating Your Instagram Today
                  </h3>
                  <p className="text-gray-300 mb-8">
                    Get instant access to all premium features. Cancel anytime.
                  </p>
                </div>

                {/* Email Signup */}
                <div className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                    />
                    <motion.div
                      variants={buttonHover}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button 
                        size="lg"
                        onClick={handleGetStarted}
                        className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black font-semibold px-8 py-4 text-lg shadow-lg shadow-yellow-400/25 whitespace-nowrap"
                      >
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      className="flex items-center text-gray-300 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </motion.div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="text-center space-y-4">
                  <div className="flex justify-center items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-yellow-400">500+</span>
                      <span className="ml-2">Active Users</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-green-400">4.9/5</span>
                      <span className="ml-2">Rating</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-blue-400">2M+</span>
                      <span className="ml-2">Messages Automated</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center space-x-2">
                    <Instagram className="w-5 h-5 text-pink-400" />
                    <span className="text-gray-400">Instagram Certified Partner</span>
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                </div>

                {/* Urgency */}
                <motion.div 
                  variants={pulseAnimation}
                  animate="animate"
                  className="text-center bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4"
                >
                  <p className="text-orange-300 font-medium">
                    ⚡ Join 50+ new users who signed up this week
                  </p>
                </motion.div>
              </CardContent>

              {/* Background Effects */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400/20 rounded-full"
                variants={floatingAnimation}
                animate="animate"
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500/20 rounded-full"
                variants={floatingAnimation}
                animate="animate"
                transition={{ delay: 1 }}
              />
            </Card>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div 
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-4">
              Questions? Want to see a demo first?
            </p>
            <Button 
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3"
              onClick={() => {
                // Scroll to features or open contact
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View All Features
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={fadeInUp}
            className="mt-16 flex flex-wrap justify-center items-center space-x-8 text-gray-500 text-sm"
          >
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Instant Activation</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
