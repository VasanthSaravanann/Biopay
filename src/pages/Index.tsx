
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BetaSignUpSection from "@/components/BetaSignUpSection";
import Footer from "@/components/Footer";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling behavior to the entire page
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero section doesn't need scroll animation as it's visible on load */}
      <HeroSection />
      
      <ScrollAnimationWrapper type="fade-in">
        <FeaturesSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper type="slide-up">
        <HowItWorksSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper type="slide-up" delay={0.2}>
        <BetaSignUpSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper type="fade-in" delay={0.3}>
        <Footer />
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Index;
