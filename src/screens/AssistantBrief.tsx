import { TOOLS } from '../data'

/**
 * Capabilities, not dialogue. The tools are named here so they read as things
 * you'd obviously reach for once the call starts — layer 1 of the recovery design.
 */
export default function AssistantBrief({ onReady }: { onReady: () => void }) {
  return (
    <div className="col">
      <div className="head">
        <h1>You’re the assistant</h1>
        <p>
          Someone is about to call you with a problem. You can’t see what they see, and you won’t
          know what they need until they tell you.
        </p>
      </div>

      <div className="console">
        <div className="console-label">
          <h2>What you can reach for</h2>
        </div>

        <div className="feed">
          {TOOLS.map((tool) => (
            <div className="entry" key={tool.id} style={{ animation: 'none' }}>
              <div className="entry-head">
                <span className="entry-title">{tool.label}</span>
              </div>
              <div className="msg-body" style={{ fontSize: 14 }}>
                {tool.affords}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="actions">
        <button type="button" className="primary" onClick={onReady}>
          Start recording
        </button>
        <span className="hint">The tools become live once the call starts.</span>
      </div>
    </div>
  )
}
