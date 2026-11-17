# Requirements

Derived from the [Requirement Analysis doc](https://docs.google.com/document/d/1eEtgya4hvGydZPvwy42mGCGrnlPk_AWQ_SA2CETyzN0)
and the survey/interview findings in [`RESEARCH.md`](RESEARCH.md).

Every requirement below is tagged with where it came from — `R` for research evidence, `S` for
standards/compliance, `P` for product hypothesis. If a requirement has no tag, it is probably
wishful thinking and should be challenged.

---

## 1. User needs → requirements

### 1.1 Frictionless engagement

Users want enrollment and payment to feel like one motion, not a form.

- Multi-step flows that break work into stages: **register → search → compare → pay** `P`
- Real-time validation and auto-suggestions on inputs `P`
- **31% of cart abandonments are attributed to authentication friction** — the flow exists to
  remove that specific drop-off `R`
- Every step must be resumable; abandoning halfway must not lose enrollment state `P`

### 1.2 Search and filtering

- Faceted search over **biometric type** (fingerprint, facial, voice), **security standards**
  (ISO 30136, FIDO UAF), and **pricing model** `R`
- Natural-language queries ("find facial recognition with liveness detection") `P`
- Saved searches for recurring queries `P`
- Response time under 2s for a search query `R`

### 1.3 Comparison

- Side-by-side matrix with toggleable attributes (encryption standard, API support, FAR/FRR) `R`
- Color-coded checkmarks and progress bars to encode strengths/weaknesses `R`
- Radar charts showing the security ↔ usability trade-off `P`
- Export to PDF/CSV so a stakeholder can review outside the app `P`

### 1.4 Gap identification

- Users assign weights to features ("encryption: 9/10") `P`
- Automated gap report highlighting where a solution fails a stated requirement `P`
- Recommendation engine suggesting plugins/APIs that close a gap `P`

---

## 2. Functional requirements

| ID | Requirement | Source |
| --- | --- | --- |
| FR-1 | Biometric enrollment (fingerprint and/or face) with explicit consent at capture | R, S |
| FR-2 | Authenticate a payment with a single biometric confirmation | R |
| FR-3 | **PIN fallback available at every confirmation step, before any failure occurs** | R |
| FR-4 | Retry path on false rejection, with a clear retry counter | R |
| FR-5 | Lockout recovery flow that does not require a support ticket | R |
| FR-6 | Capability detection — biometrics offered only where the device supports it | R |
| FR-7 | Search with autocomplete and faceted filters | R |
| FR-8 | Comparison matrix with selectable attributes and export | R |
| FR-9 | Saved searches | P |
| FR-10 | Gap analysis against weighted user requirements | P |
| FR-11 | Account/security settings: view and revoke enrolled biometrics | R, S |
| FR-12 | Transaction history with per-transaction auth method shown | S |

**FR-3 is non-negotiable.** 40% of surveyed users named lockout as a top concern, and interviews
confirmed being stuck at a counter is the fear that stops adoption. A biometric-only flow is out
of scope by design.

---

## 3. Non-functional requirements

### Performance

| ID | Requirement |
| --- | --- |
| NFR-1 | Search responses < 2s (benchmark: Amazon One authenticates in ~1.3s) |
| NFR-2 | Support 10,000+ concurrent users at peak |
| NFR-3 | Biometric confirmation feedback < 500ms perceived latency |

### Usability & accessibility

| ID | Requirement |
| --- | --- |
| NFR-4 | Mobile-first, responsive at 320px and up |
| NFR-5 | WCAG 2.1 AA — screen-reader support for comparison tables, keyboard-operable everywhere |
| NFR-6 | Never rely on color alone to encode comparison state |

### Reliability

| ID | Requirement |
| --- | --- |
| NFR-7 | 99.9% uptime target |
| NFR-8 | Graceful degradation to PIN when the biometric subsystem is unavailable |
| NFR-9 | Data integrity checksums on comparison datasets |

### Privacy & security

| ID | Requirement |
| --- | --- |
| NFR-10 | Store **hashed templates only — never raw biometric data** (ISO 30136 approach) |
| NFR-11 | Biometric matching happens on-device; templates do not leave the device where avoidable |
| NFR-12 | AES-256 for data at rest; TLS in transit |
| NFR-13 | GDPR-style rights: access, deletion, opt-out; consent is explicit and revocable |
| NFR-14 | PCI DSS-aligned encryption of transaction logs |
| NFR-15 | Cookie consent via a recognised transparency framework |

---

## 4. Prototype scope (this repository)

What this repo actually delivers — a **marketing and walkthrough layer**, not a payments system:

- ✅ Landing page telling the biometric-payments story
- ✅ Four-step product walkthrough with interactive previews
- ✅ Survey findings surfaced on the page (`ValidationSection`)
- ✅ Beta waitlist capture (client-side only, no backend)
- ❌ No real biometric capture, no payments, no backend, no persistence

The waitlist form currently simulates a submission. **Any claim of payment processing on this site
would be inaccurate** — the real integration work is tracked in the roadmap.

---

## 5. Technical direction

### Current (prototype)

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui (Radix primitives)
- Framer Motion for animation, Lottie for the scan animation
- Static deployment on Vercel

### Planned (product)

| Layer | Choice | Note |
| --- | --- | --- |
| Mobile app | React Native (Expo) | Replace Next.js/RN, per the requirement doc; `react-native-biometrics` / `react-native-keychain` for capture and secure storage |
| Navigation | React Navigation | Hosts the multi-step wizard |
| Charts | `react-native-chart-kit` or Victory Native | Radar/bar comparison views |
| API | Node.js + Express gateway | Routes search/comparison requests |
| Database | PostgreSQL + `pgvector` | Similarity search over solutions |
| ML | Python + scikit-learn | Gap analysis scoring |
| Payments | Secure Payment Confirmation (SPC) API | Biometric transaction confirmation |
| Billing | Stripe / PayPal | Subscription billing |
| CI/CD | GitHub Actions / Bitrise | TestFlight + Play Internal distribution |
| Offline | React Query cache or WatermelonDB | Cached search results, graceful retry |

### Compliance targets

- **ISO 30136** — hashed biometric templates
- **PCI DSS** — encrypted transaction logs
- **EMVCo** — biometric payment card integrations
- **WCAG 2.1 AA** — accessibility

---

## 6. Risks

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| False rejection rate too high | 40% of users named lockout as a top fear; a bad first experience is fatal | PIN fallback before failure, tune thresholds per device, measure bail-out rate |
| Privacy perception | 54% named privacy as a top concern | On-device matching, published data-retention policy, visible revoke control |
| Regulatory (RBI/DPDP) constraints on biometric storage | Could block launch entirely | Legal review before any real biometric data is collected |
| Hardware fragmentation | 17% cited device compatibility | Capability detection, never promise what the device can't do |
| Segment narrowness | 85% of research was 18–24 | Re-run research on 25–50 before scaling spend |

---

## 7. Competitive context flagged during research

Incumbents and adjacent players users referenced when describing fraud and trust concerns:

- **SBI** — users raised fraud transactions as a reason they distrust payment rails
- **FamPay**, **Slice** — young-audience fintechs with the same demographic we surveyed
- **IDFC** — referenced in the requirement doc as a comparable institution
- **Amazon One** — the palm-recognition benchmark for auth speed (~1.3s)

The recurring theme: users are not comparing Biopay to *nothing*, they are comparing it to
institutions that have already lost their trust. Trust is the competitive moat, not features.
