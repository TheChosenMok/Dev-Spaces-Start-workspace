import type { ReactNode } from 'react'
import { InfoTooltip } from './InfoTooltip'

interface FormFieldProps {
  label: string
  tooltip: string
  children: ReactNode
  htmlFor?: string
}

export function FormField({ label, tooltip, children, htmlFor }: FormFieldProps) {
  return (
    <div style={{ marginBottom: 36 }}>
      <label
        htmlFor={htmlFor}
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--text)',
          marginBottom: 6,
        }}
      >
        {label}
        <InfoTooltip text={tooltip} />
      </label>
      {children}
    </div>
  )
}
