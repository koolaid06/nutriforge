export function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function dateKey(date) {
  return new Date(date).toISOString().slice(0, 10)
}

export function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return dateKey(d)
  })
}

export function getLast30Days() {
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return dateKey(d)
  })
}

export function getLast16Weeks() {
  const weeks = []
  for (let w = 15; w >= 0; w--) {
    const week = []
    for (let d = 6; d >= 0; d--) {
      const date = new Date()
      date.setDate(date.getDate() - w * 7 - d)
      week.push(dateKey(date))
    }
    weeks.push(week)
  }
  return weeks
}

export function calcStreak(loggedDays) {
  // loggedDays: Set or array of 'YYYY-MM-DD' strings
  const set = new Set(loggedDays)
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (set.has(dateKey(d))) streak++
    else break
  }
  return streak
}

export function streak7(loggedDays) {
  const set = new Set(loggedDays)
  return getLast7Days().filter(d => set.has(d)).length
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function formatDateLong(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}