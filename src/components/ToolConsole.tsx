import type { ToolId } from '../data'
import { TOOLS, TOOL_RESULTS } from '../data'

type Props = {
  ran: Record<ToolId, number | null>
  runTool: (id: ToolId) => void
  calendarUpdated: boolean
  onUpdateCalendar: () => void
  /** Pre-record: pressable-looking, but nothing to return yet. */
  idle?: boolean
  toolCount?: number
}

export default function ToolConsole({
  ran,
  runTool,
  calendarUpdated,
  onUpdateCalendar,
  idle = false,
  toolCount,
}: Props) {
  return (
    <section className="console" aria-label="Your tools">
      <div className="console-head">
        <span>Your tools</span>
        {!idle && (
          <span className="tally">
            {toolCount === 1 ? '1 tool used' : `${toolCount ?? 0} tools used`}
          </span>
        )}
      </div>

      {TOOLS.map((tool) => (
        <div className="tool-row" key={tool.id}>
          <button
            type="button"
            className="tool-btn"
            data-ran={ran[tool.id] !== null}
            aria-disabled={idle}
            onClick={() => !idle && runTool(tool.id)}
          >
            <span className="tool-btn-label">{tool.label}</span>
            <span className="tool-btn-affords">{tool.affords}</span>
          </button>

          <div className="tool-out">
            {ran[tool.id] === null ? (
              <span className="tool-out empty" style={{ padding: 0 }}>
                {idle ? 'Runs during the call' : 'Not run yet'}
              </span>
            ) : (
              <Result
                id={tool.id}
                calendarUpdated={calendarUpdated}
                onUpdateCalendar={onUpdateCalendar}
                hasAddress={ran.messages !== null}
              />
            )}
          </div>
        </div>
      ))}
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
  /** You can't write an address you haven't found yet. */
  hasAddress: boolean
}) {
  if (id === 'messages') {
    const r = TOOL_RESULTS.messages
    return (
      <div className="result">
        <div className="result-meta">
          {r.from} · {r.at}
        </div>
        <div className="result-body">{r.body}</div>
      </div>
    )
  }

  if (id === 'transit') {
    const r = TOOL_RESULTS.transit
    return (
      <div className="result">
        <div className="result-meta">{r.route}</div>
        {r.departures.map((d) => (
          <div className="dep" key={d.leave}>
            <span className="dep-time">
              {d.leave} → {d.arrive}
            </span>
            <span className="dep-detail">{d.detail}</span>
          </div>
        ))}
      </div>
    )
  }

  const r = TOOL_RESULTS.calendar
  return (
    <div className="result">
      <div className="cal-card">
        <div className="result-body">
          {r.title} · {r.time}
        </div>
        <div className={calendarUpdated ? 'cal-loc fresh' : 'cal-loc stale'}>
          {calendarUpdated ? '418 Maple St' : r.location}
        </div>
        {!calendarUpdated && (
          <button
            type="button"
            className="edit-link"
            disabled={!hasAddress}
            title={hasAddress ? undefined : 'No new address yet'}
            onClick={onUpdateCalendar}
          >
            {hasAddress ? 'Change location' : 'Change location — no new address yet'}
          </button>
        )}
      </div>
    </div>
  )
}
