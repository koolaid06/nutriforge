import { useState } from 'react'

export default function Login({ onSkip }) {
  const [email, setEmail]   = useState('')
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  async function handleSubmit() {
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email address')
      return
    }
    setLoading(true)
    setError('')

    // Dynamic import so the page still works if Supabase isn't configured
    const { supabase } = await import('../lib/supabase')
    if (!supabase) {
      setError('Sync not configured — continue offline below')
      setLoading(false)
      return
    }

    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    })

    setLoading(false)
    if (err) { setError(err.message); return }
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-forge-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">

        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-forge-accent flex items-center justify-center mx-auto">
            <span className="font-display text-2xl text-forge-bg leading-none">N</span>
          </div>
          <h1 className="font-display text-3xl text-forge-text tracking-wider">NUTRIFORGE</h1>
          <p className="text-forge-subtext text-sm">Sign in to sync across devices</p>
        </div>

        {!sent ? (
          <div className="card space-y-4">
            <div>
              <p className="text-forge-text text-sm font-medium mb-1">Magic Link Sign In</p>
              <p className="text-forge-subtext text-xs">
                Enter your email — we'll send a login link. No password needed.
              </p>
            </div>

            <div>
              <label className="label text-[10px] block mb-1.5">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="you@example.com"
                autoFocus
                className="w-full bg-forge-surface border border-forge-border rounded-xl px-4 py-3
                           text-forge-text text-sm font-mono placeholder-forge-muted
                           focus:outline-none focus:border-forge-accent transition-colors"
              />
            </div>

            {error && <p className="text-forge-red text-xs font-mono">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`btn-primary w-full py-3 ${loading ? 'opacity-60' : ''}`}
            >
              {loading ? 'SENDING...' : 'SEND MAGIC LINK →'}
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-forge-border" />
              <span className="text-forge-muted text-xs font-mono">OR</span>
              <div className="flex-1 h-px bg-forge-border" />
            </div>

            <button
              onClick={onSkip}
              className="w-full py-2.5 text-sm font-mono text-forge-subtext
                         hover:text-forge-text transition-colors text-center"
            >
              Continue without syncing →
            </button>
            <p className="text-forge-muted text-[10px] font-mono text-center">
              Data stays on this device only
            </p>
          </div>
        ) : (
          <div className="card space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-forge-accent/10 border border-forge-accent/30
                            flex items-center justify-center mx-auto">
              <span className="text-2xl">📬</span>
            </div>
            <div>
              <p className="text-forge-text font-medium">Check your email</p>
              <p className="text-forge-subtext text-sm mt-1">
                We sent a magic link to<br />
                <span className="text-forge-accent font-mono">{email}</span>
              </p>
            </div>
            <p className="text-forge-muted text-xs">
              Click the link in the email to sign in. You can close this tab.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-forge-subtext text-xs font-mono hover:text-forge-text transition-colors"
            >
              ← Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  )
}