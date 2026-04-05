import { useState, useRef } from 'react'
import { Info } from 'lucide-react'

interface InfoTooltipProps {
  text: string
}

export function InfoTooltip({ text }: InfoTooltipProps) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<'above' | 'below'>('above')
  const iconRef = useRef<HTMLSpanElement>(null)

  function handleMouseEnter() {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect()
      setPosition(rect.top < 120 ? 'below' : 'above')
    }
    setVisible(true)
  }

  return (
    <span
      ref={iconRef}
      className="info-tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: 6,
        cursor: 'help',
      }}
    >
      <Info size={15} color="var(--text-muted)" />
      {visible && (
        <span
          style={{
            position: 'absolute',
            left: '50%',
            ...(position === 'above'
              ? { bottom: 'calc(100% + 8px)' }
              : { top: 'calc(100% + 8px)' }),
            transform: 'translateX(-50%)',
            background: 'var(--text)',
            color: '#fff',
            fontSize: 13,
            lineHeight: 1.4,
            padding: '6px 10px',
            borderRadius: 6,
            whiteSpace: 'normal',
            width: 240,
            zIndex: 100,
            boxShadow: 'var(--shadow-lg)',
            pointerEvents: 'none',
          }}
        >
          {text}
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              ...(position === 'above'
                ? { top: '100%', borderTop: '5px solid var(--text)', borderLeft: '5px solid transparent', borderRight: '5px solid transparent' }
                : { bottom: '100%', borderBottom: '5px solid var(--text)', borderLeft: '5px solid transparent', borderRight: '5px solid transparent' }),
              width: 0,
              height: 0,
            }}
          />
        </span>
      )}
    </span>
  )
}
