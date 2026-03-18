import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#e8ff47', '#4facfe', '#ff6b35', '#ff3b5c']

export default function MacroRing({ totals, targets }) {
  const data = [
    { name: 'Protein', value: totals.protein, target: targets?.macros?.protein },
    { name: 'Carbs',   value: totals.carbs,   target: targets?.macros?.carbs   },
    { name: 'Fat',     value: totals.fat,      target: targets?.macros?.fat     },
  ]

  const calPct = targets?.targetCalories
    ? Math.min(100, Math.round((totals.calories / targets.targetCalories) * 100))
    : 0

  const remaining = (targets?.targetCalories ?? 0) - totals.calories

  return (
    <div className="card flex flex-col items-center gap-4">
      <p className="label self-start">TODAY'S INTAKE</p>

      <div className="relative w-44 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { value: calPct },
                { value: 100 - calPct },
              ]}
              cx="50%" cy="50%"
              innerRadius={60} outerRadius={72}
              startAngle={90} endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill="#e8ff47" />
              <Cell fill="#1e1e2e" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl text-forge-text">{totals.calories}</span>
          <span className="label text-xs">kcal</span>
        </div>
      </div>

      <p className="text-forge-subtext text-sm">
        {remaining > 0
          ? <><span className="text-forge-accent font-mono">{remaining}</span> kcal remaining</>
          : <><span className="text-forge-red font-mono">{Math.abs(remaining)}</span> kcal over</>
        }
      </p>

      <div className="w-full grid grid-cols-3 gap-2">
        {data.map(({ name, value, target }, i) => (
          <div key={name} className="bg-forge-surface rounded-xl p-3 text-center">
            <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ background: COLORS[i] }} />
            <p className="font-mono text-sm font-semibold" style={{ color: COLORS[i] }}>{value}g</p>
            <p className="label text-[10px]">{name}</p>
            {target && <p className="text-forge-muted text-[10px] font-mono">/{target}g</p>}
          </div>
        ))}
      </div>
    </div>
  )
}