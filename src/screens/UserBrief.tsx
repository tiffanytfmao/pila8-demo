import { USER_GOAL, USER_SCENARIO } from '../data'

/**
 * The flagship screen. The situation and what they need, nothing else.
 * The address is absent — the user does not know it, which is what makes
 * the assistant's tool call genuinely necessary.
 */
export default function UserBrief({ onReady }: { onReady: () => void }) {
  return (
    <div className="col">
      <div className="head">
        <h1>Your evening</h1>
        <p>You’re the user in this conversation. Read this once, then talk it through in your own words.</p>
      </div>

      <article className="scenario">
        {USER_SCENARIO.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </article>

      <div className="goal">
        <p className="goal-label">What you need out of the call</p>
        <p className="goal-text">{USER_GOAL}</p>
      </div>

      <div className="actions">
        <button type="button" className="primary" onClick={onReady}>
          Start recording
        </button>
        <span className="hint">Your partner joins on the same call.</span>
      </div>
    </div>
  )
}
