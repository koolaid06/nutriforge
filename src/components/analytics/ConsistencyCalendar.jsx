import { getLast16Weeks, formatDate } from '../../utils/dateHelpers'
import { getMealTotals } from '../../hooks/useMeals'
import { useMemo } from 'react'

export default function ConsistencyCalendar({ targets }) {
  const weeks = useMemo(() => getLast16Weeks().slice(-12), [])

  let totalDays = 0
  let goodDays = 0
  let loggedDays = 0

  function getStatus(date) {
    const totals = getMealTotals(date)

    if (totals.calories === 0) return 'none'

    loggedDays++

    if (!targets?.targetCalories) return 'ok'

    const pct = totals.calories / targets.targetCalories

    totalDays++

    if (pct >= 0.9 && pct <= 1.1) {
      goodDays++
      return 'perfect'
    }

    if (pct >= 0.75 && pct <= 1.25) return 'okay'

    return pct < 0.75 ? 'low' : 'high'
  }

  const COLORS = {
    none: 'bg-forge-border',
    low: 'bg-red-500/60',
    high: 'bg-yellow-400/70',
    okay: 'bg-lime-400/60',
    perfect: 'bg-lime-400'
  }

  const today = new Date().toISOString().slice(0, 10)

  const consistency = totalDays ? Math.round((goodDays / totalDays) * 100) : 0

  return (
    <div className="card space-y-5">

      {/* 🔥 HEADER + STATS */}
      <div className="flex items-center justify-between flex-wrap gap-3">

        <p className="label">CONSISTENCY</p>

        <div className="flex items-center gap-4 text-xs font-mono">

          <div>
            <p className="text-forge-muted">Score</p>
            <p className="text-lg font-bold text-forge-text">{consistency}%</p>
          </div>

          <div>
            <p className="text-forge-muted">Good Days</p>
            <p className="text-lg font-bold text-lime-400">{goodDays}</p>
          </div>

          <div>
            <p className="text-forge-muted">Logged</p>
            <p className="text-lg font-bold text-forge-text">{loggedDays}</p>
          </div>

        </div>
      </div>

      {/* 🔥 GRID */}
      <div className="flex gap-2 overflow-x-auto pb-2">

        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-2">

            {week.map((date, di) => {
              const status = getStatus(date)
              const isToday = date === today

              return (
                <div
                  key={di}
                  title={`${formatDate(date)}: ${getMealTotals(date).calories} kcal`}
                  className={`
                    w-6 h-6 rounded-md transition-all
                    ${COLORS[status]}
                    ${isToday ? 'ring-2 ring-white' : ''}
                    hover:scale-110
                  `}
                />
              )
            })}

          </div>
        ))}

      </div>

      {/* 🔥 LEGEND */}
      <div className="flex items-center gap-3 text-[10px] font-mono text-forge-muted flex-wrap">

        <Legend color="bg-lime-400" label="Perfect" />
        <Legend color="bg-lime-400/60" label="Close" />
        <Legend color="bg-yellow-400/70" label="Over" />
        <Legend color="bg-red-500/60" label="Under" />
        <Legend color="bg-forge-border" label="No log" />

      </div>

    </div>
  )
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`w-3 h-3 rounded ${color}`} />
      <span>{label}</span>
    </div>
  )
}