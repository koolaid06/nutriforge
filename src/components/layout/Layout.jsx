import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function Layout({ title, profile, children }) {
  return (
    <div className="min-h-screen bg-forge-bg">
      <Sidebar />
      <div className="ml-16 lg:ml-56 min-h-screen flex flex-col">
        <TopBar title={title} profile={profile} />
        <main className="flex-1 p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  )
}