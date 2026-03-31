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
      <div className="w-full max-w-[1400px] mx-auto px-3 md:px-6 flex flex-col gap-4 lg:gap-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <CalorieChart weeklyData={weeklyData} target={targets?.targetCalories} />
          <MacroTrendChart weeklyData={weeklyData} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">

    {/* 🔥 Calendar (takes more space) */}
    <div className="xl:col-span-2">
      <ConsistencyCalendar targets={targets} />
    </div>

    {/* 🔥 Weekly Summary (fits perfectly beside it) */}
    <div>
      <WeeklySummary
        weeklyAvg={weeklyAvg}
        bestDay={bestDay}
        worstDay={worstDay}
        targets={targets}
      />
    </div>

  </div>

      </div>
    </Layout>
  )
}