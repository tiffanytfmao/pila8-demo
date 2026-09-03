import { useEffect, useState } from 'react'
import { clock } from '../format'

/** Elapsed time and a mic level. No countdown — there is no known length limit. */
export default function LiveBar({ elapsed, children }: { elapsed: number; children?: React.ReactNode }) {
  const [level, setLevel] = useState(3)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const t = setInterval(() => setLevel(2 + Math.floor(Math.random() * 5)), 220)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="live-bar">
      <span className="rec-dot" aria-hidden="true" />
      <span className="elapsed">Recording · {clock(elapsed)}</span>
      <span className="meter" role="img" aria-label="Microphone is picking up sound">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <i key={i} className={i < level ? 'on' : ''} style={{ height: 4 + i * 2 }} />
        ))}
      </span>
      <span className="shell-spacer" />
      {children}
    </div>
  )
}
