import { scoreLabel } from '../../utils/disciplineScore'

export default function DisciplineScore({ score }) {
  const { label, color } = scoreLabel(score)
  const circumference = 2 * Math.PI * 52
  const offset = circumference - (score / 100) * circumference
  const strokeColor = score >= 75 ? '#e8ff47' : score >= 55 ? '#facc15' : score >= 35 ? '#ff6b35' : '#ff3b5c'

  return (
    <div className="card h-full flex flex-col gap-4">
      <p className="label">DISCIPLINE SCORE</p>

      {/* Gauge */}
      <div className="flex items-center justify-center flex-1">
        <div className="relative w-36 h-36 lg:w-40 lg:h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#1e1e2e" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="52" fill="none"
              stroke={strokeColor} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-5xl text-forge-text leading-none">{score}</span>
            <span className="label text-[10px] mt-1">/ 100</span>
          </div>
        </div>
      </div>

      {/* Label + bars */}
      <div className="space-y-3">
        <p className={`font-display text-2xl tracking-wider leading-none ${color}`}>{label}</p>
        {[
          { label: 'Calories', pct: Math.min(100, score) },
          { label: 'Macros',   pct: Math.min(100, score + 5) },
          { label: 'Streak',   pct: Math.min(100, Math.max(0, score - 10)) },
        ].map(({ label: l, pct }) => (
          <div key={l}>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-mono text-forge-subtext">{l}</span>
              <span className="text-xs font-mono text-forge-subtext">{pct}%</span>
            </div>
            <div className="h-1.5 bg-forge-border rounded-full overflow-hidden">
              <div className="h-full bg-forge-accent/70 rounded-full transition-all duration-700"
                   style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}