import { useState, useCallback } from 'react'

const KEY = 'nf_weight_log'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? [] }
  catch { return [] }
}

function persist(log) {
  localStorage.setItem(KEY, JSON.stringify(log))
  return log
}

export function useWeight() {
  const [weightLog, setWeightLog] = useState(load)

  // Log today's weight
  const addWeight = useCallback((weight) => {
    const date = new Date().toISOString().slice(0, 10)
    setWeightLog(prev => {
      const next = [
        ...prev.filter(e => e.date !== date),
        { date, weight: Number(weight) },
      ].sort((a, b) => a.date.localeCompare(b.date))
      return persist(next)
    })
  }, [])

  // Set weight for any specific date (add or overwrite)
  const setWeightForDate = useCallback((date, weight) => {
    setWeightLog(prev => {
      const next = [
        ...prev.filter(e => e.date !== date),
        { date, weight: Number(weight) },
      ].sort((a, b) => a.date.localeCompare(b.date))
      return persist(next)
    })
  }, [])

  // Remove a specific date's entry
  const removeWeight = useCallback((date) => {
    setWeightLog(prev => persist(prev.filter(e => e.date !== date)))
  }, [])

  const latestWeight = weightLog.length ? weightLog[weightLog.length - 1].weight : null

  return { weightLog, addWeight, setWeightForDate, removeWeight, latestWeight }
}