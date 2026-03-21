export default function TodaySummary({ totals, targets }) {
  const macros = [
    { key: 'protein', label: 'Protein', color: '#e8ff47' },
    { key: 'carbs',   label: 'Carbs',   color: '#4facfe' },
    { key: 'fat',     label: 'Fat',     color: '#ff6b35' },
  ]

  return (
    <div className="card flex flex-col gap-5">
      <p className="label">MACRO BREAKDOWN</p>

      <div className="flex flex-col gap-5 flex-1">
        {macros.map(({ key, label, color }) => {
          const val    = Math.round((totals[key] ?? 0) * 10) / 10
          const target = targets?.macros?.[key] ?? 0
          const pct    = target ? Math.min(100, Math.round((val / target) * 100)) : 0
          const diff   = Math.round((val - target) * 10) / 10

          return (
            <div key={key} className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-base font-body text-forge-text font-medium">{label}</span>
                <span className="font-mono text-sm">
                  <span style={{ color }}>{val}g</span>
                  <span className="text-forge-muted"> / {target}g</span>
                </span>
              </div>
              <div className="h-2.5 bg-forge-border rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                     style={{ width: `${pct}%`, background: color }} />
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-mono text-forge-muted">{pct}%</span>
                {diff > 0
                  ? <span className="text-xs font-mono text-forge-red">+{diff}g over</span>
                  : <span className="text-xs font-mono text-forge-subtext">{Math.abs(diff)}g left</span>
                }
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}