import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Line, ToolId } from './data'
import { TOOL_LINES, TRANSCRIPT } from './data'
import DeviceCheck from './screens/DeviceCheck'
import UserBrief from './screens/UserBrief'
import AssistantBrief from './screens/AssistantBrief'
import LiveUser from './screens/LiveUser'
import LiveAssistant from './screens/LiveAssistant'
import PreSubmit from './screens/PreSubmit'

export type Role = 'user' | 'assistant'
export type Step = 'setup' | 'brief' | 'live' | 'submit'

const STEPS: { id: Step; label: string }[] = [
  { id: 'setup', label: 'Audio' },
  { id: 'brief', label: 'Brief' },
  { id: 'live', label: 'Record' },
  { id: 'submit', label: 'Submit' },
]

/** The gap notice fires late on purpose. Any prompt is a self-monitoring trigger. */
const GAP_AT = 180

export default function App() {
  const [role, setRole] = useState<Role>('user')
  const [step, setStep] = useState<Step>('setup')
  const [elapsed, setElapsed] = useState(0)
  const [ran, setRan] = useState<Record<ToolId, number | null>>({
    messages: null,
    transit: null,
    calendar: null,
  })
  const [toolLines, setToolLines] = useState<Line[]>([])
  const [calendarUpdated, setCalendarUpdated] = useState(false)
  const [flagged, setFlagged] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
      if (ran[id] !== null) return
      setRan((r) => ({ ...r, [id]: elapsed }))
      setToolLines((l) => [...l, { at: elapsed, who: 'assistant', text: TOOL_LINES[id] }])
    },
    [ran, elapsed],
  )

  const reset = useCallback(() => {
    setStep('setup')
    setElapsed(0)
    setRan({ messages: null, transit: null, calendar: null })
    setToolLines([])
    setCalendarUpdated(false)
    setFlagged(false)
    setSubmitted(false)
  }, [])

  const toolCount = useMemo(() => Object.values(ran).filter((v) => v !== null).length, [ran])

  const lines = useMemo(
    () =>
      [...TRANSCRIPT.filter((l) => l.at <= elapsed), ...toolLines].sort((a, b) => a.at - b.at),
    [elapsed, toolLines],
  )

  const stepIndex = STEPS.findIndex((s) => s.id === step)

  return (
    <>
      <header className="shell">
        <span className="shell-brand">Pila8 voice task</span>

        <div className="seg" role="group" aria-label="Whose screen you are looking at">
          <button type="button" aria-pressed={role === 'user'} onClick={() => setRole('user')}>
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
          {STEPS.map((s, i) => (
            <span key={s.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span className="step-line" aria-hidden="true" />}
              <button
                type="button"
                className="step"
                aria-current={step === s.id}
                data-state={i < stepIndex ? 'done' : i === stepIndex ? 'current' : 'ahead'}
                onClick={() => setStep(s.id)}
              >
                <span className="step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="step-label">{s.label}</span>
              </button>
            </span>
          ))}
        </nav>

        <span className="shell-spacer" />

        {step === 'live' && ran.messages === null && (
          <button
            type="button"
            className="secondary"
            style={{ minHeight: 36, padding: '7px 13px', fontSize: 13.5 }}
            onClick={() => setElapsed((e) => Math.max(e, GAP_AT))}
          >
            Skip to 3:00
          </button>
        )}
        <button
          type="button"
          className="secondary"
          style={{ minHeight: 36, padding: '7px 13px', fontSize: 13.5 }}
          onClick={reset}
        >
          Reset
        </button>
      </header>

      <main className="page">
        {step === 'setup' && <DeviceCheck onDone={() => setStep('brief')} />}

        {step === 'brief' &&
          (role === 'user' ? (
            <UserBrief onReady={() => setStep('live')} />
          ) : (
            <AssistantBrief onReady={() => setStep('live')} />
          ))}

        {step === 'live' &&
          (role === 'user' ? (
            <LiveUser elapsed={elapsed} lines={lines} onEnd={() => setStep('submit')} />
          ) : (
            <LiveAssistant
              elapsed={elapsed}
              lines={lines}
              ran={ran}
              runTool={runTool}
              calendarUpdated={calendarUpdated}
              onUpdateCalendar={() => setCalendarUpdated(true)}
              gapOpen={gapOpen}
              toolCount={toolCount}
              onEnd={() => setStep('submit')}
            />
          ))}

        {step === 'submit' && (
          <PreSubmit
            role={role}
            ran={ran}
            calendarUpdated={calendarUpdated}
            flagged={flagged}
            submitted={submitted}
            onSubmit={() => setSubmitted(true)}
            onBack={() => {
              setSubmitted(false)
              setStep('live')
            }}
          />
        )}
      </main>
    </>
  )
}
