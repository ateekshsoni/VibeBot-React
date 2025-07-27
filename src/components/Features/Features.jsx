import React from "react";
import { Button } from '../ui/button'
import FeatureCard from './FeatureCard'

const Features = () => {
  const features = [
    {
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/kw4woOjOxL.png",
      title: "Custom Chatbot Flows Tailored to Your Needs",
      description: "Design personalized chatbot experiences that resonate with your audience."
    },
    {
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/4LGgLZ6ZGb.png",
      title: "Comment-Triggered Responses for Immediate Engagement",
      description: "Respond to comments instantly and keep conversations flowing."
    },
    {
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/wfb7QGH9MF.png",
      title: "Engagement Analytics to Measure Your Success",
      description: "Track performance metrics to optimize your strategy."
    }
  ]

  return (
    <section className="bg-white py-16 lg:py-28">
      <div className="max-w-7xl mx-autopx-4 lg:px-16">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="inline-block mb-4">
              <span className="font-roboto font-semibold text-base leading-6 text-dark">
                Features
              </span>
            </div>

            {/* Heading & Description */}
            <div className="space-y-6">
              <h2 className="font-urbanist font-medium text-4xl lg:text-5xl leading-tight text-dark tracking-tight">
                Unlock the Power of Chat Automation
              </h2>
              <p className="font-lato text-lg leading-7 text-dark">
                Transform your Instagram engagement with our innovative chat automation tools. 
                Streamline communication and enhance customer interactions effortlessly.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                image={feature.image}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
            <button className="flex items-center space-x-2 text-dark hover:text-primary transition-colors">
              <span className="font-lato font-medium text-base leading-6">Sign Up</span>
              <img 
                src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/FBx7xhqPXa.svg"
                alt="Arrow Right"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
