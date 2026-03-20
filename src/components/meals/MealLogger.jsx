import { useState, useRef, useEffect } from 'react'
import { searchFoods } from '../../constants/foodDatabase'

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

function toGrams(quantity, food) {
  if (food.unit === 'pc') return quantity * (food.serving ?? 100)
  return quantity
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

const EMPTY_CUSTOM = { name: '', calories: '', protein: '', carbs: '', fat: '' }

const inputClass = `w-full bg-forge-surface border border-forge-border rounded-xl px-4 py-2.5
  text-forge-text text-sm font-mono placeholder-forge-muted
  focus:outline-none focus:border-forge-accent transition-colors`

export default function MealLogger({ onAdd, onClose, meals = [] }) {
  const [open, setOpen]         = useState(false)
  const [mode, setMode]         = useState('search')   // 'search' | 'custom'

  // Search mode state
  const [query, setQuery]       = useState('')
  const [results, setResults]   = useState([])
  const [selected, setSelected] = useState(null)
  const [quantity, setQuantity] = useState(1)

  // Custom mode state
  const [custom, setCustom]     = useState(EMPTY_CUSTOM)
  const [customError, setCustomError] = useState('')

  const inputRef = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open, mode])

  // ── Search mode handlers ──────────────────────────────────
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
    setQuantity(food.unit === 'pc' ? 1 : 100)
  }

  function resetSearch() {
    setSelected(null)
    setQuery('')
    setResults([])
    setQuantity(1)
  }

  // ── Custom mode handlers ──────────────────────────────────
  function handleCustom(e) {
    const { name, value } = e.target
    setCustom(prev => ({ ...prev, [name]: value }))
    setCustomError('')
  }

  function submitCustom() {
    if (!custom.name.trim())  { setCustomError('Name is required'); return }
    if (!custom.calories)     { setCustomError('Calories are required'); return }
    const meal = {
      name:     custom.name.trim(),
      calories: Number(custom.calories) || 0,
      protein:  Number(custom.protein)  || 0,
      carbs:    Number(custom.carbs)    || 0,
      fat:      Number(custom.fat)      || 0,
    }
    onAdd(meal)
    handleClose(meal)
  }

  // ── Shared ────────────────────────────────────────────────
  function submitSearch() {
    if (!selected) return
    const meal = { name: selected.name, ...scaleNutrients(selected, Number(quantity)) }
    onAdd(meal)
    handleClose(meal)
  }

  function handleClose(pendingMeal) {
    setOpen(false)
    resetSearch()
    setCustom(EMPTY_CUSTOM)
    setCustomError('')
    setMode('search')
    // Notify parent to push meals — include any just-added meal
    if (onClose) {
      const updated = pendingMeal ? [...meals, pendingMeal] : meals
      onClose(updated)
    }
  }

  const preview    = selected ? scaleNutrients(selected, Number(quantity) || 0) : null
  const unit       = selected?.unit ?? 'g'
  const presets    = getPresets(unit)
  const unitLabel  = getUnitLabel(unit)
  const perPiece   = selected?.unit === 'pc' && selected.serving ? `1 pc ≈ ${selected.serving}g` : null

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <p className="label">LOG A MEAL</p>
        <button
          onClick={() => open ? handleClose(null) : setOpen(true)}
          className="btn-primary text-xs px-4 py-2"
        >
          {open ? '— CANCEL' : '+ ADD MEAL'}
        </button>
      </div>

      {open && (
        <div className="space-y-4 animate-slide-up">

          {/* Mode toggle */}
          <div className="grid grid-cols-2 gap-1.5 bg-forge-surface p-1 rounded-xl">
            {[
              { key: 'search', label: '🔍 Search' },
              { key: 'custom', label: '✏️ Custom' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`py-2 rounded-lg text-xs font-mono transition-all
                  ${mode === key
                    ? 'bg-forge-accent text-forge-bg font-semibold'
                    : 'text-forge-subtext hover:text-forge-text'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── SEARCH MODE ── */}
          {mode === 'search' && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={handleQuery}
                  placeholder="e.g. banana, chicken breast, idli..."
                  className={inputClass}
                />
                {query && (
                  <button
                    onClick={resetSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-forge-muted
                               hover:text-forge-text text-lg leading-none"
                  >×</button>
                )}

                {/* Dropdown */}
                {results.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-forge-card border border-forge-border
                                  rounded-xl shadow-xl overflow-hidden">
                    {results.map(food => (
                      <button
                        key={food.name}
                        onClick={() => selectFood(food)}
                        className="w-full text-left px-4 py-3 hover:bg-forge-surface transition-colors
                                   border-b border-forge-border last:border-0"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-forge-text text-sm font-body">{food.name}</p>
                          <span className="label text-[10px] flex-shrink-0">
                            {food.unit === 'pc' ? 'per piece' : `per 100${food.unit}`}
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
                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-forge-subtext text-xs font-mono">
                      No results for &quot;{query}&quot;
                    </p>
                    <button
                      onClick={() => { setMode('custom'); setCustom(p => ({ ...p, name: query })) }}
                      className="text-forge-accent text-xs font-mono underline underline-offset-2"
                    >
                      Add manually →
                    </button>
                  </div>
                )}
              </div>

              {/* Portion */}
              {selected && (
                <div className="space-y-3 animate-slide-up">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="label text-[10px]">
                        {unit === 'pc' ? 'NUMBER OF PIECES' : unit === 'ml' ? 'AMOUNT (ML)' : 'PORTION (GRAMS)'}
                      </label>
                      {perPiece && <span className="text-forge-muted text-[10px] font-mono">{perPiece}</span>}
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text" inputMode="decimal"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value.replace(/[^0-9.]/g, ''))}
                        className="w-24 bg-forge-surface border border-forge-border rounded-xl px-3 py-2.5
                                   text-forge-text text-sm font-mono focus:outline-none
                                   focus:border-forge-accent transition-colors"
                      />
                      <span className="text-forge-subtext text-sm font-mono">{unitLabel}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-full">
                      {presets.map(p => (
                        <button
                          key={p}
                          onClick={() => setQuantity(p)}
                          className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-all
                            ${Number(quantity) === p
                              ? 'bg-forge-accent/10 border-forge-accent text-forge-accent'
                              : 'border-forge-border text-forge-subtext hover:border-forge-muted'}`}
                        >
                          {p}{unit === 'pc' ? (p === 1 ? ' pc' : ' pcs') : unit}
                        </button>
                      ))}
                    </div>
                  </div>

                  {preview && (
                    <div className="bg-forge-surface rounded-xl p-4">
                      <p className="label text-[10px] mb-3">
                        NUTRITION FOR {quantity} {unit === 'pc' ? (Number(quantity) === 1 ? 'piece' : 'pieces') : unitLabel}
                        {selected.unit === 'pc' && selected.serving && (
                          <span className="text-forge-muted ml-1">({toGrams(Number(quantity), selected)}g)</span>
                        )}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { label: 'KCAL',    value: preview.calories,      color: 'text-forge-accent' },
                          { label: 'PROTEIN', value: `${preview.protein}g`, color: 'text-forge-accent' },
                          { label: 'CARBS',   value: `${preview.carbs}g`,   color: 'text-forge-blue'   },
                          { label: 'FAT',     value: `${preview.fat}g`,     color: 'text-forge-orange' },
                        ].map(({ label, value, color }) => (
                          <div key={label} className="bg-forge-card rounded-lg p-2.5 text-center">
                            <p className={`font-mono text-sm font-semibold ${color}`}>{value}</p>
                            <p className="label text-[9px] mt-0.5">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={submitSearch}
                disabled={!selected}
                className={`btn-primary w-full ${!selected ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                LOG MEAL
              </button>
            </div>
          )}

          {/* ── CUSTOM MODE ── */}
          {mode === 'custom' && (
            <div className="space-y-3 animate-slide-up">
              <p className="text-forge-subtext text-xs font-body">
                Enter the nutrition info manually. Only name and calories are required.
              </p>

              {/* Name */}
              <div>
                <label className="label text-[10px] block mb-1.5">MEAL NAME</label>
                <input
                  ref={mode === 'custom' ? inputRef : null}
                  name="name"
                  type="text"
                  value={custom.name}
                  onChange={handleCustom}
                  onKeyDown={e => e.key === 'Enter' && submitCustom()}
                  placeholder="e.g. Homemade dal, Protein shake..."
                  className={inputClass}
                />
              </div>

              {/* Macros grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label text-[10px] block mb-1.5">CALORIES <span className="text-forge-red">*</span></label>
                  <div className="relative">
                    <input
                      name="calories" type="text" inputMode="decimal"
                      value={custom.calories}
                      onChange={e => setCustom(p => ({ ...p, calories: e.target.value.replace(/[^0-9.]/g, '') }))}
                      placeholder="450"
                      className={inputClass}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-forge-muted text-xs font-mono">kcal</span>
                  </div>
                </div>
                <div>
                  <label className="label text-[10px] block mb-1.5">PROTEIN</label>
                  <div className="relative">
                    <input
                      name="protein" type="text" inputMode="decimal"
                      value={custom.protein}
                      onChange={e => setCustom(p => ({ ...p, protein: e.target.value.replace(/[^0-9.]/g, '') }))}
                      placeholder="30"
                      className={inputClass}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-forge-muted text-xs font-mono">g</span>
                  </div>
                </div>
                <div>
                  <label className="label text-[10px] block mb-1.5">CARBS</label>
                  <div className="relative">
                    <input
                      name="carbs" type="text" inputMode="decimal"
                      value={custom.carbs}
                      onChange={e => setCustom(p => ({ ...p, carbs: e.target.value.replace(/[^0-9.]/g, '') }))}
                      placeholder="55"
                      className={inputClass}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-forge-muted text-xs font-mono">g</span>
                  </div>
                </div>
                <div>
                  <label className="label text-[10px] block mb-1.5">FAT</label>
                  <div className="relative">
                    <input
                      name="fat" type="text" inputMode="decimal"
                      value={custom.fat}
                      onChange={e => setCustom(p => ({ ...p, fat: e.target.value.replace(/[^0-9.]/g, '') }))}
                      placeholder="12"
                      className={inputClass}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-forge-muted text-xs font-mono">g</span>
                  </div>
                </div>
              </div>

              {/* Live preview */}
              {(custom.calories || custom.protein || custom.carbs || custom.fat) && (
                <div className="bg-forge-surface rounded-xl p-4">
                  <p className="label text-[10px] mb-3">PREVIEW</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: 'KCAL',    value: custom.calories || '0',  color: 'text-forge-accent' },
                      { label: 'PROTEIN', value: `${custom.protein || 0}g`, color: 'text-forge-accent' },
                      { label: 'CARBS',   value: `${custom.carbs   || 0}g`, color: 'text-forge-blue'   },
                      { label: 'FAT',     value: `${custom.fat     || 0}g`, color: 'text-forge-orange' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="bg-forge-card rounded-lg p-2.5 text-center">
                        <p className={`font-mono text-sm font-semibold ${color}`}>{value}</p>
                        <p className="label text-[9px] mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {customError && (
                <p className="text-forge-red text-xs font-mono">{customError}</p>
              )}

              <button onClick={submitCustom} className="btn-primary w-full">
                LOG MEAL
              </button>
            </div>
          )}

          <p className="text-forge-muted text-[10px] font-mono text-center">
            ⚠ Values are estimates. Actual nutrition may vary.
          </p>
        </div>
      )}
    </div>
  )
}