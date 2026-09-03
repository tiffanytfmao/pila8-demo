import type { Role } from '../App'
import type { ToolId } from '../data'
import { clock } from '../format'

type Props = {
  role: Role
  ran: Record<ToolId, number | null>
  calendarUpdated: boolean
  flagged: boolean
  onBack: () => void
  onSubmit: () => void
  submitted: boolean
}

/**
 * Every line here is read off a button press in this interface, not off a
 * judgement about how the speech sounded. Nothing auto-approves or auto-rejects.
 */
export default function PreSubmit({
  role,
  ran,
  calendarUpdated,
  flagged,
  onBack,
  onSubmit,
  submitted,
}: Props) {
  const reqs = [
    {
      label: 'The new address was found during the call',
      at: ran.messages,
      done: 'Searched their messages.',
      missing: 'The user never learned where dinner moved to. That is the problem the call was supposed to solve.',
    },
    {
      label: 'A way of getting there was worked out',
      at: ran.transit,
      done: 'Looked up transit.',
      missing: 'Nothing in the call shows how the user gets across town in time.',
    },
  ]

  const missing = reqs.filter((r) => r.at === null).length

  if (submitted) {
    return (
      <div className="col">
        <div className="head">
          <h1>Sent for review</h1>
          <p>
            A reviewer listens to this within a few days. Nothing on this screen decided anything —
            it only showed you what they will be listening for.
          </p>
        </div>
        <div className="actions">
          <button type="button" className="secondary" onClick={onBack}>
            Back to the recording
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="col">
      <div className="head">
        <h1>
          {missing === 0
            ? 'This one looks complete'
            : missing === 1
              ? 'One thing is missing'
              : 'Two things are missing'}
        </h1>
        <p>
          {missing > 0
            ? 'Reviewers listen for two things in this scenario. You can still send it — a person makes the call, not this screen.'
            : 'Reviewers listen for two things in this scenario, and both happened during the call.'}
        </p>
      </div>

      {reqs.map((r) => (
        <div className="req" key={r.label}>
          <span className="req-label">{r.label}</span>
          <span className={`pill ${r.at !== null ? 'done' : 'missing'}`}>
            {r.at !== null ? `Done at ${clock(r.at)}` : 'Missing'}
          </span>
          <span className="req-note">{r.at !== null ? r.done : r.missing}</span>
        </div>
      ))}

      <div className="req">
        <span className="req-label">Calendar updated to the new address</span>
        <span className={`pill ${calendarUpdated ? 'done' : 'optional'}`}>
          {calendarUpdated ? 'Done' : 'Optional'}
        </span>
        <span className="req-note">
          {calendarUpdated
            ? 'Changed during the call.'
            : 'Nobody asked for this, so it does not count against the recording.'}
        </span>
      </div>

      {flagged && (
        <div className="listen">
          <div className="listen-head">
            <span className="listen-at">From 3:00</span>
            <span className="req-label" style={{ fontSize: 14 }}>
              Worth a listen before you send it
            </span>
          </div>
          <p className="listen-body">
            A long stretch where the conversation held still. Simulated for this demo — a real
            version would come from the audio.
          </p>
        </div>
      )}

      <div className="actions">
        <button type="button" className="primary" onClick={onSubmit}>
          Send for review
        </button>
        <button type="button" className="secondary" onClick={onBack}>
          {missing > 0 ? 'Go back and cover it' : 'Back to the recording'}
        </button>
      </div>

      <p className="hint" style={{ marginTop: 16 }}>
        {role === 'assistant'
          ? 'Taken from the tools you used, not from how anything sounded.'
          : 'Taken from the tools your partner used, not from how anything sounded.'}
      </p>
    </div>
  )
}
