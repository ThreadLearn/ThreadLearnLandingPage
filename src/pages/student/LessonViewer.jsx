import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, CheckCircle, Code2, MessageSquare, Bookmark, FileText,
  Lock, ThumbsUp, Send, Edit2, Trash2, Plus, X, Star
} from 'lucide-react'
import { mockCourses } from '../../data/mockCourses'
import { mockLessons, mockProgress, mockComments, mockBookmarks, mockNotes } from '../../data/mockLessons'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../../components/ui/Avatar'
import { Textarea } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'

function MarkdownRenderer({ content }) {
  const lines = content.split('\n')
  const rendered = lines.map((line, i) => {
    if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-semibold mt-8 mb-4 first:mt-0">{line.slice(2)}</h1>
    if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>
    if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-5 mb-2">{line.slice(4)}</h3>
    if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-black pl-4 my-3 text-ink/70 italic">{line.slice(2)}</blockquote>
    if (line.startsWith('```')) return null
    if (line.startsWith('| ')) return null
    if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-5 list-disc text-base leading-relaxed">{line.slice(2)}</li>
    if (line.trim() === '') return <br key={i} />
    if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} className="font-semibold block">{line.slice(2, -2)}</strong>
    return <p key={i} className="text-base leading-relaxed mb-2">{line}</p>
  })

  const codeBlocks = []
  let inCode = false, codeLines = [], lang = ''
  const fullRendered = []
  lines.forEach((line, i) => {
    if (line.startsWith('```') && !inCode) { inCode = true; lang = line.slice(3); codeLines = []; return }
    if (line.startsWith('```') && inCode) {
      inCode = false
      fullRendered.push(
        <div key={`code-${i}`} className="my-5 rounded-md overflow-hidden border border-hairline">
          <div className="bg-surface-soft px-4 py-2 text-xs font-caption text-ink/40 border-b border-hairline">{lang || 'code'}</div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm overflow-x-auto font-mono leading-relaxed">
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      )
      return
    }
    if (inCode) { codeLines.push(line); return }

    if (line.startsWith('| ')) {
      const cells = line.split('|').filter(Boolean).map(c => c.trim())
      const isHeader = lines[i + 1]?.startsWith('|---')
      if (isHeader) {
        fullRendered.push(
          <div key={`th-${i}`} className="contents">
            <table className="w-full border-collapse my-5 text-sm">
              <thead><tr>{cells.map((c, j) => <th key={j} className="border border-hairline px-3 py-2 bg-surface-soft text-left font-semibold">{c}</th>)}</tr></thead>
              <tbody></tbody>
            </table>
          </div>
        )
      } else if (!line.startsWith('|---')) {
        fullRendered.push(<tr key={`tr-${i}`}>{cells.map((c, j) => <td key={j} className="border border-hairline px-3 py-2">{c}</td>)}</tr>)
      }
      return
    }

    fullRendered.push(rendered[i])
  })

  return <div className="prose max-w-none">{fullRendered}</div>
}

export default function LessonViewer() {
  const { slug, lessonId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const course = mockCourses.find(c => c.slug === slug)
  const lessons = mockLessons[course?.id] || []
  const lesson = lessons.find(l => l.id === lessonId)
  const currentIdx = lessons.findIndex(l => l.id === lessonId)
  const prev = lessons[currentIdx - 1]
  const next = lessons[currentIdx + 1]

  const progress = mockProgress[course?.id]
  const isCompleted = progress?.completedLessons?.includes(lessonId)

  const [activeTab, setActiveTab] = useState('comments')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(mockComments.filter(c => c.lessonId === lessonId))
  const [note, setNote] = useState(mockNotes[lessonId] || '')
  const [noteSaved, setNoteSaved] = useState(false)
  const [completed, setCompleted] = useState(isCompleted)
  const [bookmarked, setBookmarked] = useState(mockBookmarks.some(b => b.lessonId === lessonId))

  if (!course || !lesson) return <div className="p-10 text-center">Lesson not found</div>

  const handleComplete = () => {
    setCompleted(true)
    // In real app: call API, add XP
  }

  const handleComment = () => {
    if (!comment.trim()) return
    setComments(prev => [...prev, {
      id: 'new-' + Date.now(),
      lessonId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: comment,
      createdAt: new Date().toISOString(),
      replies: [],
    }])
    setComment('')
  }

  const handleSaveNote = () => {
    setNoteSaved(true)
    setTimeout(() => setNoteSaved(false), 2000)
  }

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Sidebar - Lesson List */}
      <aside className="w-72 flex-shrink-0 border-r border-hairline bg-white overflow-y-auto hidden lg:block">
        <div className="p-4 border-b border-hairline">
          <Link to={`/courses/${slug}`} className="text-xs text-ink/40 hover:text-ink flex items-center gap-1 mb-2">
            <ChevronLeft size={12} /> {course.title}
          </Link>
          {progress && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-ink/50 mb-1">
                <span>Progress</span>
                <span>{progress.percentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-hairline rounded-full">
                <div className="h-1.5 bg-black rounded-full" style={{ width: `${progress.percentage}%` }} />
              </div>
            </div>
          )}
        </div>
        <div className="py-2">
          {lessons.map((l, idx) => {
            const isDone = progress?.completedLessons?.includes(l.id)
            const isActive = l.id === lessonId
            return (
              <button
                key={l.id}
                disabled={l.isLocked}
                onClick={() => navigate(`/courses/${slug}/lessons/${l.id}`)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isActive ? 'bg-block-lime font-medium' : l.isLocked ? 'opacity-40 cursor-not-allowed' : 'hover:bg-surface-soft'
                }`}
              >
                <div className="w-5 flex-shrink-0">
                  {isDone ? <CheckCircle size={16} className="text-semantic-success" />
                    : l.isLocked ? <Lock size={14} className="text-ink/30" />
                    : <span className="text-xs text-ink/40 font-mono">{String(idx + 1).padStart(2, '0')}</span>
                  }
                </div>
                <span className="flex-1 leading-tight">{l.title}</span>
                <span className="text-xs text-ink/30 flex-shrink-0">{l.duration}</span>
              </button>
            )
          })}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-hairline bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-base truncate max-w-md">{lesson.title}</h1>
            <span className="text-xs text-ink/40">{lesson.duration}</span>
            {lesson.isFree && <Badge variant="lime">Free</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookmarked(v => !v)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${bookmarked ? 'bg-block-coral' : 'hover:bg-surface-soft'}`}
            >
              <Bookmark size={15} className={bookmarked ? 'fill-current' : ''} />
            </button>
            <Button
              size="sm"
              onClick={() => navigate(`/courses/${slug}/lessons/${lessonId}/ide`)}
              icon={<Code2 size={14} />}
              variant="secondary"
            >
              Open IDE
            </Button>
            {!completed ? (
              <Button size="sm" onClick={handleComplete} icon={<CheckCircle size={14} />}>
                Mark complete
              </Button>
            ) : (
              <span className="flex items-center gap-1.5 text-semantic-success text-sm font-medium">
                <CheckCircle size={16} /> Completed
              </span>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-10">
            {/* Video */}
            {lesson.videoUrl && (
              <div className="aspect-video rounded-lg overflow-hidden mb-8 bg-black">
                <iframe
                  src={lesson.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                  allowFullScreen
                />
              </div>
            )}

            {/* Lesson Content */}
            <MarkdownRenderer content={lesson.content} />

            {/* Attachments */}
            {lesson.attachments?.length > 0 && (
              <div className="mt-8 p-4 bg-surface-soft rounded-lg">
                <div className="font-semibold text-sm mb-3">Attachments</div>
                {lesson.attachments.map(a => (
                  <a key={a.name} href={a.url} className="flex items-center gap-2 text-sm text-ink hover:underline">
                    <FileText size={14} />
                    {a.name}
                  </a>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-12 pt-6 border-t border-hairline">
              {prev ? (
                <Button variant="secondary" size="sm" onClick={() => navigate(`/courses/${slug}/lessons/${prev.id}`)}>
                  <ChevronLeft size={14} /> {prev.title}
                </Button>
              ) : <div />}
              {next ? (
                <Button size="sm" onClick={() => navigate(`/courses/${slug}/lessons/${next.id}`)}>
                  {next.title} <ChevronRight size={14} />
                </Button>
              ) : (
                <Button size="sm" onClick={() => navigate(`/courses/${slug}`)}>
                  Finish course <Star size={14} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Comments/Bookmarks/Notes */}
      <aside className="w-80 flex-shrink-0 border-l border-hairline bg-white overflow-hidden flex flex-col hidden xl:flex">
        {/* Tabs */}
        <div className="flex border-b border-hairline flex-shrink-0">
          {[
            { id: 'comments', icon: <MessageSquare size={14} />, label: 'Comments' },
            { id: 'bookmarks', icon: <Bookmark size={14} />, label: 'Bookmarks' },
            { id: 'notes', icon: <FileText size={14} />, label: 'Notes' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id ? 'bg-surface-soft border-b-2 border-black' : 'hover:bg-surface-soft text-ink/50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'comments' && (
            <div className="p-4 flex flex-col gap-4">
              {/* Add comment */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Ask a question or leave a comment..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                />
                <Button size="sm" onClick={handleComment} icon={<Send size={13} />} disabled={!comment.trim()}>
                  Post
                </Button>
              </div>

              {/* Comments */}
              {comments.length === 0 ? (
                <div className="text-center text-sm text-ink/40 py-8">No comments yet. Be first!</div>
              ) : comments.map(c => (
                <div key={c.id} className="space-y-3">
                  <div className="flex gap-2.5">
                    <Avatar src={c.userAvatar} name={c.userName} size="sm" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{c.userName}</span>
                        <span className="text-xs text-ink/30">{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-ink/80 leading-relaxed">{c.content}</p>
                    </div>
                  </div>
                  {c.replies?.map(r => (
                    <div key={r.id} className="flex gap-2.5 ml-6">
                      <Avatar src={r.userAvatar} name={r.userName} size="xs" />
                      <div className="bg-surface-soft rounded-md p-2.5 flex-1">
                        <span className="text-xs font-medium">{r.userName}</span>
                        <p className="text-xs text-ink/80 mt-1">{r.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="p-4 space-y-3">
              {mockBookmarks.filter(b => b.courseId === course.id).length === 0 ? (
                <div className="text-center text-sm text-ink/40 py-8">No bookmarks yet</div>
              ) : mockBookmarks.filter(b => b.courseId === course.id).map(bm => (
                <div key={bm.id} className="bg-surface-soft rounded-md p-3">
                  <div className="text-xs font-medium mb-1">{bm.lessonTitle}</div>
                  {bm.note && <p className="text-xs text-ink/60">{bm.note}</p>}
                  <div className="text-xs text-ink/30 mt-1">{new Date(bm.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="p-4 space-y-3">
              <Textarea
                placeholder="Write your notes for this lesson..."
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={12}
              />
              <Button size="sm" onClick={handleSaveNote} className="w-full">
                {noteSaved ? '✓ Saved!' : 'Save notes'}
              </Button>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
