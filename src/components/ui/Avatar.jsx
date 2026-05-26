export function Avatar({ src, name, size = 'md', className = '' }) {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  }

  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div
      className={`
        rounded-full flex items-center justify-center overflow-hidden
        bg-block-lilac text-ink font-medium flex-shrink-0
        ${sizes[size]}
        ${className}
      `}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}
