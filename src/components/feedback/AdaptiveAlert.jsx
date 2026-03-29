export default function AdaptiveAlert({ suggestion, onApply }) {
  if (!suggestion || suggestion.type === 'on_track') {
    return (
      <div className="flex items-center gap-3 bg-green-950/40 border border-green-800/40 rounded-2xl px-5 py-4">
        <div className="w-8 h-8 rounded-full bg-forge-green/20 flex items-center justify-center flex-shrink-0">
          <span className="text-forge-green text-base">✓</span>
        </div>
        <div>
          <p className="font-body font-semibold text-forge-green text-sm">Progress On Track</p>
          <p className="text-xs text-forge-subtext font-body mt-0.5">{suggestion?.message ?? 'Keep up the consistency.'}</p>
        </div>
      </div>
    )
  }

  const isIncrease = suggestion.type === 'increase'
  return (
    <div className={`flex items-start gap-4 rounded-2xl px-5 py-4 border
      ${isIncrease ? 'bg-blue-950/40 border-blue-800/40' : 'bg-orange-950/40 border-orange-800/40'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-lg
        ${isIncrease ? 'bg-forge-blue/20 text-forge-blue' : 'bg-forge-accent/20 text-forge-accent'}`}>
        {isIncrease ? '↑' : '↓'}
      </div>
      <div className="flex-1">
        <p className={`font-body font-semibold text-sm ${isIncrease ? 'text-forge-blue' : 'text-forge-accent'}`}>
          Adaptive Suggestion
        </p>
        <p className="text-xs text-forge-subtext font-body mt-0.5">{suggestion.message}</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs font-mono text-forge-subtext">
            New target: <span className="text-forge-text font-semibold">{suggestion.newTarget} kcal</span>
          </span>
          {onApply && (
            <button onClick={() => onApply(suggestion.newTarget)} className="btn-primary text-xs px-3 py-1.5">
              Apply
            </button>
          )}
        </div>
      </div>
    </div>
  )
}