import { useState, useEffect } from 'react'
import { useParams, Outlet, Navigate } from 'react-router-dom'
import Layout from './Layout'
import { useProgress } from '../hooks/useProgress'
import { useStreak } from '../hooks/useStreak'
import { loadVocab, LEVELS } from '../data'

export default function LevelLayout() {
  const { level } = useParams()
  const [vocabData, setVocabData] = useState(null)

  useEffect(() => {
    let cancelled = false
    setVocabData(null)
    loadVocab(level).then(data => {
      if (!cancelled) setVocabData(data)
    })
    return () => { cancelled = true }
  }, [level])

  if (!LEVELS.includes(level)) {
    return <Navigate to="/" replace />
  }

  const { getCardStatus, updateCardStatus, stats, freqStats } = useProgress(level, vocabData)
  const { streak, recordActivity } = useStreak()

  if (vocabData === null) {
    return (
      <Layout level={level}>
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-gray-400 text-lg">Loading...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout level={level}>
      <Outlet context={{ level, vocabData, getCardStatus, updateCardStatus, stats, freqStats, streak, recordActivity }} />
    </Layout>
  )
}
