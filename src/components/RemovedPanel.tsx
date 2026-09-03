import { useEffect, useRef } from 'react'
import type { REMOVED } from '../data'

/**
 * Demo-only. The argument of this redesign is a subtraction, and a subtraction
 * is hard to see in the thing that no longer contains it.
 */
export default function RemovedPanel({
  removed,
  onClose,
}: {
  removed: typeof REMOVED
  onClose: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      <div className="panel-scrim" onClick={onClose} />
      <aside className="panel" role="dialog" aria-label="What was removed" aria-modal="true">
        <button ref={ref} type="button" className="panel-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2>What was removed</h2>
        <p className="panel-stat">
          <span className="count">{removed.scriptLines}</span> script lines
          <span className="stat-sep">·</span>
          <span className="count">{removed.rules}</span> rules
        </p>
        <p className="panel-sub">Taken off the screen that came before recording.</p>

        {removed.items.map((it) => (
          <div className="cut" key={it.label}>
            <div className="cut-label">{it.label}</div>
            <div className="cut-why">{it.why}</div>
          </div>
        ))}

        <p className="panel-h3">Moved, not deleted</p>
        {removed.moved.map((it) => (
          <div className="cut" key={it.label}>
            <div className="cut-label" style={{ textDecoration: 'none' }}>
              {it.label}
            </div>
            <div className="cut-why">→ {it.to}</div>
          </div>
        ))}
      </aside>
    </>
  )
}
