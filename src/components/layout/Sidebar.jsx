import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/',          icon: '⬡', label: 'Dashboard' },
  { to: '/log',       icon: '✦', label: 'Meal Log'  },
  { to: '/analytics', icon: '◈', label: 'Analytics' },
  { to: '/settings',  icon: '◎', label: 'Settings'  },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-16 lg:w-56 bg-forge-surface border-r border-forge-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-4 py-6 flex items-center gap-3 border-b border-forge-border">
        <div className="w-8 h-8 rounded-lg bg-forge-accent flex items-center justify-center flex-shrink-0">
          <span className="text-forge-bg font-display text-lg leading-none">N</span>
        </div>
        <span className="hidden lg:block font-display text-2xl text-forge-text tracking-wider">
          NUTRIFORGE
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-2 lg:px-3 space-y-1">
        {NAV.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 group
               ${isActive
                 ? 'bg-forge-accent/10 text-forge-accent border border-forge-accent/20'
                 : 'text-forge-subtext hover:text-forge-text hover:bg-forge-border/50'
               }`
            }
          >
            <span className="text-lg w-5 text-center flex-shrink-0">{icon}</span>
            <span className="hidden lg:block text-sm font-body font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom tag */}
      <div className="p-4 border-t border-forge-border hidden lg:block">
        <p className="label text-center">FORGE YOUR BODY</p>
      </div>
    </aside>
  )
}