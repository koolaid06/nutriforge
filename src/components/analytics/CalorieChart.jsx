import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-forge-card border border-forge-border rounded-xl px-4 py-2.5 shadow-xl">
      <p className="label text-[10px] mb-1">{payload[0]?.payload?.label}</p>
      <p className="font-mono text-forge-accent text-sm">{payload[0]?.value} kcal</p>
    </div>
  )
}

export default function CalorieChart({ weeklyData, target }) {
  return (
    <div className="card space-y-4">
      <div className="flex items-start justify-between">
        <p className="label">CALORIES — LAST 7 DAYS</p>
        {target && <span className="font-mono text-xs text-forge-subtext">Target: {target} kcal</span>}
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: '#7a7a9a', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fill: '#7a7a9a', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            axisLine={false} tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e1e2e' }} />
          {target && (
            <ReferenceLine y={target} stroke="#e8ff47" strokeDasharray="4 4" strokeOpacity={0.4} />
          )}
          <Bar dataKey="calories" radius={[4, 4, 0, 0]} maxBarSize={40}>
            {weeklyData.map((entry, i) => (
              <Cell
                key={i}
                fill={
                  entry.calories === 0    ? '#1e1e2e'   :
                  !target                 ? '#4facfe'   :
                  Math.abs(entry.calories - target) / target < 0.1 ? '#e8ff47' :
                  entry.calories > target ? '#ff3b5c' : '#4facfe'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}