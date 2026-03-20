export default function TargetDisplay({ targets }) {
  if (!targets) return (
    <div className="card text-center py-8">
      <p className="text-forge-subtext text-sm">Fill in your profile to see targets</p>
    </div>
  )

  const rows = [
    { label: 'BMR',     value: targets.bmr,             unit: 'kcal/day', sub: 'Basal Metabolic Rate'    },
    { label: 'TDEE',    value: targets.tdee,            unit: 'kcal/day', sub: 'Total Daily Energy'       },
    { label: 'TARGET',  value: targets.targetCalories,  unit: 'kcal/day', sub: 'With goal adjustment'     },
    { label: 'PROTEIN', value: targets.macros.protein,  unit: 'g/day',    sub: '4 kcal per gram'          },
    { label: 'CARBS',   value: targets.macros.carbs,    unit: 'g/day',    sub: '4 kcal per gram'          },
    { label: 'FAT',     value: targets.macros.fat,      unit: 'g/day',    sub: '9 kcal per gram'          },
  ]

  return (
    <div className="card space-y-1">
      <p className="label mb-3">YOUR TARGETS</p>
      {rows.map(({ label, value, unit, sub }) => (
        <div key={label} className="flex items-center justify-between py-2.5
                                    border-b border-forge-border last:border-0">
          <div className="min-w-0">
            <p className="label text-[10px]">{label}</p>
            <p className="text-forge-subtext text-xs font-body hidden sm:block">{sub}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="font-display text-2xl text-forge-accent leading-none">{value}</span>
            <span className="text-forge-muted text-xs font-mono ml-1">{unit}</span>
          </div>
        </div>
      ))}
    </div>
  )
}