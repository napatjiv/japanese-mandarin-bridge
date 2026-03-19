import FrequencyMeter from './FrequencyMeter'

export default function CardBack({ word }) {
  return (
    <div className="flex flex-col items-center h-full px-6 py-6 overflow-y-auto">
      {/* Kanji continuity */}
      <h2 className="kanji-cn text-4xl md:text-5xl font-bold text-gray-900 mb-2 select-none">
        {word.kanji}
      </h2>

      {/* Chinese forms */}
      <div className="flex items-center gap-3 mb-1">
        {word.simplified !== word.kanji && (
          <div className="text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Simplified</span>
            <span className="kanji-cn text-2xl font-semibold text-cn-600">{word.simplified}</span>
          </div>
        )}
        {word.traditional !== word.kanji && word.traditional !== word.simplified && (
          <div className="text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide block">Traditional</span>
            <span className="kanji-cn text-2xl font-semibold text-cn-600">{word.traditional}</span>
          </div>
        )}
      </div>

      {/* Same character badge */}
      {word.same_as_japanese && (
        <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-green-100 text-green-700 rounded-full mb-3">
          Same character!
        </span>
      )}

      {/* Pinyin */}
      <p className="text-lg text-cn-500 font-semibold mb-1">
        {word.pinyin}
      </p>

      {/* Mandarin meaning */}
      <p className="text-lg text-gray-700 font-medium text-center mb-4">
        {word.cn_meaning}
      </p>

      {/* Meaning shift alert */}
      {word.meaning_shift && (
        <div className="w-full max-w-sm bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 text-base flex-shrink-0 mt-0.5">&#x26A0;</span>
            <div>
              <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-0.5">
                Meaning Shift
              </p>
              <p className="text-sm text-amber-700">{word.meaning_shift_note}</p>
            </div>
          </div>
        </div>
      )}

      {/* Example sentence */}
      <div className="w-full max-w-sm bg-cn-50 rounded-xl p-4 border border-cn-100 mb-4">
        <p className="text-base font-sc text-gray-800 mb-1">
          {word.cn_example}
        </p>
        <p className="text-sm text-cn-500 mb-1">
          {word.cn_example_pinyin}
        </p>
        <p className="text-sm text-gray-600 italic">
          {word.cn_example_meaning}
        </p>
      </div>

      {/* HSK level + Frequency meter */}
      <div className="w-full max-w-sm space-y-3">
        <div className="flex items-center gap-2">
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
    </div>
  )
}
