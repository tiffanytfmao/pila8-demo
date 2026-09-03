import type { ToolId } from '../data'
import { TOOLS, TOOL_RESULTS } from '../data'
import { clock } from '../format'

type Props = {
  ran: Record<ToolId, number | null>
  runTool: (id: ToolId) => void
  calendarUpdated: boolean
  onUpdateCalendar: () => void
  toolCount: number
  /** Only the message search can produce the new address. */
  hasAddress: boolean
}

export default function ToolConsole({
  ran,
  runTool,
  calendarUpdated,
  onUpdateCalendar,
  toolCount,
  hasAddress,
}: Props) {
  // Chronological, so the console and the transcript beneath it read the same way.
  const order = TOOLS.filter((t) => ran[t.id] !== null).sort(
    (a, b) => (ran[a.id] ?? 0) - (ran[b.id] ?? 0),
  )

  return (
    <section className="console" aria-label="Your tools">
      <div className="console-label">
        <h2>Your tools</h2>
        <span className="tally">
          {toolCount === 0 ? 'None used yet' : toolCount === 1 ? '1 used' : `${toolCount} used`}
        </span>
      </div>

      <div className="toolbar">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            type="button"
            className="tool"
            data-ran={ran[tool.id] !== null}
            disabled={ran[tool.id] !== null}
            onClick={() => runTool(tool.id)}
          >
            <span className="tool-dot" aria-hidden="true" />
            {tool.label}
          </button>
        ))}
      </div>

      <div className="feed">
        {order.length === 0 ? (
          <p className="feed-empty">
            Press a tool above and what it finds shows up here. Neither of you has seen any of it
            yet.
          </p>
        ) : (
          order.map((tool) => (
            <div className="entry" key={tool.id}>
              <div className="entry-head">
                <span className="entry-title">{tool.label}</span>
                <span className="entry-at">{clock(ran[tool.id] ?? 0)}</span>
              </div>
              <Result
                id={tool.id}
                calendarUpdated={calendarUpdated}
                onUpdateCalendar={onUpdateCalendar}
                hasAddress={hasAddress}
              />
            </div>
          ))
        )}
      </div>
    </section>
  )
}

function Result({
  id,
  calendarUpdated,
  onUpdateCalendar,
  hasAddress,
}: {
  id: ToolId
  calendarUpdated: boolean
  onUpdateCalendar: () => void
  hasAddress: boolean
}) {
  if (id === 'messages') {
    const r = TOOL_RESULTS.messages
    return (
      <>
        <div className="msg-from">
          {r.from}, {r.at}
        </div>
        <div className="msg-body">{r.body}</div>
      </>
    )
  }

  if (id === 'transit') {
    const r = TOOL_RESULTS.transit
    return (
      <>
        <div className="msg-from">{r.route}</div>
        {r.departures.map((d) => (
          <div className="dep" key={d.leave}>
            <span className="dep-time">
              {d.leave} to {d.arrive}
            </span>
            <span className="dep-detail">{d.detail}</span>
          </div>
        ))}
      </>
    )
  }

  const r = TOOL_RESULTS.calendar
  return (
    <>
      <div className="cal-line">
        {r.title}, {r.time}
      </div>
      <div className="cal-line">
        {calendarUpdated ? (
          <>
            <span className="cal-loc fresh">418 Maple St</span>{' '}
            <span className="cal-was">{r.location}</span>
          </>
        ) : (
          <span className="cal-loc stale">{r.location}</span>
        )}
      </div>

      {!calendarUpdated && (
        <div className="entry-action">
          <button
            type="button"
            className="secondary"
            disabled={!hasAddress}
            onClick={onUpdateCalendar}
          >
            {hasAddress ? 'Change to 418 Maple St' : 'No new address to save yet'}
          </button>
        </div>
      )}
    </>
  )
}
