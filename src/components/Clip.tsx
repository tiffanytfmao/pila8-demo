import { useEffect, useState } from 'react'

/** Mocked player. No audio file is loaded in this demo. */
export default function Clip({
  label,
  duration,
  listenFor,
  muted = false,
}: {
  label: string
  duration: string
  listenFor: string
  muted?: boolean
}) {
  const [playing, setPlaying] = useState(false)
  const [pos, setPos] = useState(0)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setPos((p) => {
        if (p >= 100) {
          setPlaying(false)
          return 0
        }
        return p + 2
      })
    }, 120)
    return () => clearInterval(t)
  }, [playing])

  return (
    <div className="clip" data-muted={muted}>
      <div className="clip-head">
        <button
          type="button"
          className="clip-play"
          aria-label={`${playing ? 'Pause' : 'Play'} ${label}`}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <span className="clip-label">{label}</span>
        <span className="clip-dur">{duration}</span>
      </div>

      <div className="wave" aria-hidden="true">
        {Array.from({ length: 44 }, (_, i) => (
          <i
            key={i}
            className={i < (pos / 100) * 44 ? 'played' : ''}
            style={{ height: `${18 + Math.abs(Math.sin(i * 1.7)) * 60}%` }}
          />
        ))}
      </div>

      <p className="clip-listen">
        <span className="clip-listen-lead">Listen for</span> {listenFor}
      </p>
    </div>
  )
}
