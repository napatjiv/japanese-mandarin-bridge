import { useState, useMemo } from 'react'
import FrequencyMeter from './FrequencyMeter'

const categories = [
  { value: 'all', label: 'All' },
  { value: 'emotion', label: 'Emotion' },
  { value: 'social', label: 'Social' },
  { value: 'cognition', label: 'Cognition' },
  { value: 'description', label: 'Description' },
  { value: 'nature', label: 'Nature' },
]

const sortOptions = [
  { value: 'freq_desc', label: 'Mandarin Freq (High)' },
  { value: 'freq_asc', label: 'Mandarin Freq (Low)' },
  { value: 'kanji', label: 'Kanji (A-Z)' },
  { value: 'category', label: 'Category' },
]

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'seen', label: 'Seen' },
  { value: 'known', label: 'Known' },
]

export default function WordList({ words, getCardStatus, onSelectWord }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [freqFilter, setFreqFilter] = useState(0)
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('freq_desc')

  const filtered = useMemo(() => {
    let result = [...words]

    // Search
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(w =>
        w.kanji.includes(search) ||
        w.furigana.includes(search) ||
        w.simplified.includes(search) ||
        w.pinyin.toLowerCase().includes(q) ||
        w.jp_meaning.toLowerCase().includes(q) ||
        w.cn_meaning.toLowerCase().includes(q)
      )
    }

    // Category
    if (category !== 'all') {
      result = result.filter(w => w.category === category)
    }

    // Frequency
    if (freqFilter > 0) {
      result = result.filter(w => w.mandarin_freq >= freqFilter)
    }

    // Status
    if (statusFilter !== 'all') {
      result = result.filter(w => {
        const s = getCardStatus(w.id)
        return s.status === statusFilter
      })
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'freq_desc': return b.mandarin_freq - a.mandarin_freq
        case 'freq_asc': return a.mandarin_freq - b.mandarin_freq
        case 'kanji': return a.kanji.localeCompare(b.kanji, 'ja')
        case 'category': return a.category.localeCompare(b.category)
        default: return 0
      }
    })

    return result
  }, [words, search, category, freqFilter, statusFilter, sortBy, getCardStatus])

  const freqColors = {
    5: 'bg-green-100 text-green-700',
    4: 'bg-lime-100 text-lime-700',
    3: 'bg-yellow-100 text-yellow-700',
    2: 'bg-orange-100 text-orange-700',
    1: 'bg-gray-100 text-gray-600',
  }

  const statusBadge = {
    new: 'bg-gray-100 text-gray-600',
    seen: 'bg-amber-100 text-amber-700',
    known: 'bg-green-100 text-green-700',
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search kanji, reading, pinyin, or meaning..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cn-400 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                category === c.value
                  ? 'bg-cn-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Freq filter */}
        <select
          value={freqFilter}
          onChange={e => setFreqFilter(Number(e.target.value))}
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-white"
        >
          <option value={0}>All frequencies</option>
          <option value={5}>5 only</option>
          <option value={4}>4+</option>
          <option value={3}>3+</option>
        </select>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-white"
        >
          {statusFilters.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-white"
        >
          {sortOptions.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <span className="text-xs text-gray-400 ml-auto">
          {filtered.length} words
        </span>
      </div>

      {/* Word list */}
      <div className="space-y-2">
        {filtered.map(word => {
          const status = getCardStatus(word.id)
          return (
            <button
              key={word.id}
              onClick={() => onSelectWord(word)}
              className="w-full text-left p-4 bg-white rounded-xl border border-gray-100 hover:border-cn-200 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-4">
                {/* Kanji */}
                <span className="kanji-display text-3xl font-bold text-gray-900 w-20 text-center flex-shrink-0 group-hover:text-cn-600 transition-colors">
                  {word.kanji}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm text-jp-500 font-jp">{word.furigana}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm text-cn-500">{word.pinyin}</span>
                  </div>
                  <p className="text-sm text-gray-700 truncate">{word.jp_meaning}</p>
                  {word.meaning_shift && (
                    <p className="text-[10px] text-amber-600 mt-0.5">Meaning shift</p>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${freqColors[word.mandarin_freq]}`}>
                    CN {word.mandarin_freq}/5
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-cn-50 text-cn-600">
                    {word.hsk_level ? `HSK ${word.hsk_level}` : 'HSK 6+'}
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusBadge[status.status]}`}>
                    {status.status}
                  </span>
                </div>
              </div>
            </button>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg mb-1">No words found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
