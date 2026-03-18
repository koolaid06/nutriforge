import { useState, useRef, useEffect } from 'react'
import { searchFoods } from '../../constants/foodDatabase'

// Presets differ by unit type
const GRAM_PRESETS = [25, 50, 100, 150, 200, 300]
const ML_PRESETS   = [50, 100, 150, 200, 250, 300]
const PC_PRESETS   = [1, 2, 3, 4, 5, 6]

function getPresets(unit) {
  if (unit === 'pc') return PC_PRESETS
  if (unit === 'ml') return ML_PRESETS
  return GRAM_PRESETS
}

function getUnitLabel(unit) {
  if (unit === 'pc') return 'pieces'
  if (unit === 'ml') return 'ml'
  return 'grams'
}

// Convert quantity → grams equivalent for nutrition scaling
function toGrams(quantity, food) {
  if (food.unit === 'pc') return quantity * (food.serving ?? 100)
  return quantity // g and ml both scale 1:1
}

function scaleNutrients(food, quantity) {
  const grams = toGrams(quantity, food)
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
  const [quantity, setQuantity] = useState(1)
  const inputRef                = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

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
    // Default quantity: 1 for countable, 100 for g/ml
    setQuantity(food.unit === 'pc' ? 1 : 100)
  }

  function reset() {
    setSelected(null)
    setQuery('')
    setResults([])
    setQuantity(1)
  }

  function handleClose() {
    setOpen(false)
    reset()
  }

  function submit() {
    if (!selected) return
    onAdd({ name: selected.name, ...scaleNutrients(selected, Number(quantity)) })
    handleClose()
  }

  const preview  = selected ? scaleNutrients(selected, Number(quantity) || 0) : null
  const unit     = selected?.unit ?? 'g'
  const presets  = getPresets(unit)
  const unitLabel = getUnitLabel(unit)

  // For pieces: show per-piece info
  const perPieceInfo = selected?.unit === 'pc' && selected.serving
    ? `1 piece ≈ ${selected.serving}g`
    : null

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
                placeholder="e.g. banana, chicken breast, idli..."
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
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-forge-text text-sm font-body">{food.name}</p>
                      <span className="label text-[10px] flex-shrink-0">
                        {food.unit === 'pc' ? `per piece` : `per 100${food.unit}`}
                      </span>
                    </div>
                    <p className="text-forge-muted text-xs font-mono mt-0.5">
                      {food.unit === 'pc'
                        ? `${Math.round(food.calories * (food.serving ?? 100) / 100)} kcal · P ${Math.round(food.protein * (food.serving ?? 100) / 100)}g · C ${Math.round(food.carbs * (food.serving ?? 100) / 100)}g · F ${Math.round(food.fat * (food.serving ?? 100) / 100)}g`
                        : `${food.calories} kcal · P ${food.protein}g · C ${food.carbs}g · F ${food.fat}g`
                      }
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

          {/* Quantity — only after food selected */}
          {selected && (
            <div className="space-y-3 animate-slide-up">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label text-[10px]">
                    {unit === 'pc' ? 'NUMBER OF PIECES' : unit === 'ml' ? 'AMOUNT (ML)' : 'PORTION (GRAMS)'}
                  </label>
                  {perPieceInfo && (
                    <span className="text-forge-muted text-[10px] font-mono">{perPieceInfo}</span>
                  )}
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={quantity}
                    min={unit === 'pc' ? 0.5 : 1}
                    step={unit === 'pc' ? 0.5 : 1}
                    onChange={e => setQuantity(e.target.value)}
                    className="w-28 bg-forge-surface border border-forge-border rounded-xl px-4 py-2.5
                               text-forge-text text-sm font-mono
                               focus:outline-none focus:border-forge-accent transition-colors"
                  />
                  <span className="text-forge-subtext text-sm font-mono">{unitLabel}</span>
                </div>

                {/* Quick presets */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {presets.map(p => (
                    <button
                      key={p}
                      onClick={() => setQuantity(p)}
                      className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-all
                        ${Number(quantity) === p
                          ? 'bg-forge-accent/10 border-forge-accent text-forge-accent'
                          : 'border-forge-border text-forge-subtext hover:border-forge-muted'
                        }`}
                    >
                      {p}{unit === 'pc' ? (p === 1 ? ' pc' : ' pcs') : unit === 'ml' ? 'ml' : 'g'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live nutrition preview */}
              {preview && (
                <div className="bg-forge-surface rounded-xl p-4 space-y-3">
                  <p className="label text-[10px]">
                    NUTRITION FOR {quantity} {unit === 'pc' ? (Number(quantity) === 1 ? 'piece' : 'pieces') : unitLabel}
                    {selected.unit === 'pc' && selected.serving && (
                      <span className="text-forge-muted ml-1">({toGrams(Number(quantity), selected)}g)</span>
                    )}
                  </p>
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
            ⚠ Values are estimates. Actual nutrition may vary.
          </p>
        </div>
      )}
    </div>
  )
}