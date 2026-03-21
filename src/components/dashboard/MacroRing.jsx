import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#e8ff47', '#4facfe', '#ff6b35']

export default function MacroRing({ totals, targets }) {
  const macros = [
    { name: 'Protein', value: Math.round(totals.protein * 10) / 10, target: targets?.macros?.protein },
    { name: 'Carbs',   value: Math.round(totals.carbs   * 10) / 10, target: targets?.macros?.carbs   },
    { name: 'Fat',     value: Math.round(totals.fat     * 10) / 10, target: targets?.macros?.fat     },
  ]

  const calPct = targets?.targetCalories
    ? Math.min(100, Math.round((totals.calories / targets.targetCalories) * 100))
    : 0
  const remaining = (targets?.targetCalories ?? 0) - totals.calories

  return (
    <div className="card flex flex-col gap-5">
      <p className="label">TODAY'S INTAKE</p>

      {/* Ring + info side by side */}
      <div className="flex items-center gap-6">
        {/* Donut */}
        <div className="relative flex-shrink-0 w-36 h-36 lg:w-40 lg:h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{ value: calPct }, { value: 100 - calPct }]}
                cx="50%" cy="50%"
                innerRadius="62%" outerRadius="78%"
                startAngle={90} endAngle={-270}
                dataKey="value" strokeWidth={0}
              >
                <Cell fill="#e8ff47" />
                <Cell fill="#1e1e2e" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
            <span className="font-display text-4xl text-forge-text leading-none">{totals.calories}</span>
            <span className="label text-[10px]">kcal</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 space-y-3">
          <p className={`text-base font-mono font-semibold ${remaining >= 0 ? 'text-forge-accent' : 'text-forge-red'}`}>
            {remaining >= 0
              ? `${remaining} kcal remaining`
              : `${Math.abs(remaining)} kcal over target`}
          </p>
          <div className="space-y-2">
            {macros.map(({ name, value, target }, i) => (
              <div key={name} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
                  <span className="text-sm font-body text-forge-subtext">{name}</span>
                </div>
                <span className="font-mono text-sm">
                  <span style={{ color: COLORS[i] }}>{value}g</span>
                  {target && <span className="text-forge-muted"> /{target}g</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}