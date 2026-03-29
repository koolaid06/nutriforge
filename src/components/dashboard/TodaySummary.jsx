const MACROS = [
  { key: 'protein', label: 'Protein', color: '#ffd54f', bg: 'bg-yellow-950/30' },
  { key: 'carbs',   label: 'Carbs',   color: '#5c9fff', bg: 'bg-blue-950/30'   },
  { key: 'fat',     label: 'Fat',     color: '#ff7043', bg: 'bg-orange-950/30' },
]

export default function TodaySummary({ totals, targets }) {
  return (
    <div className="card flex flex-col gap-4">
      <p className="label">MACRO BREAKDOWN</p>

      <div className="flex flex-col gap-3">
        {MACROS.map(({ key, label, color, bg }) => {
          const val    = Math.round((totals[key] ?? 0) * 10) / 10
          const target = targets?.macros?.[key] ?? 0
          const pct    = target ? Math.min(100, Math.round((val / target) * 100)) : 0
          const diff   = Math.round((val - target) * 10) / 10

          return (
            <div key={key} className={`${bg} rounded-xl p-4 border border-white/5`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-body font-semibold text-sm text-forge-text">{label}</span>
                <div className="text-right">
                  <span className="font-mono font-bold text-base" style={{ color }}>{val}g</span>
                  <span className="font-mono text-xs text-forge-muted"> / {target}g</span>
                </div>
              </div>
              <div className="h-2.5 bg-black/30 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                     style={{ width: `${pct}%`, background: color }} />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs font-body text-forge-subtext">{pct}% of target</span>
                {diff > 0
                  ? <span className="text-xs font-body text-forge-red">+{diff}g over</span>
                  : <span className="text-xs font-body text-forge-subtext">{Math.abs(diff)}g left</span>
                }
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}