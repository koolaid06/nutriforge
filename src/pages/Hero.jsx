import { useState, useEffect } from 'react'

const FEATURES = [
  {
    icon: '⬡',
    title: 'Smart Calorie Engine',
    desc: 'BMR & TDEE calculated using the Mifflin-St Jeor formula. Your targets update instantly when your stats change.',
  },
  {
    icon: '◈',
    title: 'Phase-Based Nutrition',
    desc: 'Cut, Bulk, or Maintain. Each phase sets precise macro splits — not just calories, but protein, carbs, and fat.',
  },
  {
    icon: '✦',
    title: 'Discipline Score',
    desc: 'A 0–100 score based on calorie accuracy, macro adherence, and logging consistency. Know exactly how on-track you are.',
  },
  {
    icon: '◎',
    title: 'Adaptive Feedback',
    desc: 'Weight trend analysis over 2 weeks triggers smart calorie adjustment suggestions — up or down, with a reason.',
  },
]

const STATS = [
  { value: '2,000+', label: 'Foods in USDA database' },
  { value: '16wk',   label: 'Consistency calendar view' },
  { value: '7',      label: 'Metrics tracked per meal' },
  { value: '3',    label: 'different plans to suit your needs' },
]

export default function Hero({ onEnter }) {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-forge-bg overflow-hidden relative flex flex-col">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#e8ff47 1px, transparent 1px),
                            linear-gradient(90deg, #e8ff47 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blob */}
      <div
        className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #e8ff47, transparent 70%)' }}
      />

      {/* Nav bar */}
      <nav
        className="relative z-10 flex items-center justify-between px-8 py-6"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-forge-accent flex items-center justify-center">
            <span className="font-display text-lg text-forge-bg leading-none">N</span>
          </div>
          <span className="font-display text-xl text-forge-text tracking-widest">NUTRIFORGE</span>
        </div>
        <button
          onClick={onEnter}
          className="btn-ghost text-xs px-4 py-2"
        >
          ENTER APP →
        </button>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-forge-accent/10 border border-forge-accent/20
                     px-4 py-1.5 rounded-full mb-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s ease 0.1s',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-forge-accent animate-pulse-slow" />
          <span className="text-forge-accent text-xs font-mono tracking-widest">
            ADAPTIVE NUTRITION INTELLIGENCE
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-[clamp(56px,10vw,120px)] leading-none text-forge-text tracking-wider mb-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.2s',
          }}
        >
          FORGE YOUR
          <br />
          <span style={{ color: '#e8ff47' }}>BODY.</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-forge-subtext text-lg font-body max-w-xl leading-relaxed mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.7s ease 0.35s',
          }}
        >
          Not a calorie counter. A structured transformation system
          that tracks, scores, and adapts your nutrition in real time.
        </p>

        {/* CTA */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.7s ease 0.5s',
          }}
        >
          <button
            onClick={onEnter}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative group px-10 py-4 rounded-2xl font-display text-2xl tracking-widest
                       transition-all duration-200 active:scale-95"
            style={{
              background: hovering ? '#f5ff70' : '#e8ff47',
              color: '#0a0a0f',
              boxShadow: hovering
                ? '0 0 40px rgba(232,255,71,0.4), 0 0 80px rgba(232,255,71,0.15)'
                : '0 0 20px rgba(232,255,71,0.2)',
              transform: hovering ? 'scale(1.03)' : 'scale(1)',
            }}
          >
            START FORGING
          </button>
          <p className="text-forge-muted text-xs font-mono mt-3">
            No sign-up. No cloud. Everything stays on your device.
          </p>
        </div>

        {/* Stats strip */}
        <div
          className="grid grid-cols-4 gap-px bg-forge-border rounded-2xl overflow-hidden mt-16 w-full max-w-2xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.7s ease 0.65s',
          }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="bg-forge-surface px-4 py-4 text-center">
              <p className="font-display text-3xl text-forge-accent">{value}</p>
              <p className="label text-[10px] mt-1 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features grid */}
      <div
        className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-forge-border
                   border-t border-forge-border"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.8s',
        }}
      >
        {FEATURES.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-forge-surface px-6 py-8 group hover:bg-forge-card transition-colors duration-200"
          >
            <span className="text-forge-accent text-2xl mb-4 block">{icon}</span>
            <p className="font-display text-lg text-forge-text tracking-wide mb-2 group-hover:text-forge-accent transition-colors">
              {title}
            </p>
            <p className="text-forge-subtext text-xs font-body leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}