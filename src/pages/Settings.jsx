import Layout from '../components/layout/Layout'
import ProfileForm from '../components/settings/ProfileForm'
import GoalSelector from '../components/settings/GoalSelector'
import TargetDisplay from '../components/settings/TargetDisplay'
import WeightTracker from '../components/settings/WeightTracker'
import { useWeight } from '../hooks/useWeight'
import { useAuth }   from '../hooks/useAuth'
import { calcAllTargets } from '../utils/calculations'

export default function Settings({ profile, saveProfile, onEnableSync }) {
  const { weightLog, addWeight, setWeightForDate, removeWeight } = useWeight()
  const { user, signOut } = useAuth()
  const targets = calcAllTargets(profile)

  return (
    <Layout title="SETTINGS" profile={profile}>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Row 1: Profile + Goal & Weight side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Left — Profile */}
          <div className="space-y-1.5">
            <SectionLabel n="1" title="Your Profile" />
            <ProfileForm profile={profile} onSave={saveProfile} />
          </div>

          {/* Right — Goal then Weight stacked */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <SectionLabel n="2" title="Your Goal" />
              <GoalSelector goal={profile?.goal ?? 'maintain'} onSelect={goal => saveProfile({ goal })} />
            </div>

            <div className="space-y-1.5">
              <SectionLabel n="3" title="Weight Tracker" />
              <WeightTracker
                weightLog={weightLog}
                addWeight={addWeight}
                setWeightForDate={setWeightForDate}
                removeWeight={removeWeight}
              />
            </div>
          </div>
        </div>

        {/* Sync status */}
        <div className="card flex items-center justify-between gap-4 p-4">
          <div>
            {user ? (
              <>
                <p className="text-forge-text text-sm font-medium">✓ Synced to cloud</p>
                <p className="text-forge-subtext text-xs mt-0.5 font-mono">{user.email}</p>
              </>
            ) : (
              <>
                <p className="text-forge-text text-sm font-medium">Offline mode</p>
                <p className="text-forge-subtext text-xs mt-0.5">Data stored on this device only</p>
              </>
            )}
          </div>
          {user
            ? <button onClick={signOut} className="btn-ghost text-xs px-4 py-2 flex-shrink-0">SIGN OUT</button>
            : <button onClick={onEnableSync} className="btn-primary text-xs px-4 py-2 flex-shrink-0">
                ENABLE SYNC
              </button>
          }
        </div>

        {/* Row 2: Targets full width */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <SectionLabel n="4" title="Your Calculated Targets" />
            <span className="text-forge-muted text-xs font-mono">— updates automatically</span>
          </div>
          <TargetDisplay targets={targets} />
        </div>

      </div>
    </Layout>
  )
}

function SectionLabel({ n, title }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <span className="w-5 h-5 rounded-full bg-forge-accent text-forge-bg font-mono text-[10px]
                       flex items-center justify-center flex-shrink-0 font-bold">
        {n}
      </span>
      <p className="text-forge-text text-sm font-medium">{title}</p>
    </div>
  )
}