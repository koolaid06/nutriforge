const GOALS = {
  cut:      { label: 'Cut',      icon: '↓', delta: '−500 kcal/day', desc: 'Lose fat, preserve muscle',   color: '#ef5350', bg: 'bg-red-950/40',   border: 'border-red-800/50'   },
  maintain: { label: 'Maintain', icon: '→', delta: '±0 kcal/day',   desc: 'Recomposition & maintenance', color: '#5c9fff', bg: 'bg-blue-950/40',  border: 'border-blue-800/50'  },
  bulk:     { label: 'Bulk',     icon: '↑', delta: '+300 kcal/day', desc: 'Build muscle & size',          color: '#4caf7d', bg: 'bg-green-950/40', border: 'border-green-800/50' },
}

export default function GoalSelector({ goal, onSelect }) {
  return (
    <div className="card space-y-4">
      <p className="label">TRANSFORMATION GOAL</p>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(GOALS).map(([key, g]) => {
          const active = goal === key
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col gap-2 min-h-[120px]
                ${active ? `${g.bg} ${g.border} border` : 'bg-forge-surface border-forge-border hover:border-forge-muted'}`}
            >
              <span className="text-xl font-body" style={{ color: active ? g.color : '#555' }}>{g.icon}</span>
              <p className="font-display font-bold text-lg leading-none" style={{ color: active ? g.color : '#a0a0a0' }}>{g.label}</p>
              <p className="text-[10px] font-mono mt-auto" style={{ color: active ? g.color : '#555' }}>{g.delta}</p>
              <p className="hidden lg:block text-[11px] font-body text-forge-subtext leading-snug">{g.desc}</p>
            </button>
          )
        })}
      </div>
      <p className="text-xs font-body text-forge-subtext lg:hidden">
        {GOALS[goal]?.desc}
      </p>
    </div>
  )
}