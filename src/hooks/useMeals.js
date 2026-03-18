import { useState, useCallback } from 'react'
import { todayKey } from '../utils/dateHelpers'

function keyFor(date) { return `nf_meals_${date}` }

function loadMeals(date) {
  try {
    const stored = localStorage.getItem(keyFor(date))
    return stored ? JSON.parse(stored) : []
  } catch { return [] }
}

function saveMeals(date, meals) {
  localStorage.setItem(keyFor(date), JSON.stringify(meals))
}

export function useMeals(date = todayKey()) {
  const [meals, setMeals] = useState(() => loadMeals(date))

  const addMeal = useCallback((meal) => {
    const entry = {
      id:       Date.now().toString(),
      name:     meal.name,
      calories: Number(meal.calories) || 0,
      protein:  Number(meal.protein)  || 0,
      carbs:    Number(meal.carbs)    || 0,
      fat:      Number(meal.fat)      || 0,
      time:     new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }
    setMeals(prev => {
      const next = [...prev, entry]
      saveMeals(date, next)
      return next
    })
  }, [date])

  const deleteMeal = useCallback((id) => {
    setMeals(prev => {
      const next = prev.filter(m => m.id !== id)
      saveMeals(date, next)
      return next
    })
  }, [date])

  const totals = meals.reduce((acc, m) => ({
    calories: Math.round((acc.calories + m.calories) * 10) / 10,
    protein:  Math.round((acc.protein  + m.protein)  * 10) / 10,
    carbs:    Math.round((acc.carbs    + m.carbs)    * 10) / 10,
    fat:      Math.round((acc.fat      + m.fat)      * 10) / 10,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  return { meals, addMeal, deleteMeal, totals }
}

// Utility: get totals for any date
export function getMealTotals(date) {
  const meals = loadMeals(date)
  return meals.reduce((acc, m) => ({
    calories: acc.calories + m.calories,
    protein:  acc.protein  + m.protein,
    carbs:    acc.carbs    + m.carbs,
    fat:      acc.fat      + m.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })
}

export function getLoggedDays() {
  const days = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k?.startsWith('nf_meals_')) {
      const date = k.replace('nf_meals_', '')
      const meals = loadMeals(date)
      if (meals.length > 0) days.push(date)
    }
  }
  return days
}