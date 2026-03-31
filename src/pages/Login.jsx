import { useState } from 'react'

export default function Login({ onSkip, onBack }) {
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit() {
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email address')
      return
    }
    setLoading(true)
    setError('')

    const { supabase } = await import('../lib/supabase')
    if (!supabase) {
      setError('Sync not configured — continue offline below')
      setLoading(false)
      return
    }

    const { error: err } = await supabase.auth.signInWithOtp({
      email:   email.trim(),
      options: { emailRedirectTo: window.location.origin },
    })

    setLoading(false)
    if (err) { setError(err.message); return }
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-forge-bg flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-forge-subtext hover:text-forge-text
                     transition-colors text-sm font-mono group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back</span>
        </button>
        <button
          onClick={onBack}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/favicon.png" alt="NutriForge" className="w-6 h-6 rounded-md object-cover" />
          <span className="font-display text-lg text-forge-text tracking-wider">NUTRIFORGE</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
        <div className="w-full max-w-sm space-y-8">

          {!sent ? (
            <>
              {/* Heading */}
              <div className="space-y-2">
                <h1 className="font-display text-5xl text-forge-text tracking-wider">
                  SYNC YOUR<br />
                  <span className="text-forge-accent">DATA.</span>
                </h1>
                <p className="text-forge-subtext text-sm font-body leading-relaxed">
                  Sign in once to access your nutrition data on any device. No password needed.
                </p>
              </div>

              {/* Card */}
              <div className="space-y-4">
                <div>
                  <label className="label text-[10px] block mb-2">YOUR EMAIL</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    placeholder="you@example.com"
                    autoFocus
                    className="w-full bg-forge-surface border border-forge-border rounded-xl
                               px-4 py-3.5 text-forge-text text-sm font-mono placeholder-forge-muted
                               focus:outline-none focus:border-forge-accent transition-colors"
                  />
                  {error && (
                    <p className="text-forge-red text-xs font-mono mt-2">{error}</p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-display text-xl tracking-widest
                              transition-all duration-150 active:scale-95
                              ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:brightness-110'}
                              bg-forge-accent text-forge-bg`}
                >
                  {loading ? 'SENDING...' : 'SEND MAGIC LINK'}
                </button>

                {/* How it works */}
                <div className="bg-forge-surface border border-forge-border rounded-xl p-4 space-y-2.5">
                  <p className="label text-[10px]">HOW IT WORKS</p>
                  {[
                    ['01', 'Enter your email above'],
                    ['02', 'Click the link we send you'],
                    ['03', 'You\'re in — data syncs automatically'],
                  ].map(([n, text]) => (
                    <div key={n} className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-forge-accent w-4 flex-shrink-0">{n}</span>
                      <span className="text-forge-subtext text-xs font-body">{text}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-forge-border" />
                  <span className="text-forge-muted text-xs font-mono">OR</span>
                  <div className="flex-1 h-px bg-forge-border" />
                </div>

                <button
                  onClick={onSkip}
                  className="w-full py-3 rounded-xl border border-forge-border text-forge-subtext
                             text-sm font-mono hover:border-forge-muted hover:text-forge-text
                             transition-all duration-150"
                >
                  Continue without syncing
                </button>
                <p className="text-forge-muted text-[10px] font-mono text-center">
                  Data will only be stored on this device
                </p>
              </div>
            </>
          ) : (
            /* Sent state */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-forge-accent/10 border border-forge-accent/20
                              flex items-center justify-center mx-auto text-3xl">
                📬
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-3xl text-forge-text tracking-wider">CHECK YOUR INBOX</h2>
                <p className="text-forge-subtext text-sm font-body">
                  Magic link sent to
                </p>
                <p className="text-forge-accent font-mono text-sm">{email}</p>
              </div>
              <div className="bg-forge-surface border border-forge-border rounded-xl p-4 text-left space-y-2">
                <p className="label text-[10px]">NEXT STEPS</p>
                <p className="text-forge-subtext text-xs font-body leading-relaxed">
                  Open the email from NutriForge and click the sign-in link. It expires in 1 hour. Check your spam folder if you don't see it.
                </p>
              </div>
              <button
                onClick={() => { setSent(false); setEmail('') }}
                className="text-forge-subtext text-xs font-mono hover:text-forge-text
                           transition-colors underline underline-offset-4"
              >
                Use a different email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}