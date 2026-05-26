export function Card({ children, className = '', hover = false, padding = true }) {
  return (
    <div
      className={`
        bg-white rounded-lg border border-hairline
        ${padding ? 'p-6' : ''}
        ${hover ? 'hover:shadow-elevation-2 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export function ColorBlock({ color = 'lime', children, className = '' }) {
  const colors = {
    lime: 'bg-block-lime',
    lilac: 'bg-block-lilac',
    cream: 'bg-block-cream',
    mint: 'bg-block-mint',
    pink: 'bg-block-pink',
    coral: 'bg-block-coral',
    navy: 'bg-block-navy text-white',
  }
  return (
    <div
      className={`
        rounded-lg p-12
        ${colors[color]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export function StatCard({ label, value, icon, trend, color = 'lime' }) {
  const colors = {
    lime: 'bg-block-lime',
    lilac: 'bg-block-lilac',
    mint: 'bg-block-mint',
    coral: 'bg-block-coral',
    pink: 'bg-block-pink',
  }
  return (
    <div className={`rounded-lg p-5 ${colors[color]}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {trend !== undefined && (
          <span className={`text-xs font-medium ${trend >= 0 ? 'text-semantic-success' : 'text-semantic-error'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-ink">{value}</div>
      <div className="text-sm text-ink/70 mt-1">{label}</div>
    </div>
  )
}
