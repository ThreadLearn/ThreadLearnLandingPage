import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Flame, Trophy, Brain, ArrowRight, Clock, CheckCircle, Zap } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { mockCourses, mockEnrollments } from '../../data/mockCourses'
import { mockProgress } from '../../data/mockLessons'
import { mockNotifications } from '../../data/mockPlans'
import { mockLeaderboard, mockBadges } from '../../data/mockUsers'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { XPBar, ProgressBar } from '../../components/ui/ProgressBar'

const STREAK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const activeStreak = [true, true, true, true, true, false, false]

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const enrolledCourses = mockCourses.filter(c => mockEnrollments.includes(c.id))
  const unreadNotifs = mockNotifications.filter(n => !n.isRead)
  const userBadges = mockBadges.filter(b => user.badges?.includes(b.id))

  return (
    <div className="max-w-content mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light mb-1" style={{ fontWeight: 340 }}>
            Welcome back, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-ink/60">Continue where you left off</p>
        </div>
        {!user.isPremium && (
          <div className="hidden sm:flex items-center gap-2 bg-block-lilac rounded-pill px-4 py-2">
            <Zap size={14} />
            <span className="text-sm font-medium">Upgrade to Premium</span>
            <Link to="/pricing" className="text-xs underline">→</Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* XP & Level */}
          <div className="bg-block-navy text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-eyebrow text-xs text-white/40 mb-1">Your Progress</div>
                <div className="text-2xl font-bold">Level {user.level}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/40 mb-1">Total XP</div>
                <div className="text-2xl font-bold">{user.xp.toLocaleString()}</div>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div
                className="h-2 bg-block-lime rounded-full transition-all duration-500"
                style={{ width: `${Math.round((user.xp / user.xpToNext) * 100)}%` }}
              />
            </div>
            <div className="text-xs text-white/40">{user.xp} / {user.xpToNext} XP to Level {user.level + 1}</div>
          </div>

          {/* Enrolled Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">My Courses</h2>
              <Link to="/courses" className="text-sm text-ink/50 hover:text-ink flex items-center gap-1">
                Browse more <ArrowRight size={13} />
              </Link>
            </div>
            <div className="space-y-3">
              {enrolledCourses.map(course => {
                const prog = mockProgress[course.id]
                return (
                  <div
                    key={course.id}
                    className="bg-white border border-hairline rounded-lg p-4 flex items-center gap-4 hover:shadow-elevation-2 transition-all cursor-pointer"
                    onClick={() => navigate(`/courses/${course.slug}`)}
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-surface-soft flex-shrink-0">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold truncate">{course.title}</h3>
                        {course.isPremium && <Badge variant="navy">P</Badge>}
                      </div>
                      {prog ? (
                        <ProgressBar value={prog.percentage} max={100} size="xs" showPercent />
                      ) : (
                        <div className="text-xs text-ink/40">Not started</div>
                      )}
                      <div className="text-xs text-ink/40 mt-1">
                        {prog ? `${prog.completedLessons.length}/${prog.totalLessons} lessons` : `${course.lessonCount} lessons`}
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={e => { e.stopPropagation(); navigate(`/courses/${course.slug}`) }}
                    >
                      {prog?.completedLessons?.length > 0 ? 'Continue' : 'Start'}
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI Usage */}
          <div className="bg-surface-soft rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain size={18} />
                <span className="font-semibold text-sm">AI Analysis</span>
              </div>
              <Badge variant={user.isPremium ? 'lilac' : 'lime'}>
                {user.isPremium ? 'Premium' : 'Free'}
              </Badge>
            </div>
            <ProgressBar
              value={user.aiUsageToday}
              max={user.aiLimit}
              color={user.aiUsageToday / user.aiLimit > 0.8 ? 'coral' : 'black'}
              size="sm"
              label={`${user.aiUsageToday} / ${user.aiLimit} queries today`}
            />
            <div className="flex gap-2 mt-4">
              <Button size="sm" onClick={() => navigate('/ai')}>
                Analyze code
              </Button>
              {!user.isPremium && (
                <Button variant="secondary" size="sm" onClick={() => navigate('/pricing')}>
                  Get more queries
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Side Column */}
        <div className="space-y-5">
          {/* Profile Quick */}
          <div className="bg-white border border-hairline rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <Avatar src={user.avatar} name={user.name} size="lg" />
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-ink/50">{user.email}</div>
              </div>
            </div>
            <Button variant="secondary" size="sm" className="w-full" onClick={() => navigate('/profile')}>
              Edit profile
            </Button>
          </div>

          {/* Streak */}
          <div className="bg-white border border-hairline rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Flame size={16} className="text-orange-500" />
              <span className="font-semibold text-sm">{user.streak}-day streak</span>
            </div>
            <div className="flex gap-1.5">
              {STREAK_DAYS.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-full aspect-square rounded-sm flex items-center justify-center ${activeStreak[i] ? 'bg-block-lime' : 'bg-surface-soft'}`}>
                    {activeStreak[i] && <CheckCircle size={12} className="text-ink" />}
                  </div>
                  <span className="font-caption text-[9px] text-ink/40">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white border border-hairline rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-sm">Badges</span>
              <Link to="/profile/level" className="text-xs text-ink/40 hover:text-ink">View all</Link>
            </div>
            <div className="flex gap-2 flex-wrap">
              {userBadges.map(b => (
                <div key={b.id} className={`w-10 h-10 rounded-full bg-block-${b.color.replace('block-', '')} flex items-center justify-center text-xl`} title={b.name}>
                  {b.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard position */}
          <div className="bg-white border border-hairline rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={16} />
              <span className="font-semibold text-sm">Leaderboard</span>
            </div>
            <div className="space-y-2">
              {mockLeaderboard.slice(0, 3).map(u => (
                <div key={u.id} className={`flex items-center gap-2 p-2 rounded-md ${u.id === user.id ? 'bg-block-lime' : ''}`}>
                  <span className="text-xs font-bold w-4 text-ink/50">#{u.rank}</span>
                  <Avatar src={u.avatar} name={u.name} size="xs" />
                  <span className="text-xs font-medium flex-1 truncate">{u.name}</span>
                  <span className="text-xs text-ink/50">{u.xp.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <Link to="/leaderboard">
              <Button variant="ghost" size="sm" className="w-full mt-3">Full leaderboard</Button>
            </Link>
          </div>

          {/* Notifications */}
          {unreadNotifs.length > 0 && (
            <div className="bg-block-lilac rounded-lg p-5">
              <div className="font-semibold text-sm mb-3">Notifications ({unreadNotifs.length})</div>
              {unreadNotifs.slice(0, 2).map(n => (
                <div key={n.id} className="text-sm mb-2">
                  <div className="font-medium">{n.title}</div>
                  <div className="text-xs text-ink/60 line-clamp-1">{n.message}</div>
                </div>
              ))}
              <Link to="/notifications">
                <Button variant="secondary" size="sm" className="w-full mt-2">View all</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
