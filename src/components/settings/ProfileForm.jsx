import { useState } from 'react'
import { ACTIVITY_LABELS } from '../../constants/macroRatios'

export default function ProfileForm({ profile, onSave }) {
  const [form, setForm] = useState(profile)

  function handle(e) {
    const { name, value } = e.target
    const updated = { ...form, [name]: value }
    setForm(updated)
    const { goal: _goal, ...rest } = updated
    onSave({ ...rest, age: Number(rest.age), weight: Number(rest.weight), height: Number(rest.height) })
  }

  function handleSex(s) {
    const updated = { ...form, sex: s }
    setForm(updated)
    const { goal: _goal, ...rest } = updated
    onSave({ ...rest, age: Number(rest.age), weight: Number(rest.weight), height: Number(rest.height) })
  }

  function handleActivity(key) {
    const updated = { ...form, activity: key }
    setForm(updated)
    const { goal: _goal, ...rest } = updated
    onSave({ ...rest, age: Number(rest.age), weight: Number(rest.weight), height: Number(rest.height) })
  }

  const inputClass = `w-full bg-forge-surface border border-forge-border rounded-xl px-4 py-3
    text-forge-text text-sm font-mono placeholder-forge-muted
    focus:outline-none focus:border-forge-accent transition-colors
    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none`

  return (
    <div className="card space-y-5">
      <p className="label">PROFILE</p>

      {/* Name — full width */}
      <div>
        <label className="label text-[10px] block mb-1.5">NAME</label>
        <input
          name="name" type="text" value={form.name ?? ''}
          onChange={handle} placeholder="Your name"
          className={inputClass}
        />
      </div>

      {/* Age / Weight / Height — 3 cols */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { name: 'age',    label: 'AGE',    placeholder: '25'  },
          { name: 'weight', label: 'WT (KG)', placeholder: '75'  },
          { name: 'height', label: 'HT (CM)', placeholder: '175' },
        ].map(f => (
          <div key={f.name}>
            <label className="label text-[10px] block mb-1.5">{f.label}</label>
            <input
              name={f.name} type="text" inputMode="decimal"
              value={form[f.name] ?? ''}
              onChange={handle} placeholder={f.placeholder}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* Sex */}
      <div>
        <label className="label text-[10px] block mb-2">BIOLOGICAL SEX</label>
        <div className="grid grid-cols-2 gap-2">
          {['male', 'female'].map(s => (
            <button
              key={s}
              onClick={() => handleSex(s)}
              className={`py-3 rounded-xl text-sm font-mono border transition-all
                ${form.sex === s
                  ? 'bg-forge-accent/10 border-forge-accent text-forge-accent'
                  : 'bg-forge-surface border-forge-border text-forge-subtext hover:border-forge-muted'
                }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div>
        <label className="label text-[10px] block mb-2">ACTIVITY LEVEL</label>
        <div className="space-y-1.5">
          {Object.entries(ACTIVITY_LABELS).map(([key, desc]) => (
            <button
              key={key}
              onClick={() => handleActivity(key)}
              className={`w-full text-left px-4 py-2.5 rounded-xl border transition-all
                ${form.activity === key
                  ? 'bg-forge-accent/10 border-forge-accent'
                  : 'bg-forge-surface border-forge-border hover:border-forge-muted'
                }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`font-mono text-xs uppercase tracking-wide
                  ${form.activity === key ? 'text-forge-accent' : 'text-forge-text'}`}>
                  {key.replace('_', ' ')}
                </span>
                {form.activity === key && (
                  <span className="text-forge-accent text-xs">✓</span>
                )}
              </div>
              <p className="text-[11px] text-forge-subtext mt-0.5 font-body">{desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}