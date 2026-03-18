import { useState, useCallback } from 'react'

const KEY = 'nf_weight_log'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? [] }
  catch { return [] }
}

export function useWeight() {
  const [weightLog, setWeightLog] = useState(load)

  const addWeight = useCallback((weight) => {
    const entry = {
      date:   new Date().toISOString().slice(0, 10),
      weight: Number(weight),
    }
    setWeightLog(prev => {
      // Replace if same day
      const filtered = prev.filter(e => e.date !== entry.date)
      const next = [...filtered, entry].sort((a, b) => a.date.localeCompare(b.date))
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const removeWeight = useCallback((date) => {
    setWeightLog(prev => {
      const next = prev.filter(e => e.date !== date)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const latestWeight = weightLog.length ? weightLog[weightLog.length - 1].weight : null

  return { weightLog, addWeight, removeWeight, latestWeight }
}