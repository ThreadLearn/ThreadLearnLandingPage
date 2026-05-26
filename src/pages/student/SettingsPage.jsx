import { useState } from 'react'
import { User, Lock, Bell, CreditCard, Shield, LogOut, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { useAuth } from '../../hooks/useAuth'

const tabs = [
  { id: 'profile', label: 'Profile', icon: <User size={15} /> },
  { id: 'password', label: 'Password', icon: <Lock size={15} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
  { id: 'subscription', label: 'Subscription', icon: <CreditCard size={15} /> },
  { id: 'privacy', label: 'Privacy', icon: <Shield size={15} /> },
]

function ProfileTab({ user }) {
  const [saved, setSaved] = useState(false)
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-5">
      <div>
        <div className="text-sm font-medium mb-3">Avatar</div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-block-lime flex items-center justify-center font-bold text-xl">
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <Button variant="secondary" size="sm">Upload photo</Button>
            <div className="text-xs text-ink/40 mt-1">JPG, PNG up to 2MB</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Full name" defaultValue={user.name} />
        <Input label="Username" defaultValue={user.username || user.name.toLowerCase().replace(' ', '_')} />
      </div>
      <Input label="Email" type="email" defaultValue={user.email} />
      <div>
        <label className="text-sm font-medium block mb-1.5">Bio</label>
        <textarea rows={3} className="w-full px-3.5 py-3 rounded-md border border-hairline text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20 resize-none" defaultValue="Learning concurrent programming at FPT University. Passionate about systems programming and distributed systems." />
      </div>
      <Input label="Website" placeholder="https://yoursite.com" />
      <div className="pt-2">
        <Button onClick={handleSave} icon={saved ? <CheckCircle size={14} /> : null}>
          {saved ? 'Saved!' : 'Save changes'}
        </Button>
      </div>
    </div>
  )
}

function PasswordTab() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className="space-y-4 max-w-sm">
      <div className="relative">
        <Input label="Current password" type={showCurrent ? 'text' : 'password'} placeholder="••••••••" />
        <button onClick={() => setShowCurrent(v => !v)} className="absolute right-3 top-9 text-ink/40 hover:text-ink">
          {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      <div className="relative">
        <Input label="New password" type={showNew ? 'text' : 'password'} placeholder="••••••••" />
        <button onClick={() => setShowNew(v => !v)} className="absolute right-3 top-9 text-ink/40 hover:text-ink">
          {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      <Input label="Confirm new password" type="password" placeholder="••••••••" />
      <div className="bg-surface-soft rounded-lg p-3 text-xs text-ink/60 space-y-1">
        <div>✓ At least 8 characters</div>
        <div>✓ At least one uppercase letter</div>
        <div>✓ At least one number or symbol</div>
      </div>
      <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}>
        {saved ? '✓ Password updated' : 'Update password'}
      </Button>
    </div>
  )
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    lessonReminders: true,
    quizResults: true,
    newCourses: false,
    leaderboardUpdates: true,
    aiAnalysisComplete: true,
    newsletter: false,
    promotions: false,
  })
  const [saved, setSaved] = useState(false)

  const toggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }))

  const groups = [
    {
      title: 'Learning',
      items: [
        { key: 'lessonReminders', label: 'Lesson reminders', desc: 'Get reminded when you haven\'t studied in 3 days' },
        { key: 'quizResults', label: 'Quiz results', desc: 'Notification when quiz grading completes' },
        { key: 'aiAnalysisComplete', label: 'AI analysis done', desc: 'When your code analysis is ready' },
      ],
    },
    {
      title: 'Platform',
      items: [
        { key: 'newCourses', label: 'New courses', desc: 'Notify when new courses are published' },
        { key: 'leaderboardUpdates', label: 'Leaderboard changes', desc: 'When your rank changes significantly' },
      ],
    },
    {
      title: 'Marketing',
      items: [
        { key: 'newsletter', label: 'Weekly newsletter', desc: 'Concurrency articles and tips' },
        { key: 'promotions', label: 'Promotions & discounts', desc: 'Special offers and sales' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {groups.map(group => (
        <div key={group.title}>
          <div className="font-caption text-xs text-ink/40 mb-3">{group.title.toUpperCase()}</div>
          <div className="space-y-1">
            {group.items.map(item => (
              <label key={item.key} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-soft cursor-pointer">
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-ink/50">{item.desc}</div>
                </div>
                <div
                  onClick={() => toggle(item.key)}
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${prefs[item.key] ? 'bg-black' : 'bg-hairline'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${prefs[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
      <Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}>
        {saved ? '✓ Saved' : 'Save preferences'}
      </Button>
    </div>
  )
}

function SubscriptionTab({ user }) {
  return (
    <div className="space-y-5">
      <div className="border border-hairline rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold">Current plan</span>
              <Badge variant={user.plan === 'premium' ? 'navy' : 'default'}>{user.plan === 'premium' ? 'Premium' : 'Free'}</Badge>
            </div>
            {user.plan === 'premium' && (
              <div className="text-sm text-ink/50">$12.00 / month · Renews Jun 1, 2026</div>
            )}
          </div>
          {user.plan === 'premium' ? (
            <Button variant="secondary" size="sm">Manage billing</Button>
          ) : (
            <Button size="sm">Upgrade to Premium</Button>
          )}
        </div>

        {user.plan === 'premium' && (
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-hairline">
            {[
              { label: 'AI analyses today', value: '12 / 30' },
              { label: 'Courses unlocked', value: 'All 8' },
              { label: 'Certificates earned', value: '2' },
            ].map(s => (
              <div key={s.label} className="bg-surface-soft rounded-lg p-3">
                <div className="font-bold">{s.value}</div>
                <div className="text-xs text-ink/50">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {user.plan === 'premium' && (
        <div className="space-y-2">
          <div className="font-caption text-xs text-ink/40 mb-2">BILLING HISTORY</div>
          {['May 2026', 'Apr 2026', 'Mar 2026'].map((month, i) => (
            <div key={month} className="flex items-center justify-between p-3 border border-hairline rounded-lg text-sm">
              <span>{month} — Premium subscription</span>
              <div className="flex items-center gap-3">
                <span className="font-medium">$12.00</span>
                <Badge variant="success">Paid</Badge>
                <button className="text-ink/40 hover:text-ink text-xs underline">Receipt</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {user.plan === 'premium' && (
        <div className="border border-semantic-error/20 rounded-xl p-5">
          <div className="font-medium text-sm mb-1 text-semantic-error">Cancel subscription</div>
          <p className="text-xs text-ink/60 mb-3">You'll keep Premium access until Jun 1, 2026. Certificates and progress are saved forever.</p>
          <Button variant="danger" size="sm">Cancel subscription</Button>
        </div>
      )}
    </div>
  )
}

function PrivacyTab() {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="font-caption text-xs text-ink/40 mb-2">PROFILE VISIBILITY</div>
        {[
          { label: 'Public profile', desc: 'Others can view your profile and certificates', defaultChecked: true },
          { label: 'Show on leaderboard', desc: 'Display your name and score publicly', defaultChecked: true },
          { label: 'Share activity', desc: 'Show your learning activity to community', defaultChecked: false },
        ].map(item => (
          <label key={item.label} className="flex items-center justify-between p-3 rounded-lg border border-hairline cursor-pointer hover:bg-surface-soft">
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-ink/50">{item.desc}</div>
            </div>
            <input type="checkbox" defaultChecked={item.defaultChecked} className="w-4 h-4 rounded" />
          </label>
        ))}
      </div>

      <div className="pt-4 border-t border-hairline space-y-3">
        <div className="font-caption text-xs text-ink/40 mb-2">DATA</div>
        <Button variant="secondary" size="sm">Download my data</Button>
        <div className="text-xs text-ink/40">Request a copy of all your account data. Processing takes up to 24 hours.</div>
      </div>

      <div className="border border-semantic-error/20 rounded-xl p-5">
        <div className="font-medium text-sm mb-1 text-semantic-error">Delete account</div>
        <p className="text-xs text-ink/60 mb-3">This permanently deletes your account, progress, and certificates. Cannot be undone.</p>
        <Button variant="danger" size="sm">Delete account</Button>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-sm text-ink/50">Manage your account and preferences</p>
      </div>

      <div className="flex gap-1 mb-8 border-b border-hairline">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-ink/50 hover:text-ink'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && <ProfileTab user={user} />}
      {activeTab === 'password' && <PasswordTab />}
      {activeTab === 'notifications' && <NotificationsTab />}
      {activeTab === 'subscription' && <SubscriptionTab user={user} />}
      {activeTab === 'privacy' && <PrivacyTab />}

      <div className="mt-8 pt-6 border-t border-hairline">
        <Button variant="secondary" icon={<LogOut size={14} />} onClick={logout}>Sign out</Button>
      </div>
    </div>
  )
}
