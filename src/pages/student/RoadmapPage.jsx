import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Lock, PlayCircle, ArrowRight, Zap, Star, Trophy } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

const roadmap = [
  {
    phase: 1,
    title: 'Foundations',
    color: 'bg-block-lime',
    borderColor: 'border-block-lime',
    nodes: [
      { id: 'n1', title: 'Intro to Concurrent Programming', slug: 'intro-concurrent-programming', level: 'beginner', status: 'done', xp: 200, desc: 'Processes, threads, and the basics of parallel execution.' },
      { id: 'n2', title: 'Race Conditions & Deadlock', slug: 'race-conditions-deadlock', level: 'beginner', status: 'done', xp: 250, desc: 'Understand the two most dangerous concurrency bugs.' },
    ],
  },
  {
    phase: 2,
    title: 'Async JavaScript',
    color: 'bg-block-lilac',
    borderColor: 'border-block-lilac',
    nodes: [
      { id: 'n3', title: 'Async/Await & Event Loop', slug: 'async-await-event-loop', level: 'intermediate', status: 'in_progress', xp: 300, desc: 'Master the JavaScript event loop and async primitives.' },
      { id: 'n4', title: 'Promise Patterns & Error Handling', slug: 'promise-patterns', level: 'intermediate', status: 'locked', xp: 280, desc: 'Chaining, parallel execution, and robust error recovery.' },
    ],
  },
  {
    phase: 3,
    title: 'Worker Threads & Shared Memory',
    color: 'bg-block-coral',
    borderColor: 'border-block-coral',
    nodes: [
      { id: 'n5', title: 'Worker Threads in Node.js', slug: 'worker-threads-nodejs', level: 'intermediate', status: 'locked', xp: 350, desc: 'Offload CPU-heavy work without blocking the event loop.' },
      { id: 'n6', title: 'SharedArrayBuffer & Atomics', slug: 'shared-array-buffer', level: 'advanced', status: 'locked', xp: 400, desc: 'True shared memory between threads and atomic operations.' },
    ],
  },
  {
    phase: 4,
    title: 'Advanced Patterns',
    color: 'bg-block-mint',
    borderColor: 'border-block-mint',
    nodes: [
      { id: 'n7', title: 'Mutex, Semaphore & Lock-Free', slug: 'mutex-semaphore', level: 'advanced', status: 'locked', xp: 450, desc: 'Implement classic synchronization primitives in JavaScript.' },
      { id: 'n8', title: 'Distributed Concurrency', slug: 'distributed-concurrency', level: 'advanced', status: 'locked', xp: 500, desc: 'Consistency, replication, and the CAP theorem in practice.' },
    ],
  },
]

const statusConfig = {
  done: { icon: <CheckCircle size={18} />, label: 'Completed', color: 'text-semantic-success', bg: 'bg-semantic-success/10' },
  in_progress: { icon: <PlayCircle size={18} />, label: 'In progress', color: 'text-black', bg: 'bg-block-lime' },
  locked: { icon: <Lock size={18} />, label: 'Locked', color: 'text-ink/30', bg: 'bg-hairline' },
}

const levelColor = { beginner: 'lime', intermediate: 'lilac', advanced: 'coral' }

export default function RoadmapPage() {
  const [hoveredNode, setHoveredNode] = useState(null)

  const totalXP = roadmap.flatMap(p => p.nodes).filter(n => n.status === 'done').reduce((sum, n) => sum + n.xp, 0)
  const totalNodes = roadmap.flatMap(p => p.nodes).length
  const doneNodes = roadmap.flatMap(p => p.nodes).filter(n => n.status === 'done').length

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Learning Roadmap</h1>
          <p className="text-sm text-ink/50">Your path to mastering concurrent programming</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-block-lime px-4 py-2.5 rounded-xl text-center">
            <div className="font-bold">{totalXP} XP</div>
            <div className="text-xs text-ink/50">earned</div>
          </div>
          <div className="bg-surface-soft px-4 py-2.5 rounded-xl text-center">
            <div className="font-bold">{doneNodes}/{totalNodes}</div>
            <div className="text-xs text-ink/50">completed</div>
          </div>
        </div>
      </div>

      {/* Overall progress */}
      <div className="bg-white border border-hairline rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall progress</span>
          <span className="text-sm text-ink/50">{Math.round((doneNodes / totalNodes) * 100)}%</span>
        </div>
        <div className="h-2 bg-hairline rounded-full overflow-hidden mb-3">
          <div className="h-full bg-black rounded-full transition-all" style={{ width: `${(doneNodes / totalNodes) * 100}%` }} />
        </div>
        <div className="flex gap-4 text-xs text-ink/40">
          <span className="flex items-center gap-1"><CheckCircle size={10} className="text-semantic-success" /> {doneNodes} completed</span>
          <span className="flex items-center gap-1"><PlayCircle size={10} /> 1 in progress</span>
          <span className="flex items-center gap-1"><Lock size={10} /> {totalNodes - doneNodes - 1} locked</span>
        </div>
      </div>

      {/* Roadmap phases */}
      <div className="space-y-8">
        {roadmap.map((phase, phaseIdx) => (
          <div key={phase.phase}>
            {/* Phase header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full ${phase.color} flex items-center justify-center font-bold text-sm`}>
                {phase.phase}
              </div>
              <div>
                <div className="font-bold">{phase.title}</div>
                <div className="text-xs text-ink/40">
                  Phase {phase.phase} · {phase.nodes.filter(n => n.status === 'done').length}/{phase.nodes.length} completed
                </div>
              </div>
              {phase.nodes.every(n => n.status === 'done') && (
                <Badge variant="success" className="ml-auto"><Trophy size={10} className="inline" /> Complete</Badge>
              )}
            </div>

            {/* Nodes */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 ${phase.borderColor}`}>
              {phase.nodes.map((node, nodeIdx) => {
                const cfg = statusConfig[node.status]
                const isHovered = hoveredNode === node.id
                return (
                  <div
                    key={node.id}
                    className={`border rounded-xl p-5 transition-all cursor-default ${node.status === 'locked' ? 'border-hairline opacity-60' : 'border-hairline hover:shadow-elevation-2'} ${isHovered && node.status !== 'locked' ? 'shadow-elevation-2' : ''}`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-pill ${cfg.bg} ${cfg.color} font-medium`}>
                        {cfg.icon} {cfg.label}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-ink/40">
                        <Zap size={11} /> {node.xp} XP
                      </div>
                    </div>

                    <h3 className="font-bold mb-1.5">{node.title}</h3>
                    <p className="text-xs text-ink/60 leading-relaxed mb-4">{node.desc}</p>

                    <div className="flex items-center justify-between">
                      <Badge variant={levelColor[node.level]}>{node.level}</Badge>
                      {node.status === 'locked' ? (
                        <span className="text-xs text-ink/30 flex items-center gap-1"><Lock size={11} /> Complete previous first</span>
                      ) : node.status === 'done' ? (
                        <Link to={`/courses/${node.slug}`}>
                          <Button variant="ghost" size="sm">Review <ArrowRight size={12} className="inline ml-0.5" /></Button>
                        </Link>
                      ) : (
                        <Link to={`/courses/${node.slug}`}>
                          <Button size="sm">Continue <ArrowRight size={12} className="inline ml-0.5" /></Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Connector to next phase */}
            {phaseIdx < roadmap.length - 1 && (
              <div className="flex items-center gap-2 my-4 pl-4">
                <div className="w-px h-6 bg-hairline ml-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Completion reward */}
      <div className="mt-10 bg-block-navy text-white rounded-xl p-6 text-center">
        <Star size={28} className="mx-auto mb-3" />
        <h3 className="font-bold text-lg mb-2">Complete the full roadmap</h3>
        <p className="text-sm text-white/60 mb-4">Earn the Concurrency Master certificate and 2,500 bonus XP by finishing all 8 courses.</p>
        <Badge variant="navy" className="border-white/20 text-white/70">2,500 XP reward</Badge>
      </div>
    </div>
  )
}
