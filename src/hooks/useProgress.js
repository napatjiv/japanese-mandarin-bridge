import { useState, useCallback, useMemo } from 'react'
import { loadProgress, updateCardStatus as storageUpdateCard, saveProgress } from '../utils/storage'

export function useProgress(level, vocabData) {
  const [state, setState] = useState(() => loadProgress(level))
  const words = vocabData || []

  const getCardStatus = useCallback((cardId) => {
    return state.cards[cardId] || { status: 'new', last_seen: null, times_seen: 0 }
  }, [state.cards])

  const updateCardStatus = useCallback((cardId, status) => {
    const newState = storageUpdateCard(level, cardId, status)
    setState(newState)
  }, [level])

  const stats = useMemo(() => ({
    total: words.length,
    new: words.filter(w => (state.cards[w.id]?.status || 'new') === 'new').length,
    seen: words.filter(w => state.cards[w.id]?.status === 'seen').length,
    known: words.filter(w => state.cards[w.id]?.status === 'known').length,
  }), [words, state.cards])

  const freqStats = useMemo(() => {
    const fs = {
      5: { total: 0, known: 0, seen: 0 },
      4: { total: 0, known: 0, seen: 0 },
      3: { total: 0, known: 0, seen: 0 },
      2: { total: 0, known: 0, seen: 0 },
      1: { total: 0, known: 0, seen: 0 },
    }
    words.forEach(w => {
      const tier = fs[w.mandarin_freq]
      if (tier) {
        tier.total++
        const cardStatus = state.cards[w.id]?.status || 'new'
        if (cardStatus === 'known') tier.known++
        if (cardStatus === 'seen') tier.seen++
      }
    })
    return fs
  }, [words, state.cards])

  const resetProgress = useCallback(() => {
    const fresh = { cards: {}, settings: state.settings }
    saveProgress(level, fresh)
    setState(fresh)
  }, [level, state.settings])

  return { state, getCardStatus, updateCardStatus, stats, freqStats, resetProgress }
}
