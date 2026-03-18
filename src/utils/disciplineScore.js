/**
 * Discipline Score (0–100)
 * 40% — Calorie accuracy  (how close actual is to target)
 * 40% — Macro adherence   (average of P/C/F adherence)
 * 20% — Consistency streak (days logged out of last 7)
 */

export function calcDisciplineScore({ logged, targets, streak7 }) {
  if (!targets || !logged) return 0

  // Calorie accuracy: full score if within 5%, scales down to 0 at 30% deviation
  const calDiff = Math.abs(logged.calories - targets.targetCalories) / targets.targetCalories
  const calScore = Math.max(0, 1 - calDiff / 0.3) * 100

  // Macro adherence per macro
  const macroScore = (['protein', 'carbs', 'fat'].reduce((sum, key) => {
    const target = targets.macros[key]
    if (!target) return sum
    const diff = Math.abs((logged[key] ?? 0) - target) / target
    return sum + Math.max(0, 1 - diff / 0.3) * 100
  }, 0)) / 3

  // Streak consistency: streak7 = days logged in last 7
  const streakScore = ((streak7 ?? 0) / 7) * 100

  const total = calScore * 0.4 + macroScore * 0.4 + streakScore * 0.2
  return Math.round(Math.min(100, Math.max(0, total)))
}

export function scoreLabel(score) {
  if (score >= 90) return { label: 'ELITE',     color: 'text-forge-accent' }
  if (score >= 75) return { label: 'STRONG',    color: 'text-forge-blue'   }
  if (score >= 55) return { label: 'SOLID',     color: 'text-yellow-400'   }
  if (score >= 35) return { label: 'NEEDS WORK',color: 'text-forge-orange' }
  return              { label: 'OFF TRACK',  color: 'text-forge-red'    }
}