import { PHASE_LABELS } from '../../constants/macroRatios'

export default function PhaseCard({ goal, targets, latestWeight, profile }) {
  const phase = PHASE_LABELS[goal] ?? PHASE_LABELS.maintain

  return (
    <div className={`card border ${phase.border} h-full flex flex-col gap-4`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="label">CURRENT PHASE</p>
          <h2 className={`font-display text-6xl lg:text-7xl tracking-wider leading-none mt-1 ${phase.color}`}>
            {phase.label}
          </h2>
        </div>
        <span className={`tag ${phase.bg} border ${phase.border} ${phase.color} text-xs mt-1`}>
          ACTIVE
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-auto">
        {[
          { label: 'TARGET',  value: targets?.targetCalories ?? '—', unit: 'kcal/day' },
          { label: 'TDEE',    value: targets?.tdee            ?? '—', unit: 'maintain' },
          { label: 'WEIGHT',  value: latestWeight ?? profile?.weight ?? '—', unit: 'kg' },
        ].map(({ label, value, unit }) => (
          <div key={label} className="bg-forge-surface rounded-2xl p-4 text-center">
            <p className="label text-[10px] mb-1">{label}</p>
            <p className="font-display text-3xl lg:text-4xl text-forge-text leading-none">{value}</p>
            <p className="label text-[10px] mt-1.5">{unit}</p>
          </div>
        ))}
      </div>
    </div>
  )
}