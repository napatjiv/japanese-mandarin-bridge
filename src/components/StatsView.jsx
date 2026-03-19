import ProgressBar from './ProgressBar'

const freqLabels = {
  5: { label: 'Daily Mandarin', color: 'bg-green-500' },
  4: { label: 'Very Common', color: 'bg-lime-500' },
  3: { label: 'Moderately Common', color: 'bg-yellow-500' },
  2: { label: 'Uncommon', color: 'bg-orange-500' },
  1: { label: 'Rare', color: 'bg-gray-400' },
}

export default function StatsView({ stats, freqStats, streak }) {
  const knownPercent = stats.total > 0 ? Math.round((stats.known / stats.total) * 100) : 0

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* Overview cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <p className="text-3xl font-bold text-gray-900">{stats.known}</p>
          <p className="text-xs text-green-600 font-medium mt-1">Known</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <p className="text-3xl font-bold text-gray-900">{stats.seen}</p>
          <p className="text-xs text-amber-600 font-medium mt-1">Seen</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
          <p className="text-3xl font-bold text-gray-900">{stats.new}</p>
          <p className="text-xs text-gray-500 font-medium mt-1">New</p>
        </div>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Overall Progress</h3>
          <span className="text-2xl font-bold text-cn-600">{knownPercent}%</span>
        </div>
        <ProgressBar value={stats.known} max={stats.total} size="lg" />
        <p className="text-xs text-gray-400 mt-2">
          {stats.known} of {stats.total} words mastered
        </p>
      </div>

      {/* Streak */}
      <div className="bg-white rounded-xl p-5 border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-jp-100 flex items-center justify-center">
            <span className="text-2xl">&#128293;</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{streak.current} day{streak.current !== 1 ? 's' : ''}</p>
            <p className="text-xs text-gray-500">Current streak</p>
          </div>
        </div>
      </div>

      {/* Breakdown by frequency tier */}
      <div className="bg-white rounded-xl p-5 border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">By Mandarin Frequency</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map(level => {
            const tier = freqStats[level]
            if (!tier || tier.total === 0) return null
            const config = freqLabels[level]
            return (
              <div key={level}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${config.color}`} />
                    <span className="text-xs font-medium text-gray-600">{config.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {tier.known}/{tier.total} known
                  </span>
                </div>
                <ProgressBar
                  value={tier.known}
                  max={tier.total}
                  color={config.color}
                  size="sm"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Tip */}
      <div className="bg-cn-50 rounded-xl p-4 border border-cn-100">
        <p className="text-xs text-cn-700">
          <span className="font-semibold">Tip:</span> Focus on words with Mandarin frequency 4-5 first.
          These are everyday words in Mandarin, so you're learning two languages for almost no extra effort!
        </p>
      </div>
    </div>
  )
}
