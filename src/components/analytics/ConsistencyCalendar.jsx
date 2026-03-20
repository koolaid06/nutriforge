import { getLast16Weeks, formatDate } from '../../utils/dateHelpers'
import { getMealTotals } from '../../hooks/useMeals'
import { useMemo } from 'react'

export default function ConsistencyCalendar({ targets }) {
  const weeks = useMemo(() => getLast16Weeks(), [])

  function getIntensity(date) {
    const totals = getMealTotals(date)
    if (totals.calories === 0) return 0
    if (!targets?.targetCalories) return 1
    const pct = totals.calories / targets.targetCalories
    if (pct >= 0.9 && pct <= 1.1) return 4
    if (pct >= 0.8 && pct <= 1.2) return 3
    if (pct >= 0.6)               return 2
    return 1
  }

  const COLORS = [
    'bg-forge-border',
    'bg-forge-accent/20',
    'bg-forge-accent/40',
    'bg-forge-accent/70',
    'bg-forge-accent',
  ]

  const today = new Date().toISOString().slice(0, 10)
  // Only show M, W, F labels to avoid crowding
  const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <p className="label">CONSISTENCY CALENDAR</p>
        <div className="flex items-center gap-1.5">
          <span className="label text-[10px]">LESS</span>
          {COLORS.map((c, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
          <span className="label text-[10px]">MORE</span>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {/* Day labels column */}
        <div className="flex flex-col gap-1.5 flex-shrink-0 justify-start">
          {DAY_LABELS.map((d, i) => (
            <div key={i} className="w-4 h-4 flex items-center justify-center flex-shrink-0">
              <span className="text-[9px] font-mono text-forge-muted leading-none">
                {i === 1 || i === 3 || i === 5 ? d : ''}
              </span>
            </div>
          ))}
        </div>

        {/* Week columns */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1.5 flex-shrink-0">
            {week.map((date, di) => {
              const intensity = getIntensity(date)
              const isToday   = date === today
              const isFuture  = date > today
              return (
                <div
                  key={di}
                  title={isFuture ? '' : `${formatDate(date)}: ${getMealTotals(date).calories} kcal`}
                  className={`w-4 h-4 rounded-sm transition-all flex-shrink-0
                    ${isFuture ? 'bg-forge-bg' : COLORS[intensity]}
                    ${isToday ? 'ring-1 ring-forge-accent ring-offset-1 ring-offset-forge-bg' : ''}
                    ${!isFuture ? 'hover:brightness-150 cursor-default' : 'cursor-default'}`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}