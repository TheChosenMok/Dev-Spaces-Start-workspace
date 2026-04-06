import { type CSSProperties, useEffect, useRef, useState } from 'react'
import {
  Archive,
  Bot,
  FileCode,
  Info,
  LayoutGrid,
  LogOut,
  Settings,
  User,
  type LucideIcon,
} from 'lucide-react'
import { CreateWorkspace } from './components/CreateWorkspace'

const NAV_ITEMS: { label: string; active: boolean; icon: LucideIcon }[] = [
  { label: 'Workspaces', active: true, icon: LayoutGrid },
  { label: 'Agent Space', active: false, icon: Bot },
  { label: 'Devfile Creator', active: false, icon: FileCode },
  { label: 'Backups', active: false, icon: Archive },
]

const navButtonBase: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  width: '100%',
  padding: '10px 12px',
  marginBottom: 2,
  border: 'none',
  borderRadius: 6,
  background: 'transparent',
  color: '#c8c8c8',
  fontSize: 15,
  fontWeight: 400,
  letterSpacing: '-0.01em',
  cursor: 'pointer',
  transition: 'background 150ms ease, color 150ms ease',
}

/** Slightly tighter padding and no extra margin — footer uses flex gap only */
const sidebarFooterButtonBase: CSSProperties = {
  ...navButtonBase,
  marginBottom: 0,
  padding: '8px 12px',
}

export default function App() {
  const [signedIn, setSignedIn] = useState(true)
  const [username] = useState('jane.doe')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (profileWrapRef.current && !profileWrapRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <aside
        className="app-sidebar"
        style={{
          width: 252,
          maxWidth: 252,
          flexGrow: 0,
          flexShrink: 0,
          height: '100%',
          minHeight: 0,
          background: '#0a0a0a',
          borderRight: '1px solid #1f1f1f',
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 0 20px',
          letterSpacing: '-0.02em',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderBottom: '1px solid #1f1f1f',
            marginBottom: 6,
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}icon.png`}
            alt=""
            width={50}
            height={50}
            style={{
              borderRadius: 11,
              flexShrink: 0,
              display: 'block',
              objectFit: 'cover',
            }}
          />
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: '50px',
              height: 50,
              color: '#ffffff',
              letterSpacing: '-0.025em',
            }}
          >
            Dev Spaces
          </span>
        </div>

        <nav
          style={{
            flex: 1,
            minHeight: 0,
            padding: '0 8px',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const NavIcon = item.icon
            return (
              <button
                key={item.label}
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  marginBottom: 2,
                  border: 'none',
                  borderRadius: 6,
                  background: item.active ? '#1f1f1f' : 'transparent',
                  color: item.active ? '#ffffff' : '#c8c8c8',
                  fontSize: 15,
                  fontWeight: item.active ? 500 : 400,
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  transition: 'background 150ms ease, color 150ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!item.active) {
                    e.currentTarget.style.background = '#161616'
                    e.currentTarget.style.color = '#ececec'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#c8c8c8'
                  }
                }}
              >
                <NavIcon size={20} strokeWidth={1.75} aria-hidden />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div
          style={{
            marginTop: 'auto',
            borderTop: '1px solid #1f1f1f',
            padding: '8px 8px 4px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <button
            type="button"
            style={sidebarFooterButtonBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#161616'
              e.currentTarget.style.color = '#ececec'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#c8c8c8'
            }}
          >
            <Settings size={20} strokeWidth={1.75} aria-hidden />
            Settings
          </button>
          <button
            type="button"
            style={sidebarFooterButtonBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#161616'
              e.currentTarget.style.color = '#ececec'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#c8c8c8'
            }}
          >
            <Info size={20} strokeWidth={1.75} aria-hidden />
            About
          </button>

          <div ref={profileWrapRef} style={{ position: 'relative' }}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={profileMenuOpen}
              aria-label={`Account, ${username}`}
              onClick={() => setProfileMenuOpen((o) => !o)}
              style={sidebarFooterButtonBase}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#161616'
                e.currentTarget.style.color = '#ececec'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#c8c8c8'
              }}
              title="Account"
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '2px solid #2a2a2a',
                  background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e8e8e8',
                  flexShrink: 0,
                }}
              >
                <User size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                  fontWeight: 500,
                  color: 'inherit',
                }}
              >
                {username}
              </span>
            </button>

            {profileMenuOpen && (
              <div
                role="menu"
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: 0,
                  marginBottom: 8,
                  minWidth: 176,
                  padding: 4,
                  borderRadius: 8,
                  background: '#141414',
                  border: '1px solid #2a2a2a',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
                  zIndex: 20,
                }}
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setSignedIn(false)
                    setProfileMenuOpen(false)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '10px 12px',
                    border: 'none',
                    borderRadius: 6,
                    background: 'transparent',
                    color: '#e8e8e8',
                    fontSize: 15,
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1f1f1f'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <LogOut size={18} strokeWidth={1.75} aria-hidden />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: 0, minHeight: 0, overflow: 'auto' }}>
        {signedIn ? (
          <CreateWorkspace />
        ) : (
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
              background: '#0f0f0f',
            }}
          >
            <div
              style={{
                maxWidth: 400,
                textAlign: 'center',
                color: '#c8c8c8',
              }}
            >
              <p style={{ margin: '0 0 16px', fontSize: 17, color: '#ececec' }}>You are signed out.</p>
              <button
                type="button"
                onClick={() => setSignedIn(true)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--accent)',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Sign in again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
