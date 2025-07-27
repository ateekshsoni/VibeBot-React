import React from "react";
import { Link } from "react-router-dom";
import { Button } from '../ui/button'
import { 
  SignedIn, 
  SignedOut
} from '@clerk/clerk-react'

const Hero = () => {
  return (
    <section className="bg-white">
      {/* Hero Image */}
      <div className="w-full h-64 md:h-80 lg:h-96 xl:h-[663px] relative overflow-hidden">
        <img
          src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/nvG7j9Go6z.png"
          alt="InstaFlow Dashboard"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Left Column - Headline */}
            <div className="space-y-6">
              <h1 className="font-roboto font-bold text-4xl md:text-5xl lg:text-7xl leading-tight text-dark">
                Elevate Your Instagram Engagement with Automation
              </h1>
            </div>

            {/* Right Column - Description & Actions */}
            <div className="space-y-8">
              <p className="font-lato text-lg leading-7 text-dark">
                InstaFlow empowers businesses and influencers to effortlessly
                manage their Instagram interactions. Automate DMs, respond to
                comments, and analyze your engagement—all from one intuitive
                dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <SignedOut>
                  <Link to="/signup">
                    <Button size="lg">
                      Get Started Free
                    </Button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link to="/dashboard">
                    <Button size="lg">
                      Go to Dashboard
                    </Button>
                  </Link>
                </SignedIn>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
