import { scoreLabel } from '../../utils/disciplineScore'

export default function DisciplineScore({ score }) {
  const { label, color } = scoreLabel(score)
  const circumference = 2 * Math.PI * 52
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="card flex flex-col gap-4">
      <p className="label">DISCIPLINE SCORE</p>

      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#1e1e2e" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke={score >= 75 ? '#e8ff47' : score >= 55 ? '#facc15' : score >= 35 ? '#ff6b35' : '#ff3b5c'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl text-forge-text">{score}</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <p className={`font-display text-2xl tracking-wider ${color}`}>{label}</p>
            <p className="text-forge-subtext text-xs font-body mt-0.5">
              Based on calories, macros & consistency
            </p>
          </div>

          <div className="space-y-2">
            {[
              { label: 'Calorie Accuracy', pct: Math.min(100, score) },
              { label: 'Macro Adherence',  pct: Math.min(100, score + 5) },
              { label: 'Streak Bonus',     pct: Math.min(100, score - 10) },
            ].map(({ label: l, pct }) => (
              <div key={l}>
                <div className="flex justify-between mb-0.5">
                  <span className="text-[10px] font-mono text-forge-subtext">{l}</span>
                  <span className="text-[10px] font-mono text-forge-subtext">{Math.max(0,pct)}%</span>
                </div>
                <div className="h-1 bg-forge-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forge-accent/70 rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(0, pct)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}