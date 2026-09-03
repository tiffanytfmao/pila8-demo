import type { Role } from '../App'

/**
 * Mirrors the structure of the real contributor sidebar. Only Join Conversation
 * is live — this demo implements one flow.
 */
const NAV = [
  'Dashboard',
  'Browse Projects',
  'Join Conversation',
  'Record Audio',
  'Upload Audio',
  'Upload Video',
  'My Files',
  'My Tasks',
  'Credits',
  'Invite Friends',
  'Community Lead',
  'Office Hours',
  'FAQ',
]

type Props = {
  role: Role
  setRole: (r: Role) => void
  onReset: () => void
  onSkip?: () => void
}

export default function Sidebar({ role, setRole, onReset, onSkip }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">pila8</div>

      <p className="nav-label">Contributor tools</p>
      <nav aria-label="Contributor tools">
        <ul className="nav">
          {NAV.map((item) => {
            const live = item === 'Join Conversation'
            return (
              <li key={item}>
                <span className="nav-item" data-live={live} aria-current={live ? 'page' : undefined}>
                  {item}
                  {!live && <span className="visually-hidden"> (not part of this demo)</span>}
                </span>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="sidebar-foot">
        <div className="earnings">
          <span>Approved 11.56</span>
          <span>Pending 1.63</span>
        </div>
        <div className="who">
          <span className="who-mark" aria-hidden="true">
            YZ
          </span>
          <span>
            <span className="who-name">Yi Zhong</span>
            <span className="who-mail">yi@besimple.ai</span>
          </span>
        </div>

        <div className="demo-tray">
          <p className="demo-label">Demo controls — not part of the product</p>
          <div className="demo-row">
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
          </div>
          <div className="demo-row">
            {onSkip && (
              <button type="button" className="demo-btn" onClick={onSkip}>
                Jump to 3:00, no tool used
              </button>
            )}
            <button type="button" className="demo-btn" onClick={onReset}>
              Start over
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
