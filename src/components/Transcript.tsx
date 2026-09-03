import type { Line } from '../data'
import type { Role } from '../App'

/**
 * Simulated live transcript. Hardcoded lines, revealed as the clock passes them.
 * No speech recognition is involved.
 */
export default function Transcript({
  lines,
  role,
  hidden,
  onToggle,
}: {
  lines: Line[]
  role: Role
  hidden: boolean
  onToggle: () => void
}) {
  return (
    <section className="transcript" aria-label="Live transcript">
      <div className="transcript-head">
        <h2>Live transcript</h2>
        <button type="button" className="link-btn" onClick={onToggle}>
          {hidden ? 'Show transcript' : 'Hide transcript'}
        </button>
      </div>

      {hidden ? (
        <p className="transcript-note">
          Hidden. Some people find watching their own words distracting while they talk.
        </p>
      ) : (
        <>
          <ul className="lines" aria-live="polite">
            {lines.map((l) => (
              <li className="line" key={`${l.at}-${l.text.slice(0, 12)}`}>
                <span className="line-who" data-me={l.who === role}>
                  {l.who === role ? 'You' : l.who === 'user' ? 'User' : 'Assistant'}
                </span>
                <span className="line-text">{l.text}</span>
              </li>
            ))}
          </ul>
          {lines.length === 0 && <p className="transcript-note">Waiting for the first thing said.</p>}
        </>
      )}
    </section>
  )
}
