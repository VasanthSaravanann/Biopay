import { Button } from "@/components/ui/button";
import { Fingerprint, Shield, Search, BarChart3 } from "lucide-react";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AnimationStatus = "loading" | "ready" | "error";

const HeroSection = () => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [status, setStatus] = useState<AnimationStatus>("loading");
  const reduced = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();

    fetch("/biometric-scan-animation.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Animation request failed with ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAnimationData(data);
        setStatus("ready");
      })
      .catch((error) => {
        // Ignore the abort we triggered ourselves on unmount.
        if (controller.signal.aborted) return;
        console.error("Error loading animation:", error);
        setStatus("error");
      });

    return () => controller.abort();
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
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <a href="#beta">
                  Join Our Beta
                  <Fingerprint className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                <a href="#how-it-works">Learn More</a>
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
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.8 + index * 0.2, duration: reduced ? 0 : 0.5 }}
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
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.4 }}
          >
            <motion.div
              className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 flex items-center justify-center"
              whileHover={
                reduced
                  ? undefined
                  : {
                      scale: 1.03,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    }
              }
              transition={{ duration: 0.4 }}
            >
              {status === "ready" && animationData ? (
                <Lottie
                  animationData={animationData}
                  loop={!reduced}
                  autoplay={!reduced}
                  style={{ width: '100%', height: '350px' }}
                  className="object-contain"
                />
              ) : status === "error" ? (
                <div className="flex flex-col items-center justify-center h-[350px] w-full text-center">
                  <Fingerprint className="h-20 w-20 text-blue-500" />
                  <p className="mt-4 text-gray-500">Fingerprint authentication</p>
                </div>
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
              animate={reduced ? {} : { rotate: [6, 4, 6] }}
              transition={{ duration: 6, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-60"
              animate={reduced ? {} : { y: [-5, 5, -5], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full opacity-40"
              animate={reduced ? {} : { y: [5, -5, 5], scale: [1, 0.95, 1] }}
              transition={{ duration: 5, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
