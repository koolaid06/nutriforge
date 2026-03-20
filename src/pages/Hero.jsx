import { useState, useEffect } from 'react'

const FEATURES = [
  { icon: '⬡', title: 'Smart Calorie Engine',  desc: 'BMR & TDEE calculated using the Mifflin-St Jeor formula. Your targets update instantly when your stats change.' },
  { icon: '◈', title: 'Phase-Based Nutrition',  desc: 'Cut, Bulk, or Maintain. Each phase sets precise macro splits — not just calories, but protein, carbs, and fat.' },
  { icon: '✦', title: 'Discipline Score',       desc: 'A 0–100 score based on calorie accuracy, macro adherence, and logging consistency. Know exactly how on-track you are.' },
  { icon: '◎', title: 'Adaptive Feedback',      desc: 'Weight trend analysis over 2 weeks triggers smart calorie adjustment suggestions — up or down, with a reason.' },
]

const STATS = [
  { value: '2,000+', label: 'Foods in USDA database'      },
  { value: '16wk',   label: 'Consistency calendar view'   },
  { value: '7',      label: 'Metrics tracked per meal'    },
  { value: '500',    label: 'kcal deficit for a clean cut' },
]

export default function Hero({ onEnter, isSetup, onAuthRedirect, isLoggedIn }) {
  const [visible, setVisible]   = useState(false)
  const [hovering, setHovering] = useState(false)
  const [prompt, setPrompt]     = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Detect Supabase magic link redirect
  useEffect(() => {
    const hash = window.location.hash
    if (hash && (hash.includes('access_token') || hash.includes('type=magiclink') || hash.includes('type=recovery'))) {
      window.history.replaceState(null, '', window.location.pathname)
      setTimeout(() => {
        if (onAuthRedirect) onAuthRedirect()
      }, 800)
    }
  }, [])

  // If already logged in, clicking Start Forging goes straight to dashboard
  function handleStartClick() {
    if (isLoggedIn || isSetup) {
      onEnter('offline') // offline = skip login, go to dashboard
    } else {
      setPrompt(true)
    }
  }

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
        className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[500px]
                   rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #e8ff47, transparent 70%)' }}
      />

      {/* Nav */}
      <nav
        className="relative z-10 flex items-center justify-between px-4 lg:px-8 py-4 lg:py-6"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}
      >
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="NutriForge" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-display text-xl text-forge-text tracking-widest">NUTRIFORGE</span>
        </div>
        <button onClick={handleStartClick} className="btn-ghost text-xs px-4 py-2">
          ENTER APP →
        </button>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 lg:px-6 text-center py-8">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-forge-accent/10 border border-forge-accent/20
                     px-4 py-1.5 rounded-full mb-8"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.6s ease 0.1s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-forge-accent animate-pulse-slow" />
          <span className="text-forge-accent text-xs font-mono tracking-widest">ADAPTIVE NUTRITION INTELLIGENCE</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-[clamp(56px,10vw,120px)] leading-none text-forge-text tracking-wider mb-6"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.2s' }}
        >
          FORGE YOUR<br />
          <span style={{ color: '#e8ff47' }}>BODY.</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-forge-subtext text-lg font-body max-w-xl leading-relaxed mb-10"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.7s ease 0.35s' }}
        >
          Not a calorie counter. A structured transformation system
          that tracks, scores, and adapts your nutrition in real time.
        </p>

        {/* CTA */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.7s ease 0.5s' }}>
          <button
            onClick={handleStartClick}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative px-10 py-4 rounded-2xl font-display text-2xl tracking-widest
                       transition-all duration-200 active:scale-95"
            style={{
              background: hovering ? '#f5ff70' : '#e8ff47',
              color: '#0a0a0f',
              boxShadow: hovering ? '0 0 40px rgba(232,255,71,0.4), 0 0 80px rgba(232,255,71,0.15)' : '0 0 20px rgba(232,255,71,0.2)',
              transform: hovering ? 'scale(1.03)' : 'scale(1)',
            }}
          >
            START FORGING
            <span className="inline-block ml-3 transition-transform duration-200" style={{ transform: hovering ? 'translateX(6px)' : 'translateX(0)' }}>→</span>
          </button>
          <p className="text-forge-muted text-xs font-mono mt-3">No sign-up required. Everything stays on your device.</p>
        </div>

        {/* Stats strip */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-forge-border rounded-2xl overflow-hidden mt-10 lg:mt-16 w-full max-w-2xl"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.7s ease 0.65s' }}
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
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-forge-border border-t border-forge-border"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.8s' }}
      >
        {FEATURES.map(({ icon, title, desc }) => (
          <div key={title} className="bg-forge-surface px-4 lg:px-6 py-6 lg:py-8 group hover:bg-forge-card transition-colors duration-200">
            <span className="text-forge-accent text-2xl mb-4 block">{icon}</span>
            <p className="font-display text-lg text-forge-text tracking-wide mb-2 group-hover:text-forge-accent transition-colors">{title}</p>
            <p className="text-forge-subtext text-xs font-body leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* ── Choice prompt modal ── */}
      {prompt && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-forge-bg/80 backdrop-blur-sm z-50"
            onClick={() => setPrompt(false)}
          />

          {/* Centered modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
              className="w-full max-w-md bg-forge-card border border-forge-border rounded-3xl
                         p-6 space-y-5 animate-slide-up shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div>
                <h2 className="font-display text-4xl text-forge-text tracking-wider leading-none">
                  HOW DO YOU<br />WANT TO{' '}
                  <span className="text-forge-accent">START?</span>
                </h2>
                <p className="text-forge-subtext text-sm font-body mt-3 leading-relaxed">
                  Sign in to keep your data across all your devices, or jump straight in offline.
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <button
                  onClick={() => { setPrompt(false); onEnter('login') }}
                  className="w-full p-4 rounded-2xl border border-forge-accent/30 bg-forge-accent/5
                             text-left transition-all hover:bg-forge-accent/10 active:scale-[0.98] group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-display text-xl text-forge-accent tracking-wider">SIGN IN & SYNC</p>
                      <p className="text-forge-subtext text-xs font-body mt-1">
                        Magic link — no password. Access your data on any device.
                      </p>
                    </div>
                    <span className="text-forge-accent text-xl flex-shrink-0
                                     group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>

                <button
                  onClick={() => { setPrompt(false); onEnter('offline') }}
                  className="w-full p-4 rounded-2xl border border-forge-border bg-forge-surface
                             text-left transition-all hover:border-forge-muted active:scale-[0.98] group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-display text-xl text-forge-text tracking-wider">CONTINUE OFFLINE</p>
                      <p className="text-forge-subtext text-xs font-body mt-1">
                        Stored on this device only. You can always sync later from Settings.
                      </p>
                    </div>
                    <span className="text-forge-subtext text-xl flex-shrink-0
                                     group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </button>
              </div>

              {/* Dismiss */}
              <button
                onClick={() => setPrompt(false)}
                className="w-full text-center text-forge-muted text-xs font-mono py-1
                           hover:text-forge-subtext transition-colors"
              >
                ← back to home
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  )
}