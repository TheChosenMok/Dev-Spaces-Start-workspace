import { useState, useRef } from 'react'
import { ChevronDown, GitBranch } from 'lucide-react'
import { useClickOutside } from '../hooks/useClickOutside'

const MOCK_BRANCHES = ['main', 'develop', 'feature/auth', 'feature/ui-redesign', 'release/v2.0', 'hotfix/login-bug']

interface BranchDropdownProps {
  value: string
  onChange: (val: string) => void
  disabled?: boolean
}

export function BranchDropdown({ value, onChange, disabled }: BranchDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  return (
    <div ref={ref} style={{ position: 'relative', minWidth: 180 }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          height: 38,
          padding: '0 12px',
          fontSize: 14,
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          background: disabled ? '#f5f5f5' : 'var(--surface)',
          color: disabled ? 'var(--text-muted)' : 'var(--text)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
          transition: 'border-color var(--transition)',
        }}
      >
        <GitBranch size={14} />
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value || 'Select branch'}
        </span>
        <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--transition)' }} />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 50,
            maxHeight: 200,
            overflowY: 'auto',
          }}
        >
          {MOCK_BRANCHES.map((b) => (
            <button
              type="button"
              key={b}
              onClick={() => { onChange(b); setOpen(false) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                padding: '8px 12px',
                fontSize: 13,
                border: 'none',
                background: b === value ? 'var(--accent-light)' : 'transparent',
                color: b === value ? 'var(--accent)' : 'var(--text)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background var(--transition)',
              }}
              onMouseEnter={(e) => { if (b !== value) e.currentTarget.style.background = '#f5f5f5' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = b === value ? 'var(--accent-light)' : 'transparent' }}
            >
              <GitBranch size={12} />
              {b}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
