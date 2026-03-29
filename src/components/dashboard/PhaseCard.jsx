import { PHASE_LABELS } from '../../constants/macroRatios'

const PHASE_STYLES = {
  cut:      { bg: 'from-red-950/60 to-forge-card',    accent: '#ef5350', label: 'CUT'      },
  bulk:     { bg: 'from-green-950/60 to-forge-card',  accent: '#4caf7d', label: 'BULK'     },
  maintain: { bg: 'from-blue-950/60 to-forge-card',   accent: '#5c9fff', label: 'MAINTAIN' },
}

export default function PhaseCard({ goal, targets, latestWeight, profile }) {
  const phase = PHASE_LABELS[goal]   ?? PHASE_LABELS.maintain
  const style = PHASE_STYLES[goal]   ?? PHASE_STYLES.maintain

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-forge-border
                     bg-gradient-to-br ${style.bg} p-5 h-full flex flex-col gap-5`}>
      {/* Decorative circle */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
           style={{ background: style.accent }} />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="label mb-2">CURRENT PHASE</p>
          <h2 className="font-display font-extrabold text-5xl lg:text-6xl leading-none"
              style={{ color: style.accent }}>
            {style.label}
          </h2>
        </div>
        <span className="text-[10px] font-body font-semibold px-2.5 py-1 rounded-full border"
              style={{ color: style.accent, borderColor: style.accent + '40', background: style.accent + '15' }}>
          ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 relative z-10 mt-auto">
        {[
          { label: 'Target',   value: targets?.targetCalories ?? '—', unit: 'kcal/day' },
          { label: 'TDEE',     value: targets?.tdee ?? '—',           unit: 'maintain'  },
          { label: 'Weight',   value: latestWeight ?? profile?.weight ?? '—', unit: 'kg' },
        ].map(({ label, value, unit }) => (
          <div key={label} className="bg-black/20 backdrop-blur-sm rounded-xl p-3.5 text-center border border-white/5">
            <p className="text-[10px] font-body text-forge-subtext uppercase tracking-wider mb-1.5">{label}</p>
            <p className="font-display font-bold text-forge-text text-2xl lg:text-3xl leading-none">{value}</p>
            <p className="text-[10px] text-forge-muted font-body mt-1">{unit}</p>
          </div>
        ))}
      </div>
    </div>
  )
}