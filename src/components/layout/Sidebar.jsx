import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/',          icon: '⬡', label: 'Dashboard' },
  { to: '/log',       icon: '✦', label: 'Meal Log'  },
  { to: '/analytics', icon: '◈', label: 'Analytics' },
  { to: '/settings',  icon: '◎', label: 'Settings'  },
]

// ── Desktop sidebar (lg+) ─────────────────────────────────
export function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-56 bg-forge-surface border-r border-forge-border flex-col z-40">
      <div className="px-4 py-6 flex items-center gap-3 border-b border-forge-border">
        <div className="w-8 h-8 rounded-lg bg-forge-accent flex items-center justify-center flex-shrink-0">
          <span className="text-forge-bg font-display text-lg leading-none">N</span>
        </div>
        <span className="font-display text-2xl text-forge-text tracking-wider">NUTRIFORGE</span>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {NAV.map(({ to, icon, label }) => (
          <NavLink
            key={to} to={to} end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150
               ${isActive
                 ? 'bg-forge-accent/10 text-forge-accent border border-forge-accent/20'
                 : 'text-forge-subtext hover:text-forge-text hover:bg-forge-border/50'
               }`
            }
          >
            <span className="text-lg w-5 text-center flex-shrink-0">{icon}</span>
            <span className="text-sm font-body font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-forge-border">
        <p className="label text-center">FORGE YOUR BODY</p>
      </div>
    </aside>
  )
}

// ── Mobile bottom nav (< lg) ──────────────────────────────
export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-forge-surface border-t border-forge-border
                    flex items-center justify-around px-2 py-2 safe-area-pb">
      {NAV.map(({ to, icon, label }) => (
        <NavLink
          key={to} to={to} end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-150 min-w-[60px]
             ${isActive
               ? 'text-forge-accent'
               : 'text-forge-muted'
             }`
          }
        >
          <span className="text-xl leading-none">{icon}</span>
          <span className="text-[10px] font-mono tracking-wide">{label.split(' ')[0].toUpperCase()}</span>
        </NavLink>
      ))}
    </nav>
  )
}

// Default export for backwards compat
export default function Sidebar() {
  return <DesktopSidebar />
}