import MealItem from './MealItem'

export default function MealList({ meals, onDelete, onEdit, totals, targets }) {
  if (!meals.length) {
    return (
      <div className="card flex flex-col items-center justify-center py-10 text-center">
        <div className="text-3xl mb-3 opacity-20">✦</div>
        <p className="text-forge-subtext text-sm">No meals logged today</p>
        <p className="text-forge-muted text-xs mt-1">Tap + Add Meal to start tracking</p>
      </div>
    )
  }

  return (
    <div className="card space-y-1 p-3 lg:p-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="label">TODAY'S MEALS</p>
        <span className="font-mono text-xs text-forge-subtext">{meals.length} {meals.length === 1 ? 'entry' : 'entries'}</span>
      </div>

      <div className="divide-y divide-forge-border/50">
        {meals.map(meal => (
          <div key={meal.id} className="group">
            <MealItem meal={meal} onDelete={onDelete} onEdit={onEdit} />
          </div>
        ))}
      </div>

      {/* Totals row */}
      <div className="mt-2 pt-3 border-t border-forge-border">
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-wrap gap-1.5">
            <span className="tag text-forge-accent  bg-forge-accent/10  text-[10px]">P {totals.protein}g</span>
            <span className="tag text-forge-blue    bg-forge-blue/10    text-[10px]">C {totals.carbs}g</span>
            <span className="tag text-forge-orange  bg-forge-orange/10  text-[10px]">F {totals.fat}g</span>
          </div>
          <span className="font-mono text-sm font-semibold text-forge-accent flex-shrink-0 ml-2">
            {totals.calories} kcal
          </span>
        </div>
      </div>
    </div>
  )
}