import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LEVELS, LEVEL_CONFIG, loadVocab } from '../data'
import { loadProgress } from '../utils/storage'
import { useStreak } from '../hooks/useStreak'
import ProgressBar from './ProgressBar'

const levelColors = {
  green: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700', hover: 'hover:border-green-300' },
  lime: { bg: 'bg-lime-50', border: 'border-lime-200', badge: 'bg-lime-100 text-lime-700', hover: 'hover:border-lime-300' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', hover: 'hover:border-yellow-300' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', hover: 'hover:border-orange-300' },
  red: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700', hover: 'hover:border-red-300' },
}

function LevelCard({ levelKey, config }) {
  const navigate = useNavigate()
  const [known, setKnown] = useState(0)
  const wordCount = config.wordCount
  const hasData = wordCount > 0
  const colors = levelColors[config.color]

  useEffect(() => {
    if (!hasData) return
    loadVocab(levelKey).then(vocab => {
      const progress = loadProgress(levelKey)
      const k = vocab.filter(w => progress.cards[w.id]?.status === 'known').length
      setKnown(k)
    })
  }, [levelKey, hasData])

  return (
    <button
      onClick={() => hasData && navigate(`/${levelKey}`)}
      disabled={!hasData}
      className={`w-full text-left rounded-2xl border p-5 transition-all ${
        hasData
          ? `${colors.bg} ${colors.border} ${colors.hover} hover:shadow-md cursor-pointer active:scale-[0.99]`
          : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-sm font-bold rounded-lg ${hasData ? colors.badge : 'bg-gray-100 text-gray-500'}`}>
            {config.label}
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">{config.subtitle}</p>
            <p className="text-xs text-gray-500">{config.description}</p>
          </div>
        </div>
        <div className="text-right">
          {hasData ? (
            <p className="text-sm font-bold text-gray-700">{wordCount} words</p>
          ) : (
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Coming Soon</span>
          )}
        </div>
      </div>
      {hasData && (
        <ProgressBar value={known} max={wordCount} label={`${known}/${wordCount} learned`} size="sm" />
      )}
    </button>
  )
}

export default function LevelSelect() {
  const { streak } = useStreak()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Japanese <span className="text-cn-500">Mandarin</span> Bridge
          </h1>
          <p className="text-lg text-gray-500 max-w-md mx-auto mb-2">
            Learn Japanese vocabulary through Mandarin Chinese.
          </p>
          <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
            Many JLPT kanji are everyday vocabulary in Mandarin.
            Learn both at once — for almost no extra effort.
          </p>
          {streak.current > 0 && (
            <p className="text-sm text-gray-400 mt-4">
              &#128293; {streak.current} day streak
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {LEVELS.map(levelKey => (
            <LevelCard key={levelKey} levelKey={levelKey} config={LEVEL_CONFIG[levelKey]} />
          ))}
        </div>
      </div>
    </div>
  )
}
