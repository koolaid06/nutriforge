/**
 * Adaptive calorie adjustment based on 2-week weight trend vs goal
 */
export function getAdaptiveSuggestion({ weightLog, goal, targetCalories }) {
  if (!weightLog || weightLog.length < 5) return null

  const recent = weightLog.slice(-14)
  const first  = recent[0].weight
  const last   = recent[recent.length - 1].weight
  const delta  = last - first // kg change over ~2 weeks

  const weeklyDelta = delta / (recent.length / 7)

  if (goal === 'cut') {
    if (weeklyDelta > -0.1) {
      return {
        type:    'decrease',
        amount:  150,
        message: 'Weight loss stalled. Consider reducing calories by ~150 kcal.',
        newTarget: targetCalories - 150,
      }
    }
    if (weeklyDelta < -0.7) {
      return {
        type:    'increase',
        amount:  100,
        message: 'Losing too fast. Increase calories by ~100 kcal to preserve muscle.',
        newTarget: targetCalories + 100,
      }
    }
  }

  if (goal === 'bulk') {
    if (weeklyDelta < 0.1) {
      return {
        type:    'increase',
        amount:  150,
        message: 'Not gaining. Increase calories by ~150 kcal to drive growth.',
        newTarget: targetCalories + 150,
      }
    }
    if (weeklyDelta > 0.5) {
      return {
        type:    'decrease',
        amount:  100,
        message: 'Gaining too fast. Drop ~100 kcal to limit excess fat gain.',
        newTarget: targetCalories - 100,
      }
    }
  }

  return {
    type:    'on_track',
    message: 'Progress is on track. Keep it up!',
    newTarget: targetCalories,
  }
}