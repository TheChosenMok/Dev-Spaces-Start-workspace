import { useState } from 'react'
import { X } from 'lucide-react'
import { TextInput } from './TextInput'

interface CustomEditorModalProps {
  onClose: () => void
  onSave: (config: { name: string; image: string; port: string }) => void
}

export function CustomEditorModal({ onClose, onSave }: CustomEditorModalProps) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [port, setPort] = useState('3000')

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          width: '100%',
          maxWidth: 480,
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600 }}>Custom Editor Configuration</h3>
          <button
            type="button"
            onClick={onClose}
            style={{ border: 'none', background: 'transparent', padding: 4, borderRadius: 4, color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Editor Name</label>
          <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="My Custom IDE" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Container Image</label>
          <TextInput value={image} onChange={(e) => setImage(e.target.value)} placeholder="registry.example.com/editor:latest" />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>IDE Port</label>
          <TextInput value={port} onChange={(e) => setPort(e.target.value)} placeholder="3000" style={{ width: 120 }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              height: 36,
              padding: '0 16px',
              fontSize: 14,
              fontWeight: 500,
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              background: 'var(--surface)',
              color: 'var(--text)',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave({ name, image, port })}
            style={{
              height: 36,
              padding: '0 16px',
              fontSize: 14,
              fontWeight: 500,
              border: 'none',
              borderRadius: 'var(--radius)',
              background: 'var(--accent)',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  )
}
