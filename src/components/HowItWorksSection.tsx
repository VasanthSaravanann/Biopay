import { Fingerprint, Search, BarChart3, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Card, CardContent } from "@/components/ui/card";
const HowItWorksSection = () => {
  const steps = [{
    number: 1,
    icon: Fingerprint,
    title: "Enroll with Fingerprint",
    description: "Securely register your biometric data for fast and safe authentication",
    previewAnimation: "fingerprint-scan"
  }, {
    number: 2,
    icon: Search,
    title: "Search Services/Products",
    description: "Browse and discover services tailored to your preferences and needs",
    previewAnimation: "search-results"
  }, {
    number: 3,
    icon: BarChart3,
    title: "Compare with Visual Insights",
    description: "Make informed decisions with clear charts and comparison tools",
    previewAnimation: "chart-comparison"
  }, {
    number: 4,
    icon: Lock,
    title: "Pay Securely",
    description: "Complete transactions safely using your verified biometric authentication",
    previewAnimation: "secure-payment"
  }];
  return <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div className="text-center mb-16" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} viewport={{
        once: true,
        margin: "-100px"
      }}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience seamless biometric payments in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => <StepCard key={index} step={step} index={index} />)}
        </div>
        
        {/* Animated Process Flow - Base gray line only */}
        <motion.div className="mt-16 relative hidden lg:block" initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} transition={{
        delay: 0.3,
        duration: 0.8
      }} viewport={{
        once: true,
        margin: "-100px"
      }}>
          
        </motion.div>
      </div>
    </section>;
};

// Separate component for each step card with animations
const StepCard = ({
  step,
  index
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true,
    margin: "-100px 0px"
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const IconComponent = step.icon;
  const variants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Fixed icon animations to use only two keyframes
  const iconVariants = {
    initial: {
      scale: 0.8,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.3,
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.15,
      rotate: 8,
      // Fixed: using single value instead of array
      boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.6)",
      backgroundColor: "#EEF2FF",
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }
    },
    tap: {
      scale: 0.95,
      backgroundColor: "#EEF2FF",
      boxShadow: "0px 0px 5px rgba(59, 130, 246, 0.4)",
      transition: {
        duration: 0.2
      }
    }
  };
  const numberVariants = {
    initial: {
      scale: 0,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.3 + 0.2,
        duration: 0.3,
        type: "spring",
        stiffness: 200
      }
    }
  };

  // Preview animations based on step type
  const renderPreviewContent = () => {
    switch (step.previewAnimation) {
      case "fingerprint-scan":
        return <div className="flex flex-col items-center">
            <motion.div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-2" animate={isAnimating ? {
            boxShadow: ["0px 0px 0px rgba(59, 130, 246, 0)", "0px 0px 20px rgba(59, 130, 246, 0.6)", "0px 0px 0px rgba(59, 130, 246, 0)"],
            scale: [1, 1.05, 1]
          } : {}} transition={{
            duration: 2,
            repeat: isAnimating ? Infinity : 0,
            repeatDelay: 0.5
          }}>
              <Fingerprint className="h-10 w-10 text-blue-600" />
            </motion.div>
            <motion.div className="h-1 bg-blue-500 rounded-full w-full" animate={isAnimating ? {
            width: ["0%", "100%"],
            opacity: [0, 1, 0]
          } : {}} transition={{
            duration: 2,
            repeat: isAnimating ? Infinity : 0,
            repeatDelay: 0.5
          }} />
            <p className="mt-3 text-sm text-blue-800 font-medium">Scanning Fingerprint...</p>
          </div>;
      case "search-results":
        return <div className="space-y-2">
            <motion.div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-200" animate={isAnimating ? {
            x: [50, 0],
            opacity: [0, 1]
          } : {}} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Search className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="h-2 w-24 bg-gray-200 rounded-full" />
              </div>
            </motion.div>
            <motion.div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-200" animate={isAnimating ? {
            x: [50, 0],
            opacity: [0, 1]
          } : {}} transition={{
            duration: 0.5,
            delay: 0.4
          }}>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Search className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="h-2 w-32 bg-gray-200 rounded-full" />
              </div>
            </motion.div>
            <motion.div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-200" animate={isAnimating ? {
            x: [50, 0],
            opacity: [0, 1]
          } : {}} transition={{
            duration: 0.5,
            delay: 0.6
          }}>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Search className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="h-2 w-20 bg-gray-200 rounded-full" />
              </div>
            </motion.div>
          </div>;
      case "chart-comparison":
        return <div className="h-full flex flex-col items-center justify-center">
            <div className="flex items-end h-20 gap-2 mb-2">
              <motion.div className="w-6 bg-blue-300 rounded-t-md" animate={isAnimating ? {
              height: ["0%", "30%"]
            } : {}} transition={{
              duration: 0.6,
              delay: 0.1
            }} />
              <motion.div className="w-6 bg-blue-500 rounded-t-md" animate={isAnimating ? {
              height: ["0%", "60%"]
            } : {}} transition={{
              duration: 0.6,
              delay: 0.3
            }} />
              <motion.div className="w-6 bg-blue-700 rounded-t-md" animate={isAnimating ? {
              height: ["0%", "90%"]
            } : {}} transition={{
              duration: 0.6,
              delay: 0.5
            }} />
              <motion.div className="w-6 bg-indigo-500 rounded-t-md" animate={isAnimating ? {
              height: ["0%", "45%"]
            } : {}} transition={{
              duration: 0.6,
              delay: 0.7
            }} />
            </div>
            <div className="h-0.5 w-full bg-gray-300 mb-2" />
            <motion.div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden" animate={isAnimating ? {} : {}}>
              <motion.div className="h-full bg-blue-500" animate={isAnimating ? {
              width: ["0%", "65%"]
            } : {}} transition={{
              duration: 1,
              delay: 0.8
            }} />
            </motion.div>
            <p className="mt-3 text-xs text-blue-800 font-medium">Analyzing data...</p>
          </div>;
      case "secure-payment":
        return <div className="flex flex-col items-center">
            <motion.div className="w-16 h-16 mb-4 bg-green-100 rounded-full flex items-center justify-center" animate={isAnimating ? {
            scale: [1, 1.2, 1],
            backgroundColor: ["#DCFCE7", "#22C55E", "#DCFCE7"]
          } : {}} transition={{
            duration: 2,
            repeat: isAnimating ? Infinity : 0,
            repeatDelay: 0.5
          }}>
              <motion.div animate={isAnimating ? {
              rotate: [0, 360]
            } : {}} transition={{
              duration: 1,
              repeat: isAnimating ? 1 : 0
            }}>
                <Lock className="h-8 w-8 text-green-600" />
              </motion.div>
            </motion.div>
            <motion.div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2" animate={isAnimating ? {} : {}}>
              <motion.div className="h-full bg-green-500" animate={isAnimating ? {
              width: ["0%", "100%"]
            } : {}} transition={{
              duration: 1.5
            }} />
            </motion.div>
            <motion.p className="text-sm text-green-600 font-medium" initial={{
            opacity: 0
          }} animate={isAnimating ? {
            opacity: 1
          } : {}} transition={{
            delay: 1.6
          }}>
              Payment Secured!
            </motion.p>
          </div>;
      default:
        return null;
    }
  };
  return <motion.div ref={cardRef} className="text-center relative" custom={index} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants} whileHover={{
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }}>
      {/* Connection line for desktop */}
      {index < 3 && <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-300 -translate-x-1/2 z-0"></div>}
      
      <HoverCard openDelay={50} closeDelay={100}>
        <HoverCardTrigger asChild>
          <motion.div className="relative z-10 cursor-pointer" whileHover={{
          transition: {
            duration: 0.3
          }
        }}>
            {/* Step number */}
            <motion.div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4" variants={numberVariants} initial="initial" animate={isInView ? "animate" : "initial"} whileHover={{
            scale: 1.1,
            backgroundColor: "#2563EB",
            // Slightly brighter blue on hover
            transition: {
              duration: 0.3
            }
          }}>
              {step.number}
            </motion.div>
            
            {/* Icon with fixed animations */}
            <motion.div className="w-16 h-16 bg-white border-2 border-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" variants={iconVariants} initial="initial" animate={isInView ? "animate" : "initial"} whileHover="hover" whileTap="tap" onClick={() => setIsAnimating(prev => !prev)}>
              <IconComponent className="h-8 w-8 text-blue-600" />
            </motion.div>
            
            {/* Content */}
            <motion.h3 className="text-xl font-semibold text-gray-900 mb-3" initial={{
            opacity: 0,
            y: 10
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 10
          }} transition={{
            delay: index * 0.3 + 0.4,
            duration: 0.4
          }}>
              {step.title}
            </motion.h3>
            <motion.p className="text-gray-600 leading-relaxed" initial={{
            opacity: 0
          }} animate={isInView ? {
            opacity: 1
          } : {
            opacity: 0
          }} transition={{
            delay: index * 0.3 + 0.6,
            duration: 0.4
          }}>
              {step.description}
            </motion.p>
          </motion.div>
        </HoverCardTrigger>
        
        <HoverCardContent className="w-72 p-0 border-2 border-blue-100 shadow-lg" onMouseEnter={() => setIsAnimating(true)} onMouseLeave={() => setIsAnimating(false)}>
          <motion.div initial={{
          opacity: 0.9,
          scale: 0.98
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.2
        }}>
            <Card className="border-0 shadow-none">
              <CardContent className="p-4">
                <h4 className="text-sm font-semibold mb-3 text-blue-700">{step.title} Preview</h4>
                <div className="min-h-[120px] flex items-center justify-center">
                  {renderPreviewContent()}
                </div>
               
              </CardContent>
            </Card>
          </motion.div>
        </HoverCardContent>
      </HoverCard>
    </motion.div>;
};
export default HowItWorksSection;