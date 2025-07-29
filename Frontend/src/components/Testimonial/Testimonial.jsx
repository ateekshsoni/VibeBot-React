import React from "react";

const Testimonial = () => {
  return (
    <section className="bg-white py-16 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <img
              src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/bobacnrE6K.png"
              alt="Customer Success Story"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>

          {/* Right Column - Testimonial Content */}
          <div className="space-y-8">
            {/* Stars Rating */}
            <div className="flex items-center">
              <img
                src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/2qyMjqZwEE.svg"
                alt="5 Star Rating"
                className="h-5 w-29"
              />
            </div>

            {/* Quote */}
            <blockquote className="font-urbanist font-medium text-2xl lg:text-3xl leading-relaxed text-dark tracking-tight">
              "InstaFlow has transformed our customer engagement, making it
              easier than ever to connect with our audience and respond promptly
              to inquiries."
            </blockquote>

            {/* Author & Company */}
            <div className="flex items-center space-x-5">
              <div className="space-y-1">
                <div className="font-roboto font-semibold text-base leading-6 text-dark">
                  Emily Johnson
                </div>
                <div className="font-lato text-base leading-6 text-dark">
                  Marketing Director, BrandX
                </div>
              </div>
              <div className="w-px h-16 bg-gray-300"></div>
              <div>
                <img
                  src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/LA2QC5ugHU.svg"
                  alt="BrandX Logo"
                  className="h-12 w-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
