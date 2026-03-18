export default function MealItem({ meal, onDelete }) {
  const chips = [
    { label: 'P', value: meal.protein, color: 'text-forge-accent bg-forge-accent/10' },
    { label: 'C', value: meal.carbs,   color: 'text-forge-blue   bg-forge-blue/10'   },
    { label: 'F', value: meal.fat,     color: 'text-forge-orange bg-forge-orange/10' },
  ]

  return (
    <div className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-forge-surface transition-colors group">
      <div className="flex-1 min-w-0">
        <p className="text-forge-text text-sm font-medium truncate">{meal.name}</p>
        <p className="text-forge-muted text-xs font-mono mt-0.5">{meal.time}</p>
      </div>

      <div className="flex items-center gap-1.5">
        {chips.map(({ label, value, color }) => (
          <span key={label} className={`tag ${color} text-[10px]`}>
            {label} {value}g
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="font-mono text-sm text-forge-text">{meal.calories} kcal</span>
        <button
          onClick={() => onDelete(meal.id)}
          className="opacity-0 group-hover:opacity-100 text-forge-muted hover:text-forge-red
                     transition-all text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}