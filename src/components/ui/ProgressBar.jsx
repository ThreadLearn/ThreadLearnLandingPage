export function ProgressBar({ value, max = 100, color = 'black', size = 'md', label, showPercent }) {
  const pct = Math.round((value / max) * 100)

  const colors = {
    black: 'bg-black',
    lime: 'bg-block-lime',
    lilac: 'bg-block-lilac',
    mint: 'bg-block-mint',
    coral: 'bg-block-coral',
    success: 'bg-semantic-success',
    magenta: 'bg-accent-magenta',
  }

  const heights = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-ink/70">{label}</span>}
          {showPercent && <span className="text-sm font-medium">{pct}%</span>}
        </div>
      )}
      <div className={`w-full bg-hairline rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} ${colors[color]} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  )
}

export function XPBar({ current, max, level }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
        {level}
      </div>
      <div className="flex-1">
        <ProgressBar value={current} max={max} color="black" size="sm" />
        <div className="text-xs text-ink/60 mt-0.5">{current} / {max} XP</div>
      </div>
    </div>
  )
}
