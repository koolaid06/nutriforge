export default function TopBar({ title, profile }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  return (
    <header className="h-16 bg-forge-surface border-b border-forge-border
                       px-5 lg:px-7 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="font-display font-bold text-forge-text text-xl leading-none">
          {title}
        </h1>
        <p className="text-forge-subtext text-xs font-body mt-0.5 hidden sm:block">{today}</p>
      </div>

      <div className="flex items-center gap-3">
        {profile?.streak > 0 && (
          <div className="flex items-center gap-1.5 bg-forge-accent/10 border border-forge-accent/20
                          px-3 py-1.5 rounded-full">
            <span className="text-xs">🔥</span>
            <span className="font-mono text-forge-accent text-xs font-semibold">{profile.streak}d</span>
          </div>
        )}
        <div className="w-8 h-8 rounded-full bg-forge-border flex items-center justify-center">
          <span className="text-forge-text text-sm font-display font-bold">
            {profile?.name?.[0]?.toUpperCase() ?? '?'}
          </span>
        </div>
      </div>
    </header>
  )
}