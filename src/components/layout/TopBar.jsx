export default function TopBar({ title, profile }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  return (
    <header className="h-14 bg-forge-surface border-b border-forge-border px-4
                       flex items-center justify-between sticky top-0 z-30">
      <div className="min-w-0">
        <h1 className="font-display text-xl text-forge-text tracking-wider leading-none truncate">
          {title}
        </h1>
        <p className="label text-[10px] hidden sm:block mt-0.5 truncate">{today}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
        {profile?.streak > 0 && (
          <div className="flex items-center gap-1.5 bg-forge-accent/10 border border-forge-accent/20
                          px-2 py-1 rounded-full">
            <span className="text-forge-accent text-xs">🔥</span>
            <span className="font-mono text-forge-accent text-xs font-semibold">{profile.streak}d</span>
          </div>
        )}
        <div className="w-7 h-7 rounded-full bg-forge-border flex items-center justify-center">
          <span className="text-forge-subtext text-xs font-mono">
            {profile?.name?.[0]?.toUpperCase() ?? '?'}
          </span>
        </div>
      </div>
    </header>
  )
}