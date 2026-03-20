import { useState, useCallback, useEffect } from 'react'
import CardFront from './CardFront'
import CardBack from './CardBack'
import SelfRating from './SelfRating'

export default function FlashCard({ word, cardStatus, onRate, onNext, onPrev, current, total, level }) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Reset flip state when word changes
  useEffect(() => {
    setIsFlipped(false)
  }, [word.id])

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleFlip()
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        onNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        onPrev()
      } else if (e.key === '1') {
        onRate('new')
      } else if (e.key === '2') {
        onRate('seen')
      } else if (e.key === '3') {
        onRate('known')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleFlip, onNext, onPrev, onRate])

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      {/* Progress indicator */}
      <div className="w-full flex items-center justify-between mb-4 px-1">
        <button
          onClick={onPrev}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          aria-label="Previous card"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">
            {current} / {total}
          </span>
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-cn-400 rounded-full transition-all duration-300"
              style={{ width: `${(current / total) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={onNext}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          aria-label="Next card"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Card */}
      <div
        className="flip-card w-full cursor-pointer"
        onClick={handleFlip}
        style={{ minHeight: '480px' }}
      >
        <div className={`flip-card-inner relative w-full h-full ${isFlipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="flip-card-front absolute inset-0 w-full bg-white rounded-2xl shadow-lg border border-gray-100"
               style={{ minHeight: '480px' }}>
            <CardFront word={word} level={level} />
          </div>

          {/* Back */}
          <div className="flip-card-back absolute inset-0 w-full bg-white rounded-2xl shadow-lg border border-gray-100"
               style={{ minHeight: '480px' }}>
            <CardBack word={word} />
          </div>
        </div>
      </div>

      {/* Self rating */}
      <div className="mt-5 w-full flex justify-center">
        <SelfRating
          currentStatus={cardStatus}
          onRate={(status) => {
            onRate(status)
          }}
        />
      </div>

      {/* Keyboard hints */}
      <p className="text-[10px] text-gray-400 mt-3 text-center hidden md:block">
        Space/Enter to flip &middot; Arrow keys to navigate &middot; 1/2/3 to rate
      </p>
    </div>
  )
}
