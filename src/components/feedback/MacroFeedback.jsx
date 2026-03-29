export default function MacroFeedback({ totals, targets }) {
  if (!targets?.macros) return null

  const macros = [
    { key: 'protein', label: 'Protein', color: '#ffd54f' },
    { key: 'carbs',   label: 'Carbs',   color: '#5c9fff' },
    { key: 'fat',     label: 'Fat',     color: '#ff7043' },
  ]

  return (
    <div className="card space-y-4">
      <p className="label">MACRO FEEDBACK</p>
      {macros.map(({ key, label, color }) => {
        const current = Math.round((totals[key] ?? 0) * 10) / 10
        const target  = Math.round(targets.macros[key] ?? 0)
        const diff    = Math.round((current - target) * 10) / 10
        const pct     = target ? Math.min(100, Math.round((current / target) * 100)) : 0

        let status = 'On target'
        let statusColor = '#4caf7d'
        if (diff < -(target * 0.15)) { status = `${Math.abs(diff)}g short`; statusColor = '#5c9fff' }
        else if (diff > target * 0.15) { status = `+${diff}g over`; statusColor = '#ef5350' }

        return (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-body font-medium text-forge-text">{label}</span>
              <span className="text-xs font-body font-semibold" style={{ color: statusColor }}>{status}</span>
            </div>
            <div className="h-2 bg-forge-border rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                   style={{ width: `${pct}%`, background: color }} />
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-mono text-forge-subtext">{current}g consumed</span>
              <span className="text-xs font-mono text-forge-muted">target {target}g</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}