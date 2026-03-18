import MealItem from './MealItem'

export default function MealList({ meals, onDelete, totals, targets }) {
  if (!meals.length) {
    return (
      <div className="card flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl mb-3 opacity-30">✦</div>
        <p className="text-forge-subtext text-sm">No meals logged today</p>
        <p className="text-forge-muted text-xs mt-1">Start tracking to see your intake</p>
      </div>
    )
  }

  return (
    <div className="card space-y-1">
      <div className="flex items-center justify-between mb-3">
        <p className="label">TODAY'S MEALS</p>
        <span className="font-mono text-xs text-forge-subtext">{meals.length} entries</span>
      </div>

      <div className="divide-y divide-forge-border">
        {meals.map(meal => (
          <MealItem key={meal.id} meal={meal} onDelete={onDelete} />
        ))}
      </div>

      {/* Daily total row */}
      <div className="flex items-center gap-4 py-3 px-4 mt-2 bg-forge-surface rounded-xl">
        <span className="label flex-1">TOTAL</span>
        <div className="flex items-center gap-1.5">
          <span className="tag text-forge-accent bg-forge-accent/10 text-[10px]">P {totals.protein}g</span>
          <span className="tag text-forge-blue   bg-forge-blue/10   text-[10px]">C {totals.carbs}g</span>
          <span className="tag text-forge-orange bg-forge-orange/10 text-[10px]">F {totals.fat}g</span>
        </div>
        <span className="font-mono font-semibold text-forge-accent">{totals.calories} kcal</span>
      </div>
    </div>
  )
}