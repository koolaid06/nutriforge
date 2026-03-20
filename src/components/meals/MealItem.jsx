import { useState } from 'react'

export default function MealItem({ meal, onDelete, onEdit }) {
  const [editing, setEditing]   = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm]         = useState({
    name:     meal.name,
    calories: meal.calories,
    protein:  meal.protein,
    carbs:    meal.carbs,
    fat:      meal.fat,
  })

  function handleSave() {
    onEdit(meal.id, {
      name:     form.name.trim() || meal.name,
      calories: Number(form.calories) || 0,
      protein:  Number(form.protein)  || 0,
      carbs:    Number(form.carbs)    || 0,
      fat:      Number(form.fat)      || 0,
    })
    setEditing(false)
  }

  function handleCancel() {
    setForm({ name: meal.name, calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat })
    setEditing(false)
  }

  const inputClass = `bg-forge-bg border border-forge-border rounded-lg px-3 py-2 text-forge-text
    text-sm font-mono focus:outline-none focus:border-forge-accent transition-colors w-full`

  // ── Edit mode ─────────────────────────────────────────────
  if (editing) {
    return (
      <div className="p-3 space-y-3 bg-forge-surface rounded-xl border border-forge-accent/20">
        <input
          autoFocus
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          placeholder="Meal name"
          className={inputClass}
        />
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'calories', label: 'Calories (kcal)', color: 'text-forge-accent' },
            { key: 'protein',  label: 'Protein (g)',     color: 'text-forge-accent' },
            { key: 'carbs',    label: 'Carbs (g)',       color: 'text-forge-blue'   },
            { key: 'fat',      label: 'Fat (g)',         color: 'text-forge-orange' },
          ].map(({ key, label, color }) => (
            <div key={key}>
              <label className={`label text-[10px] block mb-1 ${color}`}>{label}</label>
              <input
                type="text" inputMode="decimal"
                value={form[key]}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value.replace(/[^0-9.]/g, '') }))}
                className={inputClass}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={handleSave}   className="btn-primary  py-2 text-sm">SAVE</button>
          <button onClick={handleCancel} className="btn-ghost py-2 text-sm">CANCEL</button>
        </div>
      </div>
    )
  }

  // ── View mode ─────────────────────────────────────────────
  return (
    <div className="p-3 rounded-xl hover:bg-forge-surface/60 transition-colors">
      {/* Row 1: name + actions */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-forge-text text-sm font-medium leading-snug flex-1 min-w-0 break-words">
          {meal.name}
        </p>

        {/* Actions — always visible on mobile via ··· menu, hover on desktop */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="font-mono text-sm text-forge-accent font-semibold whitespace-nowrap">
            {Math.round(meal.calories)} kcal
          </span>

          {/* Mobile: 3-dot menu button */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="w-7 h-7 flex items-center justify-center rounded-lg
                         text-forge-muted hover:text-forge-text hover:bg-forge-border
                         transition-all text-base font-bold"
            >
              ···
            </button>
            {menuOpen && (
              <>
                {/* Backdrop */}
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                {/* Menu */}
                <div className="absolute right-0 top-8 z-50 bg-forge-card border border-forge-border
                                rounded-xl shadow-xl overflow-hidden min-w-[110px]">
                  <button
                    onClick={() => { setEditing(true); setMenuOpen(false) }}
                    className="w-full text-left px-4 py-2.5 text-sm font-mono text-forge-text
                               hover:bg-forge-surface transition-colors flex items-center gap-2"
                  >
                    <span className="text-forge-accent">✎</span> Edit
                  </button>
                  <button
                    onClick={() => { onDelete(meal.id); setMenuOpen(false) }}
                    className="w-full text-left px-4 py-2.5 text-sm font-mono text-forge-red
                               hover:bg-forge-surface transition-colors flex items-center gap-2
                               border-t border-forge-border"
                  >
                    <span>×</span> Delete
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Desktop: inline hover buttons */}
          <div className="hidden lg:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
            <button
              onClick={() => setEditing(true)}
              className="text-forge-muted hover:text-forge-accent text-xs font-mono
                         px-2 py-1 rounded-lg border border-forge-border hover:border-forge-accent
                         transition-all"
            >edit</button>
            <button
              onClick={() => onDelete(meal.id)}
              className="text-forge-muted hover:text-forge-red text-base leading-none
                         px-2 py-1 rounded-lg border border-forge-border hover:border-forge-red
                         transition-all"
            >×</button>
          </div>
        </div>
      </div>

      {/* Row 2: macro chips + time */}
      <div className="flex items-center justify-between mt-1.5">
        <div className="flex flex-wrap gap-1">
          {[
            { label: 'P', value: meal.protein, color: 'text-forge-accent bg-forge-accent/10' },
            { label: 'C', value: meal.carbs,   color: 'text-forge-blue   bg-forge-blue/10'   },
            { label: 'F', value: meal.fat,     color: 'text-forge-orange bg-forge-orange/10' },
          ].map(({ label, value, color }) => (
            <span key={label} className={`tag ${color} text-[10px] px-1.5 py-0.5`}>
              {label} {Math.round(value * 10) / 10}g
            </span>
          ))}
        </div>
        {meal.time && (
          <span className="text-forge-muted text-[10px] font-mono flex-shrink-0 ml-2">
            {meal.time}
          </span>
        )}
      </div>
    </div>
  )
}