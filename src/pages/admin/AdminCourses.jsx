import { useState } from 'react'
import { Plus, Edit2, EyeOff, Eye, Trash2, Search, BookOpen } from 'lucide-react'
import { mockCourses } from '../../data/mockCourses'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'

export default function AdminCourses() {
  const [courses, setCourses] = useState(mockCourses)
  const [search, setSearch] = useState('')
  const [hiddenIds, setHiddenIds] = useState([])
  const [selected, setSelected] = useState(null)
  const [showAdd, setShowAdd] = useState(false)

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggleVisibility = (id) => {
    setHiddenIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const levelColor = { beginner: 'lime', intermediate: 'coral', advanced: 'lilac' }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-sm text-ink/50">{courses.length} courses on the platform</p>
        </div>
        <Button onClick={() => setShowAdd(true)} icon={<Plus size={15} />}>
          Add course
        </Button>
      </div>

      <div className="mb-4">
        <Input placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} icon={<Search size={16} />} />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.map(course => {
          const hidden = hiddenIds.includes(course.id)
          return (
            <div key={course.id} className={`bg-white border border-hairline rounded-lg p-4 flex items-center gap-4 ${hidden ? 'opacity-50' : ''}`}>
              <div className="w-16 h-12 rounded overflow-hidden bg-surface-soft flex-shrink-0">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-medium text-sm">{course.title}</span>
                  <Badge variant={levelColor[course.level]}>{course.level}</Badge>
                  {course.isPremium && <Badge variant="navy">Premium</Badge>}
                  {hidden && <Badge variant="error">Hidden</Badge>}
                </div>
                <div className="text-xs text-ink/40 flex gap-3">
                  <span>{course.lessonCount} lessons</span>
                  <span>{course.enrolledCount.toLocaleString()} enrolled</span>
                  <span>⭐ {course.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => setSelected(course)}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-soft"
                  title="Edit"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => toggleVisibility(course.id)}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-soft"
                  title={hidden ? 'Show' : 'Hide'}
                >
                  {hidden ? <Eye size={14} className="text-semantic-success" /> : <EyeOff size={14} className="text-ink/50" />}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Edit Course" size="lg">
        {selected && (
          <div className="p-5 space-y-4">
            <Input label="Course title" defaultValue={selected.title} />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Level</label>
                <select className="w-full px-3 py-2.5 rounded-md border border-hairline text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20" defaultValue={selected.level}>
                  <option>beginner</option>
                  <option>intermediate</option>
                  <option>advanced</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Premium</label>
                <select className="w-full px-3 py-2.5 rounded-md border border-hairline text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20" defaultValue={selected.isPremium ? 'yes' : 'no'}>
                  <option value="no">Free</option>
                  <option value="yes">Premium</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Description</label>
              <textarea className="w-full px-3.5 py-3 rounded-md border border-hairline text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20" rows={3} defaultValue={selected.description} />
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={() => setSelected(null)}>Save changes</Button>
              <Button variant="secondary" className="flex-1" onClick={() => setSelected(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add New Course" size="lg">
        <div className="p-5 space-y-4">
          <Input label="Course title" placeholder="e.g. Introduction to Web Workers" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1.5">Level</label>
              <select className="w-full px-3 py-2.5 rounded-md border border-hairline text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20">
                <option>beginner</option><option>intermediate</option><option>advanced</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Language</label>
              <select className="w-full px-3 py-2.5 rounded-md border border-hairline text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20">
                <option>JavaScript</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Description</label>
            <textarea className="w-full px-3.5 py-3 rounded-md border border-hairline text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20" rows={3} placeholder="Course description..." />
          </div>
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={() => setShowAdd(false)}>Create course</Button>
            <Button variant="secondary" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
