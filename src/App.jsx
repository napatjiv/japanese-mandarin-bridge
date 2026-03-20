import { useState, useCallback } from 'react'
import { Routes, Route, useNavigate, useOutletContext, Navigate } from 'react-router-dom'
import LevelSelect from './components/LevelSelect'
import LevelLayout from './components/LevelLayout'
import FlashCard from './components/FlashCard'
import WordList from './components/WordList'
import WordDetail from './components/WordDetail'
import StatsView from './components/StatsView'
import ProgressBar from './components/ProgressBar'
import { LEVEL_CONFIG } from './data'

// -- Level Home Page --
function LevelHomePage() {
  const navigate = useNavigate()
  const { level, vocabData, stats, streak } = useOutletContext()
  const config = LEVEL_CONFIG[level]

  if (vocabData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {config.label} <span className="text-cn-500">Mandarin</span> Bridge
        </h1>
        <p className="text-lg text-gray-500 mb-6">Coming Soon</p>
        <p className="text-sm text-gray-400 max-w-sm mb-8">
          Vocabulary for JLPT {config.label} is being prepared. Check back later!
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors"
        >
          Back to Levels
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
        {config.label} <span className="text-cn-500">Mandarin</span> Bridge
      </h1>
      <p className="text-lg text-gray-500 max-w-md mb-8">
        {config.description} — bridged through Mandarin.
      </p>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">In Library</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <p className="text-2xl font-bold text-green-600">{stats.known}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">Learned</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <p className="text-2xl font-bold text-amber-500">{stats.seen + stats.new}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">In Review</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-8">
        <ProgressBar value={stats.known} max={stats.total} label="Mastery" size="md" />
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate(`/${level}/review`)}
        className="px-8 py-3.5 bg-cn-500 hover:bg-cn-600 text-white font-semibold rounded-xl shadow-lg shadow-cn-200 transition-all hover:scale-[1.02] active:scale-[0.98] text-base"
      >
        Start Review
      </button>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => navigate(`/${level}/browse`)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Browse Words
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => navigate(`/${level}/stats`)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          View Stats
        </button>
      </div>

      {streak.current > 0 && (
        <p className="text-xs text-gray-400 mt-6">
          &#128293; {streak.current} day streak
        </p>
      )}
    </div>
  )
}

// -- Review Page --
function ReviewPage() {
  const { level, vocabData, getCardStatus, updateCardStatus, recordActivity } = useOutletContext()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionWords] = useState(() => {
    return [...vocabData].sort((a, b) => b.mandarin_freq - a.mandarin_freq)
  })

  if (sessionWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <p className="text-lg text-gray-500">No words available yet for this level.</p>
      </div>
    )
  }

  const word = sessionWords[currentIndex]
  const status = getCardStatus(word.id)

  const handleRate = useCallback((rating) => {
    updateCardStatus(word.id, rating)
    recordActivity()
  }, [word.id, updateCardStatus, recordActivity])

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, sessionWords.length - 1))
  }, [sessionWords.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }, [])

  return (
    <div className="py-4">
      <FlashCard
        word={word}
        cardStatus={status.status}
        onRate={handleRate}
        onNext={handleNext}
        onPrev={handlePrev}
        current={currentIndex + 1}
        total={sessionWords.length}
        level={level}
      />
    </div>
  )
}

// -- Browse Page --
function BrowsePage() {
  const { level, vocabData, getCardStatus, updateCardStatus, recordActivity } = useOutletContext()
  const [selectedWord, setSelectedWord] = useState(null)

  if (vocabData.length === 0) {
    return (
      <div className="py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Words</h2>
        <p className="text-gray-500">No words available yet for this level.</p>
      </div>
    )
  }

  if (selectedWord) {
    const status = getCardStatus(selectedWord.id)
    return (
      <div className="py-4">
        <WordDetail
          word={selectedWord}
          cardStatus={status.status}
          onRate={(rating) => {
            updateCardStatus(selectedWord.id, rating)
            recordActivity()
          }}
          onClose={() => setSelectedWord(null)}
          level={level}
        />
      </div>
    )
  }

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Words</h2>
      <WordList
        words={vocabData}
        getCardStatus={getCardStatus}
        onSelectWord={setSelectedWord}
      />
    </div>
  )
}

// -- Stats Page --
function StatsPage() {
  const { stats, freqStats, streak } = useOutletContext()

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h2>
      <StatsView stats={stats} freqStats={freqStats} streak={streak} />
    </div>
  )
}

// -- App --
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LevelSelect />} />
      <Route path="/:level" element={<LevelLayout />}>
        <Route index element={<LevelHomePage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="browse" element={<BrowsePage />} />
        <Route path="stats" element={<StatsPage />} />
      </Route>
    </Routes>
  )
}
