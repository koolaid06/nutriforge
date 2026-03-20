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

function r(n) { return Math.round(Number(n) * 10) / 10 }

export function useMeals(date = todayKey()) {
  const [meals, setMeals] = useState(() => loadMeals(date))

  const addMeal = useCallback((meal) => {
    const entry = {
      id:       Date.now().toString(),
      name:     meal.name,
      calories: r(meal.calories) || 0,
      protein:  r(meal.protein)  || 0,
      carbs:    r(meal.carbs)    || 0,
      fat:      r(meal.fat)      || 0,
      time:     new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }
    setMeals(prev => {
      const next = [...prev, entry]
      saveMeals(date, next)
      return next
    })
  }, [date])

  const editMeal = useCallback((id, updates) => {
    setMeals(prev => {
      const next = prev.map(m => m.id !== id ? m : {
        ...m,
        name:     updates.name     ?? m.name,
        calories: r(updates.calories ?? m.calories),
        protein:  r(updates.protein  ?? m.protein),
        carbs:    r(updates.carbs    ?? m.carbs),
        fat:      r(updates.fat      ?? m.fat),
      })
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
    calories: r(acc.calories + (m.calories || 0)),
    protein:  r(acc.protein  + (m.protein  || 0)),
    carbs:    r(acc.carbs    + (m.carbs    || 0)),
    fat:      r(acc.fat      + (m.fat      || 0)),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  return { meals, addMeal, editMeal, deleteMeal, totals }
}

export function getMealTotals(date) {
  const meals = loadMeals(date)
  return meals.reduce((acc, m) => ({
    calories: r(acc.calories + (m.calories || 0)),
    protein:  r(acc.protein  + (m.protein  || 0)),
    carbs:    r(acc.carbs    + (m.carbs    || 0)),
    fat:      r(acc.fat      + (m.fat      || 0)),
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