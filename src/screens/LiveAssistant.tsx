import type { ToolId } from '../data'
import LiveBar from '../components/LiveBar'
import ToolConsole from '../components/ToolConsole'

type Props = {
  elapsed: number
  ran: Record<ToolId, number | null>
  runTool: (id: ToolId) => void
  calendarUpdated: boolean
  onUpdateCalendar: () => void
  gapOpen: boolean
  toolCount: number
  onEnd: () => void
}

/**
 * The console is the page. Results appear only when a tool runs — neither
 * participant has seen any of this before now.
 */
export default function LiveAssistant({
  elapsed,
  ran,
  runTool,
  calendarUpdated,
  onUpdateCalendar,
  gapOpen,
  toolCount,
  onEnd,
}: Props) {
  return (
    <>
      <LiveBar elapsed={elapsed}>
        <button type="button" className="ghost-btn" onClick={onEnd}>
          End recording
        </button>
      </LiveBar>

      <div className="assistant-wrap" style={{ paddingTop: 28 }}>
        <ToolConsole
          ran={ran}
          runTool={runTool}
          calendarUpdated={calendarUpdated}
          onUpdateCalendar={onUpdateCalendar}
          toolCount={toolCount}
        />

        {/* Layer 2: names the gap, never the words. Assistant only, fires late. */}
        {gapOpen && (
          <p className="gap-notice" role="status">
            The address hasn’t come up yet.
          </p>
        )}
      </div>
    </>
  )
}
