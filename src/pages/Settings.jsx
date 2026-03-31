import Layout from '../components/layout/Layout'
import ProfileForm from '../components/settings/ProfileForm'
import GoalSelector from '../components/settings/GoalSelector'
import TargetDisplay from '../components/settings/TargetDisplay'
import WeightTracker from '../components/settings/WeightTracker'
import { useWeight } from '../hooks/useWeight'
import { useAuth }   from '../hooks/useAuth'
import { calcAllTargets } from '../utils/calculations'

export default function Settings({ profile, saveProfile, onEnableSync, onLogoClick }) {
  const { weightLog, addWeight, setWeightForDate, removeWeight } = useWeight()
  const { user, signOut } = useAuth()
  const targets = calcAllTargets(profile)

  return (
    <Layout title="SETTINGS" profile={profile} onLogoClick={onLogoClick}>
      
      <div className="w-full max-w-[1400px] mx-auto px-3 md:px-6 space-y-5">

        {/* 🔥 MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

          {/* LEFT — PROFILE */}
          <div className="space-y-2">
            <SectionLabel n="1" title="Your Profile" />
            <div className="card">
              <ProfileForm profile={profile} onSave={saveProfile} />
            </div>
          </div>

          {/* RIGHT — GOAL + WEIGHT */}
          <div className="space-y-5">

            <div className="space-y-2">
              <SectionLabel n="2" title="Your Goal" />
              <div className="card">
                <GoalSelector
                  goal={profile?.goal ?? 'maintain'}
                  onSelect={goal => saveProfile({ goal })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <SectionLabel n="3" title="Weight Tracker" />
              <div className="card">
                <WeightTracker
                  weightLog={weightLog}
                  addWeight={addWeight}
                  setWeightForDate={setWeightForDate}
                  removeWeight={removeWeight}
                />
              </div>
            </div>

          </div>
        </div>

        {/* 🔥 SYNC STATUS (more prominent) */}
        <div className="card flex items-center justify-between gap-4 px-5 py-4">

          <div className="space-y-1">
            {user ? (
              <>
                <p className="text-forge-text text-sm font-semibold">
                  ✓ Synced to cloud
                </p>
                <p className="text-forge-subtext text-xs font-mono">
                  {user.email}
                </p>
              </>
            ) : (
              <>
                <p className="text-forge-text text-sm font-semibold">
                  Offline mode
                </p>
                <p className="text-forge-subtext text-xs">
                  Data stored on this device only
                </p>
              </>
            )}
          </div>

          {user ? (
            <button
              onClick={signOut}
              className="btn-ghost text-xs px-4 py-2"
            >
              SIGN OUT
            </button>
          ) : (
            <button
              onClick={onEnableSync}
              className="btn-primary text-xs px-4 py-2"
            >
              ENABLE SYNC
            </button>
          )}
        </div>

        {/* 🔥 TARGETS (full width, more impact) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <SectionLabel n="4" title="Your Calculated Targets" />
            <span className="text-forge-muted text-xs font-mono">
              — updates automatically
            </span>
          </div>

          <div className="card">
            <TargetDisplay targets={targets} />
          </div>
        </div>

      </div>
    </Layout>
  )
}

function SectionLabel({ n, title }) {
  return (
    <div className="flex items-center gap-3 px-1">

      {/* 🔥 Bigger, more visible step indicator */}
      <span className="w-6 h-6 rounded-full bg-forge-accent text-black font-mono text-[11px]
                       flex items-center justify-center font-bold shadow-glow">
        {n}
      </span>

      <p className="text-forge-text text-base font-semibold">
        {title}
      </p>
    </div>
  )
}