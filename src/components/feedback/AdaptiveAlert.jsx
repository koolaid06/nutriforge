export default function AdaptiveAlert({ suggestion, onApply }) {
  if (!suggestion || suggestion.type === 'on_track') {
    return (
      <div className="card border border-forge-accent/20 bg-forge-accent/5 flex items-center gap-3">
        <span className="text-forge-accent text-xl">✓</span>
        <div>
          <p className="text-sm font-medium text-forge-accent">Progress On Track</p>
          <p className="text-xs text-forge-subtext mt-0.5">{suggestion?.message ?? 'Keep up the consistency.'}</p>
        </div>
      </div>
    )
  }

  const isIncrease = suggestion.type === 'increase'

  return (
    <div className={`card border flex items-start gap-4
      ${isIncrease ? 'border-forge-blue/30 bg-forge-blue/5' : 'border-forge-orange/30 bg-forge-orange/5'}`}>
      <span className="text-2xl mt-0.5">{isIncrease ? '↑' : '↓'}</span>
      <div className="flex-1">
        <p className={`text-sm font-medium ${isIncrease ? 'text-forge-blue' : 'text-forge-orange'}`}>
          Adaptive Suggestion
        </p>
        <p className="text-xs text-forge-subtext mt-1">{suggestion.message}</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="font-mono text-xs text-forge-subtext">
            New target: <span className="text-forge-text">{suggestion.newTarget} kcal</span>
          </span>
          {onApply && (
            <button onClick={() => onApply(suggestion.newTarget)} className="btn-primary text-xs px-3 py-1.5">
              APPLY
            </button>
          )}
        </div>
      </div>
    </div>
  )
}