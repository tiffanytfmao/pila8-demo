import { useEffect, useState } from 'react'

/** Simulated mic level. Freezes flat when the viewer prefers reduced motion. */
export function useLevel(active: boolean, bars: number) {
  const [level, setLevel] = useState(Math.round(bars * 0.4))

  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      setLevel(Math.max(2, Math.round(bars * (0.25 + Math.random() * 0.5))))
    }, 180)
    return () => clearInterval(t)
  }, [active, bars])

  return level
}

export function Level({ bars = 18 }: { bars?: number }) {
  const level = useLevel(true, bars)
  const hot = Math.round(bars * 0.9)

  return (
    <span className="level" role="img" aria-label="Your microphone is picking up sound">
      {Array.from({ length: bars }, (_, i) => (
        <i key={i} className={i < level ? (i >= hot ? 'hot' : 'on') : ''} />
      ))}
    </span>
  )
}

export function MiniLevel() {
  const level = useLevel(true, 6)
  return (
    <span className="mini-level" role="img" aria-label="Microphone is picking up sound">
      {Array.from({ length: 6 }, (_, i) => (
        <i key={i} className={i < level ? 'on' : ''} style={{ height: 4 + i * 2 }} />
      ))}
    </span>
  )
}
