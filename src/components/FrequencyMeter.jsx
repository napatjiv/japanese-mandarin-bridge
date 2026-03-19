const freqColors = {
  5: { bar: 'bg-green-500', text: 'text-green-700', label: 'Daily Mandarin' },
  4: { bar: 'bg-lime-500', text: 'text-lime-700', label: 'Very Common' },
  3: { bar: 'bg-yellow-500', text: 'text-yellow-700', label: 'Moderately Common' },
  2: { bar: 'bg-orange-500', text: 'text-orange-700', label: 'Uncommon' },
  1: { bar: 'bg-gray-400', text: 'text-gray-600', label: 'Rare' },
}

export default function FrequencyMeter({ score, note }) {
  const config = freqColors[score] || freqColors[1]
  const percentage = (score / 5) * 100

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Mandarin Usefulness
        </span>
        <span className={`text-xs font-semibold ${config.text}`}>
          {config.label}
        </span>
      </div>

      {/* Dot meter */}
      <div className="flex items-center gap-1.5 mb-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-3 flex-1 rounded-full transition-all duration-500 ${
              level <= score ? config.bar : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Bar meter */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`freq-bar h-full rounded-full ${config.bar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {note && (
        <p className="text-xs text-gray-500 mt-1.5 italic">{note}</p>
      )}
    </div>
  )
}
