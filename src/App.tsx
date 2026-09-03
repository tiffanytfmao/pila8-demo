import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ToolId } from './data'
import { REMOVED } from './data'
import UserBrief from './screens/UserBrief'
import AssistantBrief from './screens/AssistantBrief'
import LiveUser from './screens/LiveUser'
import LiveAssistant from './screens/LiveAssistant'
import PreSubmit from './screens/PreSubmit'
import RemovedPanel from './components/RemovedPanel'

export type Role = 'user' | 'assistant'
export type Step = 'brief' | 'live' | 'submit'

const STEP_LABELS: Record<Step, string> = {
  brief: 'Before recording',
  live: 'Recording',
  submit: 'Before submitting',
}

const STEP_SHORT: Record<Step, string> = {
  brief: 'Before',
  live: 'Recording',
  submit: 'Submit',
}

/** The gap notice fires late on purpose. Any prompt is a self-monitoring trigger. */
const GAP_AT = 180

export default function App() {
  const [role, setRole] = useState<Role>('user')
  const [step, setStep] = useState<Step>('brief')
  const [elapsed, setElapsed] = useState(0)
  const [ran, setRan] = useState<Record<ToolId, number | null>>({
    messages: null,
    transit: null,
    calendar: null,
  })
  const [calendarUpdated, setCalendarUpdated] = useState(false)
  const [flagged, setFlagged] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    if (step !== 'live') return
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(t)
  }, [step])

  const gapOpen = step === 'live' && elapsed >= GAP_AT && ran.messages === null

  useEffect(() => {
    if (gapOpen) setFlagged(true)
  }, [gapOpen])

  const runTool = useCallback(
    (id: ToolId) => {
      setRan((r) => (r[id] !== null ? r : { ...r, [id]: elapsed }))
    },
    [elapsed],
  )

  const reset = useCallback(() => {
    setStep('brief')
    setElapsed(0)
    setRan({ messages: null, transit: null, calendar: null })
    setCalendarUpdated(false)
    setFlagged(false)
  }, [])

  const toolCount = useMemo(
    () => Object.values(ran).filter((v) => v !== null).length,
    [ran],
  )

  return (
    <>
      <header className="shell">
        <span className="shell-brand">Pila8 · conversation task, redesigned</span>

        <div className="seg" role="group" aria-label="Whose screen you are looking at">
          <button
            type="button"
            aria-pressed={role === 'user'}
            onClick={() => setRole('user')}
          >
            User
          </button>
          <button
            type="button"
            aria-pressed={role === 'assistant'}
            onClick={() => setRole('assistant')}
          >
            Assistant
          </button>
        </div>

        <nav className="steps" aria-label="Stage">
          {(Object.keys(STEP_LABELS) as Step[]).map((s, i) => (
            <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              {i > 0 && <span aria-hidden="true">/</span>}
              <button
                type="button"
                aria-current={step === s}
                aria-label={STEP_LABELS[s]}
                onClick={() => setStep(s)}
              >
                <span className="label-long" aria-hidden="true">{STEP_LABELS[s]}</span>
                <span className="label-short" aria-hidden="true">{STEP_SHORT[s]}</span>
              </button>
            </span>
          ))}
        </nav>

        <span className="shell-spacer" />

        {step === 'live' && ran.messages === null && (
          <button
            type="button"
            className="ghost-btn"
            aria-label="Demo: jump to 3:00"
            onClick={() => setElapsed((e) => Math.max(e, GAP_AT))}
          >
            <span className="label-long" aria-hidden="true">Demo: jump to 3:00</span>
            <span className="label-short" aria-hidden="true">Jump to 3:00</span>
          </button>
        )}
        <button type="button" className="ghost-btn" onClick={reset}>
          Reset
        </button>
        <button
          type="button"
          className="ghost-btn"
          aria-label="What was removed"
          onClick={() => setPanelOpen(true)}
        >
          <span className="label-long" aria-hidden="true">What was removed</span>
          <span className="label-short" aria-hidden="true">Removed</span>
        </button>
      </header>

      <main className="page">
        {step === 'brief' && role === 'user' && <UserBrief onReady={() => setStep('live')} />}
        {step === 'brief' && role === 'assistant' && (
          <AssistantBrief onReady={() => setStep('live')} />
        )}
        {step === 'live' && role === 'user' && (
          <LiveUser elapsed={elapsed} onEnd={() => setStep('submit')} />
        )}
        {step === 'live' && role === 'assistant' && (
          <LiveAssistant
            elapsed={elapsed}
            ran={ran}
            runTool={runTool}
            calendarUpdated={calendarUpdated}
            onUpdateCalendar={() => setCalendarUpdated(true)}
            gapOpen={gapOpen}
            toolCount={toolCount}
            onEnd={() => setStep('submit')}
          />
        )}
        {step === 'submit' && (
          <PreSubmit
            role={role}
            ran={ran}
            calendarUpdated={calendarUpdated}
            flagged={flagged}
          />
        )}
      </main>

      {panelOpen && <RemovedPanel removed={REMOVED} onClose={() => setPanelOpen(false)} />}
    </>
  )
}
