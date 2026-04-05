import { useState, useRef } from 'react'
import { ChevronDown, Monitor } from 'lucide-react'
import { useClickOutside } from '../hooks/useClickOutside'
import { CustomEditorModal } from './CustomEditorModal'
import { BrandIcon, hasBrandIcon } from './BrandIcons'

const EDITORS = [
  { id: 'vscode-oss', label: 'Microsoft Visual Studio Code - Open Source', isDefault: true },
  { id: 'vscode', label: 'Visual Studio Code' },
  { id: 'intellij', label: 'IntelliJ IDEA Ultimate' },
  { id: 'goland', label: 'GoLand' },
  { id: 'pycharm', label: 'PyCharm Professional' },
  { id: 'webstorm', label: 'WebStorm' },
  { id: 'custom', label: 'Custom Editor' },
]

interface EditorDropdownProps {
  value: string
  onChange: (val: string) => void
}

export function EditorDropdown({ value, onChange }: EditorDropdownProps) {
  const [open, setOpen] = useState(false)
  const [showCustomModal, setShowCustomModal] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  const selected = EDITORS.find((e) => e.id === value)

  function handleSelect(id: string) {
    if (id === 'custom') {
      setShowCustomModal(true)
    } else {
      onChange(id)
    }
    setOpen(false)
  }

  return (
    <>
      <div ref={ref} style={{ position: 'relative' }}>
        <button
          type="button"
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
            background: 'var(--surface)',
            color: 'var(--text)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'border-color var(--transition)',
          }}
        >
          {selected && hasBrandIcon(selected.id) ? <BrandIcon id={selected.id} size={16} /> : <Monitor size={14} />}
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selected?.label ?? 'Select editor'}
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
              maxHeight: 240,
              overflowY: 'auto',
            }}
          >
            {EDITORS.map((e) => (
              <button
                type="button"
                key={e.id}
                onClick={() => handleSelect(e.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '8px 12px',
                  fontSize: 13,
                  border: 'none',
                  borderBottom: e.id === 'custom' ? 'none' : undefined,
                  borderTop: e.id === 'custom' ? '1px solid var(--border)' : 'none',
                  background: e.id === value ? 'var(--accent-light)' : 'transparent',
                  color: e.id === value ? 'var(--accent)' : e.id === 'custom' ? 'var(--accent)' : 'var(--text)',
                  fontWeight: e.id === 'custom' ? 500 : 400,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background var(--transition)',
                }}
                onMouseEnter={(ev) => { if (e.id !== value) ev.currentTarget.style.background = '#f5f5f5' }}
                onMouseLeave={(ev) => { ev.currentTarget.style.background = e.id === value ? 'var(--accent-light)' : 'transparent' }}
              >
                {hasBrandIcon(e.id) ? <BrandIcon id={e.id} size={16} /> : <Monitor size={12} />}
                {e.label}
                {e.isDefault && (
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>default</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {showCustomModal && (
        <CustomEditorModal
          onClose={() => setShowCustomModal(false)}
          onSave={(cfg) => {
            onChange('custom')
            setShowCustomModal(false)
            console.log('Custom editor config:', cfg)
          }}
        />
      )}
    </>
  )
}
