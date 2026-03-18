export default function TodaySummary({ totals, targets }) {
  const macros = [
    { key: 'protein', label: 'Protein', color: '#e8ff47', unit: 'g' },
    { key: 'carbs',   label: 'Carbs',   color: '#4facfe', unit: 'g' },
    { key: 'fat',     label: 'Fat',     color: '#ff6b35', unit: 'g' },
  ]

  return (
    <div className="card space-y-4">
      <p className="label">MACRO BREAKDOWN</p>

      {macros.map(({ key, label, color, unit }) => {
        const val    = totals[key] ?? 0
        const target = targets?.macros?.[key] ?? 0
        const pct    = target ? Math.min(100, Math.round((val / target) * 100)) : 0

        return (
          <div key={key}>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-sm font-body text-forge-text">{label}</span>
              <span className="font-mono text-sm">
                <span style={{ color }}>{val}{unit}</span>
                <span className="text-forge-muted"> / {target}{unit}</span>
              </span>
            </div>
            <div className="h-2 bg-forge-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[10px] font-mono text-forge-muted">{pct}% of target</span>
              {val > target && <span className="text-[10px] font-mono text-forge-red">+{val - target}g over</span>}
              {val < target && <span className="text-[10px] font-mono text-forge-subtext">{target - val}g left</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}