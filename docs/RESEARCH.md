# Market Validation & User Research

This document is the evidence base for Biopay. Everything on the landing page traces back to
something a real person told us.

**Source material:** [Biopay research folder on Google Drive](https://drive.google.com/drive/folders/10LrI1eTub1Slc6MFb1a7nRuhGa0ySbjG?usp=sharing)

| What | Where in Drive | Size |
| --- | --- | --- |
| Survey responses | `Biopay (Responses).xlsx` | 93 responses |
| Requirement analysis | `Requirement Analysis` (Google Doc) | Functional + non-functional spec |
| Recorded user reviews | `Interview Shared folder` → `Review-1.mov` … `Review-4.mov` | 4 sessions |
| Live user interviews | `Live interview Shared folder` → `interview 1.mp4`, `interview 2.mp4` | 2 sessions |

---

## 1. Method

We combined a broad, low-cost signal (a survey) with a narrow, high-detail signal (interviews),
because neither alone would have been enough to justify building anything.

### Survey

- **93 responses**, collected **25 May 2025 → 8 July 2025**
- Distribution: shared direct link, no paid panel
- 8 questions: PIN inconvenience, desired speed, adoption intent, top benefit, payment methods
  used, adoption concerns, age bracket
- All questions except the multi-select ones were single-choice

### Interviews

- **4 recorded review sessions** (`Review-1.mov` … `Review-4.mov`) — participants walked through
  the prototype and narrated what confused them
- **2 live interviews** (`interview 1.mp4`, `interview 2.mp4`) — open-ended conversation about how
  they pay today, when they last abandoned a checkout, and what would make them trust biometrics
- Recordings are kept in the shared Drive folder for the team to reference

### Survey limitations (read these before quoting the numbers)

1. **Age skew.** 85% of respondents were 18–24. This is an early-adopter audience, not a national
   sample — and it likely *inflates* enthusiasm for biometrics.
2. **Self-selection.** A shared link attracts people already interested in the topic.
3. **Stated, not revealed, preference.** Nobody was asked to actually complete a biometric payment.
4. **Small n.** With 93 responses, a single respondent moves any percentage by ~1.1 points. Treat
   anything within a few points as noise.
5. **Multi-select questions report "% of respondents who selected it"**, so columns add to more
   than 100%.

These are the reasons the product is framed as a beta, not as a finished answer.

---

## 2. Findings

### 2.1 PIN entry is real friction — but not universal

> *"Do you find entering your UPI PIN for each payment inconvenient?"*

| Answer | Count | Share |
| --- | --- | --- |
| Yes | 52 | **56%** |
| No | 41 | 44% |

A bare majority feel the friction. That is enough to build for, and it is also the first warning
against over-claiming: **44% do not mind the PIN.** The product cannot assume everyone wants this.

### 2.2 People want speed

> *"How much faster would you want checkout to be, on a scale of 1–5?"*

| Score | Count |
| --- | --- |
| 5 | 26 |
| 4 | 27 |
| 3 | 26 |
| 2 | 4 |
| 1 | 10 |

- **Mean: 3.59 / 5**
- **57% (53/93) scored 4 or 5**

The distribution is a cluster at 3–5 with a real tail at 1. Speed is a desirable feature, not a
burning pain point on its own.

### 2.3 Adoption intent is polarized — this was the most important finding

> *"How likely are you to use the ability to pay with your fingerprint or face?"*

| Score | Count |
| --- | --- |
| 5 | 27 |
| 4 | 10 |
| 3 | 22 |
| 2 | 12 |
| 1 | 21 |

- **Mean: 3.11 / 5**
- **40% (37/92) scored 4 or 5** — the "likely" group
- **36% (33/92) scored 1 or 2** — actively reluctant
- 24% sat on the fence

This is a bimodal distribution, not a lukewarm average. It says the market is **not** ready for a
forced biometric-only checkout. That directly produced three product decisions:

1. Biometrics is an **opt-in accelerator**, never the only way to pay
2. There must be a **PIN fallback** that is one tap away
3. The landing page's job is to **de-risk**, not to hype — hence the beta waitlist

### 2.4 Security is what people are actually buying

> *"Which benefit matters most to you?"* (multi-select, % of 93 respondents)

| Benefit | Selected by |
| --- | --- |
| Security | **76 (82%)** |
| Privacy | 57 (61%) |
| Speed | 36 (39%) |
| Ease of use | 31 (33%) |

Security outranks speed by more than 2×. **Selling this product as "faster" would have missed the
point.** The pitch leads with trust; speed is the second-order benefit.

### 2.5 The concerns are specific — and they are design requirements

> *"What's your biggest concern about switching to biometric payments?"* (multi-select)

| Concern | Selected by |
| --- | --- |
| Data privacy | **50 (54%)** |
| Security breaches | **50 (54%)** |
| False rejections (getting locked out) | 37 (40%) |
| Device or OS compatibility | 16 (17%) |

Note the tension: security is the top *benefit* **and** among the top *concerns*. People want the
security posture, and they do not yet trust us to deliver it. That gap is the product's core UX
problem, and every one of these four concerns maps to a requirement in
[`REQUIREMENTS.md`](REQUIREMENTS.md):

| Concern | Product response |
| --- | --- |
| Data privacy (54%) | Store hashed templates only, never raw biometrics; document retention and deletion |
| Security breaches (54%) | E2E encryption, PCI DSS-aligned transaction logs, no biometric data leaving the device |
| False rejections (40%) | Retry path + instant PIN fallback + clear lockout recovery |
| Device compatibility (17%) | Graceful capability detection; biometrics offered only where supported |

### 2.6 Payment methods in use today

> *"Which payment methods do you use most often?"* (up to 2)

| Method | Selected by |
| --- | --- |
| Mobile wallet (Apple Pay / Google Pay) | 79 |
| Cash | 33 |
| Credit / debit card | 17 |
| Biometrics (Touch ID / Face ID) | 12 |

Mobile wallets dominate, and 12 respondents already use on-device biometrics daily. That is the
wedge: **the habit already exists on the device — Biopay extends it to the payment itself.**

### 2.7 Who answered

| Age bracket | Count | Share |
| --- | --- | --- |
| 18–24 | 79 | 85% |
| 35–50 | 10 | 11% |
| 25–34 | 4 | 4% |

The 35–50 cohort is small but worth flagging: it is the group most likely to hold the payment
relationships and the least represented here. **Closing this gap is the top priority for the next
research round.**

---

## 3. What the interviews added

The survey told us *what* people thought. The interviews told us *why*, and they repeatedly
surfaced the same four themes across the 6 sessions.

1. **The PIN is muscle memory, not love.** Participants did not describe the PIN as painful — they
   described it as *automatic*. The friction only became noticeable on small, frequent, low-value
   payments, and at checkout when they were in a hurry. *Implication: target high-frequency,
   low-value use cases first.*
2. **"Where does my fingerprint go?" was the first question.** Not one participant asked how fast
   it was. Every session got to storage and ownership within the first few minutes. *Implication:
   the enrollment screen must answer this before it asks for anything.*
3. **Lockout fear is the dealbreaker.** Participants were far more worried about being *stuck* —
   a failed scan at a counter with a queue behind them — than about being defrauded. *Implication:
   show the fallback before the first scan, not after a failure.*
4. **Comparison shopping is genuinely wanted.** Several participants described manually keeping
   screenshots or opening multiple apps to compare prices and features. *Implication: the
   compare/insights part of the product is not a nice-to-have.*

---

## 4. Honest assessment

**What the evidence supports:**

- A meaningful minority (56%) experiences PIN friction worth solving
- Security-led positioning is correct
- A fingerprint-first, PIN-fallback payment flow is viable for an 18–24 early-adopter segment
- Comparison and search are wanted alongside payments

**What the evidence does not support:**

- That the general Indian payments market wants this *today* — 36% of even this friendly sample
  said they were unlikely to use it
- That speed alone sells it — 82% chose security over speed
- That our numbers generalize beyond young, self-selected respondents

**Next research steps:**

1. Re-run the survey weighted toward 25–50, the actual payment decision-makers
2. Run a **concierge test**: 10 users, real small payments, fingerprint vs. PIN, measured
3. Instrument the fallback path — how often do people bail to PIN, and at what point
4. Test the false-rejection experience explicitly, since it is the fear people can't quantify

---

## 5. Reproducing the analysis

The survey export is `Biopay (Responses).xlsx` in the Drive folder. Export the first sheet as CSV
and every figure above can be recomputed with plain `csv` + `collections.Counter` — no special
tooling, no hidden pipeline. Multi-select answers are comma-separated within their cell, so split
on `,` before counting.

Percentages in this document are calculated as **count ÷ 93 respondents** (or ÷ 92 for the intent
question, which had one blank response) and rounded to whole numbers.
