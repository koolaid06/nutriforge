import { scoreLabel } from '../../utils/disciplineScore'

const SCORE_CONFIG = [
  { min: 90, label: 'ELITE',      color: '#4caf7d', bg: 'from-green-950/50' },
  { min: 75, label: 'STRONG',     color: '#5c9fff', bg: 'from-blue-950/50'  },
  { min: 55, label: 'SOLID',      color: '#ffd54f', bg: 'from-yellow-950/50'},
  { min: 35, label: 'NEEDS WORK', color: '#ff7043', bg: 'from-orange-950/50'},
  { min: 0,  label: 'OFF TRACK',  color: '#ef5350', bg: 'from-red-950/50'   },
]

export default function DisciplineScore({ score }) {
  const config = SCORE_CONFIG.find(c => score >= c.min) ?? SCORE_CONFIG[4]
  const circumference = 2 * Math.PI * 52
  const offset = circumference - (score / 100) * circumference

  return (
    <div className={`card bg-gradient-to-b ${config.bg} to-forge-card h-full flex flex-col gap-4`}>
      <p className="label">DISCIPLINE SCORE</p>

      {/* Gauge centred */}
      <div className="flex justify-center py-2">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#2e2e2e" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="52" fill="none"
              stroke={config.color} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1.2s ease', filter: `drop-shadow(0 0 8px ${config.color}60)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-extrabold text-5xl text-forge-text leading-none">{score}</span>
            <span className="text-[11px] font-body text-forge-subtext mt-1">out of 100</span>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="font-display font-bold text-2xl" style={{ color: config.color }}>{config.label}</p>
      </div>

      {/* Sub bars */}
      <div className="space-y-3 mt-auto">
        {[
          { label: 'Calories', pct: Math.min(100, score) },
          { label: 'Macros',   pct: Math.min(100, score + 5) },
          { label: 'Streak',   pct: Math.min(100, Math.max(0, score - 10)) },
        ].map(({ label, pct }) => (
          <div key={label}>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs font-body text-forge-subtext">{label}</span>
              <span className="text-xs font-mono text-forge-subtext">{pct}%</span>
            </div>
            <div className="h-2 bg-forge-border rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                   style={{ width: `${pct}%`, background: config.color, opacity: 0.8 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}