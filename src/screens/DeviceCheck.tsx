import { useEffect, useState } from 'react'
import { AUDIO_TIPS } from '../data'
import { Level } from '../components/Level'

type Status = 'testing' | 'problem' | 'clear'

/**
 * The audio guidelines used to sit in an 11-item block on the pre-record screen
 * where nobody could act on them. They live here instead, next to the meter.
 *
 * The first check finds a fault on purpose — this is the likely-to-fail setup,
 * and catching it here is far cheaper than catching it in review days later.
 */
export default function DeviceCheck({ onDone }: { onDone: () => void }) {
  const [status, setStatus] = useState<Status>('testing')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    setStatus('testing')
    const t = setTimeout(() => setStatus(attempt === 0 ? 'problem' : 'clear'), 2200)
    return () => clearTimeout(t)
  }, [attempt])

  return (
    <div className="col">
      <div className="head">
        <h1>Check your audio</h1>
        <p>
          Say a few words at the volume you’ll actually talk at. Poor audio gets a recording
          rejected no matter how the conversation goes, and it’s the one thing that can’t be fixed
          afterwards.
        </p>
      </div>

      <div className="check-panel">
        <div className="level-row">
          <Level />
          <span className="level-label">MacBook Pro microphone</span>
        </div>

        <div className={`verdict verdict-${status}`} role="status">
          {status === 'testing' && <p className="verdict-line">Listening…</p>}

          {status === 'problem' && (
            <>
              <p className="verdict-line">
                <span className="verdict-mark" aria-hidden="true">
                  !
                </span>
                A steady tone is running underneath your voice
              </p>
              <p className="verdict-body">
                This is the kind of hiss that gets a recording rejected for quality, and you won’t
                hear it while you talk. It usually comes from a fan, an open window, or a laptop mic
                sitting on a hard desk. Move away from the noise or switch to a headset, then check
                again.
              </p>
              <div className="verdict-actions">
                <button type="button" className="primary" onClick={() => setAttempt((a) => a + 1)}>
                  Check again
                </button>
                <button type="button" className="secondary" onClick={onDone}>
                  Use it anyway
                </button>
              </div>
            </>
          )}

          {status === 'clear' && (
            <>
              <p className="verdict-line">
                <span className="verdict-mark clear" aria-hidden="true">
                  ✓
                </span>
                Clean signal, good level
              </p>
              <div className="verdict-actions">
                <button type="button" className="primary" onClick={onDone}>
                  Continue
                </button>
              </div>
            </>
          )}
        </div>

        <ul className="tips">
          {AUDIO_TIPS.map((t) => (
            <li key={t.lead}>
              <b>{t.lead}</b> <span>{t.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
