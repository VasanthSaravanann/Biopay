import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export type RevealType = "fade-in" | "slide-up" | "slide-left" | "slide-right" | "scale-in";
export type AnimationType = RevealType | "staggered";

/**
 * Resting (pre-reveal) state for each reveal style.
 * Only spatial/opacity properties are animated — never layout-affecting ones.
 */
const hiddenStates: Record<RevealType, Record<string, number>> = {
  "fade-in": { opacity: 0 },
  "slide-up": { opacity: 0, y: 50 },
  "slide-left": { opacity: 0, x: 50 },
  "slide-right": { opacity: 0, x: -50 },
  "scale-in": { opacity: 0, scale: 0.9 },
};

/** "staggered" has no reveal of its own; it falls back to a slide-up reveal. */
const resolveType = (type: AnimationType): RevealType =>
  type === "staggered" ? "slide-up" : type;

/**
 * `delay` and `duration` are in seconds.
 * When the user prefers reduced motion we skip the movement entirely by rendering the
 * resting state as the visible state, so content is never hidden behind an animation.
 */
const buildVariants = (
  type: AnimationType,
  duration: number,
  delay: number,
  reduced: boolean
): Variants => ({
  hidden: reduced
    ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : hiddenStates[resolveType(type)],
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: "easeOut" },
  },
});

interface BaseAnimationProps {
  children: React.ReactNode;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** Reveal duration in seconds. */
  duration?: number;
  className?: string;
  threshold?: number;
}

export interface ScrollAnimationWrapperProps extends BaseAnimationProps {
  type?: AnimationType;
}

export const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  type = "fade-in",
  delay = 0,
  duration = 0.6,
  className = "",
  threshold = 0,
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={buildVariants(type, duration, delay, Boolean(reduced))}
      >
        {children}
      </motion.div>
    </div>
  );
};

export interface StaggeredChildrenProps extends BaseAnimationProps {
  type?: RevealType;
  /** Gap between each child's reveal start, in seconds. */
  staggerDelay?: number;
}

/**
 * Staggers its children without breaking the parent's layout: the root element is the
 * layout container (pass grid/flex/space-y classes via `className`) and each child is
 * wrapped individually, so it still participates as a grid item or a `space-y` child.
 */
export const StaggeredChildren: React.FC<StaggeredChildrenProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  staggerDelay = 0.1,
  type = "fade-in",
  threshold = 0,
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold });
  const reduced = useReducedMotion();
  const childrenArray = React.Children.toArray(children);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : staggerDelay,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  const childVariants = buildVariants(type, duration, 0, Boolean(reduced));

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
