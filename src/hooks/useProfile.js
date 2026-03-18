import { useState, useCallback } from 'react'

const KEY = 'nf_profile'

const DEFAULT_PROFILE = {
  name:     '',
  age:      25,
  sex:      'male',
  weight:   75,      // kg
  height:   175,     // cm
  activity: 'moderate',
  goal:     'maintain',
}

export function useProfile() {
  const [profile, setProfileState] = useState(() => {
    try {
      const stored = localStorage.getItem(KEY)
      return stored ? { ...DEFAULT_PROFILE, ...JSON.parse(stored) } : DEFAULT_PROFILE
    } catch {
      return DEFAULT_PROFILE
    }
  })

  const saveProfile = useCallback((updates) => {
    setProfileState(prev => {
      const next = { ...prev, ...updates }
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isSetup = Boolean(profile.name && profile.age && profile.weight && profile.height)

  return { profile, saveProfile, isSetup }
}