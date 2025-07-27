import React from "react";

const FooterLinks = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "About Us", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Blog Posts", href: "#" },
        { name: "Careers Page", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Case Studies", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "User Guides", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Support", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Use", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Community Guidelines", href: "#" },
        { name: "Feedback", href: "#" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "Social Media", href: "#" },
        { name: "Newsletter", href: "#" },
        { name: "Events", href: "#" },
        { name: "Updates", href: "#" },
        { name: "Resources", href: "#" },
      ],
    },
    {
      title: "Company Info",
      links: [
        { name: "Follow Us Online", href: "#" },
        { name: "Join Our Community", href: "#" },
        { name: "Latest News", href: "#" },
        { name: "Get Support", href: "#" },
        { name: "Contact Support", href: "#" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
      {/* Logo */}
      <div className="md:col-span-1">
        <img
          src="https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/bc3755e5-9e3b-4a89-bc7b-8e2793a10937.svg"
          alt="InstaFlow Logo"
          className="h-9 w-45"
        />
      </div>

      {/* Link Sections */}
      {linkSections.map((section, index) => (
        <div key={index} className="space-y-4">
          <h4 className="font-roboto font-semibold text-base leading-6 text-dark">
            {section.title}
          </h4>
          <ul className="space-y-3">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a
                  href={link.href}
                  className="font-lato text-sm leading-5 text-dark hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;
