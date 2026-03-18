export default function MacroFeedback({ totals, targets }) {
  if (!targets?.macros) return null

  const macros = [
    { key: 'protein', label: 'Protein', color: 'text-forge-accent' },
    { key: 'carbs',   label: 'Carbs',   color: 'text-forge-blue'   },
    { key: 'fat',     label: 'Fat',     color: 'text-forge-orange' },
  ]

  const feedbacks = macros.map(({ key, label, color }) => {
    const current = totals[key] ?? 0
    const target  = targets.macros[key] ?? 0
    const diff    = current - target
    const pct     = target ? Math.round((current / target) * 100) : 0

    let message = ''
    let type    = 'ok'
    if (diff < -target * 0.15) { message = `${Math.abs(diff)}g short`; type = 'low' }
    else if (diff >  target * 0.15) { message = `${diff}g over`; type = 'high' }
    else message = 'On target'

    return { key, label, color, current, target, diff, pct, message, type }
  })

  return (
    <div className="card space-y-3">
      <p className="label">MACRO FEEDBACK</p>
      {feedbacks.map(({ key, label, color, current, target, pct, message, type }) => (
        <div key={key} className="flex items-center gap-4 py-2 border-b border-forge-border last:border-0">
          <span className={`label text-[10px] w-14 ${color}`}>{label.toUpperCase()}</span>
          <div className="flex-1">
            <div className="h-1.5 bg-forge-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(100, pct)}%`,
                  background: type === 'high' ? '#ff3b5c' : type === 'low' ? '#4facfe' : '#e8ff47'
                }}
              />
            </div>
          </div>
          <span className="font-mono text-xs text-forge-subtext w-20 text-right">
            {current}g / {target}g
          </span>
          <span className={`text-xs font-mono w-20 text-right
            ${type === 'high' ? 'text-forge-red' : type === 'low' ? 'text-forge-blue' : 'text-forge-accent'}`}>
            {message}
          </span>
        </div>
      ))}
    </div>
  )
}