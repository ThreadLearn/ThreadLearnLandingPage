import { useState } from 'react'
import { Bell, Check, CheckCheck } from 'lucide-react'
import { mockNotifications } from '../../data/mockPlans'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

const typeIcon = {
  'level-up': '🎉',
  payment: '💳',
  course: '📚',
  quiz: '🎯',
  announcement: '📢',
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(mockNotifications)

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, isRead: true })))
  const markRead = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))

  const unread = notifs.filter(n => !n.isRead).length

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Bell size={22} />
            Notifications
            {unread > 0 && <Badge variant="black">{unread}</Badge>}
          </h1>
        </div>
        {unread > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead} icon={<CheckCheck size={14} />}>
            Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifs.map(n => (
          <div
            key={n.id}
            className={`flex gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
              n.isRead ? 'bg-white border-hairline opacity-70' : 'bg-white border-black/20 shadow-elevation-2'
            }`}
            onClick={() => markRead(n.id)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${n.isRead ? 'bg-surface-soft' : 'bg-block-lilac'}`}>
              {typeIcon[n.type] || '🔔'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-sm">{n.title}</div>
                {!n.isRead && <div className="w-2 h-2 bg-accent-magenta rounded-full flex-shrink-0 mt-1" />}
              </div>
              <p className="text-sm text-ink/60 mt-0.5">{n.message}</p>
              <div className="font-caption text-xs text-ink/30 mt-1.5">
                {new Date(n.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {notifs.length === 0 && (
          <div className="text-center py-16 text-ink/40">
            <Bell size={40} className="mx-auto mb-3 opacity-30" />
            <p>No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
