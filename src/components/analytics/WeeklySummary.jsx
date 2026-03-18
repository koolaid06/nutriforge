import { formatDate } from '../../utils/dateHelpers'

export default function WeeklySummary({ weeklyAvg, bestDay, worstDay, targets }) {
  const calTarget = targets?.targetCalories

  const tips = []
  if (weeklyAvg.protein < (targets?.macros?.protein ?? 0) * 0.8)
    tips.push('Protein is consistently low — consider a protein shake post-workout.')
  if (weeklyAvg.calories < (calTarget ?? 0) * 0.8)
    tips.push('You\'re significantly under calories. Undereating can slow progress.')
  if (weeklyAvg.calories > (calTarget ?? 0) * 1.15)
    tips.push('Weekly average is over target. Track your snacks more carefully.')
  if (!tips.length)
    tips.push('You\'re hitting your targets well this week. Keep the consistency.')

  return (
    <div className="card space-y-4">
      <p className="label">WEEKLY SUMMARY</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-forge-surface rounded-xl p-4 space-y-1">
          <p className="label text-[10px]">AVG CALORIES</p>
          <p className="font-display text-3xl text-forge-accent">{weeklyAvg.calories}</p>
          {calTarget && (
            <p className="text-[10px] font-mono text-forge-subtext">
              Target: {calTarget} kcal
            </p>
          )}
        </div>
        <div className="bg-forge-surface rounded-xl p-4 space-y-1">
          <p className="label text-[10px]">AVG PROTEIN</p>
          <p className="font-display text-3xl text-forge-accent">{weeklyAvg.protein}g</p>
        </div>
        {bestDay && (
          <div className="bg-forge-surface rounded-xl p-4 space-y-1">
            <p className="label text-[10px]">BEST DAY</p>
            <p className="font-mono text-sm text-forge-text">{bestDay.label}</p>
            <p className="text-[10px] font-mono text-forge-accent">{bestDay.calories} kcal</p>
          </div>
        )}
        {worstDay && (
          <div className="bg-forge-surface rounded-xl p-4 space-y-1">
            <p className="label text-[10px]">LOWEST DAY</p>
            <p className="font-mono text-sm text-forge-text">{worstDay.label}</p>
            <p className="text-[10px] font-mono text-forge-subtext">{worstDay.calories} kcal</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="label text-[10px]">SMART INSIGHTS</p>
        {tips.map((tip, i) => (
          <div key={i} className="flex gap-2 text-sm text-forge-subtext font-body">
            <span className="text-forge-accent mt-0.5 flex-shrink-0">→</span>
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  )
}