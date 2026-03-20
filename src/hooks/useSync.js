import { useEffect, useRef, useCallback } from 'react'
import { supabase } from '../lib/supabase'

// ── Profile: debounced, only on actual change ─────────────
// Profile changes are rare (user edits settings) so a long
// debounce of 3s is fine — 1 request per settings session max.
export function useSyncProfile(user, profile) {
  const timer   = useRef(null)
  const lastRef = useRef(null)

  useEffect(() => {
    if (!supabase || !user || !profile?.name) return

    // Skip if nothing actually changed
    const serialised = JSON.stringify(profile)
    if (serialised === lastRef.current) return
    lastRef.current = serialised

    clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      await supabase.from('profiles').upsert({
        id:          user.id,
        data:        profile,
        updated_at:  new Date().toISOString(),
      })
    }, 3000)

    return () => clearTimeout(timer.current)
  }, [user, profile])
}

// ── Meals: manual push only ───────────────────────────────
// Meals are NOT auto-synced on every change.
// Call pushMeals(userId, date, meals) explicitly — e.g. when
// the user closes the meal logger or navigates away.
export async function pushMeals(userId, date, meals) {
  if (!supabase || !userId) return
  try {
    await supabase.from('meals').upsert({
      user_id:     userId,
      date,
      data:        meals,
      updated_at:  new Date().toISOString(),
    }, { onConflict: 'user_id,date' })
  } catch (err) {
    console.error('Meal push failed:', err)
  }
}

// ── Weight: debounced, 5s, only on actual change ──────────
// Weight is logged at most once a day so very few requests.
export function useSyncWeight(user, weightLog) {
  const timer   = useRef(null)
  const lastRef = useRef(null)

  useEffect(() => {
    if (!supabase || !user || !weightLog.length) return

    const serialised = JSON.stringify(weightLog)
    if (serialised === lastRef.current) return
    lastRef.current = serialised

    clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      // Only push entries from last 90 days to keep payload small
      const since = new Date()
      since.setDate(since.getDate() - 90)
      const sinceStr = since.toISOString().slice(0, 10)

      const rows = weightLog
        .filter(e => e.date >= sinceStr)
        .map(e => ({ user_id: user.id, date: e.date, weight: e.weight }))

      if (!rows.length) return
      await supabase
        .from('weight_log')
        .upsert(rows, { onConflict: 'user_id,date' })
    }, 5000)

    return () => clearTimeout(timer.current)
  }, [user, weightLog])
}

// ── Pull: fetch all remote data into localStorage ─────────
// Called once on login. Uses a single request per table.
export async function pullFromSupabase(userId) {
  if (!supabase) return false

  try {
    // 3 requests total — one per table
    const since = new Date()
    since.setDate(since.getDate() - 90)
    const sinceStr = since.toISOString().slice(0, 10)

    const [profileRes, weightRes, mealsRes] = await Promise.all([
      supabase.from('profiles')   .select('data')           .eq('id', userId).single(),
      supabase.from('weight_log') .select('date, weight')   .eq('user_id', userId).order('date'),
      supabase.from('meals')      .select('date, data')     .eq('user_id', userId).gte('date', sinceStr),
    ])

    if (profileRes.data?.data)
      localStorage.setItem('nf_profile', JSON.stringify(profileRes.data.data))

    if (weightRes.data?.length)
      localStorage.setItem('nf_weight_log', JSON.stringify(weightRes.data))

    mealsRes.data?.forEach(row =>
      localStorage.setItem(`nf_meals_${row.date}`, JSON.stringify(row.data))
    )

    return true
  } catch (err) {
    console.error('Sync pull failed:', err)
    return false
  }
}