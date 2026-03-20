import { useParams, Outlet, Navigate } from 'react-router-dom'
import Layout from './Layout'
import { useProgress } from '../hooks/useProgress'
import { useStreak } from '../hooks/useStreak'
import { getVocab, LEVELS } from '../data'

export default function LevelLayout() {
  const { level } = useParams()

  if (!LEVELS.includes(level)) {
    return <Navigate to="/" replace />
  }

  const vocabData = getVocab(level)
  const { getCardStatus, updateCardStatus, stats, freqStats } = useProgress(level)
  const { streak, recordActivity } = useStreak()

  return (
    <Layout level={level}>
      <Outlet context={{ level, vocabData, getCardStatus, updateCardStatus, stats, freqStats, streak, recordActivity }} />
    </Layout>
  )
}
