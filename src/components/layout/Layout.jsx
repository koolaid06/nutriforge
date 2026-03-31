import { DesktopSidebar, MobileNav } from './Sidebar'
import TopBar from './TopBar'

export default function Layout({ title, profile, children, onLogoClick }) {
  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* 🔥 Background Image */}
      <BackgroundImage title={title} />

      <DesktopSidebar onLogoClick={onLogoClick} />

      <div className="lg:ml-56 min-h-screen flex flex-col relative z-10">
        <TopBar title={title} profile={profile} />
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-8 animate-fade-in">
          {children}
        </main>
      </div>

      <MobileNav onLogoClick={onLogoClick} />
    </div>
  )
}

/* 🔥 BACKGROUND SYSTEM */
function BackgroundImage({ title }) {
  const bgMap = {
    DASHBOARD: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600',
    ANALYTICS: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600',
    LOG: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1600',
    SETTINGS: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1600',
  }

  const image = bgMap[title]

  return (
    <>
      {/* Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
        }}
      />

      {/* Dark overlay (VERY IMPORTANT) */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0a0a0f]/90 via-[#0a0a0f]/85 to-[#0a0a0f]/95" />
    </>
  )
}