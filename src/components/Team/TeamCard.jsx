import React from "react";

const TeamCard = ({ image, name, role, description, socialIcons }) => {
  return (
    <article className="space-y-6">
      {/* Team Member Image */}
      <div className="aspect-square w-full overflow-hidden rounded-2xl">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-roboto font-semibold text-xl leading-7 text-dark">
            {name}
          </h3>
          <p className="font-lato text-lg leading-7 text-dark">{role}</p>
        </div>
        <p className="font-lato text-base leading-6 text-dark">{description}</p>

        {/* Social Icons */}
        <div className="pt-2">
          <img
            src={socialIcons}
            alt="Social Media Links"
            className="h-6 w-25"
          />
        </div>
      </div>
    </article>
  );
};

export default TeamCard;
