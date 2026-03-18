import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-forge-card border border-forge-border rounded-xl px-4 py-2.5 shadow-xl space-y-1">
      <p className="label text-[10px]">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="font-mono text-xs" style={{ color: p.color }}>
          {p.name}: {p.value}g
        </p>
      ))}
    </div>
  )
}

export default function MacroTrendChart({ weeklyData }) {
  return (
    <div className="card space-y-4">
      <p className="label">MACRO TREND — 7 DAYS</p>

      <div className="flex gap-4 text-xs font-mono">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-forge-accent inline-block"/>Protein</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-forge-blue   inline-block"/>Carbs</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-forge-orange inline-block"/>Fat</span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#e8ff47" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#e8ff47" stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#4facfe" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4facfe" stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="gF" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ff6b35" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ff6b35" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" tick={{ fill:'#7a7a9a', fontSize:10, fontFamily:'JetBrains Mono' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill:'#7a7a9a', fontSize:10, fontFamily:'JetBrains Mono' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="protein" stroke="#e8ff47" strokeWidth={2} fill="url(#gP)" name="Protein" />
          <Area type="monotone" dataKey="carbs"   stroke="#4facfe" strokeWidth={2} fill="url(#gC)" name="Carbs"   />
          <Area type="monotone" dataKey="fat"     stroke="#ff6b35" strokeWidth={2} fill="url(#gF)" name="Fat"     />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}