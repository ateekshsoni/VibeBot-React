import React from "react";
const FeatureShowcase = () => {
  return (
    <section className="bg-white py-16 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Tag */}
            <div className="inline-block">
              <span className="font-roboto font-semibold text-base leading-6 text-dark">
                Automate
              </span>
            </div>

            {/* Heading & Description */}
            <div className="space-y-6">
              <h2 className="font-urbanist font-medium text-4xl lg:text-5xl leading-tight text-dark tracking-tight">
                Effortlessly Automate Your Instagram DMs
              </h2>
              <p className="font-lato text-lg leading-7 text-dark">
                Streamline your communication with our powerful DM automation
                feature. Engage your audience instantly and enhance your brand's
                responsiveness.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button >
                Learn More
              </button>
              <button className="flex items-center space-x-2 text-dark hover:text-primary transition-colors">
                <span className="font-lato font-medium text-base leading-6">
                  Sign Up
                </span>
                <img
                  src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/yX8L11FRUX.svg"
                  alt="Arrow Right"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <img
              src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/YcckPkQu3M.png"
              alt="DM Automation Interface"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
