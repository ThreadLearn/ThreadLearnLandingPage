import { useState } from 'react'
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight, Video, Code2, HelpCircle, FileText, Eye, EyeOff, GripVertical } from 'lucide-react'
import { mockCourses } from '../../data/mockCourses'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'

const mockCurriculums = {
  'c1': [
    { id: 'l1', title: 'What is Concurrent Programming?', type: 'video', duration: '8 min', published: true },
    { id: 'l2', title: 'Processes vs Threads', type: 'video', duration: '12 min', published: true },
    { id: 'l3', title: 'Your First Thread', type: 'code', duration: '15 min', published: true },
    { id: 'l4', title: 'Thread Lifecycle', type: 'video', duration: '10 min', published: true },
    { id: 'l5', title: 'Context Switching Explained', type: 'video', duration: '9 min', published: false },
    { id: 'q1', title: 'Module 1 Quiz', type: 'quiz', duration: '10 min', published: true },
  ],
  'c2': [
    { id: 'l6', title: 'What is a Race Condition?', type: 'video', duration: '11 min', published: true },
    { id: 'l7', title: 'The TOCTOU Pattern', type: 'code', duration: '20 min', published: true },
    { id: 'l8', title: 'Deadlock Deep Dive', type: 'video', duration: '14 min', published: true },
    { id: 'q2', title: 'Race Conditions Quiz', type: 'quiz', duration: '10 min', published: true },
  ],
}

const typeConfig = {
  video: { icon: <Video size={13} />, color: 'bg-block-lilac', label: 'Video' },
  code: { icon: <Code2 size={13} />, color: 'bg-block-lime', label: 'Exercise' },
  quiz: { icon: <HelpCircle size={13} />, color: 'bg-block-coral', label: 'Quiz' },
  text: { icon: <FileText size={13} />, color: 'bg-block-cream', label: 'Text' },
}

function LessonRow({ lesson, onEdit, onDelete, onToggle }) {
  const cfg = typeConfig[lesson.type]
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${lesson.published ? 'border-hairline bg-white' : 'border-hairline bg-surface-soft opacity-60'} hover:shadow-elevation-1 transition-shadow group`}>
      <GripVertical size={14} className="text-ink/20 cursor-grab flex-shrink-0" />
      <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
        {cfg.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{lesson.title}</div>
        <div className="text-xs text-ink/40">{cfg.label} · {lesson.duration}</div>
      </div>
      {!lesson.published && <Badge variant="error">Draft</Badge>}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(lesson)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-soft"><Edit2 size={12} /></button>
        <button onClick={() => onToggle(lesson.id)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-soft">
          {lesson.published ? <EyeOff size={12} className="text-ink/50" /> : <Eye size={12} className="text-semantic-success" />}
        </button>
        <button onClick={() => onDelete(lesson.id)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-surface-soft"><Trash2 size={12} className="text-semantic-error" /></button>
      </div>
    </div>
  )
}

export default function AdminContent() {
  const [expandedCourse, setExpandedCourse] = useState('c1')
  const [curriculums, setCurriculums] = useState(mockCurriculums)
  const [editLesson, setEditLesson] = useState(null)
  const [showAddLesson, setShowAddLesson] = useState(null)
  const [search, setSearch] = useState('')

  const toggleLesson = (courseId, lessonId) => {
    setCurriculums(prev => ({
      ...prev,
      [courseId]: prev[courseId].map(l => l.id === lessonId ? { ...l, published: !l.published } : l),
    }))
  }

  const deleteLesson = (courseId, lessonId) => {
    if (!confirm('Delete this lesson?')) return
    setCurriculums(prev => ({
      ...prev,
      [courseId]: prev[courseId].filter(l => l.id !== lessonId),
    }))
  }

  const filteredCourses = mockCourses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p className="text-sm text-ink/50">Manage lessons, exercises, and quizzes</p>
        </div>
        <Button icon={<Plus size={15} />} onClick={() => setShowAddLesson('c1')}>Add lesson</Button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <Input
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          icon={<FileText size={15} />}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total lessons', value: Object.values(curriculums).flat().length },
          { label: 'Published', value: Object.values(curriculums).flat().filter(l => l.published).length },
          { label: 'Drafts', value: Object.values(curriculums).flat().filter(l => !l.published).length },
          { label: 'Quizzes', value: Object.values(curriculums).flat().filter(l => l.type === 'quiz').length },
        ].map(s => (
          <div key={s.label} className="bg-surface-soft rounded-xl p-3 text-center">
            <div className="font-bold text-xl">{s.value}</div>
            <div className="text-xs text-ink/50">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Course accordion */}
      <div className="space-y-3">
        {filteredCourses.map(course => {
          const lessons = curriculums[course.id] || []
          const isOpen = expandedCourse === course.id
          const publishedCount = lessons.filter(l => l.published).length

          return (
            <div key={course.id} className="border border-hairline rounded-xl overflow-hidden">
              {/* Course header */}
              <button
                className="w-full flex items-center gap-3 p-4 hover:bg-surface-soft transition-colors text-left"
                onClick={() => setExpandedCourse(isOpen ? null : course.id)}
              >
                {isOpen ? <ChevronDown size={16} className="text-ink/40 flex-shrink-0" /> : <ChevronRight size={16} className="text-ink/40 flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{course.title}</span>
                    <Badge variant="default">{course.level}</Badge>
                    {course.isPremium && <Badge variant="navy">Premium</Badge>}
                  </div>
                  <div className="text-xs text-ink/40 mt-0.5">
                    {lessons.length} lessons · {publishedCount} published
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); setShowAddLesson(course.id) }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-pill bg-black text-white text-xs font-medium hover:bg-black/80 transition-colors"
                >
                  <Plus size={12} /> Add
                </button>
              </button>

              {/* Lessons */}
              {isOpen && (
                <div className="border-t border-hairline p-4 space-y-2">
                  {lessons.length === 0 ? (
                    <div className="text-center py-8 text-ink/40 text-sm">
                      No lessons yet.{' '}
                      <button onClick={() => setShowAddLesson(course.id)} className="underline">Add the first one.</button>
                    </div>
                  ) : (
                    lessons.map(lesson => (
                      <LessonRow
                        key={lesson.id}
                        lesson={lesson}
                        onEdit={setEditLesson}
                        onDelete={(id) => deleteLesson(course.id, id)}
                        onToggle={(id) => toggleLesson(course.id, id)}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Edit lesson modal */}
      <Modal open={!!editLesson} onClose={() => setEditLesson(null)} title="Edit Lesson" size="sm">
        {editLesson && (
          <div className="p-5 space-y-4">
            <Input label="Lesson title" defaultValue={editLesson.title} />
            <div>
              <label className="text-sm font-medium block mb-1.5">Type</label>
              <select className="w-full px-3 py-2.5 rounded-md border border-hairline text-sm bg-white focus:outline-none" defaultValue={editLesson.type}>
                <option value="video">Video</option>
                <option value="code">Code Exercise</option>
                <option value="quiz">Quiz</option>
                <option value="text">Text / Reading</option>
              </select>
            </div>
            <Input label="Duration" defaultValue={editLesson.duration} placeholder="e.g. 12 min" />
            <div>
              <label className="text-sm font-medium block mb-1.5">Content (markdown)</label>
              <textarea rows={4} className="w-full px-3.5 py-3 rounded-md border border-hairline text-sm bg-white focus:outline-none font-mono text-xs" placeholder="## Lesson content..." />
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={() => setEditLesson(null)}>Save changes</Button>
              <Button variant="secondary" className="flex-1" onClick={() => setEditLesson(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add lesson modal */}
      <Modal open={!!showAddLesson} onClose={() => setShowAddLesson(null)} title="Add New Lesson" size="sm">
        <div className="p-5 space-y-4">
          <Input label="Lesson title" placeholder="e.g. Intro to Promises" />
          <div>
            <label className="text-sm font-medium block mb-1.5">Type</label>
            <select className="w-full px-3 py-2.5 rounded-md border border-hairline text-sm bg-white focus:outline-none">
              <option value="video">Video</option>
              <option value="code">Code Exercise</option>
              <option value="quiz">Quiz</option>
              <option value="text">Text / Reading</option>
            </select>
          </div>
          <Input label="Duration estimate" placeholder="e.g. 10 min" />
          <div>
            <label className="text-sm font-medium block mb-1.5">Content (markdown)</label>
            <textarea rows={3} className="w-full px-3.5 py-3 rounded-md border border-hairline text-sm bg-white focus:outline-none font-mono text-xs" placeholder="## Lesson title&#10;&#10;Write your lesson content here..." />
          </div>
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={() => setShowAddLesson(null)}>Create lesson</Button>
            <Button variant="secondary" className="flex-1" onClick={() => setShowAddLesson(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
