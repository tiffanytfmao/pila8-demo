import { useState } from 'react'
import type { Role } from '../App'

/**
 * Demo-only controls. Kept visually apart from the product and out of its
 * chrome — the brief asks for the conversation experience, not the platform.
 */
export default function DemoTray({
  role,
  setRole,
  onReset,
  onSkip,
}: {
  role: Role
  setRole: (r: Role) => void
  onReset: () => void
  onSkip?: () => void
}) {
  const [open, setOpen] = useState(true)

  return (
    <div className="demo-tray" data-open={open}>
      <button
        type="button"
        className="demo-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Demo controls
      </button>

      {open && (
        <div className="demo-body">
          <div className="seg" role="group" aria-label="Whose screen you are looking at">
            <button type="button" aria-pressed={role === 'user'} onClick={() => setRole('user')}>
              User
            </button>
            <button
              type="button"
              aria-pressed={role === 'assistant'}
              onClick={() => setRole('assistant')}
            >
              Assistant
            </button>
          </div>

          <div className="demo-row">
            {onSkip && (
              <button type="button" className="demo-btn" onClick={onSkip}>
                Jump to 3:00, no tool used
              </button>
            )}
            <button type="button" className="demo-btn" onClick={onReset}>
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
