# N1-Mandarin Bridge — Implementation Plan

## Paste this into Claude Code as the project spec.

---

## What This Is

A flashcard-based learning app for JLPT N1 kanji/vocab that reveals a hidden shortcut: many "uncommon" N1 words are actually everyday vocabulary in Mandarin Chinese. The app teaches N1 Japanese and Mandarin pronunciation side-by-side, so learners get two languages for ~1.2x the effort.

## Target User

- Has JLPT N2 (knows ~1,000 kanji, ~6,000 words)
- Stalling on N1 because the new kanji feel rare and unmotivated
- Either curious about Mandarin or already has some exposure (heritage speakers, people who lived in China/Taiwan, etc.)

## Core Insight (This Is the Product's Unique Value)

Characters like 憂鬱, 把握, 曖昧, 挫折, 妥協 feel exotic and intimidating on a Japanese N1 word list — but they're completely normal, high-frequency vocabulary in daily Mandarin. The app makes this visible so the learner feels motivated: "Oh, this isn't just an obscure test word — this is a real word that 1.4 billion people use every day."

---

## App Structure

### Tech Stack
- **React + Vite** (web-first for portfolio visibility and fast iteration)
- **Tailwind CSS** for styling
- **Local state** — no backend for MVP. All data lives in a local JSON dataset + localStorage for progress.
- Deploy to **GitHub Pages** or **Vercel**

### Screens / Views

#### 1. Landing / Home
- App name + tagline (something like: "N1 is hard. Mandarin makes it easy.")
- Brief explanation of the concept (2-3 sentences max)
- Stats: "X words in library" / "Y words learned" / "Z words in review"
- "Start Review" CTA button
- Navigation to Browse and Stats

#### 2. Flashcard Review (Core Loop)
This is the main interaction. Card-flip mechanic.

**Card Front (Japanese side):**
- Large kanji display (e.g., 把握)
- Furigana reading (はあく)
- JLPT N1 tag
- English meaning
- Example sentence in Japanese with translation

**Card Back (Mandarin reveal):**
- Same kanji characters shown at top for continuity
- Simplified Chinese form (if different from Japanese kanji, e.g., 忧郁 vs 憂鬱)
- Traditional Chinese form
- Pinyin with tone marks (e.g., bǎ wò)
- Mandarin meaning in English (note: sometimes the meaning shifts between JP and CN — flag this!)
- Example sentence in Mandarin with pinyin + English translation
- **Mandarin Usefulness Meter** — the key differentiator (see below)

**After viewing both sides, user self-rates:**
- "New to me" / "Seen it" / "Know it" — simple 3-tier for MVP (not full SRS yet)

**Navigation:** Swipe or arrow keys to next card. Show progress (e.g., 7/30).

#### 3. Mandarin Usefulness Meter (Critical Feature)

This is what makes the app different from every other N1 flashcard deck. For each word, show:

- **Frequency Score: 1–5 scale** displayed as a visual meter (dots, bars, or fill gauge)
  - ⭐⭐⭐⭐⭐ (5) = "Daily Mandarin — you'll hear this in any conversation"
  - ⭐⭐⭐⭐ (4) = "Very common — news, social media, work"
  - ⭐⭐⭐ (3) = "Moderately common — formal/written but everyone knows it"
  - ⭐⭐ (2) = "Uncommon — literary or specialized"
  - ⭐ (1) = "Rare in Mandarin too — skip the Chinese side if you want"
- **One-line note** explaining the frequency (e.g., "Used daily in dating/social contexts" or "Mainly in science and news")

Users should be able to **filter/sort by Mandarin usefulness** so they can prioritize high-overlap words first. This is the "low effort, high gain" funnel.

#### 4. Browse / Dictionary View
- Searchable, filterable list of all words in the database
- Filter by: category (emotion, social, nature, business, description, etc.), Mandarin frequency score, learned/unlearned status
- Sort by: Mandarin usefulness (high→low recommended as default), alphabetical by kanji, category
- Tapping a word opens the full card detail (both JP and CN sides)

#### 5. Progress / Stats View
- Words learned vs. total
- Breakdown by Mandarin frequency tier (how many 5-star words have you learned vs. remaining)
- Streak counter (days active)
- Simple progress bar or chart

---

## Data Model

Each vocab entry is a JSON object:

```json
{
  "id": 1,
  "kanji": "把握",
  "furigana": "はあく",
  "jp_meaning": "Grasp; comprehension",
  "jp_example": "状況を把握する",
  "jp_example_reading": "じょうきょうをはあくする",
  "jp_example_meaning": "To grasp the situation",
  "simplified": "把握",
  "traditional": "把握",
  "same_as_japanese": true,
  "pinyin": "bǎ wò",
  "cn_meaning": "Certainty; confidence; to be sure",
  "cn_example": "我有把握。",
  "cn_example_pinyin": "Wǒ yǒu bǎ wò.",
  "cn_example_meaning": "I'm confident / I'm sure.",
  "meaning_shift": true,
  "meaning_shift_note": "JP = to grasp/understand, CN = to have confidence/certainty",
  "mandarin_freq": 5,
  "freq_note": "Extremely common — used daily in conversation",
  "category": "cognition",
  "tags": ["business", "daily"]
}
```

Key fields to note:
- `same_as_japanese`: boolean — whether the simplified Chinese form is identical to the Japanese kanji. When true, emphasize this ("Same character!") as it lowers the learning barrier even further.
- `meaning_shift` + `meaning_shift_note`: many words look identical but have shifted meanings between JP and CN. This is important to flag — it's both a learning opportunity and a potential trap.
- `mandarin_freq`: 1–5 integer scale. This is the core product differentiator.

---

## Seed Dataset (First 30 Words)

Build the MVP with these 30 N1 words that have strong Mandarin overlap. Curate carefully — prioritize words where:
1. The kanji are identical or nearly identical between JP and CN
2. The Mandarin frequency is 3+ (motivating to learn)
3. There's an interesting meaning-shift story to tell

### Recommended starter words (grouped by Mandarin frequency):

**Freq 5 — Daily Mandarin (prioritize these):**
把握, 妥協, 偏見, 頻繁, 矛盾, 抽象, 慎重, 貢献, 崩壊, 膨大

**Freq 4 — Very common:**
曖昧, 挫折, 憂鬱, 脆弱, 克服, 概念, 堪能, 洞察, 繊細, 威厳

**Freq 3 — Moderately common (still worth learning):**
恩恵, 繁殖, 朗読, 哀悼, 簡潔, 傲慢, 倹約, 懇願, 賄賂, 冒涜

For each word, you need to populate all fields in the data model above. Use your knowledge of both languages to fill in accurate pinyin, meanings, example sentences, and frequency ratings. Flag meaning shifts carefully.

---

## Design Direction

### Aesthetic
- **Clean, modern, slightly editorial** — think Duolingo's clarity meets a Japanese stationery brand's restraint
- Light mode default with optional dark mode
- Generous whitespace, large kanji display (the characters are the hero)
- Subtle color coding: use a warm accent for Japanese content, a cool accent for Mandarin content — so the user's brain starts associating colors with languages

### Typography
- Use **Noto Sans JP** for Japanese text and **Noto Sans SC** / **Noto Sans TC** for Chinese — they're from the same family so they feel cohesive but correctly render each language's glyphs
- Large display size for kanji (48–64px on card face)
- Clean sans-serif for English UI text

### Card Flip Animation
- Smooth 3D flip on the Y-axis (CSS perspective transform)
- ~400ms transition
- Subtle shadow that shifts during flip to give depth

### Mandarin Frequency Meter
- Visual bar or dot meter, not just a number
- Color-graded: green (5) → yellow-green (4) → yellow (3) → orange (2) → gray (1)
- Accompanied by the one-line freq_note text

---

## User Flow

```
Landing Page
  → "Start Review" → Flashcard Review (sequential cards)
      → Card Front (JP) → Tap to flip → Card Back (CN + freq meter)
      → Self-rate: New / Seen / Know
      → Next card → ... → Session complete → Summary
  → "Browse" → Dictionary View (search, filter, sort)
      → Tap word → Full detail view
  → "Stats" → Progress dashboard
```

---

## localStorage Schema

```json
{
  "n1bridge_progress": {
    "cards": {
      "1": { "status": "new", "last_seen": null, "times_seen": 0 },
      "2": { "status": "seen", "last_seen": "2026-03-18", "times_seen": 3 },
      "3": { "status": "known", "last_seen": "2026-03-17", "times_seen": 7 }
    },
    "streak": { "current": 5, "last_active": "2026-03-18" },
    "settings": { "theme": "light", "default_sort": "freq_desc" }
  }
}
```

---

## MVP Scope (Build This First)

1. Full 30-word curated dataset with all fields populated
2. Flashcard review screen with card flip animation
3. Mandarin usefulness meter on each card
4. Self-rating system (new / seen / known) persisted to localStorage
5. Browse view with filter by frequency and category
6. Basic progress tracking (words learned count, simple stats)
7. Responsive — works on mobile and desktop
8. Deploy to GitHub Pages or Vercel

## Post-MVP Ideas (Don't Build Yet)

- Full SRS (spaced repetition) algorithm replacing the 3-tier self-rate
- Audio pronunciation (Mandarin pinyin TTS)
- Expand dataset to 200+ words
- "Meaning Shift" quiz mode — show the kanji, guess whether JP and CN meanings are same or different
- Community-contributed words
- Kanji stroke order animation
- "Daily word" notification
- HSK level tagging on the Mandarin side (so users know where the word falls in HSK progression)

---

## File Structure

```
n1-mandarin-bridge/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/
│   │   └── vocab.json          ← the 30-word curated dataset
│   ├── components/
│   │   ├── Layout.jsx           ← nav bar, overall layout shell
│   │   ├── FlashCard.jsx        ← the card flip component (front + back)
│   │   ├── FrequencyMeter.jsx   ← the Mandarin usefulness visual indicator
│   │   ├── CardFront.jsx        ← Japanese side content
│   │   ├── CardBack.jsx         ← Mandarin side content + freq meter
│   │   ├── SelfRating.jsx       ← new/seen/known buttons
│   │   ├── WordList.jsx         ← browse/dictionary list view
│   │   ├── WordDetail.jsx       ← full detail view for a single word
│   │   ├── ProgressBar.jsx      ← visual progress indicator
│   │   └── StatsView.jsx        ← progress/stats dashboard
│   ├── hooks/
│   │   ├── useProgress.js       ← localStorage read/write for card status
│   │   └── useStreak.js         ← streak tracking logic
│   ├── utils/
│   │   └── storage.js           ← localStorage helpers
│   └── styles/
│       └── globals.css          ← Tailwind base + custom CSS variables
└── README.md
```

---

## README.md Content

Include:
- Project name + one-line description
- The core insight (N1 kanji = common Mandarin vocab)
- Screenshot or GIF of the flashcard flip
- Tech stack
- How to run locally (`npm install && npm run dev`)
- Link to live demo
- Data sources / methodology for the frequency ratings
- License (MIT)

This is a portfolio piece, so the README should sell the concept, not just document the code.

---

## Key Implementation Notes

1. **Get the dataset right first.** The 30-word vocab.json is the foundation. Every field matters — especially `mandarin_freq`, `meaning_shift`, and the example sentences. Don't rush this.

2. **The card flip is the hero interaction.** Invest in making it feel satisfying — good easing, depth, the reveal moment should feel like discovering a secret.

3. **Mobile-first.** Most language learners study on their phone. The card should be thumb-swipeable and the text large enough to read kanji clearly on a small screen.

4. **Meaning shifts are content gold.** When a word like 把握 means "to grasp" in Japanese but "to have confidence" in Chinese — that's a memorable story. Make these prominent, not buried.

5. **The frequency meter is the differentiator.** No other N1 app tells you "this word you're dreading is actually super common in Mandarin." Make it visually prominent and satisfying.
