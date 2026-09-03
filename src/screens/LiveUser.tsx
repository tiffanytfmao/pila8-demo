import { useState } from 'react'
import { USER_SCENARIO } from '../data'
import LiveBar from '../components/LiveBar'

/**
 * Deliberately sparse. Elapsed time, mic level, and the scenario if they want it.
 * Anything more on this screen is a self-monitoring trigger.
 */
export default function LiveUser({ elapsed, onEnd }: { elapsed: number; onEnd: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <LiveBar elapsed={elapsed}>
        <button type="button" className="ghost-btn" onClick={onEnd}>
          End recording
        </button>
      </LiveBar>

      <div className="live-user">
        {open ? (
          <>
            {USER_SCENARIO.map((para) => (
              <p className="live-user-scenario" key={para.slice(0, 24)} style={{ marginBottom: 18 }}>
                {para}
              </p>
            ))}
            <button type="button" className="disclose" onClick={() => setOpen(false)}>
              Hide
            </button>
          </>
        ) : (
          <button type="button" className="disclose" onClick={() => setOpen(true)}>
            Show the situation again
          </button>
        )}
      </div>
    </>
  )
}
