export default function TodaySummary({ totals, targets }) {
  const macros = [
    { key: 'protein', label: 'Protein', color: '#e8ff47', textColor: 'text-forge-accent' },
    { key: 'carbs',   label: 'Carbs',   color: '#4facfe', textColor: 'text-forge-blue'   },
    { key: 'fat',     label: 'Fat',     color: '#ff6b35', textColor: 'text-forge-orange' },
  ]

  return (
    <div className="card space-y-3">
      <p className="label">MACRO BREAKDOWN</p>
      {macros.map(({ key, label, color, textColor }) => {
        const val    = Math.round((totals[key] ?? 0) * 10) / 10
        const target = targets?.macros?.[key] ?? 0
        const pct    = target ? Math.min(100, Math.round((val / target) * 100)) : 0

        return (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-body text-forge-text">{label}</span>
              <span className="font-mono text-xs">
                <span style={{ color }}>{val}g</span>
                <span className="text-forge-muted"> / {target}g</span>
              </span>
            </div>
            <div className="h-2 bg-forge-border rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                   style={{ width: `${pct}%`, background: color }} />
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[10px] font-mono text-forge-muted">{pct}%</span>
              {val > target
                ? <span className={`text-[10px] font-mono text-forge-red`}>+{Math.round((val-target)*10)/10}g over</span>
                : <span className="text-[10px] font-mono text-forge-subtext">{Math.round((target-val)*10)/10}g left</span>
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}