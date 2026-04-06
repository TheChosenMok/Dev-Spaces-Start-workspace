import { useState, useRef, useEffect, useId, type KeyboardEvent } from 'react'
import { ChevronDown, Check, Monitor, Settings2 } from 'lucide-react'
import { useClickOutside } from '../hooks/useClickOutside'
import { CustomEditorModal } from './CustomEditorModal'
import { BrandIcon, hasBrandIcon } from './BrandIcons'

const JETBRAINS_IDS = new Set(['intellij', 'goland', 'pycharm', 'webstorm'])

const EDITORS = [
  { id: 'vscode-oss', label: 'Visual Studio Code - Open Source (Web)', isDefault: true },
  { id: 'vscode', label: 'Visual Studio Code - Desktop (SSH)' },
  { id: 'intellij', label: 'IntelliJ IDEA Ultimate' },
  { id: 'goland', label: 'GoLand' },
  { id: 'pycharm', label: 'PyCharm Professional' },
  { id: 'webstorm', label: 'WebStorm' },
  { id: 'custom', label: 'Custom Editor', isCustom: true as const },
]

interface EditorDropdownProps {
  value: string
  onChange: (val: string) => void
}

export function EditorDropdown({ value, onChange }: EditorDropdownProps) {
  const listId = useId()
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [showCustomModal, setShowCustomModal] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  useClickOutside(ref, () => setOpen(false))

  const selected = EDITORS.find((e) => e.id === value)

  useEffect(() => {
    if (open) {
      const idx = EDITORS.findIndex((x) => x.id === value)
      setFocusedIndex(idx >= 0 ? idx : 0)
    }
  }, [open, value])

  function handleSelect(id: string) {
    if (id === 'custom') {
      setShowCustomModal(true)
    } else {
      onChange(id)
    }
    setOpen(false)
    triggerRef.current?.focus()
  }

  function handleContainerKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
        break
      case 'ArrowDown': {
        e.preventDefault()
        setFocusedIndex((i) => Math.min(i + 1, EDITORS.length - 1))
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        setFocusedIndex((i) => Math.max(i - 1, 0))
        break
      }
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(EDITORS.length - 1)
        break
      case 'Enter':
      case ' ': {
        e.preventDefault()
        const id = EDITORS[focusedIndex]?.id
        if (id) handleSelect(id)
        break
      }
      default:
        break
    }
  }

  const displayLabel = selected ? selected.label : 'Select editor'
  const showDefaultOnTrigger =
    Boolean(selected && 'isDefault' in selected && selected.isDefault) && !open

  return (
    <>
      <div ref={ref} style={{ position: 'relative' }} onKeyDown={handleContainerKeyDown}>
        <button
          ref={triggerRef}
          type="button"
          id={`${listId}-trigger`}
          className="editor-dropdown-trigger"
          data-open={open}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          onClick={() => setOpen(!open)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            minHeight: 42,
            padding: '0 12px',
            fontSize: 15,
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            background: 'var(--surface)',
            color: 'var(--text)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'border-color var(--transition), box-shadow var(--transition)',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: 6,
              background: 'var(--surface-muted)',
              flexShrink: 0,
            }}
          >
            {selected?.id === 'custom' ? (
              <Settings2 size={16} color="var(--accent)" strokeWidth={2} />
            ) : selected && hasBrandIcon(selected.id) ? (
              <BrandIcon id={selected.id} size={18} />
            ) : (
              <Monitor size={16} color="var(--text-secondary)" strokeWidth={2} />
            )}
          </span>
          <span
            style={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 500,
            }}
          >
            {displayLabel}
          </span>
          {showDefaultOnTrigger && (
            <span
              style={{
                flexShrink: 0,
                marginLeft: 'auto',
                padding: '2px 8px',
                fontSize: 11,
                fontWeight: 500,
                borderRadius: 999,
                background: 'rgba(37, 99, 235, 0.1)',
                color: 'var(--accent)',
              }}
            >
              default
            </span>
          )}
          <ChevronDown
            size={16}
            color="var(--text-muted)"
            strokeWidth={2}
            style={{
              flexShrink: 0,
              transform: open ? 'rotate(180deg)' : 'none',
              transition: 'transform var(--transition)',
            }}
            aria-hidden
          />
        </button>

        {open && (
          <div
            id={listId}
            role="listbox"
            aria-labelledby={`${listId}-trigger`}
            className="editor-dropdown-panel"
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 50,
              maxHeight: 280,
              overflowY: 'auto',
            }}
          >
            {EDITORS.map((e, index) => {
              const isSelected = e.id === value
              const isHighlighted = index === focusedIndex
              const rowBg = isSelected
                ? 'var(--accent-light)'
                : isHighlighted
                  ? 'var(--surface-hover)'
                  : 'transparent'

              return (
                <button
                  key={e.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  data-selected={isSelected}
                  className="editor-dropdown-option"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    width: '100%',
                    padding: '10px 10px',
                    fontSize: 14,
                    lineHeight: 1.35,
                    border: 'none',
                    background: rowBg,
                    color: isSelected ? 'var(--accent)' : 'var(--text)',
                    fontWeight: isSelected ? 600 : 400,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background var(--transition)',
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onClick={() => handleSelect(e.id)}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      marginTop: 1,
                      borderRadius: 6,
                      background: isSelected ? 'rgba(37, 99, 235, 0.12)' : 'var(--surface-muted)',
                      flexShrink: 0,
                    }}
                  >
                    {e.isCustom ? (
                      <Settings2 size={16} color="var(--accent)" strokeWidth={2} />
                    ) : hasBrandIcon(e.id) ? (
                      <BrandIcon id={e.id} size={18} />
                    ) : (
                      <Monitor size={15} color="var(--text-secondary)" strokeWidth={2} />
                    )}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block' }}>{e.label}</span>
                    {e.isDefault && (
                      <span
                        style={{
                          display: 'inline-block',
                          marginTop: 4,
                          padding: '2px 8px',
                          fontSize: 11,
                          fontWeight: 500,
                          borderRadius: 999,
                          background: 'rgba(37, 99, 235, 0.1)',
                          color: 'var(--accent)',
                        }}
                      >
                        default
                      </span>
                    )}
                    {JETBRAINS_IDS.has(e.id) && (
                      <span
                        style={{
                          display: 'block',
                          marginTop: 2,
                          fontSize: 11,
                          fontWeight: 400,
                          color: 'var(--text-muted)',
                        }}
                      >
                        Provided by JetBrains under{' '}
                        <a
                          href="https://www.jetbrains.com/legal/docs/toolbox/user/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(ev) => ev.stopPropagation()}
                          style={{
                            color: 'var(--accent)',
                            textDecoration: 'underline',
                          }}
                        >
                          License
                        </a>
                      </span>
                    )}
                    {e.id === 'vscode' && (
                      <span
                        style={{
                          display: 'block',
                          marginTop: 2,
                          fontSize: 11,
                          fontWeight: 400,
                          color: 'var(--text-muted)',
                        }}
                      >
                        Provided by Microsoft under{' '}
                        <a
                          href="https://code.visualstudio.com/License"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(ev) => ev.stopPropagation()}
                          style={{
                            color: 'var(--accent)',
                            textDecoration: 'underline',
                          }}
                        >
                          License
                        </a>
                      </span>
                    )}
                  </span>
                  {isSelected ? (
                    <Check
                      size={18}
                      strokeWidth={2.5}
                      color="var(--accent)"
                      style={{ flexShrink: 0, marginTop: 2 }}
                      aria-hidden
                    />
                  ) : (
                    <span style={{ width: 18, flexShrink: 0 }} aria-hidden />
                  )}
                </button>
              )
            })}
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
