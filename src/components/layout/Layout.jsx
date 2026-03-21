import { DesktopSidebar, MobileNav } from './Sidebar'
import TopBar from './TopBar'

export default function Layout({ title, profile, children, onLogoClick }) {
  return (
    <div className="min-h-screen bg-forge-bg">
      <DesktopSidebar onLogoClick={onLogoClick} />

      <div className="lg:ml-56 min-h-screen flex flex-col">
        <TopBar title={title} profile={profile} />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-8 animate-fade-in">
          {children}
        </main>
      </div>

      <MobileNav onLogoClick={onLogoClick} />
    </div>
  )
}