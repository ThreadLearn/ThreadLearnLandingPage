import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, Code2, Trophy, Brain, ChevronRight, Star, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { mockCourses } from '../data/mockCourses'
import { mockLeaderboard } from '../data/mockUsers'
import { Avatar } from '../components/ui/Avatar'

const techBrands = ['JavaScript', 'Node.js', 'React', 'Express', 'MongoDB', 'Redis', 'Docker', 'GitHub', 'Jest', 'WebSockets', 'Async/Await', 'Worker Threads']

const features = [
  { icon: '🧵', title: 'Concurrent Programming Courses', desc: 'Structured learning path from beginner to advanced concurrency concepts with real JS examples.' },
  { icon: '🤖', title: 'AI Race Condition Detector', desc: 'Submit code and get instant AI analysis — identifies race conditions, deadlocks, and TOCTOU patterns.' },
  { icon: '💻', title: 'Browser-based IDE', desc: 'Write and run JavaScript code directly in your browser. No setup needed.' },
  { icon: '🎯', title: 'Quizzes & Gamification', desc: 'Test your knowledge, earn XP, level up, and compete on the leaderboard.' },
]

const stats = [
  { value: '6,840+', label: 'Students enrolled' },
  { value: '8', label: 'Expert courses' },
  { value: '53', label: 'Use cases covered' },
  { value: '4.8★', label: 'Average rating' },
]

const testimonials = [
  { name: 'Vo Van Tin', role: 'Senior Backend Dev', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tin', text: 'The AI race condition detector caught a bug in my production code that I\'d been chasing for weeks. Worth every penny.' },
  { name: 'Ha Van An', role: 'CS Student, FPT Uni', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=An', text: 'Finally understood the JavaScript event loop after the visual explanations in Lesson 3. The interactive IDE makes practice so easy.' },
  { name: 'Nguyen Thi Lan', role: 'Full-stack Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lan', text: 'Went from zero concurrency knowledge to confidently using Worker Threads in production. The structured path really works.' },
]

function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group bg-white rounded-lg border border-hairline hover:shadow-elevation-2 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
    >
      <div className="aspect-video bg-surface-soft overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={course.level === 'beginner' ? 'lime' : course.level === 'intermediate' ? 'coral' : 'lilac'}>
            {course.level}
          </Badge>
          {course.isPremium && <Badge variant="navy">Premium</Badge>}
        </div>
        <h3 className="font-semibold text-base mb-1 group-hover:underline underline-offset-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-ink/60 line-clamp-2 mb-3">{course.description}</p>
        <div className="flex items-center justify-between text-xs text-ink/50">
          <span>{course.lessonCount} lessons · {course.duration}</span>
          <span className="flex items-center gap-1">
            <Star size={10} className="fill-current text-yellow-400" />
            {course.rating}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-white">
      {/* Marquee Strip */}
      <div className="bg-black text-white overflow-hidden h-9 flex items-center">
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...techBrands, ...techBrands].map((b, i) => (
            <span key={i} className="font-caption text-xs text-white/70 uppercase tracking-widest">{b}</span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-content mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-block-lilac rounded-pill px-4 py-2 mb-8">
          <Zap size={14} className="text-ink" />
          <span className="font-eyebrow text-xs">AI-Powered Concurrency Learning</span>
        </div>
        <h1 className="text-display-xl font-light text-ink max-w-4xl mx-auto mb-6" style={{ fontWeight: 340 }}>
          Master concurrent
          <br />
          programming with AI
        </h1>
        <p className="text-body-lg text-ink/60 max-w-2xl mx-auto mb-10" style={{ fontWeight: 330 }}>
          Learn threads, race conditions, async patterns, and parallel algorithms.
          Get instant AI analysis of your code — detect race conditions before they hit production.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" onClick={() => navigate('/register')}>
            Get started free
            <ArrowRight size={18} />
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/courses')}>
            Browse courses
          </Button>
        </div>
        <p className="text-sm text-ink/40 mt-4">No credit card required · Free tier available forever</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-hairline">
          {stats.map(s => (
            <div key={s.value} className="text-center">
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-sm text-ink/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features — Lime Block */}
      <section className="max-w-content mx-auto px-6 py-6">
        <div className="bg-block-lime rounded-lg p-12">
          <span className="font-eyebrow text-xs block mb-4">Why ThreadLearn</span>
          <h2 className="text-4xl font-light mb-10 max-w-md" style={{ fontWeight: 340 }}>
            Everything you need to master concurrency
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white/60 rounded-md p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-ink/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Feature — Navy Block */}
      <section className="max-w-content mx-auto px-6 py-6">
        <div className="bg-block-navy rounded-lg p-12 text-white">
          <span className="font-eyebrow text-xs block mb-4 text-white/50">AI Code Analysis</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-light mb-6" style={{ fontWeight: 340 }}>
                Detect race conditions before they crash your app
              </h2>
              <p className="text-white/70 text-base mb-6">
                Our AI engine analyzes your code's AST structure using BM25 retrieval + LangChain to identify:
              </p>
              <ul className="space-y-3">
                {['TOCTOU race conditions', 'Deadlock patterns', 'Unsafe shared state', 'Multithreading conversion opportunities'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-block-lime flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="mt-8 bg-white text-black" onClick={() => navigate('/register')}>
                Try AI analysis free
                <ArrowRight size={16} />
              </Button>
            </div>
            {/* Mock AI output preview */}
            <div className="bg-black/40 rounded-lg p-5 font-mono text-sm border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-white/40 text-xs ml-2">AI Analysis Result</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="text-red-400">⚠ CRITICAL: Race condition on line 4</div>
                <div className="text-white/60 pl-4">Pattern: TOCTOU (read-yield-write)</div>
                <div className="text-white/60 pl-4">Variable: <span className="text-block-lime">counter</span></div>
                <div className="mt-3 text-yellow-300">💡 Suggestion: Use Atomics.add()</div>
                <div className="bg-white/5 rounded p-3 mt-2">
                  <span className="text-blue-300">const</span>{' '}
                  <span className="text-block-lime">counter</span>{' '}
                  <span className="text-white/60">= </span>
                  <span className="text-white">new Int32Array(shared)</span>
                  <br />
                  <span className="text-blue-300">Atomics</span>
                  <span className="text-white/60">.add(counter, 0, 1)</span>
                </div>
                <div className="text-semantic-success mt-2">✓ No race conditions in fixed version</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="max-w-content mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="font-eyebrow text-xs block mb-2 text-ink/40">Curriculum</span>
            <h2 className="text-4xl font-light" style={{ fontWeight: 340 }}>Popular courses</h2>
          </div>
          <Link to="/courses" className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mockCourses.slice(0, 4).map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

      {/* Leaderboard teaser — Coral Block */}
      <section className="max-w-content mx-auto px-6 py-6">
        <div className="bg-block-coral rounded-lg p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-eyebrow text-xs block mb-4">Gamification</span>
              <h2 className="text-4xl font-light mb-4" style={{ fontWeight: 340 }}>
                Earn XP, level up, top the leaderboard
              </h2>
              <p className="text-base text-ink/70 mb-6">
                Complete lessons, pass quizzes, and solve concurrency challenges to earn XP. Track your streak and compete with learners worldwide.
              </p>
              <Button onClick={() => navigate('/leaderboard')}>
                View leaderboard
                <Trophy size={16} />
              </Button>
            </div>
            <div className="space-y-2">
              {mockLeaderboard.slice(0, 5).map(u => (
                <div key={u.id} className="flex items-center gap-3 bg-white/60 rounded-md px-4 py-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${u.rank <= 3 ? 'bg-black text-white' : 'bg-white text-ink border border-hairline'}`}>
                    {u.rank}
                  </span>
                  <Avatar src={u.avatar} name={u.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{u.name}</div>
                    <div className="text-xs text-ink/50">Level {u.level}</div>
                  </div>
                  <div className="text-sm font-bold">{u.xp.toLocaleString()} XP</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-content mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="font-eyebrow text-xs block mb-3 text-ink/40">Testimonials</span>
          <h2 className="text-4xl font-light" style={{ fontWeight: 340 }}>Loved by developers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="bg-surface-soft rounded-lg p-6">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current text-yellow-400" />)}
              </div>
              <p className="text-sm text-ink/80 leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <Avatar src={t.avatar} name={t.name} size="sm" />
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-ink/50">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — Lilac Block */}
      <section className="max-w-content mx-auto px-6 pb-16">
        <div className="bg-block-lilac rounded-lg p-16 text-center">
          <span className="font-eyebrow text-xs block mb-4 text-ink/50">Get started today</span>
          <h2 className="text-5xl font-light mb-5 max-w-2xl mx-auto" style={{ fontWeight: 340 }}>
            Start writing race-free concurrent code
          </h2>
          <p className="text-base text-ink/60 mb-8">
            Free tier available. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => navigate('/register')}>
              Create free account
              <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/pricing')}>
              View pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
