export default function TopBar({ title, profile }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  return (
    <header className="h-14 lg:h-16 bg-forge-surface border-b border-forge-border px-4 lg:px-6
                       flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="font-display text-xl lg:text-2xl text-forge-text tracking-wider leading-none">
          {title}
        </h1>
        <p className="label text-[10px] hidden sm:block mt-0.5">{today}</p>
      </div>

      <div className="flex items-center gap-3">
        {profile?.streak > 0 && (
          <div className="flex items-center gap-1.5 bg-forge-accent/10 border border-forge-accent/20
                          px-2.5 py-1.5 rounded-full">
            <span className="text-forge-accent text-xs">🔥</span>
            <span className="font-mono text-forge-accent text-xs font-semibold">
              {profile.streak}d
            </span>
          </div>
        )}
        <div className="w-8 h-8 rounded-full bg-forge-border flex items-center justify-center flex-shrink-0">
          <span className="text-forge-subtext text-sm font-mono">
            {profile?.name?.[0]?.toUpperCase() ?? '?'}
          </span>
        </div>
      </div>
    </header>
  )
}