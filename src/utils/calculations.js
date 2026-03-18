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
 */
export function calcMacros(targetCalories, goal) {
  const ratios = MACRO_RATIOS[goal] ?? MACRO_RATIOS.maintain
  return {
    protein: Math.round((targetCalories * ratios.protein) / 4),
    carbs:   Math.round((targetCalories * ratios.carbs)   / 4),
    fat:     Math.round((targetCalories * ratios.fat)     / 9),
  }
}

export function calcAllTargets(profile) {
  if (!profile?.weight) return null
  const bmr     = calcBMR(profile)
  const tdee    = calcTDEE(bmr, profile.activity)
  const target  = calcTargetCalories(tdee, profile.goal)
  const macros  = calcMacros(target, profile.goal)
  return { bmr, tdee, targetCalories: target, macros }
}