import { PHASE_LABELS } from '../../constants/macroRatios'

export default function PhaseCard({ goal, targets, latestWeight, profile }) {
  const phase = PHASE_LABELS[goal] ?? PHASE_LABELS.maintain

  return (
    <div className={`card border ${phase.border} space-y-3`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="label">CURRENT PHASE</p>
          <h2 className={`font-display text-4xl tracking-wider mt-0.5 leading-none ${phase.color}`}>
            {phase.label}
          </h2>
        </div>
        <div className={`tag ${phase.bg} ${phase.border} border ${phase.color} text-[10px] flex-shrink-0 mt-1`}>
          ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'TARGET',  value: targets?.targetCalories ?? '—', sub: 'KCAL/DAY' },
          { label: 'TDEE',    value: targets?.tdee ?? '—',           sub: 'MAINTAIN' },
          { label: 'WEIGHT',  value: latestWeight ?? profile?.weight ?? '—', sub: 'KG' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-forge-surface rounded-xl p-2.5 text-center">
            <p className="label text-[9px] mb-0.5">{label}</p>
            <p className="font-display text-2xl text-forge-text leading-none">{value}</p>
            <p className="label text-[9px] mt-0.5">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}