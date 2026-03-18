import { useState, useRef, useEffect } from 'react'
import { searchFoods } from '../../constants/foodDatabase'

const PORTION_PRESETS = [25, 50, 75, 100, 150, 200, 250, 300]

function scaleNutrients(food, grams) {
  const f = grams / 100
  return {
    calories: Math.round(food.calories * f),
    protein:  Math.round(food.protein  * f * 10) / 10,
    carbs:    Math.round(food.carbs    * f * 10) / 10,
    fat:      Math.round(food.fat      * f * 10) / 10,
  }
}

export default function MealLogger({ onAdd }) {
  const [open, setOpen]         = useState(false)
  const [query, setQuery]       = useState('')
  const [results, setResults]   = useState([])
  const [selected, setSelected] = useState(null)
  const [portion, setPortion]   = useState(100)
  const inputRef                = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  // Instant local search — no debounce needed
  function handleQuery(e) {
    const q = e.target.value
    setQuery(q)
    setSelected(null)
    setResults(q.trim().length >= 1 ? searchFoods(q) : [])
  }

  function selectFood(food) {
    setSelected(food)
    setResults([])
    setQuery(food.name)
    setPortion(100)
  }

  function reset() {
    setSelected(null)
    setQuery('')
    setResults([])
    setPortion(100)
  }

  function handleClose() {
    setOpen(false)
    reset()
  }

  function submit() {
    if (!selected) return
    onAdd({ name: selected.name, ...scaleNutrients(selected, Number(portion)) })
    handleClose()
  }

  const preview = selected ? scaleNutrients(selected, Number(portion) || 0) : null

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <p className="label">LOG A MEAL</p>
        <button
          onClick={() => open ? handleClose() : setOpen(true)}
          className="btn-primary text-xs px-4 py-2"
        >
          {open ? '— CANCEL' : '+ ADD MEAL'}
        </button>
      </div>

      {open && (
        <div className="space-y-4 animate-slide-up">

          {/* Search */}
          <div className="relative">
            <label className="label text-[10px] block mb-1.5">SEARCH FOOD</label>
            <div className="relative">
              <input
                ref={inputRef}
                value={query}
                onChange={handleQuery}
                placeholder="e.g. chicken breast, oats, banana..."
                className="w-full bg-forge-surface border border-forge-border rounded-xl px-4 py-2.5 pr-10
                           text-forge-text text-sm font-body placeholder-forge-muted
                           focus:outline-none focus:border-forge-accent transition-colors"
              />
              {query && (
                <button
                  onClick={reset}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-forge-muted hover:text-forge-text text-lg leading-none"
                >×</button>
              )}
            </div>

            {/* Dropdown */}
            {results.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-forge-card border border-forge-border rounded-xl shadow-xl overflow-hidden">
                {results.map(food => (
                  <button
                    key={food.name}
                    onClick={() => selectFood(food)}
                    className="w-full text-left px-4 py-3 hover:bg-forge-surface transition-colors border-b border-forge-border last:border-0"
                  >
                    <p className="text-forge-text text-sm font-body">{food.name}</p>
                    <p className="text-forge-muted text-xs font-mono mt-0.5">
                      {food.calories} kcal · P {food.protein}g · C {food.carbs}g · F {food.fat}g
                      <span className="ml-1 opacity-40">per 100g</span>
                    </p>
                  </button>
                ))}
              </div>
            )}

            {query.trim().length >= 2 && results.length === 0 && !selected && (
              <p className="text-forge-subtext text-xs mt-2 font-mono">
                No results for &quot;{query}&quot;
              </p>
            )}
          </div>

          {/* Portion — only after food selected */}
          {selected && (
            <div className="space-y-3 animate-slide-up">
              <div>
                <label className="label text-[10px] block mb-1.5">PORTION SIZE</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={portion}
                    min={1}
                    onChange={e => setPortion(e.target.value)}
                    className="w-28 bg-forge-surface border border-forge-border rounded-xl px-4 py-2.5
                               text-forge-text text-sm font-mono
                               focus:outline-none focus:border-forge-accent transition-colors"
                  />
                  <span className="text-forge-subtext text-sm font-mono">grams</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {PORTION_PRESETS.map(g => (
                    <button
                      key={g}
                      onClick={() => setPortion(g)}
                      className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-all
                        ${Number(portion) === g
                          ? 'bg-forge-accent/10 border-forge-accent text-forge-accent'
                          : 'border-forge-border text-forge-subtext hover:border-forge-muted'
                        }`}
                    >
                      {g}g
                    </button>
                  ))}
                </div>
              </div>

              {/* Live nutrition preview */}
              {preview && (
                <div className="bg-forge-surface rounded-xl p-4 space-y-3">
                  <p className="label text-[10px]">NUTRITION FOR {portion}g</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'KCAL',    value: preview.calories,      color: 'text-forge-accent' },
                      { label: 'PROTEIN', value: `${preview.protein}g`, color: 'text-forge-accent' },
                      { label: 'CARBS',   value: `${preview.carbs}g`,   color: 'text-forge-blue'   },
                      { label: 'FAT',     value: `${preview.fat}g`,     color: 'text-forge-orange' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="bg-forge-card rounded-lg p-2.5 text-center">
                        <p className={`font-mono text-base font-semibold ${color}`}>{value}</p>
                        <p className="label text-[9px] mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={submit}
            disabled={!selected}
            className={`btn-primary w-full ${!selected ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            LOG MEAL
          </button>

          <p className="text-forge-muted text-[10px] font-mono text-center">
            ⚠ Values are estimates per 100g. Adjust portion for accuracy.
          </p>
        </div>
      )}
    </div>
  )
}