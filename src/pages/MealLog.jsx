import Layout       from '../components/layout/Layout'
import MealLogger   from '../components/meals/MealLogger'
import MealList     from '../components/meals/MealList'
import MacroFeedback from '../components/feedback/MacroFeedback'
import { useMeals }     from '../hooks/useMeals'
import { useAuth }      from '../hooks/useAuth'
import { pushMeals }    from '../hooks/useSync'
import { calcAllTargets } from '../utils/calculations'
import { todayKey }     from '../utils/dateHelpers'

export default function MealLog({ profile }) {
  const { meals, addMeal, editMeal, deleteMeal, totals } = useMeals()
  const { user } = useAuth()
  const targets  = calcAllTargets(profile)
  const today    = todayKey()

  // Called when the meal logger closes — push the full day's meals in one request
  function handleLoggerClose(updatedMeals) {
    pushMeals(user?.id, today, updatedMeals)
  }

  return (
    <Layout title="MEAL LOG" profile={profile}>
      <div className="max-w-3xl mx-auto space-y-3 lg:space-y-6">
        <MealLogger onAdd={addMeal} onClose={handleLoggerClose} meals={meals} />
        <MacroFeedback totals={totals} targets={targets} />
        <MealList
          meals={meals}
          onDelete={(id) => {
            deleteMeal(id)
            // Push after delete too — one request
            const updated = meals.filter(m => m.id !== id)
            pushMeals(user?.id, today, updated)
          }}
          onEdit={(id, updates) => {
            editMeal(id, updates)
            const updated = meals.map(m => m.id === id ? { ...m, ...updates } : m)
            pushMeals(user?.id, today, updated)
          }}
          totals={totals}
          targets={targets}
        />
      </div>
    </Layout>
  )
}