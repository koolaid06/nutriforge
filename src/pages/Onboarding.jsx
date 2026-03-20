import { useState } from 'react'
import { ACTIVITY_LABELS, PHASE_LABELS } from '../constants/macroRatios'
import { calcAllTargets } from '../utils/calculations'

const STEPS = ['basics', 'body', 'goal', 'done']

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', age: '', weight: '', height: '',
    sex: 'male', activity: 'moderate', goal: 'maintain',
  })

  function set(key, val) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else finish()
  }

  function finish() {
    onComplete({
      ...form,
      age:    Number(form.age)    || 25,
      weight: Number(form.weight) || 70,
      height: Number(form.height) || 170,
    })
  }

  const inputClass = `w-full bg-forge-bg border border-forge-border rounded-xl px-4 py-3
    text-forge-text text-sm font-mono placeholder-forge-muted
    focus:outline-none focus:border-forge-accent transition-colors
    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none`

  const targets = form.weight && form.height && form.age
    ? calcAllTargets({ ...form, age: Number(form.age), weight: Number(form.weight), height: Number(form.height) })
    : null

  const stepProgress = ((step) / (STEPS.length - 1)) * 100

  return (
    <div className="min-h-screen bg-forge-bg flex flex-col items-center justify-center p-4">
      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="label text-[10px]">SETUP YOUR PROFILE</span>
          <span className="label text-[10px]">STEP {step + 1} OF {STEPS.length}</span>
        </div>
        <div className="h-1 bg-forge-border rounded-full overflow-hidden">
          <div
            className="h-full bg-forge-accent rounded-full transition-all duration-500"
            style={{ width: `${stepProgress}%` }}
          />
        </div>
      </div>

      <div className="w-full max-w-md">

        {/* Step 0 — Name */}
        {step === 0 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h1 className="font-display text-4xl text-forge-text tracking-wider">WHAT'S YOUR NAME?</h1>
              <p className="text-forge-subtext text-sm mt-2">We'll personalise your experience.</p>
            </div>
            <input
              autoFocus
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && form.name.trim() && next()}
              placeholder="Enter your name"
              className={inputClass}
            />
            <button
              onClick={next}
              disabled={!form.name.trim()}
              className={`btn-primary w-full py-3 text-base ${!form.name.trim() ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              CONTINUE →
            </button>
          </div>
        )}

        {/* Step 1 — Body stats */}
        {step === 1 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h1 className="font-display text-4xl text-forge-text tracking-wider">YOUR BODY</h1>
              <p className="text-forge-subtext text-sm mt-2">Used to calculate your calorie and macro targets.</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'age',    label: 'AGE',     placeholder: '25'  },
                { key: 'weight', label: 'WT (KG)',  placeholder: '70'  },
                { key: 'height', label: 'HT (CM)',  placeholder: '170' },
              ].map(f => (
                <div key={f.key}>
                  <label className="label text-[10px] block mb-1.5">{f.label}</label>
                  <input
                    type="text" inputMode="decimal"
                    value={form[f.key]}
                    onChange={e => set(f.key, e.target.value.replace(/[^0-9.]/g, ''))}
                    placeholder={f.placeholder}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="label text-[10px] block mb-2">BIOLOGICAL SEX</label>
              <div className="grid grid-cols-2 gap-2">
                {['male', 'female'].map(s => (
                  <button key={s} onClick={() => set('sex', s)}
                    className={`py-3 rounded-xl text-sm font-mono border transition-all
                      ${form.sex === s
                        ? 'bg-forge-accent/10 border-forge-accent text-forge-accent'
                        : 'bg-forge-surface border-forge-border text-forge-subtext'}`}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label text-[10px] block mb-2">ACTIVITY LEVEL</label>
              <div className="space-y-1.5">
                {Object.entries(ACTIVITY_LABELS).map(([key, desc]) => (
                  <button key={key} onClick={() => set('activity', key)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border transition-all
                      ${form.activity === key
                        ? 'bg-forge-accent/10 border-forge-accent'
                        : 'bg-forge-surface border-forge-border hover:border-forge-muted'}`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs uppercase ${form.activity === key ? 'text-forge-accent' : 'text-forge-text'}`}>
                        {key.replace('_', ' ')}
                      </span>
                      {form.activity === key && <span className="text-forge-accent text-xs">✓</span>}
                    </div>
                    <p className="text-[11px] text-forge-subtext mt-0.5">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={next}
              disabled={!form.age || !form.weight || !form.height}
              className={`btn-primary w-full py-3 text-base ${(!form.age || !form.weight || !form.height) ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              CONTINUE →
            </button>
          </div>
        )}

        {/* Step 2 — Goal */}
        {step === 2 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h1 className="font-display text-4xl text-forge-text tracking-wider">YOUR GOAL</h1>
              <p className="text-forge-subtext text-sm mt-2">This sets your calorie target and macro split.</p>
            </div>

            <div className="space-y-3">
              {[
                { key: 'cut',      icon: '↓', delta: '−500 kcal/day', desc: 'Lose fat, preserve muscle'   },
                { key: 'maintain', icon: '→', delta: '±0 kcal/day',   desc: 'Recomposition & maintenance' },
                { key: 'bulk',     icon: '↑', delta: '+300 kcal/day', desc: 'Build muscle & size'          },
              ].map(({ key, icon, delta, desc }) => {
                const phase = PHASE_LABELS[key]
                const active = form.goal === key
                return (
                  <button key={key} onClick={() => set('goal', key)}
                    className={`w-full text-left p-4 rounded-xl border transition-all
                      ${active ? `${phase.bg} ${phase.border}` : 'bg-forge-surface border-forge-border hover:border-forge-muted'}`}>
                    <div className="flex items-center gap-4">
                      <span className={`font-display text-3xl ${active ? phase.color : 'text-forge-muted'}`}>{icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-display text-xl tracking-wider ${active ? phase.color : 'text-forge-subtext'}`}>
                            {phase.label}
                          </span>
                          <span className={`font-mono text-xs ${active ? phase.color : 'text-forge-muted'}`}>{delta}</span>
                        </div>
                        <p className="text-xs text-forge-subtext mt-0.5">{desc}</p>
                      </div>
                      {active && <span className={`text-sm ${phase.color}`}>✓</span>}
                    </div>
                  </button>
                )
              })}
            </div>

            <button onClick={next} className="btn-primary w-full py-3 text-base">
              CONTINUE →
            </button>
          </div>
        )}

        {/* Step 3 — Summary */}
        {step === 3 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <h1 className="font-display text-4xl text-forge-text tracking-wider">
                LET'S GO,<br />
                <span className="text-forge-accent">{form.name.toUpperCase()}.</span>
              </h1>
              <p className="text-forge-subtext text-sm mt-2">Here are your personalised targets.</p>
            </div>

            {targets && (
              <div className="card space-y-3">
                <p className="label text-[10px]">YOUR DAILY TARGETS</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'CALORIES',  value: targets.targetCalories, unit: 'kcal' },
                    { label: 'PROTEIN',   value: targets.macros.protein,  unit: 'g'    },
                    { label: 'CARBS',     value: targets.macros.carbs,    unit: 'g'    },
                    { label: 'FAT',       value: targets.macros.fat,      unit: 'g'    },
                  ].map(({ label, value, unit }) => (
                    <div key={label} className="bg-forge-surface rounded-xl p-3">
                      <p className="label text-[10px]">{label}</p>
                      <p className="font-display text-3xl text-forge-accent mt-1">{value}</p>
                      <p className="label text-[10px]">{unit}/day</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={finish} className="btn-primary w-full py-3 text-base">
              START FORGING →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}