import FrequencyMeter from './FrequencyMeter'
import SelfRating from './SelfRating'

export default function WordDetail({ word, cardStatus, onRate, onClose }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Back button */}
      <button
        onClick={onClose}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to list
      </button>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Japanese side */}
        <div className="bg-gradient-to-b from-jp-50 to-white p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-jp-100 text-jp-600 rounded-full">
              JLPT N1
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest bg-gray-100 text-gray-600 rounded-full">
              {word.category}
            </span>
          </div>

          <h1 className="kanji-display text-5xl font-bold text-gray-900 mb-2 text-center">
            {word.kanji}
          </h1>
          <p className="text-lg text-jp-500 font-medium font-jp text-center mb-2">
            {word.furigana}
          </p>
          <p className="text-lg text-gray-700 font-medium text-center mb-4">
            {word.jp_meaning}
          </p>

          <div className="bg-white rounded-xl p-4 border border-jp-100">
            <p className="text-base font-jp text-gray-800 mb-1">{word.jp_example}</p>
            <p className="text-sm text-gray-500 font-jp mb-1">{word.jp_example_reading}</p>
            <p className="text-sm text-gray-600 italic">{word.jp_example_meaning}</p>
          </div>
        </div>

        {/* Mandarin side */}
        <div className="bg-gradient-to-b from-cn-50 to-white p-6">
          <div className="flex items-center justify-center gap-4 mb-3">
            {word.simplified !== word.kanji && (
              <div className="text-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Simplified</span>
                <span className="kanji-cn text-3xl font-semibold text-cn-600">{word.simplified}</span>
              </div>
            )}
            {word.traditional !== word.kanji && word.traditional !== word.simplified && (
              <div className="text-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Traditional</span>
                <span className="kanji-cn text-3xl font-semibold text-cn-600">{word.traditional}</span>
              </div>
            )}
          </div>

          {word.same_as_japanese && (
            <div className="text-center mb-3">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest bg-green-100 text-green-700 rounded-full">
                Same character!
              </span>
            </div>
          )}

          <p className="text-lg text-cn-500 font-semibold text-center mb-1">{word.pinyin}</p>
          <p className="text-lg text-gray-700 font-medium text-center mb-4">{word.cn_meaning}</p>

          {word.meaning_shift && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-amber-500 text-base flex-shrink-0 mt-0.5">&#x26A0;</span>
                <div>
                  <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-0.5">Meaning Shift</p>
                  <p className="text-sm text-amber-700">{word.meaning_shift_note}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl p-4 border border-cn-100 mb-4">
            <p className="text-base font-sc text-gray-800 mb-1">{word.cn_example}</p>
            <p className="text-sm text-cn-500 mb-1">{word.cn_example_pinyin}</p>
            <p className="text-sm text-gray-600 italic">{word.cn_example_meaning}</p>
          </div>

          <div className="flex items-center gap-2 mb-3">
            {word.hsk_level ? (
              <span className="px-2.5 py-1 text-xs font-bold bg-cn-100 text-cn-600 rounded-lg">
                HSK {word.hsk_level}
              </span>
            ) : (
              <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-lg">
                Beyond HSK 6
              </span>
            )}
            {word.hsk_note && (
              <span className="text-[10px] text-gray-400 flex-1">{word.hsk_note}</span>
            )}
          </div>

          <FrequencyMeter score={word.mandarin_freq} note={word.freq_note} />
        </div>

        {/* Rating */}
        <div className="p-4 border-t border-gray-100 flex justify-center">
          <SelfRating currentStatus={cardStatus} onRate={onRate} />
        </div>
      </div>
    </div>
  )
}
