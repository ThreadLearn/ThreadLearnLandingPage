import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Target, Zap, Award, ArrowRight, GitBranch, Globe, Mail } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { AnimatedSection, AnimatedGroup, AnimatedItem, PageWrapper } from '../components/ui/AnimatedSection'
import { fadeInLeft, fadeInRight, fadeInUp, scaleIn, hoverLift, hoverScale, tapScale } from '../lib/animations'

const team = [
  {
    name: 'Le Tri Trung',
    role: 'Full-Stack Lead',
    avatar: 'LT',
    color: 'bg-block-lime',
    bio: 'Architected the platform and AI integration. Loves concurrent systems and race condition debugging.',
    skills: ['React', 'Node.js', 'AI/ML'],
  },
  {
    name: 'Nguyen Minh Duc',
    role: 'Backend Engineer',
    avatar: 'ND',
    color: 'bg-block-lilac',
    bio: 'Built the lesson delivery engine and quiz system. Go enthusiast turned Node.js developer.',
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    name: 'Tran Thi Lan',
    role: 'Frontend Engineer',
    avatar: 'TL',
    color: 'bg-block-coral',
    bio: 'Designed and built the interactive IDE and code visualization components.',
    skills: ['React', 'Monaco', 'Tailwind'],
  },
  {
    name: 'Pham Van Khanh',
    role: 'AI / Data',
    avatar: 'PK',
    color: 'bg-block-mint',
    bio: 'Developed race condition detection algorithms and AI-powered code analysis pipeline.',
    skills: ['Python', 'LLMs', 'Static Analysis'],
  },
  {
    name: 'Hoang Thi Thu',
    role: 'UX / Product',
    avatar: 'HT',
    color: 'bg-block-cream',
    bio: 'Led user research and designed the learning experience from first lesson to graduation.',
    skills: ['Figma', 'User Research', 'Prototyping'],
  },
]

const milestones = [
  { year: 'Jan 2026', title: 'Project kick-off', desc: 'WDP301 group formed, requirements gathered from concurrent programming instructors.' },
  { year: 'Feb 2026', title: 'MVP design complete', desc: 'Figma design system finalized. 53 use cases mapped across 6 feature sets.' },
  { year: 'Mar 2026', title: 'Alpha build', desc: 'Core learning engine, IDE, and AI analysis shipped to first 20 beta testers.' },
  { year: 'Apr 2026', title: 'Beta launch', desc: '200 FPT students onboarded. Quiz gamification and leaderboard added.' },
  { year: 'May 2026', title: 'Public launch', desc: 'Full platform open to all. Premium subscription, certificates, and admin panel live.' },
]

const values = [
  { icon: <Target size={22} />, color: 'bg-block-lime', title: 'Learn by doing', desc: 'Every concept has runnable code. No passive watching — you write, run, and debug real concurrency bugs.' },
  { icon: <Zap size={22} />, color: 'bg-block-lilac', title: 'AI-first feedback', desc: 'Our race condition detector gives line-level feedback in seconds, not days waiting for a code review.' },
  { icon: <Users size={22} />, color: 'bg-block-coral', title: 'Community-driven', desc: 'Leaderboards, comments, and peer discussion make learning social and competitive in the best way.' },
  { icon: <Award size={22} />, color: 'bg-block-mint', title: 'Credential that matters', desc: 'Certificates tied to real coding assessments — not just completion clicks.' },
]

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-block-navy text-white py-24 px-6">
          <div className="max-w-content mx-auto">
            <AnimatedSection variants={fadeInLeft}>
              <Badge variant="navy" className="mb-6 border border-white/20 text-white/70">About ThreadLearn</Badge>
              <h1 className="text-display-lg font-bold mb-6 max-w-2xl leading-tight">
                Built by students,<br />for engineers.
              </h1>
              <p className="text-body text-white/70 max-w-xl mb-8">
                ThreadLearn started as a WDP301 capstone project at FPT University. We were frustrated that concurrent programming was taught with slides and theory — so we built an interactive platform that actually teaches you to reason about threads, locks, and async code.
              </p>
            </AnimatedSection>
            <AnimatedSection variants={fadeInRight} delay={0.1}>
              <div className="flex gap-3 flex-wrap">
                <Link to="/courses">
                  <motion.div whileTap={tapScale.tap}>
                    <Button variant="primary" className="bg-white text-black hover:bg-white/90">Explore courses <ArrowRight size={15} className="inline ml-1" /></Button>
                  </motion.div>
                </Link>
                <Link to="/contact">
                  <motion.div whileTap={tapScale.tap}>
                    <Button variant="ghost" className="border border-white/30 text-white hover:bg-white/10">Get in touch</Button>
                  </motion.div>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-block-lime py-10 px-6">
          <AnimatedGroup className="max-w-content mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center" stagger={0.1}>
            {[
              { value: '1,240+', label: 'Students enrolled' },
              { value: '8', label: 'Courses available' },
              { value: '60+', label: 'Interactive lessons' },
              { value: '98%', label: 'Completion rate' },
            ].map(s => (
              <AnimatedItem key={s.label}>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-ink/60 mt-1">{s.label}</div>
              </AnimatedItem>
            ))}
          </AnimatedGroup>
        </section>

        {/* Values */}
        <section className="py-20 px-6">
          <div className="max-w-content mx-auto">
            <AnimatedSection variants={fadeInLeft}>
              <div className="font-caption text-xs text-ink/40 mb-3">OUR VALUES</div>
              <h2 className="text-headline font-bold mb-12 max-w-lg">Why we built it this way</h2>
            </AnimatedSection>
            <AnimatedGroup className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.08}>
              {values.map(v => (
                <AnimatedItem key={v.title}>
                  <motion.div
                    className="border border-hairline rounded-xl p-6 flex gap-4"
                    initial="rest"
                    whileHover="hover"
                    variants={hoverLift}
                  >
                    <div className={`w-10 h-10 rounded-lg ${v.color} flex items-center justify-center flex-shrink-0`}>{v.icon}</div>
                    <div>
                      <div className="font-bold mb-1">{v.title}</div>
                      <div className="text-sm text-ink/60">{v.desc}</div>
                    </div>
                  </motion.div>
                </AnimatedItem>
              ))}
            </AnimatedGroup>
          </div>
        </section>

        {/* Team */}
        <section className="bg-surface-soft py-20 px-6">
          <div className="max-w-content mx-auto">
            <AnimatedSection variants={fadeInLeft}>
              <div className="font-caption text-xs text-ink/40 mb-3">THE TEAM</div>
              <h2 className="text-headline font-bold mb-12">WDP301 — Group ThreadLearn</h2>
            </AnimatedSection>
            <AnimatedGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.07}>
              {team.map(member => (
                <AnimatedItem key={member.name}>
                  <motion.div
                    className="bg-white border border-hairline rounded-xl p-6"
                    initial="rest"
                    whileHover="hover"
                    variants={{ rest: { ...hoverLift.rest, ...hoverScale.rest }, hover: { y: -4, scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', transition: { duration: 0.2, ease: 'easeOut' } } }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center font-bold text-sm`}>
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-bold">{member.name}</div>
                        <div className="text-xs text-ink/50">{member.role}</div>
                      </div>
                    </div>
                    <p className="text-sm text-ink/60 mb-4 leading-relaxed">{member.bio}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {member.skills.map(s => <Badge key={s} variant="default">{s}</Badge>)}
                    </div>
                  </motion.div>
                </AnimatedItem>
              ))}
            </AnimatedGroup>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6">
          <div className="max-w-content mx-auto">
            <AnimatedSection variants={fadeInLeft}>
              <div className="font-caption text-xs text-ink/40 mb-3">JOURNEY</div>
              <h2 className="text-headline font-bold mb-12">How we got here</h2>
            </AnimatedSection>
            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-px bg-hairline hidden md:block" />
              <AnimatedGroup className="space-y-8" stagger={0.1}>
                {milestones.map((m, i) => (
                  <AnimatedItem key={i} variants={fadeInLeft}>
                    <div className="flex gap-6 items-start">
                      <div className="w-32 text-right flex-shrink-0">
                        <span className="font-caption text-xs text-ink/40">{m.year}</span>
                      </div>
                      <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-black mt-0.5 hidden md:block" />
                      </div>
                      <div className="pb-6">
                        <div className="font-bold mb-1">{m.title}</div>
                        <div className="text-sm text-ink/60">{m.desc}</div>
                      </div>
                    </div>
                  </AnimatedItem>
                ))}
              </AnimatedGroup>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-block-lilac py-16 px-6 text-center">
          <AnimatedSection className="max-w-content mx-auto" variants={scaleIn}>
            <h2 className="text-headline font-bold mb-4">Ready to master concurrency?</h2>
            <p className="text-body-sm text-ink/70 mb-8 max-w-md mx-auto">Join 1,240+ students learning concurrent programming the right way — with code, not just theory.</p>
            <Link to="/register">
              <motion.div className="inline-block" whileTap={tapScale.tap}>
                <Button size="lg">Get started free <ArrowRight size={15} className="inline ml-1" /></Button>
              </motion.div>
            </Link>
          </AnimatedSection>
        </section>
      </div>
    </PageWrapper>
  )
}
