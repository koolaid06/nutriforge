import Layout from '../components/layout/Layout'
import MacroRing from '../components/dashboard/MacroRing'
import DisciplineScore from '../components/dashboard/DisciplineScore'
import TodaySummary from '../components/dashboard/TodaySummary'
import PhaseCard from '../components/dashboard/PhaseCard'
import AdaptiveAlert from '../components/feedback/AdaptiveAlert'
import { useMeals, getLoggedDays } from '../hooks/useMeals'
import { calcDisciplineScore } from '../utils/disciplineScore'
import { getAdaptiveSuggestion } from '../utils/adaptiveSuggestions'
import { calcAllTargets } from '../utils/calculations'
import { streak7, calcStreak } from '../utils/dateHelpers'

export default function Dashboard({ profile, weightLog, onLogoClick }) {
  const { meals, totals } = useMeals()
  const targets     = calcAllTargets(profile)
  const loggedDays  = getLoggedDays()
  const s7          = streak7(loggedDays)
  const streak      = calcStreak(loggedDays)
  const score       = calcDisciplineScore({ logged: totals, targets, streak7: s7 })
  const suggestion  = getAdaptiveSuggestion({
    weightLog, goal: profile?.goal, targetCalories: targets?.targetCalories
  })
  const latestWeight = weightLog?.length ? weightLog[weightLog.length - 1].weight : null

  const profileWithStreak = { ...profile, streak }

  return (
    <Layout title="DASHBOARD" profile={profileWithStreak} onLogoClick={onLogoClick}>
      <div className="max-w-6xl mx-auto space-y-3 lg:space-y-6">

        {/* Adaptive alert */}
        {suggestion && suggestion.type !== 'on_track' && (
          <AdaptiveAlert suggestion={suggestion} />
        )}

        {/* Row 1: Phase + Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2">
            <PhaseCard goal={profile?.goal ?? 'maintain'} targets={targets} latestWeight={latestWeight} profile={profile} />
          </div>
          <DisciplineScore score={score} />
        </div>

        {/* Row 2: Macro Ring + Today Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <MacroRing totals={totals} targets={targets} />
          <TodaySummary totals={totals} targets={targets} />
        </div>

      </div>
    </Layout>
  )
}