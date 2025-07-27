import React from "react";
import { Button } from "../ui/button";

const CTA = () => {
  return (
    <section className="bg-white py-16 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Heading & Description */}
            <div className="space-y-6">
              <h2 className="font-urbanist font-medium text-4xl lg:text-5xl leading-tight text-dark tracking-tight">
                Transform Your Instagram Engagement
              </h2>
              <p className="font-lato text-lg leading-7 text-dark">
                Sign up today for a free trial and elevate your Instagram
                interactions effortlessly.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg">
                Sign Up
              </Button>
              <Button variant="outline" size="lg">
                Request
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <img
              src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/H4kxzUEmxJ.png"
              alt="Transform Your Engagement"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
