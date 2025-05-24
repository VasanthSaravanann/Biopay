
import { Fingerprint, Search, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimationWrapper, StaggeredChildren } from "@/components/ScrollAnimationWrapper";

const FeaturesSection = () => {
  const features = [
    {
      icon: Fingerprint,
      title: "Biometric Login",
      description: "Secure and fast authentication using advanced fingerprint technology for seamless access."
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Personalized search experience powered by intelligent algorithms that understand your preferences."
    },
    {
      icon: BarChart3,
      title: "Visual Comparison",
      description: "Intuitive charts and insights that help guide your choices with clear, actionable data."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <ScrollAnimationWrapper type="slide-up" className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Smarter Decisions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of biometric payments with our cutting-edge technology
          </p>
        </ScrollAnimationWrapper>

        <StaggeredChildren type="slide-up" staggerDelay={0.2}>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </StaggeredChildren>
      </div>
    </section>
  );
};

export default FeaturesSection;
