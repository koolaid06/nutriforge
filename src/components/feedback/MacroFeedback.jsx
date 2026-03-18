export default function MacroFeedback({ totals, targets }) {
  if (!targets?.macros) return null

  const macros = [
    { key: 'protein', label: 'Protein', color: '#e8ff47', textColor: 'text-forge-accent' },
    { key: 'carbs',   label: 'Carbs',   color: '#4facfe', textColor: 'text-forge-blue'   },
    { key: 'fat',     label: 'Fat',     color: '#ff6b35', textColor: 'text-forge-orange' },
  ]

  return (
    <div className="card space-y-4">
      <p className="label">MACRO FEEDBACK</p>
      {macros.map(({ key, label, color, textColor }) => {
        const current = Math.round((totals[key] ?? 0) * 10) / 10
        const target  = Math.round(targets.macros[key] ?? 0)
        const diff    = Math.round((current - target) * 10) / 10
        const pct     = target ? Math.min(100, Math.round((current / target) * 100)) : 0

        let message = 'On target'
        let msgColor = 'text-forge-accent'
        if (diff < -(target * 0.15))  { message = `${Math.abs(diff)}g short`; msgColor = 'text-forge-blue' }
        else if (diff > target * 0.15) { message = `+${diff}g over`;           msgColor = 'text-forge-red'  }

        return (
          <div key={key} className="space-y-1.5">
            {/* Top row: label + status */}
            <div className="flex items-center justify-between gap-2">
              <span className={`label text-[10px] ${textColor}`}>{label.toUpperCase()}</span>
              <span className={`font-mono text-[11px] ${msgColor}`}>{message}</span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-forge-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
            {/* Bottom row: current / target */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-forge-subtext">{current}g consumed</span>
              <span className="font-mono text-[11px] text-forge-muted">target {target}g</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}