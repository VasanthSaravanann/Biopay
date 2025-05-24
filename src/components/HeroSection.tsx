
import { Button } from "@/components/ui/button";
import { Fingerprint, Shield, Search, BarChart3 } from "lucide-react";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load animation data
    fetch('/biometric-scan-animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  // Staggered animation for the text content
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content with Staggered Animation */}
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Biometric Payments,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Smarter Decisions
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Biopay helps users securely enroll, search, and compare services using fingerprint authentication.
              </p>
            </motion.div>
            
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Join Our Beta
                <Fingerprint className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Feature Icons with Staggered Animation */}
            <motion.div className="flex items-center space-x-8 pt-8" variants={itemVariants}>
              {[
                { icon: Shield, text: "Secure" },
                { icon: Search, text: "Smart Search" },
                { icon: BarChart3, text: "Analytics" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                >
                  <feature.icon className="h-6 w-6 text-blue-600" />
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Lottie Animation with Motion */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 flex items-center justify-center"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ duration: 0.4 }}
            >
              {animationData ? (
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  style={{ width: '100%', height: '350px' }}
                  className="object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-[350px] w-full">
                  <div className="animate-pulse flex space-x-4 items-center">
                    <Fingerprint className="h-16 w-16 text-blue-400" />
                    <span className="text-gray-400">Loading animation...</span>
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Background Decoration with Independent Animations */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl transform rotate-6 scale-105 opacity-20"
              animate={{ rotate: [6, 4, 6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-60"
              animate={{ y: [-5, 5, -5], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full opacity-40"
              animate={{ y: [5, -5, 5], scale: [1, 0.95, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
