import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
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

// ── Inner app — router is already mounted here ────────────
function AppInner({ profile, saveProfile, weightLog, isSetup, saveProfile: sp }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  useSyncProfile(user, profile)
  useSyncWeight(user, weightLog)

  function goHero()      { navigate('/hero') }
  function goLogin()     { navigate('/login') }

  return (
    <Routes>
      <Route path="/hero"       element={<Hero       isSetup={isSetup} onEnter={(choice) => {
        localStorage.setItem('nf_hero_seen', 'true')
        if (choice === 'login') {
          navigate('/login')
        } else {
          // offline — go to onboarding if new, dashboard if returning
          isSetup ? navigate('/') : navigate('/onboarding')
        }
      }} />} />
      <Route path="/login"      element={<Login      onSkip={() => isSetup ? navigate('/') : navigate('/onboarding')} onBack={() => navigate('/hero')} />} />
      <Route path="/onboarding" element={<Onboarding onComplete={(data) => { saveProfile(data); navigate('/') }} />} />
      <Route path="/"           element={<Dashboard  profile={profile} weightLog={weightLog} onLogoClick={goHero} />} />
      <Route path="/log"        element={<MealLog    profile={profile} onLogoClick={goHero} />} />
      <Route path="/analytics"  element={<Analytics  profile={profile} weightLog={weightLog} onLogoClick={goHero} />} />
      <Route path="/settings"   element={<Settings   profile={profile} saveProfile={saveProfile} onEnableSync={goLogin} onLogoClick={goHero} />} />
      <Route path="*"           element={
        <Navigate to={
          isSetup && localStorage.getItem('nf_hero_seen') === 'true' ? '/' : '/hero'
        } replace />
      } />
    </Routes>
  )
}

// ── Root ──────────────────────────────────────────────────
export default function App() {
  const { profile, saveProfile, isSetup } = useProfile()
  const { weightLog } = useWeight()
  const { user, loading } = useAuth()
  const [syncing, setSyncing] = useState(false)

  // Pull remote data on login
  useEffect(() => {
    if (!user) return
    setSyncing(true)
    pullFromSupabase(user.id).finally(() => setSyncing(false))
  }, [user?.id])

  if (loading || syncing) {
    return (
      <div className="min-h-screen bg-forge-bg flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-forge-accent/30 border-t-forge-accent rounded-full animate-spin" />
        {syncing && <p className="font-mono text-forge-subtext text-sm">Syncing your data...</p>}
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppInner
        profile={profile}
        saveProfile={saveProfile}
        weightLog={weightLog}
        isSetup={isSetup}
      />
    </BrowserRouter>
  )
}