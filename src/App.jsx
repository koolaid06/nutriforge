import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useProfile } from './hooks/useProfile'
import { useWeight } from './hooks/useWeight'
import Hero      from './pages/Hero'
import Dashboard from './pages/Dashboard'
import MealLog   from './pages/MealLog'
import Analytics from './pages/Analytics'
import Settings  from './pages/Settings'

export default function App() {
  const { profile, saveProfile, isSetup } = useProfile()
  const { weightLog } = useWeight()
  const [showHero, setShowHero] = useState(true)

  function handleEnter() {
    setShowHero(false)
    if (!isSetup) {
      saveProfile({ name: 'Athlete' })
      window.location.href = '/settings'
    }
  }

  if (showHero) {
    return <Hero onEnter={handleEnter} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Dashboard profile={profile} weightLog={weightLog} />} />
        <Route path="/log"       element={<MealLog   profile={profile} />} />
        <Route path="/analytics" element={<Analytics profile={profile} weightLog={weightLog} />} />
        <Route path="/settings"  element={<Settings  profile={profile} saveProfile={saveProfile} />} />
        <Route path="*"          element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}