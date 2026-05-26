import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Bell, ChevronDown, LogOut, User, Settings, LayoutDashboard, Zap } from 'lucide-react'
import { Button } from '../ui/Button'
import { Avatar } from '../ui/Avatar'
import { useAuth } from '../../hooks/useAuth'
import { mockNotifications } from '../../data/mockPlans'

const navLinks = [
  { label: 'Courses', to: '/courses' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Pricing', to: '/pricing' },
]

export function Navbar() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const unreadCount = mockNotifications.filter(n => !n.isRead).length

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-hairline">
      <div className="max-w-content mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="w-7 h-7 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-mono">TL</span>
          </span>
          ThreadLearn
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-pill text-sm font-medium transition-colors ${isActive ? 'bg-surface-soft' : 'hover:bg-surface-soft'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Notifications */}
              <Link
                to="/notifications"
                className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-soft transition-colors"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent-magenta text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Premium Badge */}
              {user.isPremium && (
                <span className="hidden sm:flex items-center gap-1 px-2 py-1 bg-block-lilac rounded-sm text-xs font-medium">
                  <Zap size={10} />
                  Premium
                </span>
              )}

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2 rounded-pill px-2 py-1 hover:bg-surface-soft transition-colors"
                >
                  <Avatar src={user.avatar} name={user.name} size="sm" />
                  <span className="hidden sm:block text-sm font-medium max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown size={14} className="hidden sm:block text-gray-400" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-hairline rounded-lg shadow-elevation-2 z-20 py-1 overflow-hidden">
                      <div className="px-4 py-2 border-b border-hairline-soft">
                        <div className="text-sm font-medium truncate">{user.name}</div>
                        <div className="text-xs text-gray-500 truncate">{user.email}</div>
                      </div>
                      {[
                        { icon: <LayoutDashboard size={14} />, label: 'Dashboard', to: '/dashboard' },
                        { icon: <User size={14} />, label: 'Profile', to: '/profile' },
                        ...(user.role === 'admin' ? [{ icon: <Settings size={14} />, label: 'Admin Panel', to: '/admin' }] : []),
                      ].map(item => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-surface-soft transition-colors"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-hairline-soft mt-1">
                        <button
                          onClick={() => { logout(); navigate('/'); setUserMenuOpen(false) }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-semantic-error hover:bg-surface-soft transition-colors"
                        >
                          <LogOut size={14} />
                          Log out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                Get started
              </Button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-soft"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-hairline bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-surface-soft' : 'hover:bg-surface-soft'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          {!user && (
            <div className="flex gap-2 pt-2">
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => { navigate('/login'); setMenuOpen(false) }}>Log in</Button>
              <Button variant="primary" size="sm" className="flex-1" onClick={() => { navigate('/register'); setMenuOpen(false) }}>Sign up</Button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
