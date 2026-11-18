import { useEffect, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Reveals content only once it is actually on screen.
 *
 * Defaults are deliberately forgiving: `threshold: 0` means a single visible pixel
 * triggers the reveal, so sections taller than the viewport can never get stuck in the
 * hidden state (a `threshold: 0.1` container 10x taller than the viewport would never
 * fire). Browsers without IntersectionObserver render content immediately rather than
 * leaving the page blank.
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0, rootMargin = "0px 0px -10% 0px", triggerOnce = true } = options;
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    // No IntersectionObserver (or SSR) — show the content instead of hiding it forever.
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(ref);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, triggerOnce]);

  return { ref: setRef, isInView };
}
