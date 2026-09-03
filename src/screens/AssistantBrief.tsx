import { ASSISTANT_BRIEF } from '../data'
import ToolConsole from '../components/ToolConsole'

/**
 * Capabilities, not dialogue. The console is visible and idle before recording
 * so the tools read as things you'd obviously use — layer 1 of the recovery design.
 */
export default function AssistantBrief({ onReady }: { onReady: () => void }) {
  const [first, second, third] = ASSISTANT_BRIEF

  return (
    <div className="assistant-wrap">
      <div className="assistant-brief">
        <p>{first}</p>
        <p>{second}</p>
        <p className="load-bearing">{third}</p>
      </div>

      <ToolConsole
        ran={{ messages: null, transit: null, calendar: null }}
        runTool={() => {}}
        calendarUpdated={false}
        onUpdateCalendar={() => {}}
        idle
      />

      <div style={{ paddingTop: 44 }}>
        <button type="button" className="primary" onClick={onReady}>
          I’m ready
        </button>
      </div>
    </div>
  )
}
