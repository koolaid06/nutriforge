import Layout from '../components/layout/Layout'
import MealLogger from '../components/meals/MealLogger'
import MealList from '../components/meals/MealList'
import MacroFeedback from '../components/feedback/MacroFeedback'
import { useMeals } from '../hooks/useMeals'
import { calcAllTargets } from '../utils/calculations'

export default function MealLog({ profile }) {
  const { meals, addMeal, deleteMeal, totals } = useMeals()
  const targets = calcAllTargets(profile)

  return (
    <Layout title="MEAL LOG" profile={profile}>
      <div className="max-w-3xl mx-auto space-y-6">
        <MealLogger onAdd={addMeal} />
        <MacroFeedback totals={totals} targets={targets} />
        <MealList meals={meals} onDelete={deleteMeal} totals={totals} targets={targets} />
      </div>
    </Layout>
  )
}