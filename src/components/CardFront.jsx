export default function CardFront({ word }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-8">
      {/* JLPT tag */}
      <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-jp-100 text-jp-600 rounded-full mb-6">
        JLPT N1
      </span>

      {/* Kanji display */}
      <h1 className="kanji-display text-6xl md:text-7xl font-bold text-gray-900 mb-3 select-none">
        {word.kanji}
      </h1>

      {/* Furigana */}
      <p className="text-lg text-jp-500 font-medium font-jp mb-6">
        {word.furigana}
      </p>

      {/* English meaning */}
      <p className="text-xl text-gray-700 font-medium text-center mb-8">
        {word.jp_meaning}
      </p>

      {/* Example sentence */}
      <div className="w-full max-w-sm bg-jp-50 rounded-xl p-4 border border-jp-100">
        <p className="text-base font-jp text-gray-800 mb-1">
          {word.jp_example}
        </p>
        <p className="text-sm text-gray-500 font-jp mb-1">
          {word.jp_example_reading}
        </p>
        <p className="text-sm text-gray-600 italic">
          {word.jp_example_meaning}
        </p>
      </div>

      {/* Tap hint */}
      <p className="text-xs text-gray-400 mt-6 animate-pulse">
        Tap to reveal Mandarin side
      </p>
    </div>
  )
}
