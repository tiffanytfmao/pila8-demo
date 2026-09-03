import { clock } from '../format'
import { MiniLevel } from './Level'

export default function RecBar({ elapsed, onEnd }: { elapsed: number; onEnd: () => void }) {
  return (
    <div className="recbar">
      <span className="rec-dot" aria-hidden="true" />
      <span className="rec-label">Recording</span>
      <span className="rec-time">{clock(elapsed)}</span>
      <MiniLevel />
      <span className="shell-spacer" />
      <button type="button" className="secondary" onClick={onEnd}>
        End recording
      </button>
    </div>
  )
}
