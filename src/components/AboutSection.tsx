import { motion, useReducedMotion } from "framer-motion";
import { Fingerprint, Lock, Users } from "lucide-react";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

const pillars = [
  {
    icon: Fingerprint,
    title: "One touch, no PIN",
    description: "Enroll once and confirm a payment with your fingerprint.",
  },
  {
    icon: Lock,
    title: "Private by default",
    description: "Templates are hashed and matching stays on your device.",
  },
  {
    icon: Users,
    title: "Built on research",
    description: "Shaped by 93 survey responses and 6 user interviews.",
  },
];

const AboutSection = () => {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="py-20 bg-gray-50 scroll-mt-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimationWrapper type="slide-up">
            <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 mb-6">
              About Biopay
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Payments you confirm with a touch
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Biopay is an early-stage biometric payments product for India's UPI-first market.
              Instead of typing a PIN for every transaction, you enroll a fingerprint once and
              confirm each payment with a touch — then search, compare, and choose services with
              clear data in front of you. We are currently in beta, and every feature starts with
              something a real user told us.
            </p>
          </ScrollAnimationWrapper>

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left"
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.5, delay: index * 0.15, ease: "easeOut" }
                  }
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{pillar.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
