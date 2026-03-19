const STORAGE_KEY = 'n1bridge_progress'

const defaultState = {
  cards: {},
  streak: { current: 0, last_active: null },
  settings: { theme: 'light', default_sort: 'freq_desc' },
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return JSON.parse(raw)
  } catch {
    return defaultState
  }
}

export function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage may be full or unavailable
  }
}

export function getCardStatus(cardId) {
  const state = loadProgress()
  return state.cards[cardId] || { status: 'new', last_seen: null, times_seen: 0 }
}

export function updateCardStatus(cardId, status) {
  const state = loadProgress()
  const today = new Date().toISOString().split('T')[0]
  const existing = state.cards[cardId] || { status: 'new', last_seen: null, times_seen: 0 }

  state.cards[cardId] = {
    status,
    last_seen: today,
    times_seen: existing.times_seen + 1,
  }

  saveProgress(state)
  return state
}

export function getStreak() {
  const state = loadProgress()
  return state.streak
}

export function updateStreak() {
  const state = loadProgress()
  const today = new Date().toISOString().split('T')[0]
  const lastActive = state.streak.last_active

  if (lastActive === today) {
    return state.streak
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  if (lastActive === yesterdayStr) {
    state.streak.current += 1
  } else {
    state.streak.current = 1
  }

  state.streak.last_active = today
  saveProgress(state)
  return state.streak
}

export function getSettings() {
  const state = loadProgress()
  return state.settings
}

export function updateSettings(newSettings) {
  const state = loadProgress()
  state.settings = { ...state.settings, ...newSettings }
  saveProgress(state)
  return state.settings
}
