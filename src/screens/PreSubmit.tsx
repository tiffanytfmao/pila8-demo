import type { Role } from '../App'
import type { ToolId } from '../data'
import { clock } from '../format'

type Props = {
  role: Role
  ran: Record<ToolId, number | null>
  calendarUpdated: boolean
  flagged: boolean
}

/**
 * Everything here is derived from a button press in this interface, not from
 * a judgement about how speech sounded. Nothing auto-approves or auto-rejects.
 */
export default function PreSubmit({ role, ran, calendarUpdated, flagged }: Props) {
  const checks = [
    {
      met: ran.messages !== null,
      label: 'The new address was looked up during the call',
      metNote:
        ran.messages !== null ? `Messages searched at ${clock(ran.messages)}.` : undefined,
      unmetNote:
        'The scenario needs a tool call to resolve. Reviewers look for one. Worth a note if you found the address another way.',
    },
    {
      met: ran.transit !== null,
      label: 'A way to get there was checked',
      metNote: ran.transit !== null ? `Transit checked at ${clock(ran.transit)}.` : undefined,
      unmetNote: 'Nothing in the recording shows how the user gets across town.',
    },
  ]

  const unmet = checks.filter((c) => !c.met).length

  return (
    <div className="submit-wrap">
      <h1>Before you submit</h1>
      <p className="submit-sub">
        {role === 'assistant'
          ? 'Two things a reviewer will look for, taken from what your tools did.'
          : 'Two things a reviewer will look for. Your partner’s tools handled these.'}
      </p>

      {checks.map((c) => (
        <div className="check" key={c.label}>
          <span className={`check-mark ${c.met ? 'met' : 'unmet'}`} aria-hidden="true">
            {c.met ? '✓' : '—'}
          </span>
          <div>
            <div className="check-label">{c.label}</div>
            <div className="check-note">{c.met ? c.metNote : c.unmetNote}</div>
          </div>
          <span className="visually-hidden">{c.met ? 'Met' : 'Not met'}</span>
        </div>
      ))}

      <div className="check">
        <span className="check-mark optional" aria-hidden="true">
          {calendarUpdated ? '✓' : '·'}
        </span>
        <div>
          <div className="check-label">Calendar updated to the new address</div>
          <div className="check-note">
            {calendarUpdated
              ? 'Done during the call.'
              : 'Not required — it wasn’t in the user’s goal. Fine either way.'}
          </div>
        </div>
      </div>

      {flagged && (
        <div className="flag">
          <div className="flag-ts">From 3:00</div>
          <div className="flag-body">
            A stretch where the conversation held still. Give it a listen before you send it.
          </div>
        </div>
      )}

      <div className="submit-actions">
        <button type="button" className="primary">
          Submit recording
        </button>
        <span className="hint">
          {unmet > 0
            ? 'You can still submit. A reviewer sees the same two lines.'
            : 'Nothing here blocks you. Review is done by a person.'}
        </span>
      </div>
    </div>
  )
}
