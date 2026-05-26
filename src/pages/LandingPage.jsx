import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, Code2, Trophy, Brain, ChevronRight, Star, CheckCircle } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { mockCourses } from '../data/mockCourses'
import { mockLeaderboard } from '../data/mockUsers'
import { Avatar } from '../components/ui/Avatar'
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight, staggerContainer, hoverLift, scaleIn, popIn } from '../lib/animations'
import { AnimatedSection, AnimatedGroup, AnimatedItem, PageWrapper } from '../components/ui/AnimatedSection'

const techBrands = ['JavaScript', 'Node.js', 'React', 'Express', 'MongoDB', 'Redis', 'Docker', 'GitHub', 'Jest', 'WebSockets', 'Async/Await', 'Worker Threads']

const features = [
  { icon: '🧵', title: 'Concurrent Programming Courses', desc: 'Structured learning path from beginner to advanced concurrency concepts with real JS examples.' },
  { icon: '🤖', title: 'AI Race Condition Detector', desc: 'Submit code and get instant AI analysis — identifies race conditions, deadlocks, and TOCTOU patterns.' },
  { icon: '💻', title: 'Browser-based IDE', desc: 'Write and run JavaScript code directly in your browser. No setup needed.' },
  { icon: '🎯', title: 'Quizzes & Gamification', desc: 'Test your knowledge, earn XP, level up, and compete on the leaderboard.' },
]

const stats = [
  { value: 6840, suffix: '+', label: 'Students enrolled' },
  { value: 8, suffix: '', label: 'Expert courses' },
  { value: 53, suffix: '', label: 'Use cases covered' },
  { value: 4.8, suffix: '★', label: 'Average rating', decimals: 1 },
]

const testimonials = [
  { name: 'Vo Van Tin', role: 'Senior Backend Dev', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tin', text: 'The AI race condition detector caught a bug in my production code that I\'d been chasing for weeks. Worth every penny.' },
  { name: 'Ha Van An', role: 'CS Student, FPT Uni', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=An', text: 'Finally understood the JavaScript event loop after the visual explanations in Lesson 3. The interactive IDE makes practice so easy.' },
  { name: 'Nguyen Thi Lan', role: 'Full-stack Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lan', text: 'Went from zero concurrency knowledge to confidently using Worker Threads in production. The structured path really works.' },
]

function StatCard({ value, suffix, label, decimals = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  return (
    <motion.div ref={ref} variants={fadeInUp} className="text-center">
      <div className="text-3xl font-bold">
        {inView ? (
          <CountUp end={value} duration={2} decimals={decimals} suffix={suffix} />
        ) : (
          <span>0{suffix}</span>
        )}
      </div>
      <div className="text-sm text-ink/50 mt-1">{label}</div>
    </motion.div>
  )
}

function CourseCard({ course }) {
  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -6, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} transition={{ duration: 0.2 }}>
      <Link
        to={`/courses/${course.slug}`}
        className="group bg-white rounded-lg border border-hairline overflow-hidden block"
      >
        <div className="aspect-video bg-surface-soft overflow-hidden">
          <motion.img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.4 }}
          />
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
    </motion.div>
  )
}

// Typing animation for the hero headline
function TypedText({ words }) {
  const [index, setIndex] = React.useState(0)
  const [displayed, setDisplayed] = React.useState('')
  const [deleting, setDeleting] = React.useState(false)

  React.useEffect(() => {
    const word = words[index]
    let timeout
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex(i => (i + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, index, words])

  return (
    <span className="text-accent-magenta">
      {displayed}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>|</motion.span>
    </span>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <PageWrapper>
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
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={popIn} className="inline-flex items-center gap-2 bg-block-lilac rounded-pill px-4 py-2 mb-8">
              <Zap size={14} className="text-ink" />
              <span className="font-eyebrow text-xs">AI-Powered Concurrency Learning</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-display-xl font-light text-ink max-w-4xl mx-auto mb-6"
              style={{ fontWeight: 340 }}
            >
              Master{' '}
              <TypedText words={['concurrency', 'async patterns', 'race conditions', 'Worker Threads', 'deadlocks']} />
              <br />
              programming with AI
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-body-lg text-ink/60 max-w-2xl mx-auto mb-10" style={{ fontWeight: 330 }}>
              Learn threads, race conditions, async patterns, and parallel algorithms.
              Get instant AI analysis of your code — detect race conditions before they hit production.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" onClick={() => navigate('/register')}>
                  Get started free <ArrowRight size={18} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button variant="secondary" size="lg" onClick={() => navigate('/courses')}>
                  Browse courses
                </Button>
              </motion.div>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-sm text-ink/40 mt-4">
              No credit card required · Free tier available forever
            </motion.p>
          </motion.div>

          {/* Stats */}
          <AnimatedGroup className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-hairline" stagger={0.1}>
            {stats.map(s => <StatCard key={s.label} {...s} />)}
          </AnimatedGroup>
        </section>

        {/* Features — Lime Block */}
        <section className="max-w-content mx-auto px-6 py-6">
          <AnimatedSection>
            <div className="bg-block-lime rounded-lg p-12">
              <AnimatedSection>
                <span className="font-eyebrow text-xs block mb-4">Why ThreadLearn</span>
                <h2 className="text-4xl font-light mb-10 max-w-md" style={{ fontWeight: 340 }}>
                  Everything you need to master concurrency
                </h2>
              </AnimatedSection>
              <AnimatedGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6" stagger={0.1}>
                {features.map(f => (
                  <AnimatedItem key={f.title}>
                    <motion.div
                      className="bg-white/60 rounded-md p-6 cursor-default"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.9)', y: -3, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="text-3xl mb-3"
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        {f.icon}
                      </motion.div>
                      <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                      <p className="text-sm text-ink/70">{f.desc}</p>
                    </motion.div>
                  </AnimatedItem>
                ))}
              </AnimatedGroup>
            </div>
          </AnimatedSection>
        </section>

        {/* AI Feature — Navy Block */}
        <section className="max-w-content mx-auto px-6 py-6">
          <AnimatedSection>
            <div className="bg-block-navy rounded-lg p-12 text-white overflow-hidden relative">
              {/* Floating background orbs */}
              <motion.div
                className="absolute top-10 right-10 w-64 h-64 rounded-full bg-block-lilac/10 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-block-lime/10 blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, delay: 2 }}
              />

              <span className="font-eyebrow text-xs block mb-4 text-white/50">AI Code Analysis</span>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <AnimatedSection variants={fadeInLeft}>
                  <h2 className="text-4xl font-light mb-6" style={{ fontWeight: 340 }}>
                    Detect race conditions before they crash your app
                  </h2>
                  <p className="text-white/70 text-base mb-6">
                    Our AI engine analyzes your code's AST structure using BM25 retrieval + LangChain to identify:
                  </p>
                  <ul className="space-y-3">
                    {['TOCTOU race conditions', 'Deadlock patterns', 'Unsafe shared state', 'Multithreading conversion opportunities'].map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle size={16} className="text-block-lime flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-8 inline-block">
                    <Button variant="secondary" className="bg-white text-black" onClick={() => navigate('/register')}>
                      Try AI analysis free <ArrowRight size={16} />
                    </Button>
                  </motion.div>
                </AnimatedSection>

                {/* Mock AI terminal */}
                <AnimatedSection variants={fadeInRight}>
                  <motion.div
                    className="bg-black/40 rounded-lg p-5 font-mono text-sm border border-white/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map(c => (
                        <motion.div key={c} className={`w-3 h-3 rounded-full ${c}`} whileHover={{ scale: 1.3 }} />
                      ))}
                      <span className="text-white/40 text-xs ml-2">AI Analysis Result</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      {[
                        { text: '⚠ CRITICAL: Race condition on line 4', color: 'text-red-400', delay: 0.3 },
                        { text: 'Pattern: TOCTOU (read-yield-write)', color: 'text-white/60 pl-4', delay: 0.5 },
                        { text: 'Variable: counter', color: 'text-white/60 pl-4', delay: 0.7 },
                        { text: '💡 Suggestion: Use Atomics.add()', color: 'text-yellow-300 mt-3', delay: 0.9 },
                      ].map(line => (
                        <motion.div
                          key={line.text}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: line.delay, duration: 0.3 }}
                          className={line.color}
                        >
                          {line.text}
                        </motion.div>
                      ))}
                      <motion.div
                        className="bg-white/5 rounded p-3 mt-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.1 }}
                      >
                        <span className="text-blue-300">const</span>{' '}
                        <span className="text-block-lime">counter</span>{' '}
                        <span className="text-white/60">= </span>
                        <span className="text-white">new Int32Array(shared)</span>
                        <br />
                        <span className="text-blue-300">Atomics</span>
                        <span className="text-white/60">.add(counter, 0, 1)</span>
                      </motion.div>
                      <motion.div
                        className="text-semantic-success mt-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.3 }}
                      >
                        ✓ No race conditions in fixed version
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Courses Preview */}
        <section className="max-w-content mx-auto px-6 py-16">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="font-eyebrow text-xs block mb-2 text-ink/40">Curriculum</span>
                <h2 className="text-4xl font-light" style={{ fontWeight: 340 }}>Popular courses</h2>
              </div>
              <motion.div whileHover={{ x: 4 }}>
                <Link to="/courses" className="text-sm font-medium flex items-center gap-1">
                  View all <ChevronRight size={14} />
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
          <AnimatedGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.08}>
            {mockCourses.slice(0, 4).map(c => <CourseCard key={c.id} course={c} />)}
          </AnimatedGroup>
        </section>

        {/* Leaderboard teaser — Coral Block */}
        <section className="max-w-content mx-auto px-6 py-6">
          <AnimatedSection>
            <div className="bg-block-coral rounded-lg p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection variants={fadeInLeft}>
                  <span className="font-eyebrow text-xs block mb-4">Gamification</span>
                  <h2 className="text-4xl font-light mb-4" style={{ fontWeight: 340 }}>
                    Earn XP, level up, top the leaderboard
                  </h2>
                  <p className="text-base text-ink/70 mb-6">
                    Complete lessons, pass quizzes, and solve concurrency challenges to earn XP. Track your streak and compete with learners worldwide.
                  </p>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Button onClick={() => navigate('/leaderboard')}>
                      View leaderboard <Trophy size={16} />
                    </Button>
                  </motion.div>
                </AnimatedSection>

                <AnimatedGroup className="space-y-2" stagger={0.07}>
                  {mockLeaderboard.slice(0, 5).map(u => (
                    <AnimatedItem key={u.id}>
                      <motion.div
                        className="flex items-center gap-3 bg-white/60 rounded-md px-4 py-3"
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.9)', x: 4 }}
                        transition={{ duration: 0.15 }}
                      >
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${u.rank <= 3 ? 'bg-black text-white' : 'bg-white text-ink border border-hairline'}`}>
                          {u.rank}
                        </span>
                        <Avatar src={u.avatar} name={u.name} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{u.name}</div>
                          <div className="text-xs text-ink/50">Level {u.level}</div>
                        </div>
                        <div className="text-sm font-bold">{u.xp.toLocaleString()} XP</div>
                      </motion.div>
                    </AnimatedItem>
                  ))}
                </AnimatedGroup>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Testimonials */}
        <section className="max-w-content mx-auto px-6 py-16">
          <AnimatedSection className="text-center mb-12">
            <span className="font-eyebrow text-xs block mb-3 text-ink/40">Testimonials</span>
            <h2 className="text-4xl font-light" style={{ fontWeight: 340 }}>Loved by developers</h2>
          </AnimatedSection>
          <AnimatedGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
            {testimonials.map(t => (
              <AnimatedItem key={t.name}>
                <motion.div
                  className="bg-surface-soft rounded-lg p-6 h-full"
                  whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                        <Star size={14} className="fill-current text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-ink/80 leading-relaxed mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar src={t.avatar} name={t.name} size="sm" />
                    <div>
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-xs text-ink/50">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedGroup>
        </section>

        {/* CTA — Lilac Block */}
        <section className="max-w-content mx-auto px-6 pb-16">
          <AnimatedSection variants={scaleIn}>
            <div className="bg-block-lilac rounded-lg p-16 text-center relative overflow-hidden">
              <motion.div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/20 blur-3xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 7, repeat: Infinity }}
              />
              <span className="font-eyebrow text-xs block mb-4 text-ink/50 relative z-10">Get started today</span>
              <h2 className="text-5xl font-light mb-5 max-w-2xl mx-auto relative z-10" style={{ fontWeight: 340 }}>
                Start writing race-free concurrent code
              </h2>
              <p className="text-base text-ink/60 mb-8 relative z-10">Free tier available. No credit card required.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <Button size="lg" onClick={() => navigate('/register')}>
                    Create free account <ArrowRight size={18} />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <Button variant="secondary" size="lg" onClick={() => navigate('/pricing')}>
                    View pricing
                  </Button>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </div>
    </PageWrapper>
  )
}
