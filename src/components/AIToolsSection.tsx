import { useState, useRef } from 'react'
import { Plus, Check, X, Sparkles } from 'lucide-react'
import { useClickOutside } from '../hooks/useClickOutside'
import { BrandIcon, hasBrandIcon } from './BrandIcons'

interface AITool {
  id: string
  name: string
  description: string
  authenticated: boolean
}

const AVAILABLE_TOOLS: AITool[] = [
  { id: 'copilot', name: 'GitHub Copilot', description: 'AI-powered code completion', authenticated: true },
  { id: 'codewhisperer', name: 'Amazon CodeWhisperer', description: 'ML-powered code suggestions', authenticated: false },
  { id: 'tabnine', name: 'Tabnine', description: 'AI code assistant', authenticated: true },
  { id: 'cody', name: 'Sourcegraph Cody', description: 'AI coding assistant with context', authenticated: false },
  { id: 'cursor-ai', name: 'Cursor AI', description: 'AI-first code editor features', authenticated: false },
  { id: 'continue', name: 'Continue', description: 'Open-source AI assistant', authenticated: true },
]

interface AIToolsSectionProps {
  selected: string[]
  onChange: (ids: string[]) => void
}

export function AIToolsSection({ selected, onChange }: AIToolsSectionProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  function toggle(id: string) {
    onChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id],
    )
  }

  function remove(id: string) {
    onChange(selected.filter((s) => s !== id))
  }

  const selectedTools = AVAILABLE_TOOLS.filter((t) => selected.includes(t.id))

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        {selectedTools.map((tool) => (
          <span
            key={tool.id}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              height: 30,
              padding: '0 10px',
              fontSize: 13,
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              borderRadius: 6,
              fontWeight: 500,
            }}
          >
            {hasBrandIcon(tool.id) ? <BrandIcon id={tool.id} size={14} /> : <Sparkles size={12} />}
            {tool.name}
            <button
              type="button"
              onClick={() => remove(tool.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: 'none',
                background: 'transparent',
                color: 'var(--accent)',
                cursor: 'pointer',
                padding: 0,
                marginLeft: 2,
              }}
            >
              <X size={13} />
            </button>
          </span>
        ))}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius)',
            background: 'transparent',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'all var(--transition)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = 'var(--accent)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-muted)'
          }}
        >
          <Plus size={16} />
        </button>
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            width: 340,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 50,
            padding: '4px 0',
          }}
        >
          <div style={{ padding: '8px 12px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Available AI Tools
          </div>
          {AVAILABLE_TOOLS.map((tool) => {
            const isSelected = selected.includes(tool.id)
            return (
              <button
                type="button"
                key={tool.id}
                onClick={() => toggle(tool.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: 13,
                  border: 'none',
                  background: isSelected ? 'var(--accent-light)' : 'transparent',
                  color: 'var(--text)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background var(--transition)',
                }}
                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#f5f5f5' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = isSelected ? 'var(--accent-light)' : 'transparent' }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    border: isSelected ? 'none' : '1px solid var(--border)',
                    background: isSelected ? 'var(--accent)' : 'transparent',
                    flexShrink: 0,
                  }}
                >
                  {isSelected && <Check size={13} color="#fff" />}
                </span>
                {hasBrandIcon(tool.id) && <BrandIcon id={tool.id} size={20} />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{tool.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{tool.description}</div>
                </div>
                {tool.authenticated && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 3,
                      fontSize: 11,
                      color: 'var(--success)',
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    <Check size={12} />
                    Authenticated
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
