import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Flame, Zap } from 'lucide-react'
import { mockLeaderboard } from '../../data/mockUsers'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { useAuth } from '../../hooks/useAuth'
import { AnimatedGroup, AnimatedItem, PageWrapper } from '../../components/ui/AnimatedSection'
import { fadeInUp, popIn, tapScale, staggerContainer } from '../../lib/animations'

export default function LeaderboardPage() {
  const { user } = useAuth()
  const [period, setPeriod] = useState('all-time')
  const userRank = mockLeaderboard.find(u => u.id === user?.id)

  const podium = mockLeaderboard.slice(0, 3)
  const rest = mockLeaderboard.slice(3)

  return (
    <PageWrapper>
      <div className="max-w-content mx-auto px-6 py-8">
        <div className="text-center mb-10">
          <span className="font-eyebrow text-xs text-ink/40 block mb-3">Competition</span>
          <h1 className="text-4xl font-light mb-2" style={{ fontWeight: 340 }}>Leaderboard</h1>
          <p className="text-ink/60">Top learners ranked by experience points</p>
        </div>

        {/* Period toggle */}
        <div className="flex justify-center gap-1 mb-10">
          {['all-time', 'this-week', 'this-month'].map(p => (
            <motion.button
              key={p}
              onClick={() => setPeriod(p)}
              whileTap={tapScale.tap}
              className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors capitalize ${period === p ? 'bg-black text-white' : 'bg-surface-soft hover:bg-hairline'}`}
            >
              {p.replace('-', ' ')}
            </motion.button>
          ))}
        </div>

        {/* Podium */}
        <AnimatedGroup className="flex items-end justify-center gap-4 mb-12" stagger={0.12}>
          {[podium[1], podium[0], podium[2]].map((u, i) => {
            const rank = i === 0 ? 2 : i === 1 ? 1 : 3
            const heights = ['h-28', 'h-40', 'h-24']
            const colors = ['bg-block-cream', 'bg-block-lime', 'bg-block-coral']
            const medal = ['🥈', '🥇', '🥉']
            return (
              <AnimatedItem key={u.id} variants={popIn}>
                <div className="flex flex-col items-center gap-3">
                  <Avatar src={u.avatar} name={u.name} size={rank === 1 ? 'xl' : 'lg'} />
                  <div className="text-center">
                    <div className="font-semibold text-sm">{u.name.split(' ')[0]}</div>
                    <div className="text-xs text-ink/50">Lv.{u.level}</div>
                    <div className="text-sm font-bold mt-1">{u.xp.toLocaleString()} XP</div>
                  </div>
                  <div className={`w-20 ${heights[i]} ${colors[i]} rounded-t-lg flex items-end justify-center pb-3`}>
                    <span className="text-2xl">{medal[i]}</span>
                  </div>
                </div>
              </AnimatedItem>
            )
          })}
        </AnimatedGroup>

        {/* My rank banner */}
        {userRank && (
          <div className="bg-block-lilac rounded-lg p-4 flex items-center gap-4 mb-6">
            <span className="text-sm font-eyebrow text-ink/50">YOUR RANK</span>
            <span className="text-2xl font-bold">#{userRank.rank}</span>
            <Avatar src={userRank.avatar} name={userRank.name} size="sm" />
            <span className="text-sm font-medium flex-1">{userRank.name}</span>
            <span className="text-sm font-bold">{userRank.xp.toLocaleString()} XP</span>
            <span className="flex items-center gap-1 text-sm text-ink/50">
              <Zap size={12} /> Lv.{userRank.level}
            </span>
          </div>
        )}

        {/* Full list */}
        <motion.div
          className="bg-white border border-hairline rounded-lg overflow-hidden"
          variants={staggerContainer(0.04)}
          initial="hidden"
          animate="show"
        >
          {mockLeaderboard.map((u, idx) => (
            <motion.div
              key={u.id}
              variants={fadeInUp}
              whileHover={{ x: 4, backgroundColor: u.id === user?.id ? undefined : 'var(--color-surface-soft, #f5f5f5)', transition: { duration: 0.15 } }}
              className={`flex items-center gap-4 px-6 py-4 ${idx > 0 ? 'border-t border-hairline-soft' : ''} ${u.id === user?.id ? 'bg-block-lime/30' : ''} transition-colors`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${u.rank <= 3 ? 'bg-black text-white' : 'bg-surface-soft'}`}>
                {u.rank <= 3 ? ['🥇', '🥈', '🥉'][u.rank - 1] : u.rank}
              </div>
              <Avatar src={u.avatar} name={u.name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm flex items-center gap-2">
                  {u.name}
                  {u.id === user?.id && <Badge variant="lilac">You</Badge>}
                </div>
                <div className="text-xs text-ink/40 flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1"><Flame size={10} /> Level {u.level}</span>
                  <span>·</span>
                  <span>{u.weeklyXp} XP this week</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-base">{u.xp.toLocaleString()}</div>
                <div className="text-xs text-ink/40">total XP</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageWrapper>
  )
}
