import { USER_GOAL, USER_SCENARIO } from '../data'

/**
 * The flagship screen. Scenario, goal, nothing else.
 * The address is absent — the User does not know it, which is what makes
 * the assistant's tool call genuinely necessary.
 */
export default function UserBrief({ onReady }: { onReady: () => void }) {
  return (
    <>
      <p className="role-note">You’re the user.</p>

      <article className="user-brief">
        {USER_SCENARIO.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}

        <div className="goal">
          <p className="goal-label">You need</p>
          <p className="goal-text">{USER_GOAL}</p>
        </div>
      </article>

      <div className="user-actions">
        <button type="button" className="primary" onClick={onReady}>
          I’m ready
        </button>
      </div>
    </>
  )
}
