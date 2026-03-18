import { useState, useRef, useEffect } from 'react'

// Calls our own /api/food-search proxy (Vercel serverless function)
// which forwards to USDA FoodData Central server-side — avoids CORS issues
const FOOD_SEARCH_URL = '/api/food-search'

// Common portion presets in grams
const PORTION_PRESETS = [25, 50, 75, 100, 150, 200, 250, 300]

// Nutrient IDs in USDA database
const NUTRIENT = {
  calories: 1008,
  protein:  1003,
  carbs:    1005,
  fat:      1004,
}

function getNutrient(food, id) {
  return food.foodNutrients?.find(n => n.nutrientId === id || n.nutrient?.id === id)?.value ?? 0
}

// Scale nutrients from per-100g to actual portion
function scaleNutrients(food, grams) {
  const factor = grams / 100
  return {
    calories: Math.round(getNutrient(food, NUTRIENT.calories) * factor),
    protein:  Math.round(getNutrient(food, NUTRIENT.protein)  * factor * 10) / 10,
    carbs:    Math.round(getNutrient(food, NUTRIENT.carbs)    * factor * 10) / 10,
    fat:      Math.round(getNutrient(food, NUTRIENT.fat)      * factor * 10) / 10,
  }
}

export default function MealLogger({ onAdd }) {
  const [open, setOpen]         = useState(false)
  const [query, setQuery]       = useState('')
  const [results, setResults]   = useState([])
  const [selected, setSelected] = useState(null)
  const [portion, setPortion]   = useState(100)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [searched, setSearched] = useState(false)
  const debounceRef             = useRef(null)
  const inputRef                = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    if (!query.trim() || query.length < 2) { setResults([]); setSearched(false); return }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => searchFood(query), 450)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  async function searchFood(q) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(
        `${FOOD_SEARCH_URL}?query=${encodeURIComponent(q)}`
      )
      if (!res.ok) throw new Error('Search failed')
      const data = await res.json()

      // Deduplicate: normalize to first 3 words, keep first (best quality) match per group
      const seen = new Set()
      const deduped = (data.foods ?? []).filter(food => {
        const key = food.description
          .toLowerCase()
          .replace(/,.*$/, '')
          .replace(/\s+/g, ' ')
          .trim()
          .split(' ')
          .slice(0, 3)
          .join(' ')
        if (seen.has(key)) return false
        seen.add(key)
        return true
      }).slice(0, 6)

      setResults(deduped)
      setSearched(true)
    } catch {
      setError('Could not reach food database. Check your connection.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  function selectFood(food) {
    setSelected(food)
    setResults([])
    setQuery(food.description)
    setPortion(100)
    setSearched(false)
  }

  function reset() {
    setSelected(null)
    setQuery('')
    setResults([])
    setError('')
    setSearched(false)
    setPortion(100)
  }

  function handleClose() {
    setOpen(false)
    reset()
  }

  function submit() {
    if (!selected) { setError('Search and select a food first'); return }
    const nutrients = scaleNutrients(selected, Number(portion))
    onAdd({ name: selected.description, ...nutrients })
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

          {/* Step 1: Search */}
          <div className="relative">
            <label className="label text-[10px] block mb-1.5">SEARCH FOOD</label>
            <div className="relative">
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(null) }}
                placeholder="e.g. chicken breast, oats, banana..."
                className="w-full bg-forge-surface border border-forge-border rounded-xl px-4 py-2.5 pr-10
                           text-forge-text text-sm font-body placeholder-forge-muted
                           focus:outline-none focus:border-forge-accent transition-colors"
              />
              {loading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-forge-accent/30 border-t-forge-accent rounded-full animate-spin" />
                </div>
              )}
              {query && !loading && (
                <button
                  onClick={reset}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-forge-muted hover:text-forge-text text-lg leading-none"
                >×</button>
              )}
            </div>

            {/* Dropdown results */}
            {results.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-forge-card border border-forge-border rounded-xl shadow-xl overflow-hidden">
                {results.map(food => (
                  <button
                    key={food.fdcId}
                    onClick={() => selectFood(food)}
                    className="w-full text-left px-4 py-3 hover:bg-forge-surface transition-colors border-b border-forge-border last:border-0"
                  >
                    <p className="text-forge-text text-sm font-body truncate">{food.description}</p>
                    <p className="text-forge-muted text-xs font-mono mt-0.5">
                      {Math.round(getNutrient(food, NUTRIENT.calories))} kcal
                      · P {Math.round(getNutrient(food, NUTRIENT.protein))}g
                      · C {Math.round(getNutrient(food, NUTRIENT.carbs))}g
                      · F {Math.round(getNutrient(food, NUTRIENT.fat))}g
                      <span className="ml-1 opacity-40">per 100g</span>
                    </p>
                  </button>
                ))}
              </div>
            )}

            {searched && results.length === 0 && !loading && (
              <p className="text-forge-subtext text-xs mt-2 font-mono">No results for &quot;{query}&quot;</p>
            )}
          </div>

          {/* Step 2: Portion — only shown after selecting a food */}
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

                {/* Quick presets */}
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
                      { label: 'KCAL',    value: preview.calories,         color: 'text-forge-accent' },
                      { label: 'PROTEIN', value: `${preview.protein}g`,    color: 'text-forge-accent' },
                      { label: 'CARBS',   value: `${preview.carbs}g`,      color: 'text-forge-blue'   },
                      { label: 'FAT',     value: `${preview.fat}g`,        color: 'text-forge-orange' },
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

          {error && <p className="text-forge-red text-xs font-mono">{error}</p>}

          <button
            onClick={submit}
            disabled={!selected}
            className={`btn-primary w-full ${!selected ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            LOG MEAL
          </button>

          <p className="text-forge-muted text-[10px] font-mono text-center leading-relaxed">
            Powered by USDA FoodData Central
            <br />
            <span className="text-forge-border">⚠ Values are estimates. Actual nutrition may vary by brand, preparation, and serving.</span>
          </p>
        </div>
      )}
    </div>
  )
}