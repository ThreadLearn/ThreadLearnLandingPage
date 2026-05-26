import { forwardRef } from 'react'

const variants = {
  primary: 'bg-black text-white hover:bg-gray-900 active:scale-[0.98]',
  secondary: 'bg-white text-black border border-hairline hover:bg-surface-soft active:scale-[0.98]',
  ghost: 'bg-transparent text-black hover:bg-surface-soft active:scale-[0.98]',
  magenta: 'bg-accent-magenta text-white hover:opacity-90 active:scale-[0.98]',
  danger: 'bg-semantic-error text-white hover:opacity-90 active:scale-[0.98]',
  success: 'bg-semantic-success text-white hover:opacity-90 active:scale-[0.98]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm font-medium',
  md: 'px-5 py-2.5 text-base font-medium',
  lg: 'px-7 py-3 text-lg font-medium',
}

export const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', children, className = '', disabled, loading, icon, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-pill transition-all duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {icon && !loading && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
})
