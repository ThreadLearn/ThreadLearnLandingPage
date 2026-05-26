import { useState } from 'react'
import { Camera, Save, Flame, Trophy, Zap, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { XPBar } from '../../components/ui/ProgressBar'
import { useAuth } from '../../hooks/useAuth'
import { mockBadges } from '../../data/mockUsers'
import { PageWrapper, AnimatedSection, AnimatedGroup, AnimatedItem } from '../../components/ui/AnimatedSection'
import { scaleIn, fadeInUp, fadeInDown, popIn } from '../../lib/animations'

export default function ProfilePage() {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: user.name, email: user.email })
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const STREAK_CALENDAR = Array(30).fill(null).map((_, i) => ({
    day: i + 1,
    active: Math.random() > 0.4,
  }))

  return (
    <PageWrapper>
      <div className="max-w-content mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Profile Card */}
          <div className="w-full md:w-72 flex-shrink-0 space-y-4">
            {/* Avatar + name card */}
            <AnimatedSection variants={scaleIn}>
              <div className="bg-white border border-hairline rounded-lg p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar src={user.avatar} name={user.name} size="xl" />
                  <motion.button
                    className="absolute bottom-0 right-0 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera size={12} />
                  </motion.button>
                </div>
                <div className="font-semibold text-lg">{user.name}</div>
                <div className="text-sm text-ink/50 mb-3">{user.email}</div>
                {user.isPremium && <Badge variant="lilac"><Zap size={10} className="inline" /> Premium</Badge>}
              </div>
            </AnimatedSection>

            {/* XP Card */}
            <AnimatedSection variants={fadeInUp} delay={0.08}>
              <div className="bg-block-navy text-white rounded-lg p-5">
                <div className="font-eyebrow text-xs text-white/40 mb-3">Progress</div>
                <div className="flex justify-between text-sm mb-3">
                  <span>Level {user.level}</span>
                  <span>{user.xp.toLocaleString()} XP</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full mb-1">
                  <div className="h-2 bg-block-lime rounded-full" style={{ width: `${(user.xp / user.xpToNext) * 100}%` }} />
                </div>
                <div className="text-xs text-white/30">{user.xpToNext - user.xp} XP to Level {user.level + 1}</div>
              </div>
            </AnimatedSection>

            {/* Streak */}
            <AnimatedSection variants={fadeInUp} delay={0.14}>
              <div className="bg-white border border-hairline rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Flame size={16} className="text-orange-500" />
                  <span className="font-semibold text-sm">{user.streak}-day streak</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {STREAK_CALENDAR.map(d => (
                    <div
                      key={d.day}
                      className={`aspect-square rounded-sm text-[9px] flex items-center justify-center font-mono ${d.active ? 'bg-block-lime' : 'bg-surface-soft text-ink/30'}`}
                    >
                      {d.day}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Tabs */}
          <div className="flex-1">
            <AnimatedSection variants={fadeInDown} delay={0.05}>
              <div className="flex gap-1 border-b border-hairline mb-6">
                {['profile', 'badges', 'achievements'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'border-b-2 border-black font-semibold' : 'text-ink/50 hover:text-ink'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {activeTab === 'profile' && (
              <AnimatedSection variants={fadeInUp} delay={0.1}>
                <div className="space-y-4 max-w-lg">
                  <Input label="Full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  <Input label="Email" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                  <Input label="Current password" type="password" placeholder="Leave blank to keep current" />
                  <Input label="New password" type="password" placeholder="Leave blank to keep current" />
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button onClick={handleSave} icon={<Save size={14} />}>
                      {saved ? '✓ Saved!' : 'Save changes'}
                    </Button>
                  </motion.div>
                </div>
              </AnimatedSection>
            )}

            {activeTab === 'badges' && (
              <div>
                <AnimatedSection variants={fadeInUp} delay={0.05}>
                  <h2 className="font-semibold mb-4">Your Badges ({user.badges?.length || 0})</h2>
                </AnimatedSection>
                <AnimatedGroup stagger={0.06} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {mockBadges.map(badge => {
                    const earned = user.badges?.includes(badge.id)
                    return (
                      <AnimatedItem key={badge.id} variants={popIn}>
                        <motion.div
                          className={`rounded-lg p-4 text-center border transition-all ${earned ? 'border-black bg-white' : 'border-hairline bg-surface-soft opacity-50'}`}
                          whileHover={earned ? { scale: 1.1 } : {}}
                          whileTap={earned ? { scale: 0.96 } : {}}
                        >
                          <div className="text-4xl mb-2">{badge.icon}</div>
                          <div className="font-semibold text-sm">{badge.name}</div>
                          <div className="text-xs text-ink/50 mt-1">{badge.description}</div>
                          {!earned && <div className="text-xs text-ink/30 mt-2">Locked</div>}
                        </motion.div>
                      </AnimatedItem>
                    )
                  })}
                </AnimatedGroup>
              </div>
            )}

            {activeTab === 'achievements' && (
              <AnimatedGroup stagger={0.07} className="space-y-3">
                {[
                  { icon: '📚', title: 'First Lesson', desc: 'Complete your first lesson', done: true, xp: 50 },
                  { icon: '🎯', title: 'Quiz Crusher', desc: 'Score 100% on any quiz', done: false, xp: 200 },
                  { icon: '🔥', title: 'Week Warrior', desc: 'Maintain a 7-day streak', done: true, xp: 150 },
                  { icon: '🚀', title: 'Speed Learner', desc: 'Complete 5 lessons in one day', done: false, xp: 300 },
                  { icon: '🤖', title: 'AI Explorer', desc: 'Use AI analysis 5 times', done: true, xp: 100 },
                  { icon: '👑', title: 'Course Complete', desc: 'Finish an entire course', done: false, xp: 500 },
                ].map(a => (
                  <AnimatedItem key={a.title} variants={fadeInUp}>
                    <div className={`flex items-center gap-4 bg-white border rounded-lg p-4 ${a.done ? 'border-semantic-success/30' : 'border-hairline opacity-60'}`}>
                      <div className="text-2xl">{a.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{a.title}</div>
                        <div className="text-xs text-ink/50">{a.desc}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold">+{a.xp} XP</div>
                        {a.done ? (
                          <div className="text-xs text-semantic-success">Earned</div>
                        ) : (
                          <div className="text-xs text-ink/30">Locked</div>
                        )}
                      </div>
                    </div>
                  </AnimatedItem>
                ))}
              </AnimatedGroup>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
