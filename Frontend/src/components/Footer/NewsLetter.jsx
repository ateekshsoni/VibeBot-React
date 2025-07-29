import React from "react";
import { Button } from "../ui/button";

const Newsletter = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
      {/* Newsletter Content */}
      <div className="space-y-2">
        <h3 className="font-roboto font-semibold text-lg leading-7 text-dark">
          Subscribe to Updates
        </h3>
        <p className="font-lato text-base leading-6 text-dark">
          Stay informed about our latest features and updates.
        </p>
      </div>

      {/* Newsletter Form */}
      <div className="w-full lg:w-auto">
        <div className="flex flex-col sm:flex-row gap-4 lg:w-96">
          <input
            type="email"
            placeholder="Your Email Here"
            className="flex-1 px-3 py-3 border border-gray-300 rounded-xl font-lato text-base leading-6 text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button variant="outline" size="md">
            Subscribe
          </Button>
        </div>
        <p className="font-lato text-xs leading-4 text-dark mt-3">
          By subscribing, you agree to our{" "}
          <a
            href="#"
            className="underline hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
