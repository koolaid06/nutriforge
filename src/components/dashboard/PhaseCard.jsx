import { PHASE_LABELS } from '../../constants/macroRatios'

export default function PhaseCard({ goal, targets, latestWeight, profile }) {
  const phase = PHASE_LABELS[goal] ?? PHASE_LABELS.maintain

  return (
    <div className={`card border ${phase.border} space-y-4`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="label">CURRENT PHASE</p>
          <h2 className={`font-display text-5xl tracking-wider mt-1 ${phase.color}`}>
            {phase.label}
          </h2>
        </div>
        <div className={`tag ${phase.bg} ${phase.border} border ${phase.color} text-xs`}>
          ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-forge-surface rounded-xl p-3">
          <p className="label text-[10px] mb-1">TARGET</p>
          <p className="font-display text-2xl text-forge-text">{targets?.targetCalories ?? '—'}</p>
          <p className="label text-[10px]">KCAL/DAY</p>
        </div>
        <div className="bg-forge-surface rounded-xl p-3">
          <p className="label text-[10px] mb-1">TDEE</p>
          <p className="font-display text-2xl text-forge-text">{targets?.tdee ?? '—'}</p>
          <p className="label text-[10px]">MAINTENANCE</p>
        </div>
        <div className="bg-forge-surface rounded-xl p-3">
          <p className="label text-[10px] mb-1">WEIGHT</p>
          <p className="font-display text-2xl text-forge-text">{latestWeight ?? profile?.weight ?? '—'}</p>
          <p className="label text-[10px]">KG</p>
        </div>
      </div>
    </div>
  )
}