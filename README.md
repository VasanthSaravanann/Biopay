# Biopay 👆💳

**Pay with a fingerprint, not a PIN.**

Biopay is a biometric payments product for India's UPI-first market. Instead of typing a
PIN every time you pay, you enroll a fingerprint once and confirm each payment with a touch —
then search, compare, and choose services with clear, honest data in front of you.

This repository is the **landing page and product prototype** — the public face of the project,
built after talking to real users about how they pay today.

<p>
  <a href="https://biopay.vercel.app/"><img alt="Live demo" src="https://img.shields.io/badge/live-biopay.vercel.app-2f6fed?style=flat-square" /></a>
  <img alt="React" src="https://img.shields.io/badge/React-18-61dafb?style=flat-square" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646cff?style=flat-square" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square" />
</p>

> 🔗 **Live site:** <https://biopay.vercel.app/>
> 📊 **Research folder (surveys, interviews, requirement analysis):**
> <https://drive.google.com/drive/folders/10LrI1eTub1Slc6MFb1a7nRuhGa0ySbjG?usp=sharing>

---

## Why we built this

We started with a simple question: *does entering a UPI PIN actually annoy people?*

So we asked. We ran a **93-response survey** and **6 user interviews** (4 recorded reviews + 2 live
sessions), and the answers shaped every decision in this prototype.

Three things came back loud and clear:

| What we heard | The number |
| --- | --- |
| PIN entry feels like friction | **56%** find entering a PIN for every payment inconvenient |
| People want checkout to be faster | **57%** want it 4–5/5 faster |
| Security is the benefit that matters | **82%** rank security as the #1 benefit |

But the research also gave us our real job. Intent to adopt was **polarized** — for every person
who said "I'd definitely use this," someone said "no thanks" — and the blockers were specific:

- **Data privacy** worried 54% of respondents
- **Security breaches** worried 54%
- **False rejections / getting locked out** worried 40%

That is why this landing page talks about how biometrics are stored, what happens when a scan
fails, and what you fall back to — instead of just shouting "the future of payments."

**The full story, with every number and the methodology behind it, lives in
[`docs/RESEARCH.md`](docs/RESEARCH.md).** Raw data and interview recordings are in the
[Drive folder](https://drive.google.com/drive/folders/10LrI1eTub1Slc6MFb1a7nRuhGa0ySbjG?usp=sharing).

---

## What the prototype does

The landing page walks a visitor through the four-step product it is pitching:

1. **Enroll with a fingerprint** — register a biometric once, tied to your device
2. **Search services & products** — find what you need with fast, filtered search
3. **Compare with visual insights** — side-by-side comparison instead of guesswork
4. **Pay securely** — confirm the transaction with the fingerprint you already enrolled

Each step has an interactive preview (hover or tap the icon), scroll-triggered animations, and a
"Join the Beta" flow at the bottom.

### Sections on the page

| Section | File |
| --- | --- |
| Hero — promise + live biometric scan animation | `src/components/HeroSection.tsx` |
| Features — biometric login, smart search, visual comparison | `src/components/FeaturesSection.tsx` |
| What users told us — the survey numbers | `src/components/ValidationSection.tsx` |
| How it works — 4 interactive steps | `src/components/HowItWorksSection.tsx` |
| Beta sign-up — waitlist form | `src/components/BetaSignUpSection.tsx` |
| Footer — brand, links, contact | `src/components/Footer.tsx` |

---

## Tech stack

Deliberately boring and fast to iterate:

- **React 18 + TypeScript** with **Vite 5** for the build
- **Tailwind CSS 3** + **shadcn/ui** (Radix primitives) for the design system
- **Framer Motion** for scroll and hover animation
- **Lottie** for the biometric scan animation (`public/biometric-scan-animation.json`)
- **React Router** for routing (`/` and a catch-all 404)

---

## Getting started

```bash
# install
npm install          # or: bun install

# develop (http://localhost:8080)
npm run dev

# production build
npm run build

# preview the production build locally
npm run preview

# lint
npm run lint
```

Node 18+ is recommended.

### Project layout

```
Biopay/
├── public/
│   ├── biometric-scan-animation.json   # Lottie animation used in the hero
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── ValidationSection.tsx      # the research numbers, on the page
│   │   ├── HowItWorksSection.tsx
│   │   ├── BetaSignUpSection.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollAnimationWrapper.tsx
│   │   └── ui/                        # shadcn/ui primitives
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── Index.tsx                  # landing page composition
│   │   └── NotFound.tsx
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── RESEARCH.md                    # market validation & interview findings
│   └── REQUIREMENTS.md                # functional & non-functional requirements
└── index.html
```

---

## Design decisions that came from research

| Research finding | What we changed |
| --- | --- |
| PIN friction (56%) | Hero leads with the friction, not the technology |
| Security is the top benefit (82%) | Security is described concretely — hashed templates, fallback flow |
| Privacy worry (54%) | Enrollment copy explains *what is stored and where* |
| False-rejection worry (40%) | Product spec requires a PIN fallback and retry path |
| Intent is polarized (mean 3.1/5) | Beta waitlist instead of a hard "buy now" funnel |

Full requirement traceability is in [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md).

---

## Roadmap

- [x] Landing page + interactive product walkthrough
- [x] Market validation with 93 survey responses and 6 interviews
- [ ] Beta enrollment with real biometric capture (WebAuthn / passkeys)
- [ ] Search and comparison flows with real merchant data
- [ ] PIN fallback and lockout recovery UX
- [ ] PCI DSS-aligned transaction logging, ISO 30136-style hashed templates
- [ ] React Native app for on-device biometrics (TestFlight + Play Internal)

---

## A note on the data

Survey respondents were skewing young — **85% were 18–24** — so treat the numbers as directional
signal from an early-adopter audience, not a national sample. The methodology, sample breakdown,
and known limitations are documented honestly in [`docs/RESEARCH.md`](docs/RESEARCH.md).

We would rather show you a real 56% than a made-up 96%.

---

## Contributing

This is an early-stage prototype, and feedback is genuinely useful.

- Found a bug or a broken claim? Open an issue.
- Want to improve copy, accessibility, or the research writeup? PRs are welcome.
- Accessibility matters to us — WCAG 2.1 AA is the target, so please flag anything that falls short.

---

## Contact

- 🌐 <https://biopay.vercel.app/>
- 📍 Chennai, India
- ✉️ Open an issue on this repository for anything about the project

---

<p align="center"><em>Built with security and privacy in mind — because that is what users asked for.</em></p>
