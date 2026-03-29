export default function TargetDisplay({ targets }) {
  if (!targets) return (
    <div className="card text-center py-10">
      <p className="text-forge-subtext text-sm font-body">Fill in your profile to see your targets</p>
    </div>
  )

  const rows = [
    { label: 'BMR',     value: targets.bmr,            unit: 'kcal', desc: 'Base metabolic rate',     color: '#a0a0a0' },
    { label: 'TDEE',    value: targets.tdee,           unit: 'kcal', desc: 'Total daily energy',       color: '#a0a0a0' },
    { label: 'Target',  value: targets.targetCalories, unit: 'kcal', desc: 'Your daily goal',          color: '#ff7043' },
    { label: 'Protein', value: targets.macros.protein, unit: 'g',    desc: '4 kcal/g · muscle builder',color: '#ffd54f' },
    { label: 'Carbs',   value: targets.macros.carbs,   unit: 'g',    desc: '4 kcal/g · energy source', color: '#5c9fff' },
    { label: 'Fat',     value: targets.macros.fat,     unit: 'g',    desc: '9 kcal/g · essential fats',color: '#ff7043' },
  ]

  return (
    <div className="card space-y-1">
      <p className="label mb-4">YOUR CALCULATED TARGETS</p>
      {rows.map(({ label, value, unit, desc, color }, i) => (
        <div key={label}
             className={`flex items-center justify-between py-3.5 px-1
                         ${i < rows.length - 1 ? 'border-b border-forge-border' : ''}`}>
          <div>
            <p className="font-body font-semibold text-sm text-forge-text">{label}</p>
            <p className="text-xs font-body text-forge-subtext hidden sm:block">{desc}</p>
          </div>
          <div className="text-right">
            <span className="font-display font-bold text-2xl leading-none" style={{ color }}>{value}</span>
            <span className="text-forge-muted text-xs font-mono ml-1">{unit}/day</span>
          </div>
        </div>
      ))}
    </div>
  )
}