import React from 'react'

const FeatureCard = ({ image, title, description }) => {
  return (
    <article className="space-y-6">
      {/* Feature Image */}
      <div className="aspect-[394/240] w-full overflow-hidden rounded-2xl">
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="font-urbanist font-medium text-2xl lg:text-3xl leading-tight text-dark tracking-tight">
          {title}
        </h3>
        <p className="font-lato text-base leading-6 text-dark">
          {description}
        </p>
      </div>
    </article>
  )
}

export default FeatureCard
