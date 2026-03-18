export const MACRO_RATIOS = {
  cut: {
    protein: 0.40,
    carbs:   0.35,
    fat:     0.25,
  },
  bulk: {
    protein: 0.30,
    carbs:   0.50,
    fat:     0.20,
  },
  maintain: {
    protein: 0.30,
    carbs:   0.45,
    fat:     0.25,
  },
}

export const PHASE_LABELS = {
  cut:      { label: 'CUT',      color: 'text-forge-red',    bg: 'bg-forge-red/10',    border: 'border-forge-red/30' },
  bulk:     { label: 'BULK',     color: 'text-forge-accent', bg: 'bg-forge-accent/10', border: 'border-forge-accent/30' },
  maintain: { label: 'MAINTAIN', color: 'text-forge-blue',   bg: 'bg-forge-blue/10',   border: 'border-forge-blue/30' },
}

export const ACTIVITY_MULTIPLIERS = {
  sedentary:    1.2,
  light:        1.375,
  moderate:     1.55,
  active:       1.725,
  very_active:  1.9,
}

export const ACTIVITY_LABELS = {
  sedentary:   'Sedentary (desk job, no exercise)',
  light:       'Light (1–3 days/week)',
  moderate:    'Moderate (3–5 days/week)',
  active:      'Active (6–7 days/week)',
  very_active: 'Very Active (2x/day training)',
}