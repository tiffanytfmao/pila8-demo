import { useEffect, useState } from 'react'
import Clip from '../components/Clip'

/**
 * Entry point of the real flow. The example clips live here rather than on the
 * pre-record screen: waiting for a match is dead time, so listening costs nothing,
 * and a clip models how people sound without handing anyone words to reuse.
 */
export default function JoinConversation({ onMatched }: { onMatched: () => void }) {
  const [queued, setQueued] = useState(false)
  const [matched, setMatched] = useState(false)

  useEffect(() => {
    if (!queued) return
    const t = setTimeout(() => setMatched(true), 4500)
    return () => clearTimeout(t)
  }, [queued])

  return (
    <div className="col-wide">
      <div className="head">
        <h1>Engaging companion conversations</h1>
        <p>
          Two contributors, one live call. One of you plays someone with a problem, the other plays
          the assistant helping them solve it. You’ll find out which when you’re matched.
        </p>
      </div>

      <section className="block">
        <h2 className="block-title">How these sound</h2>
        <p className="block-sub">
          Both clips are from a different scenario than the one you’ll get, so there’s nothing here
          to reuse — only how people sound when it works and when it doesn’t.
        </p>

        <div className="clips">
          <Clip
            label="A call that passed"
            duration="0:48"
            listenFor="They interrupt each other, trail off, and change direction mid-sentence."
          />
          <Clip
            label="A call that was rejected"
            duration="0:41"
            listenFor="Each person waits their turn and finishes every thought. It sounds like two people reading."
            muted
          />
        </div>
      </section>

      <section className="block">
        <h2 className="block-title">Matching</h2>
        <p className="block-sub">
          You’ll be paired with another contributor who shares one of your languages.
        </p>
        <div className="lang">
          <span className="lang-check" aria-hidden="true">
            ✓
          </span>
          English
        </div>
      </section>

      {!queued && (
        <div className="actions">
          <button type="button" className="primary" onClick={() => setQueued(true)}>
            Join queue
          </button>
          <span className="hint">Roughly a two minute wait right now.</span>
        </div>
      )}

      {queued && (
        <div className="queue" role="status">
          {matched ? (
            <>
              <p className="queue-line">You’re matched. Your partner is doing their audio check.</p>
              <div className="actions" style={{ marginTop: 16 }}>
                <button type="button" className="primary" onClick={onMatched}>
                  Check your audio
                </button>
              </div>
            </>
          ) : (
            <p className="queue-line">
              <span className="pulse" aria-hidden="true" />
              Finding you a partner. The clips above are worth the wait time.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
