const ratings = [
  { value: 'new', label: 'New to me', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200' },
  { value: 'seen', label: 'Seen it', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200' },
  { value: 'known', label: 'Know it', color: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200' },
]

export default function SelfRating({ currentStatus, onRate }) {
  return (
    <div className="flex items-center gap-2 w-full max-w-sm">
      {ratings.map(({ value, label, color }) => (
        <button
          key={value}
          onClick={() => onRate(value)}
          className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium border transition-all duration-200 ${color} ${
            currentStatus === value
              ? 'ring-2 ring-offset-1 ring-cn-400 scale-[1.02]'
              : ''
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
