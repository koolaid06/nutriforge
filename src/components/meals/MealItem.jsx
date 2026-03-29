import { useState } from 'react'

export default function MealItem({ meal, onDelete, onEdit }) {
  const [editing, setEditing]   = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm]         = useState({
    name: meal.name, calories: meal.calories,
    protein: meal.protein, carbs: meal.carbs, fat: meal.fat,
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

  if (editing) {
    return (
      <div className="p-4 space-y-3 bg-forge-surface rounded-xl border border-forge-accent/30">
        <input
          autoFocus value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          placeholder="Meal name"
          className="input"
        />
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'calories', label: 'Calories (kcal)', color: '#ff7043' },
            { key: 'protein',  label: 'Protein (g)',     color: '#ffd54f' },
            { key: 'carbs',    label: 'Carbs (g)',       color: '#5c9fff' },
            { key: 'fat',      label: 'Fat (g)',         color: '#ff7043' },
          ].map(({ key, label, color }) => (
            <div key={key}>
              <label className="text-[10px] font-body uppercase tracking-wider mb-1 block" style={{ color }}>{label}</label>
              <input
                type="text" inputMode="decimal"
                value={form[key]}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value.replace(/[^0-9.]/g, '') }))}
                className="input text-sm"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={handleSave}   className="btn-primary py-2 text-sm">Save</button>
          <button onClick={handleCancel} className="btn-ghost py-2 text-sm">Cancel</button>
        </div>
      </div>
    )
  }

  const chips = [
    { label: 'P', value: meal.protein, color: '#ffd54f' },
    { label: 'C', value: meal.carbs,   color: '#5c9fff' },
    { label: 'F', value: meal.fat,     color: '#ff7043' },
  ]

  return (
    <div className="p-3 rounded-xl hover:bg-forge-surface/60 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <p className="text-forge-text text-sm font-body font-medium leading-snug flex-1 break-words">{meal.name}</p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono text-sm font-bold text-forge-accent whitespace-nowrap">
            {Math.round(meal.calories)} kcal
          </span>
          {/* Mobile menu */}
          <div className="relative lg:hidden">
            <button onClick={() => setMenuOpen(o => !o)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-forge-muted
                         hover:bg-forge-border hover:text-forge-text transition-all text-sm font-bold">
              ···
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-8 z-50 bg-forge-card border border-forge-border rounded-xl shadow-xl overflow-hidden min-w-[110px]">
                  <button onClick={() => { setEditing(true); setMenuOpen(false) }}
                    className="w-full text-left px-4 py-2.5 text-sm font-body text-forge-text hover:bg-forge-surface transition-colors flex items-center gap-2">
                    ✎ Edit
                  </button>
                  <button onClick={() => { onDelete(meal.id); setMenuOpen(false) }}
                    className="w-full text-left px-4 py-2.5 text-sm font-body text-forge-red hover:bg-forge-surface transition-colors flex items-center gap-2 border-t border-forge-border">
                    × Delete
                  </button>
                </div>
              </>
            )}
          </div>
          {/* Desktop hover buttons */}
          <div className="hidden lg:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
            <button onClick={() => setEditing(true)}
              className="text-forge-muted hover:text-forge-accent text-xs font-body px-2 py-1
                         rounded-lg border border-forge-border hover:border-forge-accent transition-all">
              edit
            </button>
            <button onClick={() => onDelete(meal.id)}
              className="text-forge-muted hover:text-forge-red text-base px-2 py-1
                         rounded-lg border border-forge-border hover:border-forge-red transition-all">
              ×
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <div className="flex gap-1.5">
          {chips.map(({ label, value, color }) => (
            <span key={label} className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-forge-surface"
                  style={{ color }}>
              {label} {Math.round(value * 10) / 10}g
            </span>
          ))}
        </div>
        {meal.time && <span className="text-[10px] font-mono text-forge-muted">{meal.time}</span>}
      </div>
    </div>
  )
}