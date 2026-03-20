const getStorageKey = (level) => `jmbridge_${level}_progress`
const STREAK_KEY = 'jmbridge_streak'

const defaultState = {
  cards: {},
  settings: { theme: 'light', default_sort: 'freq_desc' },
}

const defaultStreak = { current: 0, last_active: null }

export function loadProgress(level) {
  try {
    const raw = localStorage.getItem(getStorageKey(level))
    if (!raw) return defaultState
    return JSON.parse(raw)
  } catch {
    return defaultState
  }
}

export function saveProgress(level, state) {
  try {
    localStorage.setItem(getStorageKey(level), JSON.stringify(state))
  } catch {
    // localStorage may be full or unavailable
  }
}

export function getCardStatus(level, cardId) {
  const state = loadProgress(level)
  return state.cards[cardId] || { status: 'new', last_seen: null, times_seen: 0 }
}

export function updateCardStatus(level, cardId, status) {
  const state = loadProgress(level)
  const today = new Date().toISOString().split('T')[0]
  const existing = state.cards[cardId] || { status: 'new', last_seen: null, times_seen: 0 }

  state.cards[cardId] = {
    status,
    last_seen: today,
    times_seen: existing.times_seen + 1,
  }

  saveProgress(level, state)
  return state
}

export function getStreak() {
  try {
    const raw = localStorage.getItem(STREAK_KEY)
    if (!raw) return defaultStreak
    return JSON.parse(raw)
  } catch {
    return defaultStreak
  }
}

export function updateStreak() {
  const streak = getStreak()
  const today = new Date().toISOString().split('T')[0]

  if (streak.last_active === today) {
    return streak
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  if (streak.last_active === yesterdayStr) {
    streak.current += 1
  } else {
    streak.current = 1
  }

  streak.last_active = today
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak))
  } catch {}
  return streak
}

export function getSettings(level) {
  const state = loadProgress(level)
  return state.settings
}

export function updateSettings(level, newSettings) {
  const state = loadProgress(level)
  state.settings = { ...state.settings, ...newSettings }
  saveProgress(level, state)
  return state.settings
}

export function migrateFromV1() {
  const oldKey = 'n1bridge_progress'
  const newKey = getStorageKey('n1')
  try {
    const old = localStorage.getItem(oldKey)
    if (old && !localStorage.getItem(newKey)) {
      const parsed = JSON.parse(old)
      // Extract streak to global key
      if (parsed.streak) {
        localStorage.setItem(STREAK_KEY, JSON.stringify(parsed.streak))
      }
      // Save cards and settings to n1 progress
      const { streak, ...rest } = parsed
      localStorage.setItem(newKey, JSON.stringify(rest))
      localStorage.removeItem(oldKey)
    }
  } catch {}
}
