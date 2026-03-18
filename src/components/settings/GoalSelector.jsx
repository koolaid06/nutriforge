import { PHASE_LABELS } from '../../constants/macroRatios'

const GOAL_INFO = {
  cut:      { desc: 'Lose fat, preserve muscle', delta: '−500 kcal/day', icon: '↓' },
  maintain: { desc: 'Recomposition & maintenance', delta: '±0 kcal/day',  icon: '→' },
  bulk:     { desc: 'Build muscle & size',        delta: '+300 kcal/day', icon: '↑' },
}

export default function GoalSelector({ goal, onSelect }) {
  return (
    <div className="card space-y-4">
      <p className="label">TRANSFORMATION GOAL</p>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(GOAL_INFO).map(([key, { desc, delta, icon }]) => {
          const phase = PHASE_LABELS[key]
          const active = goal === key
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`relative p-3 lg:p-4 rounded-xl border text-left transition-all duration-200
                flex flex-col gap-2
                ${active
                  ? `${phase.bg} ${phase.border} border`
                  : 'bg-forge-surface border-forge-border hover:border-forge-muted'
                }`}
            >
              {/* Icon */}
              <span className={`text-xl font-display leading-none ${active ? phase.color : 'text-forge-muted'}`}>
                {icon}
              </span>

              {/* Phase name */}
              <p className={`font-display text-xl lg:text-2xl tracking-wider leading-none
                ${active ? phase.color : 'text-forge-subtext'}`}>
                {phase.label}
              </p>

              {/* Delta — nowrap to prevent wrapping */}
              <p className={`font-mono text-[11px] lg:text-xs whitespace-nowrap
                ${active ? phase.color : 'text-forge-muted'}`}>
                {delta}
              </p>

              {/* Desc — hidden on mobile, shown on lg */}
              <p className="hidden lg:block text-xs text-forge-subtext font-body leading-relaxed">
                {desc}
              </p>

              {/* Active indicator dot */}
              {active && (
                <span className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${phase.color.replace('text-', 'bg-')}`} />
              )}
            </button>
          )
        })}
      </div>

      {/* Show desc below on mobile for active goal */}
      <p className="lg:hidden text-xs text-forge-subtext font-body bg-forge-surface rounded-xl px-4 py-3">
        {GOAL_INFO[goal]?.desc}
      </p>
    </div>
  )
}