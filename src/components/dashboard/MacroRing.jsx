import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#e8ff47', '#4facfe', '#ff6b35', '#ff3b5c']

export default function MacroRing({ totals, targets }) {
  const data = [
    { name: 'Protein', value: Math.round(totals.protein * 10) / 10, target: targets?.macros?.protein },
    { name: 'Carbs',   value: Math.round(totals.carbs * 10) / 10,   target: targets?.macros?.carbs   },
    { name: 'Fat',     value: Math.round(totals.fat * 10) / 10,     target: targets?.macros?.fat     },
  ]

  const calPct = targets?.targetCalories
    ? Math.min(100, Math.round((totals.calories / targets.targetCalories) * 100))
    : 0

  const remaining = (targets?.targetCalories ?? 0) - totals.calories

  return (
    <div className="card space-y-3">
      <p className="label">TODAY'S INTAKE</p>

      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{ value: calPct }, { value: 100 - calPct }]}
                cx="50%" cy="50%"
                innerRadius={42} outerRadius={54}
                startAngle={90} endAngle={-270}
                dataKey="value" strokeWidth={0}
              >
                <Cell fill="#e8ff47" />
                <Cell fill="#1e1e2e" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl text-forge-text leading-none">{totals.calories}</span>
            <span className="label text-[9px]">kcal</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-2">
          <p className={`text-sm font-mono font-semibold ${remaining >= 0 ? 'text-forge-accent' : 'text-forge-red'}`}>
            {remaining >= 0 ? `${remaining} kcal left` : `${Math.abs(remaining)} kcal over`}
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {data.map(({ name, value, target }, i) => (
              <div key={name} className="bg-forge-surface rounded-lg p-2 text-center">
                <div className="w-1.5 h-1.5 rounded-full mx-auto mb-1" style={{ background: COLORS[i] }} />
                <p className="font-mono text-xs font-semibold leading-none" style={{ color: COLORS[i] }}>{value}g</p>
                <p className="label text-[9px] mt-0.5 truncate">{name}</p>
                {target && <p className="text-forge-muted text-[9px] font-mono">/{target}g</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}