import { CreateWorkspace } from './components/CreateWorkspace'

const NAV_ITEMS = [
  { label: 'Workspaces', active: true },
  { label: 'Templates', active: false },
  { label: 'Secrets', active: false },
  { label: 'SSH Keys', active: false },
  { label: 'Settings', active: false },
]

export default function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          background: '#0a0a0a',
          borderRight: '1px solid #1f1f1f',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 0',
        }}
      >
        <div
          style={{
            padding: '0 20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderBottom: '1px solid #1f1f1f',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            W
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#ffffff' }}>Dev Spaces</span>
        </div>

        <nav style={{ flex: 1, padding: '0 8px' }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '8px 12px',
                marginBottom: 2,
                border: 'none',
                borderRadius: 6,
                background: item.active ? '#1f1f1f' : 'transparent',
                color: item.active ? '#ffffff' : '#a0a0a0',
                fontSize: 13,
                fontWeight: item.active ? 500 : 400,
                cursor: 'pointer',
                transition: 'background 150ms ease, color 150ms ease',
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = '#161616'
                  e.currentTarget.style.color = '#d0d0d0'
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#a0a0a0'
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <CreateWorkspace />
      </div>
    </div>
  )
}
