import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useProfile }  from './hooks/useProfile'
import { useWeight }   from './hooks/useWeight'
import { useAuth }     from './hooks/useAuth'
import { useSyncProfile, useSyncWeight, pullFromSupabase } from './hooks/useSync'

import Hero            from './pages/Hero'
import Login           from './pages/Login'
import Onboarding      from './pages/Onboarding'
import Dashboard       from './pages/Dashboard'
import MealLog         from './pages/MealLog'
import Analytics       from './pages/Analytics'
import Settings        from './pages/Settings'

// Inner app — has access to user for sync hooks
function AppInner({ profile, saveProfile, weightLog, onEnableSync }) {
  const { user } = useAuth()
  // Auto-sync profile and weight (rare changes, debounced)
  useSyncProfile(user, profile)
  useSyncWeight(user, weightLog)
  // Meals are pushed manually via pushMeals() in MealLog page

  return (
    <Routes>
      <Route path="/"          element={<Dashboard profile={profile} weightLog={weightLog} />} />
      <Route path="/log"       element={<MealLog   profile={profile} />} />
      <Route path="/analytics" element={<Analytics profile={profile} weightLog={weightLog} />} />
      <Route path="/settings"  element={<Settings  profile={profile} saveProfile={saveProfile} onEnableSync={onEnableSync} />} />
      <Route path="*"          element={<Navigate to="/" />} />
    </Routes>
  )
}

export default function App() {
  const { profile, saveProfile, isSetup } = useProfile()
  const { weightLog } = useWeight()
  const { user, loading } = useAuth()

  const [screen, setScreen] = useState(() => {
    if (isSetup && localStorage.getItem('nf_hero_seen') === 'true') return 'app'
    return 'hero'
  })
  const [syncing, setSyncing] = useState(false)

  // When user logs in, pull their remote data into localStorage
  useEffect(() => {
    if (!user) return
    setSyncing(true)
    pullFromSupabase(user.id).finally(() => {
      setSyncing(false)
      // Reload so hooks re-read fresh localStorage values
      if (screen !== 'app') setScreen('app')
    })
  }, [user?.id])

  function handleHeroEnter() {
    localStorage.setItem('nf_hero_seen', 'true')
    if (isSetup) setScreen('app')
    else setScreen('login')
  }

  function handleLoginSkip() {
    if (isSetup) setScreen('app')
    else setScreen('onboarding')
  }

  function handleOnboardingComplete(profileData) {
    saveProfile(profileData)
    setScreen('app')
  }

  // Auth loading
  if (loading) {
    return (
      <div className="min-h-screen bg-forge-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-forge-accent/30 border-t-forge-accent
                        rounded-full animate-spin" />
      </div>
    )
  }

  // Syncing after login
  if (syncing) {
    return (
      <div className="min-h-screen bg-forge-bg flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-forge-accent/30 border-t-forge-accent
                        rounded-full animate-spin" />
        <p className="font-mono text-forge-subtext text-sm">Syncing your data...</p>
      </div>
    )
  }

  if (screen === 'hero')        return <Hero       onEnter={handleHeroEnter} />
  if (screen === 'login')       return <Login      onSkip={handleLoginSkip} />
  if (screen === 'onboarding')  return <Onboarding onComplete={handleOnboardingComplete} />

  function handleEnableSync() {
    setScreen('login')
  }

  return (
    <BrowserRouter>
      <AppInner profile={profile} saveProfile={saveProfile} weightLog={weightLog} onEnableSync={handleEnableSync} />
    </BrowserRouter>
  )
}