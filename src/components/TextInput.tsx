import { type InputHTMLAttributes } from 'react'

const baseStyle: React.CSSProperties = {
  width: '100%',
  height: 38,
  padding: '0 12px',
  fontSize: 14,
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  background: 'var(--surface)',
  color: 'var(--text)',
  outline: 'none',
  transition: 'border-color var(--transition), box-shadow var(--transition)',
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export function TextInput({ hasError, style, ...props }: TextInputProps) {
  return (
    <input
      {...props}
      style={{
        ...baseStyle,
        ...(hasError ? { borderColor: 'var(--danger)' } : {}),
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = hasError ? 'var(--danger)' : 'var(--border-focus)'
        e.currentTarget.style.boxShadow = `0 0 0 3px ${hasError ? 'rgba(239,68,68,.15)' : 'rgba(37,99,235,.12)'}`
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = hasError ? 'var(--danger)' : 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
        props.onBlur?.(e)
      }}
    />
  )
}
