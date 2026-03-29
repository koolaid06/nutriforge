import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/dashboard', icon: '▦', label: 'Dashboard' },
  { to: '/log',       icon: '⊕', label: 'Log'       },
  { to: '/analytics', icon: '∿', label: 'Analytics' },
  { to: '/settings',  icon: '⚙', label: 'Settings'  },
]

export function DesktopSidebar({ onLogoClick }) {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-60
                      bg-forge-surface border-r border-forge-border flex-col z-40">
      {/* Logo */}
      <button
        onClick={onLogoClick}
        className="flex items-center gap-3 px-6 py-5 border-b border-forge-border
                   hover:opacity-80 transition-opacity w-full text-left"
      >
        <div className="w-9 h-9 rounded-xl bg-forge-accent flex items-center justify-center flex-shrink-0">
          <span className="font-display font-bold text-white text-lg leading-none">N</span>
        </div>
        <div>
          <p className="font-display font-bold text-forge-text text-lg leading-none tracking-wide">
            NutriForge
          </p>
          <p className="text-[10px] text-forge-subtext font-body mt-0.5">Forge your body</p>
        </div>
      </button>

      {/* Nav */}
      <nav className="flex-1 py-6 px-4 space-y-1">
        {NAV.map(({ to, icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 text-sm font-body font-medium
               ${isActive
                 ? 'bg-forge-accent/15 text-forge-accent border border-forge-accent/25'
                 : 'text-forge-subtext hover:text-forge-text hover:bg-white/5'
               }`
            }
          >
            <span className="text-base w-5 text-center flex-shrink-0">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-forge-border">
        <p className="text-[10px] font-body text-forge-muted">v1.0 · Built with ♥</p>
      </div>
    </aside>
  )
}

export function MobileNav({ onLogoClick }) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40
                    bg-forge-surface border-t border-forge-border
                    grid grid-cols-5 safe-area-pb">
      <button
        onClick={onLogoClick}
        className="flex flex-col items-center justify-center py-3 gap-1 text-forge-muted hover:text-forge-accent transition-colors"
      >
        <div className="w-6 h-6 rounded-lg bg-forge-accent flex items-center justify-center">
          <span className="font-display font-bold text-white text-xs leading-none">N</span>
        </div>
        <span className="text-[9px] font-body">Home</span>
      </button>

      {NAV.map(({ to, icon, label }) => (
        <NavLink key={to} to={to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-3 gap-1 transition-colors
             ${isActive ? 'text-forge-accent' : 'text-forge-muted hover:text-forge-text'}`
          }
        >
          <span className="text-lg leading-none">{icon}</span>
          <span className="text-[9px] font-body">{label.split(' ')[0]}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default function Sidebar({ onLogoClick }) {
  return <DesktopSidebar onLogoClick={onLogoClick} />
}