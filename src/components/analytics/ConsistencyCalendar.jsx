import { getLast16Weeks, formatDate } from '../../utils/dateHelpers'
import { getMealTotals } from '../../hooks/useMeals'
import { useMemo } from 'react'

export default function ConsistencyCalendar({ targets }) {
  const weeks = useMemo(() => getLast16Weeks(), [])

  function getIntensity(date) {
    const totals = getMealTotals(date)
    if (totals.calories === 0) return 0
    if (!targets?.targetCalories)  return 1
    const pct = totals.calories / targets.targetCalories
    if (pct >= 0.9 && pct <= 1.1) return 4
    if (pct >= 0.8 && pct <= 1.2) return 3
    if (pct >= 0.6)               return 2
    return 1
  }

  const COLORS = [
    'bg-forge-border',           // 0 = no data
    'bg-forge-accent/20',        // 1 = logged, off target
    'bg-forge-accent/40',        // 2 = moderate
    'bg-forge-accent/70',        // 3 = good
    'bg-forge-accent',           // 4 = on target
  ]

  const today = new Date().toISOString().slice(0, 10)
  const DAY_LABELS = ['S','M','T','W','T','F','S']

  return (
    <div className="card space-y-4">
      <div className="flex items-start justify-between">
        <p className="label">CONSISTENCY CALENDAR</p>
        <div className="flex items-center gap-1.5">
          <span className="label text-[10px]">LESS</span>
          {COLORS.map((c, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
          <span className="label text-[10px]">MORE</span>
        </div>
      </div>

      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-1">
          {DAY_LABELS.map((d, i) => (
            <div key={i} className="w-3 h-3 flex items-center justify-center">
              <span className="text-[8px] font-mono text-forge-muted">{i % 2 === 1 ? d : ''}</span>
            </div>
          ))}
        </div>

        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((date, di) => {
              const intensity = getIntensity(date)
              const isToday   = date === today
              return (
                <div
                  key={di}
                  title={`${formatDate(date)}: ${getMealTotals(date).calories} kcal`}
                  className={`w-3 h-3 rounded-sm ${COLORS[intensity]} transition-all
                    ${isToday ? 'ring-1 ring-forge-accent ring-offset-1 ring-offset-forge-bg' : ''}
                    hover:brightness-150 cursor-default`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}