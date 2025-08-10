import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Instagram,
  TrendingUp,
  Users,
  MessageCircle,
  Heart,
  BarChart3,
} from "lucide-react";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn,
} from "@/lib/framerVariants";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Aanya Sharma",
      role: "Fitness Influencer",
      avatar: "AS",
      image: "/api/placeholder/80/80",
      content:
        "VibeBot transformed my Instagram engagement completely! My comment-to-DM automation converted 300+ casual viewers into paying clients. The analytics dashboard shows I'm saving 15 hours weekly while growing 5x faster.",
      rating: 5,
      metrics: {
        growth: "+400% engagement",
        time: "15 hrs saved/week",
        revenue: "$25K additional revenue",
      },
      beforeAfter: {
        before: "Manual responses, missed opportunities",
        after: "24/7 automation, 94% response rate",
      },
      platform: "Instagram",
      followers: "125K",
      category: "Fitness",
    },
    {
      name: "Riya Patel",
      role: "Boutique Owner",
      avatar: "RP",
      image: "/api/placeholder/80/80",
      content:
        "The comment-to-DM feature is pure magic! When someone comments 'price' or 'buy', they instantly get our product catalog in DMs. This single automation increased our conversion rate by 250% and generated over $50K in sales.",
      rating: 5,
      metrics: {
        growth: "+250% conversions",
        time: "12 hrs saved/week",
        revenue: "$50K in sales",
      },
      beforeAfter: {
        before: "Lost leads, manual follow-ups",
        after: "Instant conversions, automated sales",
      },
      platform: "Instagram",
      followers: "85K",
      category: "Fashion",
    },
    {
      name: "Arjun Singh",
      role: "Digital Marketing Agency",
      avatar: "AS",
      image: "/api/placeholder/80/80",
      content:
        "Managing 20+ client accounts was overwhelming until VibeBot. The multi-account dashboard and automation templates scaled our agency 3x. Our clients see average 400% engagement increase within 30 days.",
      rating: 5,
      metrics: {
        growth: "+400% client engagement",
        time: "40 hrs saved/week",
        revenue: "3x agency growth",
      },
      beforeAfter: {
        before: "Manual management, scaling issues",
        after: "Automated workflows, effortless scaling",
      },
      platform: "Instagram",
      followers: "500K+ managed",
      category: "Agency",
    },
    {
      name: "Priya Gupta",
      role: "Lifestyle Blogger",
      avatar: "PG",
      image: "/api/placeholder/80/80",
      content:
        "The analytics insights are incredible! I discovered my audience is most active at 7 PM, not 2 PM like I thought. Scheduling posts at optimal times increased my reach by 300%. The ROI tracking helps me prove value to sponsors.",
      rating: 5,
      metrics: {
        growth: "+300% reach",
        time: "10 hrs saved/week",
        revenue: "$30K sponsorship deals",
      },
      beforeAfter: {
        before: "Guessing posting times, poor reach",
        after: "Data-driven strategy, optimal engagement",
      },
      platform: "Instagram",
      followers: "250K",
      category: "Lifestyle",
    },
    {
      name: "Vikram Mehta",
      role: "Tech Startup Founder",
      avatar: "VM",
      image: "/api/placeholder/80/80",
      content:
        "VibeBot's hashtag monitoring helped us find and engage with our target customers automatically. We went from 5K to 50K followers in 6 months, with 80% being genuinely interested in our product. Game changer for B2B growth!",
      rating: 5,
      metrics: {
        growth: "+1000% followers",
        time: "20 hrs saved/week",
        revenue: "80% qualified leads",
      },
      beforeAfter: {
        before: "Hard to find customers, low engagement",
        after: "Targeted growth, high-quality audience",
      },
      platform: "Instagram",
      followers: "50K",
      category: "B2B Tech",
    },
  ];

  const stats = [
    { value: "500+", label: "Happy Customers", icon: Users },
    { value: "2M+", label: "Messages Automated", icon: MessageCircle },
    { value: "95%", label: "Success Rate", icon: TrendingUp },
    { value: "4.9/5", label: "Customer Rating", icon: Star },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
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
            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-400/30 px-4 py-2 mb-6">
              Success Stories
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">Loved by</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
              Creators & Businesses
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            See how VibeBot is helping creators, businesses, and agencies grow
            their Instagram presence and convert followers into customers.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 lg:p-12 relative overflow-hidden">
            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Left Column - Content */}
                  <div className="space-y-6">
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-purple-400/50" />

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-xl lg:text-2xl text-white leading-relaxed">
                      "{currentTestimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                        {currentTestimonial.avatar}
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white">
                          {currentTestimonial.name}
                        </div>
                        <div className="text-gray-400">
                          {currentTestimonial.role}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Instagram className="w-4 h-4 mr-1" />
                          {currentTestimonial.followers} •{" "}
                          {currentTestimonial.category}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Metrics */}
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(currentTestimonial.metrics).map(
                        ([key, value], index) => (
                          <div
                            key={index}
                            className="bg-white/5 rounded-lg p-4 border border-white/10"
                          >
                            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                              {value}
                            </div>
                            <div className="text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Before/After */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white">
                        Transformation
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-400">Before:</div>
                            <div className="text-white">
                              {currentTestimonial.beforeAfter.before}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-400">After:</div>
                            <div className="text-white">
                              {currentTestimonial.beforeAfter.after}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex
                        ? "bg-purple-500"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl -z-10" />
          </Card>
        </motion.div>

        {/* Additional Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {testimonials
            .filter((_, index) => index !== currentIndex)
            .slice(0, 3)
            .map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  className="bg-white/5 backdrop-blur-xl border-white/10 p-6 h-full cursor-pointer hover:border-purple-500/30 transition-colors"
                  onClick={() =>
                    setCurrentIndex(
                      testimonials.findIndex((t) => t.name === testimonial.name)
                    )
                  }
                >
                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <p className="text-gray-300 text-sm line-clamp-3">
                      "{testimonial.content.substring(0, 120)}..."
                    </p>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            Join hundreds of successful creators and businesses
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/sign-up")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg text-lg"
          >
            Start Your Success Story
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
