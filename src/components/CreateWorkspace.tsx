import { useState, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import { FormField } from './FormField'
import { TextInput } from './TextInput'
import { BranchDropdown } from './BranchDropdown'
import { EditorDropdown } from './EditorDropdown'
import { AIToolsSection } from './AIToolsSection'
import { EnvironmentSettings } from './EnvironmentSettings'

const EXISTING_WORKSPACES = [
  'https://github.com/acme/web-app',
  'https://github.com/acme/api-service',
  'https://github.com/acme/infra',
]

export function CreateWorkspace() {
  const [name, setName] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [branch, setBranch] = useState('main')
  const [editor, setEditor] = useState('vscode-oss')
  const [aiTools, setAiTools] = useState<string[]>([])
  const [tempStorage, setTempStorage] = useState(false)
  const [envSettings, setEnvSettings] = useState({
    containerImage: '',
    memoryLimit: '',
    cpuLimit: '',
    devfilePath: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const isDuplicate = repoUrl.trim() !== '' && EXISTING_WORKSPACES.some(
    (ws) => ws.toLowerCase() === repoUrl.trim().toLowerCase(),
  )

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => setSubmitting(false), 2000)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
      >
        <div
          style={{
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>Workspaces</span>
          <button
            type="button"
            className="header-grid-launcher"
            aria-label="Open app grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 9px)',
              gridTemplateRows: 'repeat(3, 9px)',
              gap: 2,
              marginLeft: 'auto',
              padding: 4,
              border: 'none',
              background: 'transparent',
              borderRadius: 6,
            }}
          >
            {Array.from({ length: 9 }, (_, i) => (
              <span
                key={i}
                style={{
                  borderRadius: 2.5,
                  background: '#ced4da',
                  border: '1px solid #ced4da',
                  boxSizing: 'border-box',
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 720, padding: '32px 32px 64px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Create Workspace</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
          Configure and launch a new cloud development environment.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px 0',
              marginBottom: 24,
            }}
          >
            {/* Workspace Name */}
            <FormField
              label="Workspace Name"
              tooltip="A human-readable name for your workspace. This will be used to identify it in the dashboard and CLI."
              htmlFor="workspace-name"
            >
              <TextInput
                id="workspace-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="my-project"
              />
            </FormField>

            {/* Git Repository URL + Branch */}
            <FormField
              label="Git Repository URL"
              tooltip="Enter the HTTPS or SSH URL of your Git repository. Leave blank to provision an empty workspace using the default Universal Developer Image."
              htmlFor="repo-url"
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <TextInput
                    id="repo-url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/org/repo"
                  />
                  {isDuplicate && (
                    <div
                      style={{
                        marginTop: 8,
                        padding: '8px 12px',
                        fontSize: 14,
                        background: 'var(--warning-bg)',
                        border: '1px solid var(--warning-border)',
                        borderRadius: 6,
                        color: '#92400e',
                        lineHeight: 1.4,
                      }}
                    >
                      A workspace using this repository already exists. You can still create a new one.
                    </div>
                  )}
                </div>
                <div>
                  <BranchDropdown
                    value={branch}
                    onChange={setBranch}
                    disabled={repoUrl.trim() === ''}
                  />
                </div>
              </div>
            </FormField>

            {/* Select an Editor */}
            <FormField
              label="Select an Editor"
              tooltip="Choose the IDE that will be launched in your workspace. The default editor is Visual Studio Code - Open Source (Web). Select 'Custom Editor' for advanced configuration."
            >
              <EditorDropdown value={editor} onChange={setEditor} />
            </FormField>

            {/* AI Tools */}
            <FormField
              label="Add AI Tools"
              tooltip="Select AI-powered coding assistants to install in your workspace. Tools marked with a checkmark are already authenticated with your account."
            >
              <AIToolsSection selected={aiTools} onChange={setAiTools} />
            </FormField>

            {/* Temp Storage */}
            <FormField
              label="Temp Storage"
              tooltip="Enable ephemeral storage for temporary files. Data in temp storage does not persist across workspace restarts."
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setTempStorage(!tempStorage)}
                  style={{
                    position: 'relative',
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    border: 'none',
                    background: tempStorage ? 'var(--accent)' : '#d1d5db',
                    cursor: 'pointer',
                    transition: 'background var(--transition)',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: 2,
                      left: tempStorage ? 22 : 2,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      boxShadow: '0 1px 3px rgba(0,0,0,.2)',
                      transition: 'left var(--transition)',
                    }}
                  />
                </button>
              </div>
            </FormField>

            {/* Advanced Settings */}
            <div style={{ marginTop: 8 }}>
              <EnvironmentSettings value={envSettings} onChange={setEnvSettings} />
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                width: 'auto',
                padding: '11px 22px',
                minHeight: 42,
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                border: 'none',
                borderRadius: 9999,
                background: submitting ? 'var(--accent-hover)' : 'var(--accent)',
                color: '#fff',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'background var(--transition)',
              }}
              onMouseEnter={(e) => {
                if (!submitting) e.currentTarget.style.background = 'var(--accent-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = submitting ? 'var(--accent-hover)' : 'var(--accent)'
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Creating Workspace…
                </>
              ) : (
                'Create Workspace'
              )}
            </button>
          </div>
        </form>
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
