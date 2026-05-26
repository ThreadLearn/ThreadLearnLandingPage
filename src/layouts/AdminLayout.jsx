import { Outlet, Navigate, NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, Users, BookOpen, BarChart2, CreditCard, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Avatar } from '../components/ui/Avatar'

const adminNav = [
  { icon: <LayoutDashboard size={16} />, label: 'Dashboard', to: '/admin' },
  { icon: <Users size={16} />, label: 'Students', to: '/admin/students' },
  { icon: <BookOpen size={16} />, label: 'Courses', to: '/admin/courses' },
  { icon: <BarChart2 size={16} />, label: 'Analytics', to: '/admin/analytics' },
  { icon: <CreditCard size={16} />, label: 'Plans', to: '/admin/plans' },
]

export function AdminLayout() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (!user || user.role !== 'admin') return <Navigate to="/" replace />

  return (
    <div className="min-h-screen flex bg-surface-soft">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} transition-all duration-200 bg-white border-r border-hairline flex flex-col flex-shrink-0`}>
        <div className={`h-14 flex items-center border-b border-hairline px-4 ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {sidebarOpen && (
            <Link to="/" className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <span className="w-5 h-5 bg-black rounded-xs flex items-center justify-center">
                <span className="text-white text-[9px] font-mono">TL</span>
              </span>
              ThreadLearn
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-soft transition-colors"
          >
            {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>

        <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
          {adminNav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-black text-white' : 'hover:bg-surface-soft text-ink'
                }`
              }
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className={`border-t border-hairline p-3 flex items-center ${sidebarOpen ? 'gap-2' : 'justify-center'}`}>
          <Avatar src={user.avatar} name={user.name} size="sm" />
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">{user.name}</div>
              <div className="text-xs text-ink/50">Admin</div>
            </div>
          )}
          {sidebarOpen && (
            <button
              onClick={logout}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-soft text-ink/50"
            >
              <LogOut size={13} />
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
