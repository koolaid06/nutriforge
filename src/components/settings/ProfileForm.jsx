import { useState } from 'react'
import { ACTIVITY_LABELS } from '../../constants/macroRatios'

export default function ProfileForm({ profile, onSave }) {
  const [form, setForm] = useState(profile)
  const [saved, setSaved] = useState(false)

  function handle(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function submit() {
    // Exclude 'goal' — it is owned exclusively by GoalSelector
    const { goal: _goal, ...rest } = form
    onSave({ ...rest, age: Number(rest.age), weight: Number(rest.weight), height: Number(rest.height) })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const fields = [
    { name: 'name',   label: 'NAME',         type: 'text',   placeholder: 'Your name'  },
    { name: 'age',    label: 'AGE',          type: 'number', placeholder: '25'         },
    { name: 'weight', label: 'WEIGHT (KG)',  type: 'number', placeholder: '75'         },
    { name: 'height', label: 'HEIGHT (CM)',  type: 'number', placeholder: '175'        },
  ]

  return (
    <div className="card space-y-5">
      <p className="label">PROFILE</p>

      <div className="grid grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.name}>
            <label className="label text-[10px] block mb-1.5">{f.label}</label>
            <input
              name={f.name} type={f.type} value={form[f.name] ?? ''}
              onChange={handle} placeholder={f.placeholder}
              className="w-full bg-forge-surface border border-forge-border rounded-xl px-4 py-2.5
                         text-forge-text text-sm font-mono placeholder-forge-muted
                         focus:outline-none focus:border-forge-accent transition-colors"
            />
          </div>
        ))}
      </div>

      {/* Sex */}
      <div>
        <label className="label text-[10px] block mb-2">BIOLOGICAL SEX</label>
        <div className="flex gap-3">
          {['male', 'female'].map(s => (
            <button
              key={s}
              onClick={() => setForm(prev => ({ ...prev, sex: s }))}
              className={`flex-1 py-2.5 rounded-xl text-sm font-body border transition-all
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
        <div className="space-y-2">
          {Object.entries(ACTIVITY_LABELS).map(([key, desc]) => (
            <button
              key={key}
              onClick={() => setForm(prev => ({ ...prev, activity: key }))}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all
                ${form.activity === key
                  ? 'bg-forge-accent/10 border-forge-accent text-forge-accent'
                  : 'bg-forge-surface border-forge-border text-forge-subtext hover:border-forge-muted'
                }`}
            >
              <span className="font-mono text-xs uppercase">{key.replace('_', ' ')}</span>
              <p className="text-xs mt-0.5 opacity-70">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      <button onClick={submit} className="btn-primary w-full">
        {saved ? '✓ SAVED' : 'SAVE PROFILE'}
      </button>
    </div>
  )
}