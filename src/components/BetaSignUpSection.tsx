
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Users, Shield } from "lucide-react";
import { ScrollAnimationWrapper, StaggeredChildren } from "@/components/ScrollAnimationWrapper";

const BetaSignUpSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Request Submitted!",
        description: "We'll notify you when beta access is available.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  const features = [
    {
      icon: Shield,
      title: "Early Access",
      description: "Be among the first to experience secure biometric payments"
    },
    {
      icon: Users,
      title: "Beta Community",
      description: "Join our exclusive community of early adopters"
    },
    {
      icon: Mail,
      title: "Priority Updates",
      description: "Get the latest features and updates before anyone else"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 lg:px-8">
        <ScrollAnimationWrapper type="slide-up" className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join the Beta Program
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of the future of biometric payments. Request early access and help shape the product.
          </p>
        </ScrollAnimationWrapper>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Beta Features */}
            <ScrollAnimationWrapper type="slide-right" className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Why Join Our Beta?
              </h3>
              
              <StaggeredChildren type="slide-up" staggerDelay={0.2}>
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </StaggeredChildren>
            </ScrollAnimationWrapper>

            {/* Sign-up Form */}
            <ScrollAnimationWrapper type="slide-left" delay={0.3}>
              <Card className="shadow-xl transform transition-all duration-500 hover:scale-[1.02]">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900">
                    Request Beta Access
                  </CardTitle>
                  <p className="text-gray-600">
                    Enter your email to join the waitlist
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                    >
                      {isSubmitting ? "Submitting..." : "Request Access"}
                    </Button>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Join!! <span className="font-semibold text-blue-600"></span> people already on the waitlist
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaSignUpSection;
