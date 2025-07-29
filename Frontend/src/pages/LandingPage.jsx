import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/HeroSection/Hero";
import FeatureShowcase from "../components/FeatureShowcase/FeatureShowcase";
import Features from "../components/Features/Features";
import Testimonial from "../components/Testimonial/Testimonial";
import Team from "../components/Team/Team";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#DAD9D8]">
      <Header />
      <main>
        <Hero />
        <FeatureShowcase />
        <Features />
        <Testimonial />
        <CTA />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
