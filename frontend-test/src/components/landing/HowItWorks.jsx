import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Instagram, 
  Settings, 
  Clock, 
  Zap,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';
import { 
  fadeInUp, 
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn
} from '@/lib/framerVariants';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Connect Your Instagram",
      description: "Secure OAuth connection in one click. We use Instagram's official API to ensure your account stays safe and compliant.",
      icon: Instagram,
      color: "from-pink-500 to-rose-500",
      details: [
        "Official Instagram API",
        "OAuth 2.0 security",
        "No password required",
        "Instant connection"
      ],
      time: "30 seconds"
    },
    {
      step: 2,
      title: "Set Your Automations",
      description: "Build intelligent rules with our intuitive interface. Set keyword triggers, customize responses, and define your automation workflows.",
      icon: Settings,
      color: "from-blue-500 to-cyan-500",
      details: [
        "Drag & drop builder",
        "Keyword triggers",
        "Custom responses",
        "Smart workflows"
      ],
      time: "5 minutes"
    },
    {
      step: 3,
      title: "Let VibeBot Work 24/7",
      description: "Sit back and watch as VibeBot engages with your audience around the clock. Monitor performance and optimize for better results.",
      icon: Clock,
      color: "from-green-500 to-emerald-500",
      details: [
        "24/7 automation",
        "Real-time monitoring",
        "Performance analytics",
        "Smart optimization"
      ],
      time: "Continuous"
    }
  ];

  const benefits = [
    {
      title: "Save 10+ Hours Weekly",
      description: "Automate repetitive tasks and focus on creating great content",
      icon: Clock,
      stat: "10+ hrs"
    },
    {
      title: "Increase Engagement by 300%",
      description: "Respond instantly to every comment and DM opportunity", 
      icon: Zap,
      stat: "300%"
    },
    {
      title: "Convert More Followers",
      description: "Turn casual browsers into engaged customers automatically",
      icon: CheckCircle,
      stat: "5x ROI"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
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
            <Badge className="bg-gradient-to-r from-green-400/20 to-blue-500/20 text-green-400 border-green-400/30 px-4 py-2 mb-6">
              Simple Process
            </Badge>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">Get Started in</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Just 3 Steps
            </span>
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Setting up VibeBot is incredibly simple. In less than 10 minutes, 
            you'll have a fully automated Instagram engagement system running.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-16 mb-20">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  isEven ? '' : 'lg:grid-flow-col-dense'
                }`}
              >
                {/* Content */}
                <motion.div
                  variants={isEven ? fadeInLeft : fadeInRight}
                  className={isEven ? '' : 'lg:col-start-2'}
                >
                  <div className="space-y-6">
                    {/* Step Badge */}
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg`}>
                        {step.step}
                      </div>
                      <Badge variant="outline" className="bg-white/5 border-white/20 text-gray-300">
                        {step.time}
                      </Badge>
                    </div>

                    {/* Title and Description */}
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-lg text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center text-yellow-400 hover:text-yellow-300 font-medium group"
                    >
                      {step.step === 1 ? 'Try It Now' : step.step === 2 ? 'See Examples' : 'View Dashboard'}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Visual */}
                <motion.div
                  variants={isEven ? fadeInRight : fadeInLeft}
                  className={isEven ? 'lg:col-start-2' : ''}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 relative overflow-hidden">
                    <CardContent className="p-0 text-center">
                      {/* Icon */}
                      <motion.div
                        variants={scaleIn}
                        className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-2xl`}
                      >
                        <IconComponent className="w-12 h-12 text-white" />
                      </motion.div>

                      {/* Step Visualization */}
                      <div className="space-y-4">
                        <div className="text-lg font-semibold text-white">
                          Step {step.step}
                        </div>
                        
                        {/* Progress Indicator */}
                        <div className="flex justify-center space-x-2">
                          {[1, 2, 3].map((num) => (
                            <div
                              key={num}
                              className={`w-3 h-3 rounded-full ${
                                num <= step.step 
                                  ? `bg-gradient-to-r ${step.color}` 
                                  : 'bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>

                        {/* Mock Interface */}
                        <div className="bg-black/20 rounded-lg p-4 mt-6">
                          <div className="text-xs text-gray-400 mb-2">
                            {step.step === 1 && 'Instagram Connection'}
                            {step.step === 2 && 'Automation Setup'}
                            {step.step === 3 && 'Live Dashboard'}
                          </div>
                          <div className="h-16 bg-gray-800/50 rounded flex items-center justify-center">
                            <IconComponent className="w-8 h-8 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400/20 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </Card>
                </motion.div>

                {/* Connection Arrow (except for last step) */}
                {index < steps.length - 1 && (
                  <motion.div
                    variants={fadeInUp}
                    className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-12"
                  >
                    <div className="flex flex-col items-center text-gray-600">
                      <ArrowRight className="w-6 h-6 rotate-90" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 text-center h-full">
                  <CardContent className="p-0 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                      {benefit.stat}
                    </div>
                    
                    <h4 className="text-xl font-semibold text-white">
                      {benefit.title}
                    </h4>
                    
                    <p className="text-gray-300">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6 text-lg">
            Ready to automate your Instagram growth?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/sign-up'}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg text-lg flex items-center mx-auto"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Automating Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
