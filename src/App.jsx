import { useState, useCallback } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import FlashCard from './components/FlashCard'
import WordList from './components/WordList'
import WordDetail from './components/WordDetail'
import StatsView from './components/StatsView'
import ProgressBar from './components/ProgressBar'
import { useProgress } from './hooks/useProgress'
import { useStreak } from './hooks/useStreak'
import vocabData from './data/vocab.json'

// -- Landing Page --
function HomePage({ stats, streak }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
        N1 <span className="text-cn-500">Mandarin</span> Bridge
      </h1>
      <p className="text-lg text-gray-500 max-w-md mb-8">
        N1 is hard. Mandarin makes it easy.
      </p>
      <p className="text-sm text-gray-400 max-w-sm mb-10 leading-relaxed">
        Many "rare" JLPT N1 kanji are everyday vocabulary in Mandarin Chinese.
        Learn both at once — for almost no extra effort.
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
        onClick={() => navigate('/review')}
        className="px-8 py-3.5 bg-cn-500 hover:bg-cn-600 text-white font-semibold rounded-xl shadow-lg shadow-cn-200 transition-all hover:scale-[1.02] active:scale-[0.98] text-base"
      >
        Start Review
      </button>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => navigate('/browse')}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Browse Words
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => navigate('/stats')}
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
function ReviewPage({ getCardStatus, updateCardStatus, recordActivity }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionWords] = useState(() => {
    // Sort by frequency desc, prioritize unlearned
    return [...vocabData].sort((a, b) => b.mandarin_freq - a.mandarin_freq)
  })

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
      />
    </div>
  )
}

// -- Browse Page --
function BrowsePage({ getCardStatus, updateCardStatus, recordActivity }) {
  const [selectedWord, setSelectedWord] = useState(null)

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
function StatsPage({ stats, freqStats, streak }) {
  return (
    <div className="py-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h2>
      <StatsView stats={stats} freqStats={freqStats} streak={streak} />
    </div>
  )
}

// -- App --
export default function App() {
  const { getCardStatus, updateCardStatus, stats, freqStats } = useProgress()
  const { streak, recordActivity } = useStreak()

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage stats={stats} streak={streak} />} />
        <Route
          path="/review"
          element={
            <ReviewPage
              getCardStatus={getCardStatus}
              updateCardStatus={updateCardStatus}
              recordActivity={recordActivity}
            />
          }
        />
        <Route
          path="/browse"
          element={
            <BrowsePage
              getCardStatus={getCardStatus}
              updateCardStatus={updateCardStatus}
              recordActivity={recordActivity}
            />
          }
        />
        <Route
          path="/stats"
          element={<StatsPage stats={stats} freqStats={freqStats} streak={streak} />}
        />
      </Routes>
    </Layout>
  )
}
