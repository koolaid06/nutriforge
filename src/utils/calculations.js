import { MACRO_RATIOS, ACTIVITY_MULTIPLIERS } from '../constants/macroRatios'

/**
 * Mifflin-St Jeor BMR
 * Male:   10*weight(kg) + 6.25*height(cm) - 5*age + 5
 * Female: 10*weight(kg) + 6.25*height(cm) - 5*age - 161
 */
export function calcBMR({ weight, height, age, sex }) {
  const base = 10 * weight + 6.25 * height - 5 * age
  return Math.round(sex === 'male' ? base + 5 : base - 161)
}

export function calcTDEE(bmr, activity) {
  const multiplier = ACTIVITY_MULTIPLIERS[activity] ?? 1.55
  return Math.round(bmr * multiplier)
}

export function calcTargetCalories(tdee, goal) {
  if (goal === 'cut')  return Math.round(tdee - 500)
  if (goal === 'bulk') return Math.round(tdee + 300)
  return tdee
}

/**
 * Returns macro targets in grams
 * Protein & carbs = 4 kcal/g, fat = 9 kcal/g
 *
 * Protein is capped at 2.2g/kg bodyweight (evidence-based upper limit).
 * Remaining calories after protein + fat are assigned to carbs.
 */
export function calcMacros(targetCalories, goal, weight) {
  const ratios = MACRO_RATIOS[goal] ?? MACRO_RATIOS.maintain

  // Protein: ratio-based but capped at 2.2g per kg bodyweight
  const proteinFromRatio = Math.round((targetCalories * ratios.protein) / 4)
  const proteinCap       = weight ? Math.round(weight * 2.2) : proteinFromRatio
  const protein          = Math.min(proteinFromRatio, proteinCap)

  // Fat: fixed ratio
  const fat = Math.round((targetCalories * ratios.fat) / 9)

  // Carbs: remaining calories after protein and fat
  const usedCalories = protein * 4 + fat * 9
  const carbs        = Math.round(Math.max(0, targetCalories - usedCalories) / 4)

  return { protein, carbs, fat }
}

export function calcAllTargets(profile) {
  if (!profile?.weight) return null
  const bmr     = calcBMR(profile)
  const tdee    = calcTDEE(bmr, profile.activity)
  const target  = calcTargetCalories(tdee, profile.goal)
  const macros  = calcMacros(target, profile.goal, profile.weight)
  return { bmr, tdee, targetCalories: target, macros }
}