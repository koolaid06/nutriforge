import { PHASE_LABELS } from '../../constants/macroRatios'

const GOAL_INFO = {
  cut:      { desc: 'Caloric deficit to lose fat while preserving muscle', delta: '−500 kcal/day' },
  maintain: { desc: 'Eat at TDEE for body recomposition or maintenance',   delta: '±0 kcal/day'  },
  bulk:     { desc: 'Caloric surplus to maximize muscle growth',           delta: '+300 kcal/day' },
}

export default function GoalSelector({ goal, onSelect }) {
  return (
    <div className="card space-y-4">
      <p className="label">TRANSFORMATION GOAL</p>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(GOAL_INFO).map(([key, { desc, delta }]) => {
          const phase = PHASE_LABELS[key]
          const active = goal === key
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`p-4 rounded-xl border text-left transition-all duration-200
                ${active
                  ? `${phase.bg} ${phase.border} border`
                  : 'bg-forge-surface border-forge-border hover:border-forge-muted'
                }`}
            >
              <p className={`font-display text-2xl tracking-wider ${active ? phase.color : 'text-forge-subtext'}`}>
                {phase.label}
              </p>
              <p className={`font-mono text-xs mt-1 ${active ? phase.color : 'text-forge-muted'}`}>{delta}</p>
              <p className="text-xs text-forge-subtext mt-2 font-body leading-relaxed">{desc}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}