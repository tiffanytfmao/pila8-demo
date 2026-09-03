import { useState } from 'react'
import type { Line, ToolId } from '../data'
import RecBar from '../components/RecBar'
import ToolConsole from '../components/ToolConsole'
import Transcript from '../components/Transcript'

type Props = {
  elapsed: number
  lines: Line[]
  ran: Record<ToolId, number | null>
  runTool: (id: ToolId) => void
  calendarUpdated: boolean
  onUpdateCalendar: () => void
  gapOpen: boolean
  toolCount: number
  onEnd: () => void
}

export default function LiveAssistant({
  elapsed,
  lines,
  ran,
  runTool,
  calendarUpdated,
  onUpdateCalendar,
  gapOpen,
  toolCount,
  onEnd,
}: Props) {
  const [transcriptHidden, setTranscriptHidden] = useState(false)

  return (
    <div className="col">
      <RecBar elapsed={elapsed} onEnd={onEnd} />

      <ToolConsole
        ran={ran}
        runTool={runTool}
        calendarUpdated={calendarUpdated}
        onUpdateCalendar={onUpdateCalendar}
        toolCount={toolCount}
        hasAddress={ran.messages !== null}
      />

      {/* Layer 2: names the gap, never the words. Assistant only, fires late. */}
      {gapOpen && (
        <p className="gap-notice" role="status">
          The address hasn’t come up yet.
        </p>
      )}

      <Transcript
        lines={lines}
        role="assistant"
        hidden={transcriptHidden}
        onToggle={() => setTranscriptHidden((v) => !v)}
      />
    </div>
  )
}
