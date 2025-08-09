import React from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail,
  Heart,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/framerVariants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'API', href: '/api' },
      { name: 'Integrations', href: '/integrations' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Status', href: '/status' },
      { name: 'Documentation', href: '/docs' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' }
    ]
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/vibebot', 
      icon: Instagram,
      color: 'hover:text-pink-400'
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/vibebot', 
      icon: Twitter,
      color: 'hover:text-blue-400'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/vibebot', 
      icon: Linkedin,
      color: 'hover:text-blue-500'
    },
    { 
      name: 'Email', 
      href: 'mailto:hello@vibebot.com', 
      icon: Mail,
      color: 'hover:text-green-400'
    }
  ];

  const features = [
    { icon: Zap, text: 'AI-Powered Automation' },
    { icon: Shield, text: 'Instagram Certified' },
    { icon: Globe, text: 'Global Support' },
    { icon: Heart, text: 'Made with Love' }
  ];

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Column */}
            <motion.div 
              variants={fadeInUp}
              className="lg:col-span-2 space-y-6"
            >
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                  VibeBot
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed max-w-md">
                AI-powered Instagram automation platform that helps creators, businesses, 
                and agencies grow their presence and convert followers into customers.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-center text-gray-400 text-sm">
                      <IconComponent className="w-4 h-4 text-yellow-400 mr-2" />
                      {feature.text}
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 transition-colors ${link.color}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Links Columns */}
            <motion.div 
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-white font-semibold">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h4 className="text-white font-semibold">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h4 className="text-white font-semibold">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h4 className="text-white font-semibold">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-8 border-t border-gray-800"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400">Get the latest features and Instagram automation tips.</p>
            </div>
            <div className="flex space-x-4 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-64 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black font-semibold px-6 py-2 rounded-lg whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-6 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© {currentYear} VibeBot. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>for Instagram creators</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-400" />
                SOC 2 Compliant
              </span>
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-1 text-blue-400" />
                Global CDN
              </span>
              <span className="flex items-center">
                <Instagram className="w-4 h-4 mr-1 text-pink-400" />
                Certified Partner
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
    </footer>
  );
};

export default Footer;
