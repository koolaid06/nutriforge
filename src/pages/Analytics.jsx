import Layout from '../components/layout/Layout'
import WeightChart from '../components/analytics/WeightChart'
import CalorieChart from '../components/analytics/CalorieChart'
import MacroTrendChart from '../components/analytics/MacroTrendChart'
import ConsistencyCalendar from '../components/analytics/ConsistencyCalendar'
import WeeklySummary from '../components/analytics/WeeklySummary'
import { useAnalytics } from '../hooks/useAnalytics'
import { calcAllTargets } from '../utils/calculations'

export default function Analytics({ profile, weightLog, onLogoClick }) {
  const { weeklyData, weeklyAvg, bestDay, worstDay } = useAnalytics()
  const targets = calcAllTargets(profile)

  return (
    <Layout title="ANALYTICS" profile={profile} onLogoClick={onLogoClick}>
      <div className="max-w-6xl mx-auto space-y-3 lg:space-y-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <CalorieChart weeklyData={weeklyData} target={targets?.targetCalories} />
          <MacroTrendChart weeklyData={weeklyData} />
        </div>

        <ConsistencyCalendar targets={targets} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <WeightChart weightLog={weightLog} profile={profile} />
          <WeeklySummary weeklyAvg={weeklyAvg} bestDay={bestDay} worstDay={worstDay} targets={targets} />
        </div>

      </div>
    </Layout>
  )
}