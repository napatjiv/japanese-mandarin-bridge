import { useState, useCallback } from 'react'
import { loadProgress, updateCardStatus as storageUpdateCard, saveProgress } from '../utils/storage'
import vocabData from '../data/vocab.json'

export function useProgress() {
  const [state, setState] = useState(() => loadProgress())

  const getCardStatus = useCallback((cardId) => {
    return state.cards[cardId] || { status: 'new', last_seen: null, times_seen: 0 }
  }, [state.cards])

  const updateCardStatus = useCallback((cardId, status) => {
    const newState = storageUpdateCard(cardId, status)
    setState(newState)
  }, [])

  const stats = {
    total: vocabData.length,
    new: vocabData.filter(w => (state.cards[w.id]?.status || 'new') === 'new').length,
    seen: vocabData.filter(w => state.cards[w.id]?.status === 'seen').length,
    known: vocabData.filter(w => state.cards[w.id]?.status === 'known').length,
  }

  const freqStats = {
    5: { total: 0, known: 0, seen: 0 },
    4: { total: 0, known: 0, seen: 0 },
    3: { total: 0, known: 0, seen: 0 },
    2: { total: 0, known: 0, seen: 0 },
    1: { total: 0, known: 0, seen: 0 },
  }

  vocabData.forEach(w => {
    const tier = freqStats[w.mandarin_freq]
    if (tier) {
      tier.total++
      const cardStatus = state.cards[w.id]?.status || 'new'
      if (cardStatus === 'known') tier.known++
      if (cardStatus === 'seen') tier.seen++
    }
  })

  const resetProgress = useCallback(() => {
    const fresh = { cards: {}, streak: state.streak, settings: state.settings }
    saveProgress(fresh)
    setState(fresh)
  }, [state.streak, state.settings])

  return { state, getCardStatus, updateCardStatus, stats, freqStats, resetProgress }
}
