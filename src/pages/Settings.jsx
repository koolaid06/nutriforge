import { useState } from 'react'
import Layout from '../components/layout/Layout'
import ProfileForm from '../components/settings/ProfileForm'
import GoalSelector from '../components/settings/GoalSelector'
import TargetDisplay from '../components/settings/TargetDisplay'
import { useWeight } from '../hooks/useWeight'
import { calcAllTargets } from '../utils/calculations'

export default function Settings({ profile, saveProfile }) {
  const { weightLog, addWeight, latestWeight } = useWeight()
  const [weightInput, setWeightInput] = useState('')
  const targets = calcAllTargets(profile)

  function handleGoal(goal) {
    saveProfile({ goal })
  }

  function logWeight() {
    if (weightInput) {
      addWeight(weightInput)
      setWeightInput('')
    }
  }

  return (
    <Layout title="SETTINGS" profile={profile}>
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileForm profile={profile} onSave={saveProfile} />
          <div className="space-y-6">
            <GoalSelector goal={profile?.goal ?? 'maintain'} onSelect={handleGoal} />

            {/* Weight log */}
            <div className="card space-y-4">
              <p className="label">LOG TODAY'S WEIGHT</p>
              {latestWeight && (
                <p className="text-forge-subtext text-sm">
                  Last logged: <span className="text-forge-accent font-mono">{latestWeight} kg</span>
                </p>
              )}
              <div className="flex gap-3">
                <input
                  type="number" value={weightInput}
                  onChange={e => setWeightInput(e.target.value)}
                  placeholder="e.g. 74.5"
                  className="flex-1 bg-forge-surface border border-forge-border rounded-xl px-4 py-2.5
                             text-forge-text text-sm font-mono placeholder-forge-muted
                             focus:outline-none focus:border-forge-accent transition-colors"
                />
                <button onClick={logWeight} className="btn-primary px-6">LOG</button>
              </div>
            </div>
          </div>
        </div>

        <TargetDisplay targets={targets} />

      </div>
    </Layout>
  )
}