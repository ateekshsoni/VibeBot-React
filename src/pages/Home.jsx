import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "../components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/d1072a08-49f6-40d3-a139-259f11678b8e.svg"
                alt="InstaFlow"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">
                InstaFlow
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <SignedOut>
                <Link to="/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link
                  to="/dashboard"
                  className="text-sm text-gray-700 hover:text-gray-900 mr-4"
                >
                  Dashboard
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32">
        <div className="relative">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Elevate Your Instagram
                    <span className="text-blue-600">
                      {" "}
                      Engagement with Automation
                    </span>
                  </h1>
                  <p className="mt-4 text-lg text-gray-600">
                    InstaFlow empowers businesses and influencers to
                    effortlessly manage their Instagram interactions. Automate
                    DMs, respond to comments, and analyze your engagement—all
                    from one intuitive dashboard.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <SignedOut>
                      <Link to="/signup">
                        <Button
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Start Free Trial
                        </Button>
                      </Link>
                      <Button variant="outline" size="lg">
                        Watch Demo
                      </Button>
                    </SignedOut>
                    <SignedIn>
                      <Link to="/dashboard">
                        <Button
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Go to Dashboard
                        </Button>
                      </Link>
                      <Button variant="outline" size="lg">
                        View Analytics
                      </Button>
                    </SignedIn>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/H4kxzUEmxJ.png"
                  alt="Instagram automation dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section className="bg-white py-16 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Tag */}
              <div className="inline-block">
                <span className="font-semibold text-base text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Automate
                </span>
              </div>

              {/* Heading & Description */}
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                  Streamline Your Instagram Workflow
                </h2>
                <p className="text-lg leading-7 text-gray-600">
                  Say goodbye to manual responses and hello to intelligent
                  automation. Our AI-powered system handles your Instagram
                  interactions while maintaining your unique brand voice and
                  personality.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Automated DM responses with natural language processing
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Smart comment moderation and auto-replies
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Advanced analytics and engagement tracking
                  </p>
                </div>
              </div>

              {/* Action */}
              <div>
                <SignedOut>
                  <Link to="/signup">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Get Started Today
                    </Button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Explore Features
                    </Button>
                  </Link>
                </SignedIn>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <img
                src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/lPVkXTJ65y.png"
                alt="Automate Your Instagram Workflow"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to grow
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Powerful automation tools designed specifically for Instagram
              creators and businesses.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Auto DM Responses
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Automatically respond to direct messages with personalized,
                  intelligent replies that feel human.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Comment Management
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Moderate comments, auto-reply to frequently asked questions,
                  and engage with your community.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Analytics & Insights
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Track engagement metrics, monitor growth, and optimize your
                  Instagram strategy with detailed analytics.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Secure & Compliant
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Enterprise-grade security with Instagram's API compliance.
                  Your account safety is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by thousands of creators
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              See what our users have to say about InstaFlow
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "InstaFlow has revolutionized how I manage my Instagram. The
                automation features saved me 10+ hours per week while increasing
                my engagement by 300%."
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  alt="Sarah Johnson"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-gray-600">Fashion Influencer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "As a small business owner, InstaFlow's AI responses feel so
                natural that my customers can't tell the difference. It's like
                having a 24/7 assistant."
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  alt="Mike Chen"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Mike Chen</p>
                  <p className="text-gray-600">Cafe Owner</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The analytics dashboard is incredible! I can track everything
                and make data-driven decisions. My follower growth has increased
                by 250%."
              </p>
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Emma Rodriguez"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">Emma Rodriguez</p>
                  <p className="text-gray-600">Digital Marketer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              The passionate people behind InstaFlow
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Alex Thompson"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Alex Thompson
              </h3>
              <p className="text-blue-600 font-medium">CEO & Founder</p>
              <p className="mt-2 text-gray-600">
                Former Instagram engineer with 8+ years of social media
                expertise
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                alt="Priya Patel"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Priya Patel
              </h3>
              <p className="text-blue-600 font-medium">CTO</p>
              <p className="mt-2 text-gray-600">
                AI/ML expert who built the intelligent automation engine
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                alt="David Kim"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                David Kim
              </h3>
              <p className="text-blue-600 font-medium">Head of Design</p>
              <p className="mt-2 text-gray-600">
                UI/UX designer focused on creating intuitive user experiences
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Lisa Wong"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Lisa Wong
              </h3>
              <p className="text-blue-600 font-medium">Customer Success</p>
              <p className="mt-2 text-gray-600">
                Dedicated to helping our users achieve their Instagram goals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to automate your Instagram?</span>
            <span className="block">Start your free trial today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Join thousands of creators and businesses already using InstaFlow to
            grow their Instagram presence.
          </p>
          <div className="mt-8 flex justify-center">
            <SignedOut>
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-50"
                >
                  Get started for free
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-50"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.624 5.367 11.99 11.988 11.99s11.99-5.366 11.99-11.99C24.007 5.367 18.641.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.756 13.746 3.756 12.45s.442-2.446 1.17-3.243c.881-.807 2.032-1.297 3.323-1.297s2.448.49 3.323 1.297c.728.797 1.17 1.947 1.17 3.243s-.442 2.445-1.17 3.243c-.875.807-2.026 1.295-3.323 1.295z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2025 InstaFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
