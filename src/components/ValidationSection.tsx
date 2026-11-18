import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageSquareQuote, ShieldCheck, TriangleAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimationWrapper, StaggeredChildren } from "@/components/ScrollAnimationWrapper";

const RESEARCH_URL =
  "https://drive.google.com/drive/folders/10LrI1eTub1Slc6MFb1a7nRuhGa0ySbjG?usp=sharing";

const stats = [
  {
    value: "93",
    label: "people answered our survey",
    detail: "plus 6 user interviews, recorded",
  },
  {
    value: "56%",
    label: "find typing a PIN every time annoying",
    detail: "52 of 93 respondents",
  },
  {
    value: "82%",
    label: "say security is the benefit that matters most",
    detail: "76 of 93 chose security over speed",
  },
  {
    value: "40%",
    label: "worry about getting locked out",
    detail: "so a PIN fallback is always one tap away",
  },
];

const concerns = [
  { label: "Data privacy", percent: 54 },
  { label: "Security breaches", percent: 54 },
  { label: "False rejections / lockout", percent: 40 },
  { label: "Device compatibility", percent: 17 },
];

const ValidationSection = () => {
  const reduced = useReducedMotion();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <ScrollAnimationWrapper type="slide-up" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 mb-6">
            <MessageSquareQuote className="h-4 w-4" />
            What users actually told us
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            We asked before we built
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Biopay started as a survey, not a hunch. Here is what 93 respondents and 6 interviews
            said about paying with a PIN — the good, and the uncomfortable parts.
          </p>
        </ScrollAnimationWrapper>

        {/* Headline numbers */}
        <StaggeredChildren
          type="slide-up"
          staggerDelay={0.15}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
            >
              <CardContent className="p-6">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {stat.value}
                </p>
                <p className="mt-3 font-semibold text-gray-900 leading-snug">{stat.label}</p>
                <p className="mt-2 text-sm text-gray-500">{stat.detail}</p>
              </CardContent>
            </Card>
          ))}
        </StaggeredChildren>

        {/* Concerns + honest note */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <ScrollAnimationWrapper type="slide-right">
            <Card className="border border-gray-100 shadow-lg h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <TriangleAlert className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    What still worries people
                  </h3>
                </div>

                <div className="space-y-5">
                  {concerns.map((concern, index) => (
                    <div key={concern.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">{concern.label}</span>
                        <span className="text-gray-500">{concern.percent}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        {/* scaleX keeps the bar on the compositor instead of animating layout width */}
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 origin-left"
                          style={{ width: `${concern.percent}%` }}
                          initial={reduced ? false : { scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{
                            duration: reduced ? 0 : 0.8,
                            delay: reduced ? 0 : index * 0.15,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm text-gray-500 leading-relaxed">
                  Security is both the reason people want Biopay and the reason they hesitate.
                  Closing that gap is the whole job.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper type="slide-left" delay={0.2}>
            <Card className="border border-gray-100 shadow-lg h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">What we do about it</h3>
                </div>

                <ul className="space-y-4 text-gray-600 flex-1">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>
                      <strong className="text-gray-900">Hashed templates only.</strong> We never
                      store a picture of your fingerprint — only a one-way mathematical template.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>
                      <strong className="text-gray-900">Matching stays on your device.</strong> The
                      check happens locally, so your biometric never travels to a server.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>
                      <strong className="text-gray-900">PIN fallback, always.</strong> A failed scan
                      never traps you — and you can revoke your enrolled fingerprint any time.
                    </span>
                  </li>
                </ul>

                <a
                  href={RESEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Read the full research and interviews
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <p className="mt-4 text-xs text-gray-400 leading-relaxed">
                  Survey ran 25 May – 8 July 2025. 85% of respondents were 18–24, so we treat these
                  numbers as early-adopter signal, not a national sample.
                </p>
              </CardContent>
            </Card>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
};

export default ValidationSection;
