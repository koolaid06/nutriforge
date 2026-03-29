import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const MACROS = [
  { key: 'protein', label: 'Protein', color: '#ffd54f' },
  { key: 'carbs',   label: 'Carbs',   color: '#5c9fff' },
  { key: 'fat',     label: 'Fat',     color: '#ff7043' },
]

export default function MacroRing({ totals, targets }) {
  const calPct = targets?.targetCalories
    ? Math.min(100, Math.round((totals.calories / targets.targetCalories) * 100))
    : 0
  const remaining = (targets?.targetCalories ?? 0) - totals.calories

  return (
    <div className="card flex flex-col gap-5">
      <p className="label">TODAY'S INTAKE</p>

      <div className="flex items-center gap-6">
        {/* Ring */}
        <div className="relative w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{ value: calPct }, { value: 100 - calPct }]}
                cx="50%" cy="50%"
                innerRadius="62%" outerRadius="80%"
                startAngle={90} endAngle={-270}
                dataKey="value" strokeWidth={0}
              >
                <Cell fill="#ff7043" />
                <Cell fill="#2e2e2e" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-extrabold text-3xl text-forge-text leading-none">{totals.calories}</span>
            <span className="text-[10px] font-body text-forge-subtext mt-0.5">kcal</span>
            <span className="text-[10px] font-mono text-forge-subtext">{calPct}%</span>
          </div>
        </div>

        {/* Macro list */}
        <div className="flex-1 space-y-4">
          <div>
            <p className={`text-sm font-body font-semibold ${remaining >= 0 ? 'text-forge-green' : 'text-forge-red'}`}>
              {remaining >= 0 ? `${remaining} kcal remaining` : `${Math.abs(remaining)} kcal over`}
            </p>
            <p className="text-xs text-forge-subtext font-body">of {targets?.targetCalories ?? 0} target</p>
          </div>

          {MACROS.map(({ key, label, color }) => {
            const val    = Math.round((totals[key] ?? 0) * 10) / 10
            const target = targets?.macros?.[key] ?? 0
            const pct    = target ? Math.min(100, Math.round((val / target) * 100)) : 0
            return (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-body" style={{ color }}>{label}</span>
                  <span className="text-xs font-mono text-forge-subtext">{val}g / {target}g</span>
                </div>
                <div className="h-1.5 bg-forge-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}