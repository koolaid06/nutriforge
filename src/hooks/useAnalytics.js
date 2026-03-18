import { useMemo } from 'react'
import { getLast7Days, getLast30Days, formatDate } from '../utils/dateHelpers'
import { getMealTotals } from './useMeals'

export function useAnalytics() {
  const last7  = useMemo(() => getLast7Days(),  [])
  const last30 = useMemo(() => getLast30Days(), [])

  const weeklyData = useMemo(() => last7.map(date => ({
    date,
    label: formatDate(date),
    ...getMealTotals(date),
  })), [last7])

  const monthlyData = useMemo(() => last30.map(date => ({
    date,
    label: formatDate(date),
    ...getMealTotals(date),
  })), [last30])

  const weeklyAvg = useMemo(() => {
    const logged = weeklyData.filter(d => d.calories > 0)
    if (!logged.length) return { calories: 0, protein: 0, carbs: 0, fat: 0 }
    const sum = logged.reduce((a, d) => ({
      calories: a.calories + d.calories,
      protein:  a.protein  + d.protein,
      carbs:    a.carbs    + d.carbs,
      fat:      a.fat      + d.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 })
    return {
      calories: Math.round(sum.calories / logged.length),
      protein:  Math.round(sum.protein  / logged.length),
      carbs:    Math.round(sum.carbs    / logged.length),
      fat:      Math.round(sum.fat      / logged.length),
    }
  }, [weeklyData])

  const bestDay = useMemo(() =>
    weeklyData.reduce((best, d) => (!best || d.calories > best.calories) ? d : best, null),
  [weeklyData])

  const worstDay = useMemo(() =>
    weeklyData.filter(d => d.calories > 0)
              .reduce((worst, d) => (!worst || d.calories < worst.calories) ? d : worst, null),
  [weeklyData])

  return { weeklyData, monthlyData, weeklyAvg, bestDay, worstDay }
}