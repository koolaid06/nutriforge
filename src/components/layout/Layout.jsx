import { DesktopSidebar, MobileNav } from './Sidebar'
import TopBar from './TopBar'

export default function Layout({ title, profile, children, onLogoClick }) {
  return (
    <div className="min-h-screen bg-forge-bg">
      {/* Desktop: left sidebar */}
      <DesktopSidebar onLogoClick={onLogoClick} />

      {/* Main content — offset for desktop sidebar, bottom padding for mobile nav */}
      <div className="lg:ml-56 min-h-screen flex flex-col">
        <TopBar title={title} profile={profile} />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6 animate-fade-in">
          {children}
        </main>
      </div>

      {/* Mobile: bottom nav */}
      <MobileNav onLogoClick={onLogoClick} />
    </div>
  )
}