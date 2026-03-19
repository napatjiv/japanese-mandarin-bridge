# N1 Mandarin Bridge

### You already know these words. You just don't know it yet.

350 JLPT N1 kanji that look terrifying on a Japanese word list — but are everyday vocabulary for 1.4 billion Mandarin speakers. This app reveals the shortcut hiding in plain sight.

**[Try it live](https://napatjiv.github.io/n1-mandarin-bridge/)**

---

## The Problem

You passed N2. You're staring at the N1 word list. Characters like **憂鬱**, **把握**, **曖昧**, **挫折**, **妥協** feel exotic, rare, and unmotivated. Why learn words you'll "never use"?

## The Secret

Those same characters are completely normal in Mandarin Chinese. 把握? Said daily. 矛盾? From a famous ancient parable every Chinese kid knows. 妥協? Used in every relationship argument.

**N1 isn't teaching you rare words. It's teaching you words that 20% of the world uses every day.**

This app makes that visible — and gives you two languages for the effort of one.

## What Makes This Different

| Feature | What it does |
|---|---|
| **Mandarin Usefulness Meter** | 1-5 score showing how common each word is in daily Chinese |
| **HSK Level Tags** | Know exactly where each word sits in the Mandarin learning path |
| **Meaning Shift Alerts** | Flags when JP and CN meanings diverge (把握 = "grasp" in JP, "confidence" in CN) |
| **"Same Character!" Badges** | Highlights when JP kanji and CN simplified are identical — zero new characters to learn |
| **3D Card Flip** | Japanese front, Mandarin reveal back — the "aha" moment is the product |

## The Dataset

**350 words** hand-curated for maximum overlap value:

- **92 words** rated Frequency 5 — daily Mandarin conversation
- **151 words** rated Frequency 4 — news, work, social media
- **107 words** rated Frequency 3 — formal/written but widely known
- **59 meaning shifts** flagged — where the same characters mean different things
- **122 identical characters** — JP kanji = CN simplified, nothing new to memorize

Every entry includes: furigana, pinyin with tone marks, example sentences in both languages, HSK level, frequency notes, and meaning shift explanations.

## Features

- **Flashcard Review** — Card-flip with keyboard shortcuts (Space to flip, arrows to navigate, 1/2/3 to rate)
- **Browse & Filter** — Search by kanji/reading/pinyin/meaning, filter by category, frequency, HSK level, or study status
- **Progress Tracking** — Words learned, streak counter, breakdown by frequency tier
- **Self-Rating** — New / Seen / Known — persisted to localStorage
- **Mobile-First** — Responsive with touch-friendly cards and bottom navigation
- **Dark-mode ready** typography with Noto Sans JP/SC/TC

## Tech Stack

React 18 + Vite, Tailwind CSS, React Router, localStorage. No backend.

## Run Locally

```bash
git clone https://github.com/napatjiv/n1-mandarin-bridge.git
cd n1-mandarin-bridge
npm install
npm run dev
```

## Who This Is For

- Has JLPT N2 (knows ~1,000 kanji, ~6,000 words)
- Stalling on N1 because the new kanji feel rare and pointless
- Curious about Mandarin, has some exposure, or wants to start

## License

MIT
