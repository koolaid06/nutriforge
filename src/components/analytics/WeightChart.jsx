import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { formatDate } from '../../utils/dateHelpers'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-forge-card border border-forge-border rounded-xl px-4 py-2.5 shadow-xl">
      <p className="label text-[10px] mb-1">{payload[0]?.payload?.date}</p>
      <p className="font-mono text-forge-accent text-sm">{payload[0]?.value} kg</p>
    </div>
  )
}

export default function WeightChart({ weightLog, profile }) {
  const data = weightLog.slice(-30).map(e => ({
    date:   formatDate(e.date),
    weight: e.weight,
  }))

  const startWeight = data[0]?.weight
  const latest = data[data.length - 1]?.weight
  const delta = latest && startWeight ? (latest - startWeight).toFixed(1) : null

  if (!data.length) {
    return (
      <div className="card flex flex-col items-center justify-center py-12 text-center">
        <p className="text-forge-subtext text-sm">No weight data yet</p>
        <p className="text-forge-muted text-xs mt-1">Log your weight in Settings</p>
      </div>
    )
  }

  return (
    <div className="card space-y-4">
      <div className="flex items-start justify-between">
        <p className="label">WEIGHT PROGRESS</p>
        {delta !== null && (
          <span className={`font-mono text-sm ${parseFloat(delta) < 0 ? 'text-forge-accent' : 'text-forge-orange'}`}>
            {parseFloat(delta) > 0 ? '+' : ''}{delta} kg
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
          <XAxis
            dataKey="date"
            tick={{ fill: '#7a7a9a', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            axisLine={false} tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={['dataMin - 1', 'dataMax + 1']}
            tick={{ fill: '#7a7a9a', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            axisLine={false} tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {profile?.weight && (
            <ReferenceLine y={profile.weight} stroke="#1e1e2e" strokeDasharray="4 4" />
          )}
          <Line
            type="monotone" dataKey="weight"
            stroke="#e8ff47" strokeWidth={2}
            dot={{ fill: '#e8ff47', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#e8ff47' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}