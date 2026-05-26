const variants = {
  default: 'bg-surface-soft text-ink',
  lime: 'bg-block-lime text-ink',
  lilac: 'bg-block-lilac text-ink',
  mint: 'bg-block-mint text-ink',
  coral: 'bg-block-coral text-ink',
  pink: 'bg-block-pink text-ink',
  cream: 'bg-block-cream text-ink',
  navy: 'bg-block-navy text-white',
  black: 'bg-black text-white',
  success: 'bg-semantic-success/10 text-semantic-success',
  error: 'bg-semantic-error/10 text-semantic-error',
  warning: 'bg-semantic-warning/10 text-semantic-warning',
  premium: 'bg-block-lilac text-ink',
  free: 'bg-block-lime text-ink',
}

export function Badge({ variant = 'default', children, className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-1
        rounded-sm text-xs font-medium font-caption tracking-wide uppercase
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
