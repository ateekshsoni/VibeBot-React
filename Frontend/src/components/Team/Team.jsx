import React from 'react'
import { Button } from '../ui/button'
import TeamCard from './TeamCard'

const Team = () => {
  const teamMembers = [
    {
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/CR0AZvEehJ.png",
      name: "Alex Johnson",
      role: "CEO & Founder",
      description: "Passionate about innovation and transforming how brands engage on social media.",
      socialIcons: "https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/88055606-2679-4eab-af5f-14e9b7f2312f.svg"
    },
    {
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/EjAbQte7S6.png",
      name: "Maria Chen",
      role: "CTO",
      description: "Expert in technology development and enhancing user experience through automation.",
      socialIcons: "https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/027f554c-b67a-4393-a8a1-a6fb74046da1.svg"
    },
    {
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/LGxJyeyaTY.png",
      name: "David Lee",
      role: "Marketing Director",
      description: "Creative strategist focused on building brand awareness and engagement.",
      socialIcons: "https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/a20e3a70-9a3c-4794-b278-bdb12e2464e6.svg"
    },
    {
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/2N61yAhacO.png",
      name: "Sophia Kim",
      role: "Product Manager",
      description: "Dedicated to delivering innovative solutions that meet customer needs.",
      socialIcons: "https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/d1718a5c-a264-4f54-b32a-cbd0c691e26f.svg"
    },
    {
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/XdQWg10QdK.png",
      name: "James Smith",
      role: "Lead Developer",
      description: "Skilled in creating seamless and efficient chatbot experiences for users.",
      socialIcons: "https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/9301843e-5440-4b59-8874-68bd3e72f6b8.svg"
    },
    {
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/Seq5HULYZ2.png",
      name: "Emily Davis",
      role: "UX Designer",
      description: "Focused on enhancing user interactions and ensuring a smooth experience.",
      socialIcons: "https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/96d28ce2-c2fc-4bb9-831b-83d8b125a4bf.svg"
    },
    {
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/rwiFVZ36a0.png",
      name: "Michael Brown",
      role: "Data Analyst",
      description: "Analyzes engagement metrics to drive data-informed decisions for growth.",
      socialIcons: "https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/aeb93c95-0cf3-4343-9ee5-6b75aa36a128.svg"
    },
    {
      image: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-27/Rs48gYKmCn.png",
      name: "We're hiring!",
      role: "Join us",
      description: "Be part of our innovative team and shape the future of chat automation.",
      socialIcons: "https://codia-f2c.s3.us-west-1.amazonaws.com/default/image/2025-07-27/4d8aae02-ef30-4c7e-8925-5179d41601ef.svg"
    }
  ]

  return (
    <section className="bg-white py-16 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="inline-block mb-4">
              <span className="font-roboto font-semibold text-base leading-6 text-dark">
                Meet
              </span>
            </div>

            {/* Heading & Description */}
            <div className="space-y-6">
              <h2 className="font-urbanist font-medium text-4xl lg:text-5xl leading-tight text-dark tracking-tight">
                Our Team
              </h2>
              <p className="font-lato text-lg leading-7 text-dark">
                Dedicated professionals driving InstaFlow's success.
              </p>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard 
                key={index}
                image={member.image}
                name={member.name}
                role={member.role}
                description={member.description}
                socialIcons={member.socialIcons}
              />
            ))}
          </div>

          {/* Hiring CTA */}
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h3 className="font-urbanist font-medium text-3xl lg:text-4xl leading-tight text-dark tracking-tight">
                We're hiring!
              </h3>
              <p className="font-lato text-lg leading-7 text-dark">
                Explore exciting career opportunities with us today.
              </p>
            </div>
            <Button variant="outline" size="lg">
              Open positions
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
