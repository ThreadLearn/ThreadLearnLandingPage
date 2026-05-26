import { forwardRef } from 'react'

export const Input = forwardRef(function Input(
  { label, error, hint, className = '', icon, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-ink">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3.5 py-3 rounded-md
            border border-hairline bg-white text-ink
            text-body placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black
            transition-colors
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-semantic-error focus:ring-semantic-error/20 focus:border-semantic-error' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-semantic-error">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  )
})

export const Textarea = forwardRef(function Textarea(
  { label, error, hint, className = '', ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-ink">{label}</label>
      )}
      <textarea
        ref={ref}
        className={`
          w-full px-3.5 py-3 rounded-md
          border border-hairline bg-white text-ink
          text-body placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black
          transition-colors resize-none
          ${error ? 'border-semantic-error' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-semantic-error">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  )
})
