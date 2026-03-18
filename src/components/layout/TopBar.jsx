export default function TopBar({ title, profile }) {

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  return (
    <header className="h-16 bg-forge-surface border-b border-forge-border px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="font-display text-2xl text-forge-text tracking-wider">{title}</h1>
        <p className="label text-xs">{today}</p>
      </div>

      <div className="flex items-center gap-4">
        {profile?.streak > 0 && (
          <div className="flex items-center gap-2 bg-forge-accent/10 border border-forge-accent/20 px-3 py-1.5 rounded-full">
            <span className="text-forge-accent text-sm">🔥</span>
            <span className="font-mono text-forge-accent text-sm font-semibold">
              {profile.streak}d streak
            </span>
          </div>
        )}
        <div className="w-8 h-8 rounded-full bg-forge-border flex items-center justify-center">
          <span className="text-forge-subtext text-sm font-mono">
            {profile?.name?.[0]?.toUpperCase() ?? '?'}
          </span>
        </div>
      </div>
    </header>
  )
}