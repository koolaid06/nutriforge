import { scoreLabel } from '../../utils/disciplineScore'

export default function DisciplineScore({ score }) {
  const { label, color } = scoreLabel(score)
  const circumference = 2 * Math.PI * 52
  const offset = circumference - (score / 100) * circumference
  const strokeColor = score >= 75 ? '#e8ff47' : score >= 55 ? '#facc15' : score >= 35 ? '#ff6b35' : '#ff3b5c'

  return (
    <div className="card space-y-3">
      <p className="label">DISCIPLINE SCORE</p>

      <div className="flex items-center gap-4">
        {/* Gauge */}
        <div className="relative w-24 h-24 flex-shrink-0">
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
            <span className="font-display text-3xl text-forge-text leading-none">{score}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <p className={`font-display text-2xl tracking-wider leading-none ${color}`}>{label}</p>
            <p className="text-forge-subtext text-xs font-body mt-1">Calories · Macros · Streak</p>
          </div>
          <div className="space-y-1.5">
            {[
              { label: 'Calories', pct: Math.min(100, score) },
              { label: 'Macros',   pct: Math.min(100, score + 5) },
              { label: 'Streak',   pct: Math.min(100, Math.max(0, score - 10)) },
            ].map(({ label: l, pct }) => (
              <div key={l}>
                <div className="flex justify-between mb-0.5">
                  <span className="text-[10px] font-mono text-forge-subtext">{l}</span>
                  <span className="text-[10px] font-mono text-forge-subtext">{pct}%</span>
                </div>
                <div className="h-1 bg-forge-border rounded-full overflow-hidden">
                  <div className="h-full bg-forge-accent/70 rounded-full transition-all duration-700"
                       style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}