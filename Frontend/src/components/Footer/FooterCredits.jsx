import React from "react";

const FooterCredits = () => {
  return (
    <div className="border-t border-gray-200 pt-8">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* Copyright and Links */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <p className="font-lato text-sm leading-5 text-dark">
            © 2025 InstaFlow. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#"
              className="font-lato text-sm leading-5 text-dark hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-lato text-sm leading-5 text-dark hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="font-lato text-sm leading-5 text-dark hover:text-primary transition-colors"
            >
              Cookies Settings
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-3">
          <img
            src="https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/ed15237c-8989-40a9-a170-2666c4db755a.svg"
            alt="Social Media Links"
            className="h-6 w-42"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterCredits;
