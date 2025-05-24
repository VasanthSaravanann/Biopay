
import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type AnimationType = "fade-in" | "slide-up" | "slide-left" | "slide-right" | "scale-in" | "staggered";

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

const variants = {
  "fade-in": {
    hidden: { opacity: 0 },
    visible: (i: number) => ({ 
      opacity: 1, 
      transition: { 
        delay: i * 0.1,
        duration: 0.6
      } 
    })
  },
  "slide-up": {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut" 
      } 
    })
  },
  "slide-left": {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut" 
      } 
    })
  },
  "slide-right": {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut" 
      } 
    })
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1, 
      transition: { 
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut" 
      } 
    })
  }
};

export const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  type = "fade-in",
  delay = 0,
  duration = 0.6,
  className = "",
  staggerDelay = 0.1,
  threshold = 0.1
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold });
  const customDelay = delay;

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={customDelay}
        variants={variants[type]}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const StaggeredChildren: React.FC<Omit<ScrollAnimationWrapperProps, "type"> & { type?: Exclude<AnimationType, "staggered"> }> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  staggerDelay = 0.1,
  type = "fade-in",
  threshold = 0.1
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold });

  // Ensure children is an array
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={delay + index * staggerDelay}
          variants={variants[type]}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};
