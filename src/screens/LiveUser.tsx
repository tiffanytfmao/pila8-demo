import { useState } from 'react'
import type { Line } from '../data'
import { USER_GOAL, USER_SCENARIO } from '../data'
import RecBar from '../components/RecBar'
import Transcript from '../components/Transcript'

export default function LiveUser({
  elapsed,
  lines,
  onEnd,
}: {
  elapsed: number
  lines: Line[]
  onEnd: () => void
}) {
  const [scenarioOpen, setScenarioOpen] = useState(false)
  const [transcriptHidden, setTranscriptHidden] = useState(false)

  return (
    <div className="col">
      <RecBar elapsed={elapsed} onEnd={onEnd} />

      <div className="goal goal-sm">
        <p className="goal-label">What you need out of the call</p>
        <p className="goal-text">{USER_GOAL}</p>
      </div>

      <div style={{ marginTop: 12 }}>
        <button type="button" className="link-btn" onClick={() => setScenarioOpen((v) => !v)}>
          {scenarioOpen ? 'Hide the situation' : 'Show the situation again'}
        </button>
      </div>

      {scenarioOpen && (
        <article className="scenario" style={{ marginTop: 16 }}>
          {USER_SCENARIO.map((para) => (
            <p key={para.slice(0, 24)} style={{ fontSize: 17 }}>
              {para}
            </p>
          ))}
        </article>
      )}

      <Transcript
        lines={lines}
        role="user"
        hidden={transcriptHidden}
        onToggle={() => setTranscriptHidden((v) => !v)}
      />
    </div>
  )
}
