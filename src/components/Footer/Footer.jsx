import React from "react";
import Newsletter from "./Newsletter";
import FooterLinks from "./FooterLinks";
import FooterCredits from "./FooterCredits";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="space-y-20">
          <Newsletter />
          <FooterLinks />
          <FooterCredits />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
