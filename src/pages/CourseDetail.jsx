import { useParams, Link, useNavigate } from 'react-router-dom'
import { Clock, Users, Star, BookOpen, Lock, CheckCircle, PlayCircle, ChevronRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { mockCourses, mockEnrollments } from '../data/mockCourses'
import { mockLessons, mockProgress } from '../data/mockLessons'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { useAuth } from '../hooks/useAuth'
import { PageWrapper, AnimatedSection, AnimatedGroup, AnimatedItem } from '../components/ui/AnimatedSection'
import { fadeInUp, slideInRight, fadeInDown } from '../lib/animations'

export default function CourseDetail() {
  const { slug } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const course = mockCourses.find(c => c.slug === slug)

  if (!course) return (
    <div className="max-w-content mx-auto px-6 py-20 text-center">
      <div className="text-5xl mb-4">😕</div>
      <h1 className="text-2xl font-bold mb-2">Course not found</h1>
      <Link to="/courses" className="text-sm underline">Browse all courses</Link>
    </div>
  )

  const lessons = mockLessons[course.id] || []
  const enrolled = user && mockEnrollments.includes(course.id)
  const progress = mockProgress[course.id]
  const levelColor = { beginner: 'lime', intermediate: 'coral', advanced: 'lilac' }
  const canAccess = !course.isPremium || user?.isPremium

  return (
    <PageWrapper>
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-surface-soft border-b border-hairline">
        <div className="max-w-content mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <AnimatedSection variants={fadeInUp} className="flex-1">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-ink/40 mb-6 font-caption uppercase">
                <Link to="/courses" className="hover:text-ink">Courses</Link>
                <ChevronRight size={10} />
                <span>{course.title}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={levelColor[course.level]}>{course.level}</Badge>
                {course.isPremium ? <Badge variant="navy">Premium</Badge> : <Badge variant="lime">Free</Badge>}
                <Badge variant="default">{course.language}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-light mb-4" style={{ fontWeight: 340 }}>
                {course.title}
              </h1>
              <p className="text-base text-ink/70 mb-6 leading-relaxed">{course.description}</p>

              <div className="flex flex-wrap gap-5 text-sm text-ink/60 mb-6">
                <span className="flex items-center gap-1.5"><Clock size={14} />{course.duration}</span>
                <span className="flex items-center gap-1.5"><BookOpen size={14} />{course.lessonCount} lessons</span>
                <span className="flex items-center gap-1.5"><Users size={14} />{course.enrolledCount.toLocaleString()} enrolled</span>
                <span className="flex items-center gap-1.5">
                  <Star size={14} className="fill-current text-yellow-400" />
                  {course.rating} rating
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {course.tags.map(t => (
                  <span key={t} className="text-xs bg-white px-2.5 py-1 rounded-sm border border-hairline text-ink/60">
                    #{t}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            {/* Enrollment Card */}
            <AnimatedSection variants={slideInRight} className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-lg border border-hairline shadow-elevation-2 overflow-hidden sticky top-20">
                <div className="aspect-video bg-surface-soft overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  {course.isPremium && !user?.isPremium && (
                    <div className="bg-block-lilac rounded-md p-3 mb-4 text-sm text-center">
                      <Zap size={14} className="inline mr-1" />
                      Premium course — <Link to="/pricing" className="font-medium underline">Upgrade</Link>
                    </div>
                  )}

                  {enrolled && progress && (
                    <div className="mb-4">
                      <ProgressBar value={progress.percentage} max={100} size="sm" label="Your progress" showPercent />
                    </div>
                  )}

                  {enrolled ? (
                    <Button
                      className="w-full"
                      onClick={() => navigate(`/courses/${course.slug}/lessons/${lessons[0]?.id}`)}
                    >
                      {progress?.completedLessons?.length > 0 ? 'Continue learning' : 'Start course'}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => user ? navigate(`/courses/${course.slug}/lessons/${lessons[0]?.id}`) : navigate('/register')}
                    >
                      {course.isPremium && !user?.isPremium ? 'Enroll (Premium)' : 'Enroll for free'}
                    </Button>
                  )}

                  <div className="mt-4 space-y-2 text-sm text-ink/60">
                    <div className="flex justify-between">
                      <span>Lessons</span>
                      <span className="font-medium text-ink">{course.lessonCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span className="font-medium text-ink">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Language</span>
                      <span className="font-medium text-ink">{course.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Level</span>
                      <span className="font-medium text-ink capitalize">{course.level}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-content mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">Course curriculum</h2>

        {lessons.length > 0 ? (
          <AnimatedGroup stagger={0.06} className="border border-hairline rounded-lg overflow-hidden">
            {lessons.map((lesson, idx) => {
              const isCompleted = progress?.completedLessons?.includes(lesson.id)
              const isAccessible = lesson.isFree || enrolled || user?.isPremium
              return (
                <AnimatedItem key={lesson.id} variants={fadeInUp}>
                  <div
                    className={`flex items-center gap-4 px-5 py-4 ${idx > 0 ? 'border-t border-hairline-soft' : ''} ${isAccessible ? 'hover:bg-surface-soft cursor-pointer' : 'opacity-60'}`}
                    onClick={() => isAccessible && navigate(`/courses/${course.slug}/lessons/${lesson.id}`)}
                  >
                    <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                      {isCompleted ? (
                        <CheckCircle size={20} className="text-semantic-success" />
                      ) : isAccessible ? (
                        <PlayCircle size={20} className="text-ink/40" />
                      ) : (
                        <Lock size={16} className="text-ink/30" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">
                        {idx + 1}. {lesson.title}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {lesson.isFree && <Badge variant="lime">Free</Badge>}
                      <span className="text-xs text-ink/40">{lesson.duration}</span>
                    </div>
                  </div>
                </AnimatedItem>
              )
            })}
          </AnimatedGroup>
        ) : (
          <div className="text-center py-12 bg-surface-soft rounded-lg text-ink/50">
            Curriculum coming soon
          </div>
        )}
      </div>
    </div>
    </PageWrapper>
  )
}
