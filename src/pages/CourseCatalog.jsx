import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, Users, Clock, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { mockCourses } from '../data/mockCourses'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { PageWrapper, AnimatedSection, AnimatedGroup, AnimatedItem } from '../components/ui/AnimatedSection'
import { fadeInDown, fadeInLeft, fadeInUp } from '../lib/animations'

const levels = ['All', 'beginner', 'intermediate', 'advanced']
const types = ['All', 'Free', 'Premium']
const tags = ['All', 'threads', 'async', 'race-conditions', 'deadlock', 'worker-threads', 'promises', 'real-time', 'parallel']

function CourseCard({ course }) {
  const levelColor = { beginner: 'lime', intermediate: 'coral', advanced: 'lilac' }
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-lg overflow-hidden"
    >
    <Link
      to={`/courses/${course.slug}`}
      className="group bg-white rounded-lg border border-hairline hover:shadow-elevation-2 transition-all duration-200 overflow-hidden block"
    >
      <div className="aspect-video bg-surface-soft overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <Badge variant={levelColor[course.level]}>{course.level}</Badge>
          {course.isPremium ? <Badge variant="navy">Premium</Badge> : <Badge variant="lime">Free</Badge>}
          <Badge variant="default">{course.language}</Badge>
        </div>
        <h3 className="font-semibold text-base mb-1.5 group-hover:underline underline-offset-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-ink/60 line-clamp-2 mb-4">{course.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.slice(0, 3).map(t => (
            <span key={t} className="text-xs bg-surface-soft px-2 py-0.5 rounded-sm text-ink/60">#{t}</span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-ink/50 pt-3 border-t border-hairline-soft">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
            <span className="flex items-center gap-1"><Users size={11} />{course.enrolledCount.toLocaleString()}</span>
          </div>
          <span className="flex items-center gap-1">
            <Star size={11} className="fill-current text-yellow-400" />
            {course.rating}
          </span>
        </div>
      </div>
    </Link>
    </motion.div>
  )
}

export default function CourseCatalog() {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('All')
  const [type, setType] = useState('All')
  const [tag, setTag] = useState('All')
  const [sort, setSort] = useState('popular')

  const filtered = useMemo(() => {
    let result = mockCourses
    if (search) result = result.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.includes(search.toLowerCase()))
    )
    if (level !== 'All') result = result.filter(c => c.level === level)
    if (type === 'Free') result = result.filter(c => !c.isPremium)
    if (type === 'Premium') result = result.filter(c => c.isPremium)
    if (tag !== 'All') result = result.filter(c => c.tags.includes(tag))
    if (sort === 'popular') result = [...result].sort((a, b) => b.enrolledCount - a.enrolledCount)
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    if (sort === 'newest') result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return result
  }, [search, level, type, tag, sort])

  return (
    <PageWrapper>
    <div className="max-w-content mx-auto px-6 py-12">
      {/* Header */}
      <AnimatedSection variants={fadeInDown} className="mb-10">
        <span className="font-eyebrow text-xs text-ink/40 block mb-3">Curriculum</span>
        <h1 className="text-4xl font-light mb-3" style={{ fontWeight: 340 }}>All courses</h1>
        <p className="text-base text-ink/60">
          {mockCourses.length} courses covering JavaScript concurrency from beginner to advanced
        </p>
      </AnimatedSection>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search courses, topics, tags..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            icon={<Search size={16} />}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-3 py-2.5 rounded-md border border-hairline text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Filter pills */}
      <AnimatedGroup stagger={0.06} className="flex gap-4 mb-8 flex-wrap">
        <AnimatedItem variants={fadeInLeft} className="flex gap-1 flex-wrap">
          <span className="text-xs text-ink/40 flex items-center mr-1"><Filter size={11} /> Level:</span>
          {levels.map(l => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-3 py-1 rounded-pill text-xs font-medium transition-colors ${level === l ? 'bg-black text-white' : 'bg-surface-soft hover:bg-hairline text-ink'}`}
            >
              {l === 'All' ? 'All' : l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </AnimatedItem>
        <AnimatedItem variants={fadeInLeft} className="flex gap-1 flex-wrap">
          <span className="text-xs text-ink/40 flex items-center mr-1">Type:</span>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1 rounded-pill text-xs font-medium transition-colors ${type === t ? 'bg-black text-white' : 'bg-surface-soft hover:bg-hairline text-ink'}`}
            >
              {t}
            </button>
          ))}
        </AnimatedItem>
        <AnimatedItem variants={fadeInLeft} className="flex gap-1 flex-wrap">
          <span className="text-xs text-ink/40 flex items-center mr-1">Tag:</span>
          {tags.slice(0, 6).map(t => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1 rounded-pill text-xs font-medium transition-colors ${tag === t ? 'bg-black text-white' : 'bg-surface-soft hover:bg-hairline text-ink'}`}
            >
              {t === 'All' ? 'All' : `#${t}`}
            </button>
          ))}
        </AnimatedItem>
      </AnimatedGroup>

      {/* Results count */}
      <div className="text-sm text-ink/50 mb-5">
        Showing {filtered.length} of {mockCourses.length} courses
        {search && ` for "${search}"`}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <AnimatedGroup stagger={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(c => (
            <AnimatedItem key={c.id} variants={fadeInUp}>
              <CourseCard course={c} />
            </AnimatedItem>
          ))}
        </AnimatedGroup>
      ) : (
        <div className="text-center py-20 bg-surface-soft rounded-lg">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="font-semibold mb-2">No courses found</h3>
          <p className="text-sm text-ink/50 mb-4">Try adjusting your filters or search term</p>
          <Button variant="secondary" onClick={() => { setSearch(''); setLevel('All'); setType('All'); setTag('All') }}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
    </PageWrapper>
  )
}
