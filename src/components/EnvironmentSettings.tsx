import { useState } from 'react'
import { ChevronDown, Settings } from 'lucide-react'
import { FormField } from './FormField'
import { TextInput } from './TextInput'

interface EnvSettings {
  containerImage: string
  tempStorage: boolean
  memoryLimit: string
  cpuLimit: string
  devfilePath: string
}

interface EnvironmentSettingsProps {
  value: EnvSettings
  onChange: (val: EnvSettings) => void
}

export function EnvironmentSettings({ value, onChange }: EnvironmentSettingsProps) {
  const [expanded, setExpanded] = useState(false)

  function update(partial: Partial<EnvSettings>) {
    onChange({ ...value, ...partial })
  }

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          padding: '12px 16px',
          fontSize: 14,
          fontWeight: 600,
          border: 'none',
          background: expanded ? '#fafafa' : 'var(--surface)',
          color: 'var(--text)',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background var(--transition)',
        }}
      >
        <Settings size={16} color="var(--text-secondary)" />
        <span style={{ flex: 1 }}>Environment Settings</span>
        <ChevronDown
          size={16}
          style={{
            transform: expanded ? 'rotate(180deg)' : 'none',
            transition: 'transform var(--transition)',
            color: 'var(--text-muted)',
          }}
        />
      </button>

      {expanded && (
        <div style={{ padding: '16px 16px 0', borderTop: '1px solid var(--border)' }}>
          <FormField
            label="Container Image"
            tooltip="Override the default Universal Developer Image. Specify a custom container image for your workspace runtime."
            htmlFor="container-image"
          >
            <TextInput
              id="container-image"
              value={value.containerImage}
              onChange={(e) => update({ containerImage: e.target.value })}
              placeholder="quay.io/devspaces/udi:latest"
            />
          </FormField>

          <FormField
            label="Temp Storage"
            tooltip="Enable ephemeral storage for temporary files. Data in temp storage does not persist across workspace restarts."
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                type="button"
                onClick={() => update({ tempStorage: !value.tempStorage })}
                style={{
                  position: 'relative',
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  border: 'none',
                  background: value.tempStorage ? 'var(--accent)' : '#d1d5db',
                  cursor: 'pointer',
                  transition: 'background var(--transition)',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 2,
                    left: value.tempStorage ? 22 : 2,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,.2)',
                    transition: 'left var(--transition)',
                  }}
                />
              </button>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                {value.tempStorage ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </FormField>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <FormField
              label="Memory Limit"
              tooltip="Set the maximum RAM allocation for this workspace. Use Kubernetes resource quantity formats, e.g. 4Gi, 512Mi."
              htmlFor="memory-limit"
            >
              <TextInput
                id="memory-limit"
                value={value.memoryLimit}
                onChange={(e) => update({ memoryLimit: e.target.value })}
                placeholder="4Gi"
              />
            </FormField>

            <FormField
              label="CPU Limit"
              tooltip="Set the maximum CPU allocation. Use cores (e.g. 2) or millicores (e.g. 2000m)."
              htmlFor="cpu-limit"
            >
              <TextInput
                id="cpu-limit"
                value={value.cpuLimit}
                onChange={(e) => update({ cpuLimit: e.target.value })}
                placeholder="2"
              />
            </FormField>
          </div>

          <FormField
            label="Path to Devfile"
            tooltip="Specify a custom path to your devfile. Overrides the default search for devfile.yaml or .devfile.yaml in the repository root."
            htmlFor="devfile-path"
          >
            <TextInput
              id="devfile-path"
              value={value.devfilePath}
              onChange={(e) => update({ devfilePath: e.target.value })}
              placeholder="devfile.yaml"
            />
          </FormField>
        </div>
      )}
    </div>
  )
}
