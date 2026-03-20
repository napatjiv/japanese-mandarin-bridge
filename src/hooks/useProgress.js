import { useState, useCallback } from 'react'
import { loadProgress, updateCardStatus as storageUpdateCard, saveProgress } from '../utils/storage'
import { getVocab } from '../data'

export function useProgress(level) {
  const [state, setState] = useState(() => loadProgress(level))
  const vocabData = getVocab(level)

  const getCardStatus = useCallback((cardId) => {
    return state.cards[cardId] || { status: 'new', last_seen: null, times_seen: 0 }
  }, [state.cards])

  const updateCardStatus = useCallback((cardId, status) => {
    const newState = storageUpdateCard(level, cardId, status)
    setState(newState)
  }, [level])

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
    const fresh = { cards: {}, settings: state.settings }
    saveProgress(level, fresh)
    setState(fresh)
  }, [level, state.settings])

  return { state, getCardStatus, updateCardStatus, stats, freqStats, resetProgress }
}
