import { AUDIO_TIPS } from '../data'
import { Level } from '../components/Level'

/**
 * The audio guidelines used to sit in an 11-item block on the pre-record screen,
 * where nobody could act on them. They live here instead, next to the meter.
 */
export default function DeviceCheck({ onDone }: { onDone: () => void }) {
  return (
    <div className="col">
      <div className="head">
        <h1>Check your audio</h1>
        <p>
          Say a few words. The bar should move steadily without hitting the far end. Poor audio is
          the one thing that gets a recording rejected no matter how the conversation goes.
        </p>
      </div>

      <div className="check-panel">
        <div className="level-row">
          <Level />
          <span className="level-label">Built-in microphone</span>
        </div>

        <ul className="tips">
          {AUDIO_TIPS.map((t) => (
            <li key={t.lead}>
              <b>{t.lead}</b> <span>{t.body}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="actions">
        <button type="button" className="primary" onClick={onDone}>
          Sounds right
        </button>
        <span className="hint">You can come back to this before you record.</span>
      </div>
    </div>
  )
}
