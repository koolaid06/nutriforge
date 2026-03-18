import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from 'recharts'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_LABELS = ['S','M','T','W','T','F','S']

function fmt(dateStr) {
  const d = new Date(dateStr)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-forge-card border border-forge-border rounded-xl px-3 py-2 shadow-xl">
      <p className="label text-[10px]">{fmt(payload[0]?.payload?.date)}</p>
      <p className="font-mono text-forge-accent text-sm font-semibold">{payload[0]?.value} kg</p>
    </div>
  )
}

export default function WeightTracker({ weightLog, addWeight, setWeightForDate, removeWeight }) {
  const [input, setInput]       = useState('')
  const [saved, setSaved]       = useState(false)
  const [editDate, setEditDate] = useState(null)
  const [editVal, setEditVal]   = useState('')
  const [showAll, setShowAll]   = useState(false)

  const today = new Date().toISOString().slice(0, 10)
  const latestWeight = weightLog.length ? weightLog[weightLog.length - 1].weight : null
  const chartData = weightLog.slice(-30).map(e => ({ date: e.date, weight: e.weight, label: fmt(e.date) }))
  const startWeight = chartData[0]?.weight
  const delta = latestWeight && startWeight ? (latestWeight - startWeight).toFixed(1) : null

  // Last 14 days grid
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (13 - i))
    return d.toISOString().slice(0, 10)
  })

  function logWeight() {
    if (!input) return
    addWeight(input)
    setInput('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function startEdit(date, currentVal) {
    setEditDate(date)
    setEditVal(currentVal ?? '')
  }

  function saveEdit(date) {
    if (editVal && !isNaN(editVal) && editVal.trim() !== '') {
      setWeightForDate(date, editVal)
    }
    setEditDate(null)
    setEditVal('')
  }

  function getWeight(date) {
    return weightLog.find(e => e.date === date)?.weight ?? null
  }

  const displayLog = showAll ? [...weightLog].reverse() : [...weightLog].reverse().slice(0, 5)

  return (
    <div className="card space-y-5">

      {/* Log today */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            inputMode="decimal"
            value={input}
            onChange={e => setInput(e.target.value.replace(/[^0-9.]/g, ''))}
            onKeyDown={e => e.key === 'Enter' && logWeight()}
            placeholder="Enter today's weight in kg"
            className="w-full bg-forge-surface border border-forge-border rounded-xl px-4 py-3
                       text-forge-text text-sm font-mono placeholder-forge-muted
                       focus:outline-none focus:border-forge-accent transition-colors
                       [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                       [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-forge-muted text-xs font-mono">kg</span>
        </div>
        <button onClick={logWeight} className="btn-primary px-6 py-3 flex-shrink-0">
          {saved ? '✓ SAVED' : 'LOG'}
        </button>
      </div>

      {/* Stats row */}
      {latestWeight && (
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-forge-surface rounded-xl p-3 text-center">
            <p className="font-display text-2xl text-forge-accent">{latestWeight}</p>
            <p className="label text-[10px] mt-0.5">CURRENT KG</p>
          </div>
          <div className="bg-forge-surface rounded-xl p-3 text-center">
            <p className={`font-display text-2xl ${delta && parseFloat(delta) < 0 ? 'text-forge-accent' : 'text-forge-orange'}`}>
              {delta ? (parseFloat(delta) > 0 ? `+${delta}` : delta) : '—'}
            </p>
            <p className="label text-[10px] mt-0.5">KG CHANGE</p>
          </div>
          <div className="bg-forge-surface rounded-xl p-3 text-center">
            <p className="font-display text-2xl text-forge-text">{weightLog.length}</p>
            <p className="label text-[10px] mt-0.5">DAYS LOGGED</p>
          </div>
        </div>
      )}

      {/* Chart */}
      {chartData.length >= 2 ? (
        <div>
          <p className="label text-[10px] mb-3">WEIGHT TREND</p>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -24 }}>
              <XAxis
                dataKey="label"
                tick={{ fill: '#4a4a6a', fontSize: 9, fontFamily: 'JetBrains Mono' }}
                axisLine={false} tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={['dataMin - 0.5', 'dataMax + 0.5']}
                tick={{ fill: '#4a4a6a', fontSize: 9, fontFamily: 'JetBrains Mono' }}
                axisLine={false} tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone" dataKey="weight"
                stroke="#e8ff47" strokeWidth={2}
                dot={{ fill: '#e8ff47', r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#e8ff47' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : chartData.length === 1 && (
        <p className="text-forge-muted text-xs font-mono text-center py-2 bg-forge-surface rounded-xl">
          Log one more day to see your trend chart
        </p>
      )}

      {/* 14-day grid */}
      <div>
        <p className="label text-[10px] mb-3">LAST 14 DAYS — tap to edit</p>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAY_LABELS.map((d, i) => (
            <p key={i} className="text-center label text-[9px]">{d}</p>
          ))}
        </div>
        {/* empty offset cells */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: new Date(last14[0]).getDay() }, (_, i) => (
            <div key={`e${i}`} />
          ))}
          {last14.map(date => {
            const w = getWeight(date)
            const isToday   = date === today
            const isEditing = editDate === date
            const day       = new Date(date).getDate()

            return (
              <button
                key={date}
                onClick={() => !isEditing && startEdit(date, w)}
                className={`rounded-xl p-1.5 text-center transition-all duration-150 border
                  ${w
                    ? 'bg-forge-accent/10 border-forge-accent/30'
                    : 'bg-forge-surface border-forge-border hover:border-forge-muted'
                  }
                  ${isToday ? 'ring-1 ring-forge-accent ring-offset-1 ring-offset-forge-bg' : ''}
                `}
              >
                <p className="text-[9px] font-mono text-forge-muted leading-none mb-1">{day}</p>
                {isEditing ? (
                  <input
                    autoFocus
                    type="text"
                    inputMode="decimal"
                    value={editVal}
                    onChange={e => setEditVal(e.target.value.replace(/[^0-9.]/g, ''))}
                    onBlur={() => saveEdit(date)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveEdit(date)
                      if (e.key === 'Escape') setEditDate(null)
                    }}
                    onClick={e => e.stopPropagation()}
                    className="w-full bg-transparent text-forge-accent font-mono text-[10px]
                               text-center outline-none border-b border-forge-accent leading-none
                               [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                               [&::-webkit-inner-spin-button]:appearance-none"
                  />
                ) : (
                  <p className={`font-mono text-[10px] leading-none font-semibold
                    ${w ? 'text-forge-accent' : 'text-forge-border'}`}>
                    {w ?? '·'}
                  </p>
                )}
              </button>
            )
          })}
        </div>
        <p className="text-forge-muted text-[10px] font-mono mt-2">Tap any cell to add or edit weight</p>
      </div>
    </div>
  )
}