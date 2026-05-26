import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Clock, ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle, Trophy } from 'lucide-react'
import { mockQuizzes, mockQuizAttempts } from '../../data/mockQuizzes'
import { mockCourses } from '../../data/mockCourses'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// Quiz Player
function QuizPlayer({ quiz, onComplete }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); handleSubmit(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const q = quiz.questions[current]
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const isLast = current === quiz.questions.length - 1
  const answered = Object.keys(answers).length

  const handleAnswer = (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }))
  }

  const handleMultiAnswer = (qId, opt) => {
    setAnswers(prev => {
      const curr = prev[qId] || []
      return { ...prev, [qId]: curr.includes(opt) ? curr.filter(o => o !== opt) : [...curr, opt] }
    })
  }

  const handleSubmit = useCallback(() => {
    const total = quiz.questions.reduce((sum, q) => sum + q.points, 0)
    let earned = 0
    quiz.questions.forEach(q => {
      const ans = answers[q.id]
      if (q.type === 'single' && ans === q.correctAnswer) earned += q.points
      if (q.type === 'multi') {
        const correct = q.correctAnswer.sort().join()
        const given = (ans || []).sort().join()
        if (correct === given) earned += q.points
      }
    })
    onComplete({ answers, score: earned, maxScore: total, passed: (earned / total * 100) >= quiz.passingScore })
  }, [answers, quiz, onComplete])

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-semibold text-lg">{quiz.title}</h1>
          <div className="text-sm text-ink/50">{answered}/{quiz.questions.length} answered</div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-2 rounded-pill text-sm font-mono font-bold ${timeLeft < 60 ? 'bg-semantic-error/10 text-semantic-error' : 'bg-surface-soft'}`}>
          <Clock size={14} />
          {mins}:{String(secs).padStart(2, '0')}
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-8">
        {quiz.questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              i === current ? 'bg-black' : answers[quiz.questions[i].id] ? 'bg-semantic-success' : 'bg-hairline'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="bg-white border border-hairline rounded-lg p-6 mb-4">
        <div className="flex items-start justify-between mb-4">
          <span className="font-eyebrow text-xs text-ink/40">Question {current + 1} of {quiz.questions.length}</span>
          <Badge variant="default">{q.points} pts</Badge>
        </div>
        <pre className="text-base font-sans whitespace-pre-wrap mb-6 leading-relaxed">{q.text}</pre>

        <div className="space-y-2">
          {q.options.map(opt => {
            const isSelected = q.type === 'single'
              ? answers[q.id] === opt.id
              : (answers[q.id] || []).includes(opt.id)
            return (
              <button
                key={opt.id}
                onClick={() => q.type === 'single' ? handleAnswer(q.id, opt.id) : handleMultiAnswer(q.id, opt.id)}
                className={`w-full text-left px-4 py-3 rounded-md border text-sm transition-all ${
                  isSelected
                    ? 'border-black bg-black text-white'
                    : 'border-hairline hover:border-black/40 hover:bg-surface-soft'
                }`}
              >
                <span className="font-mono text-xs mr-2 opacity-50">{opt.id.toUpperCase()}.</span>
                {opt.text}
              </button>
            )
          })}
        </div>
        {q.type === 'multi' && (
          <p className="text-xs text-ink/40 mt-3">Select all correct answers</p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="secondary" disabled={current === 0} onClick={() => setCurrent(c => c - 1)} icon={<ChevronLeft size={14} />}>
          Previous
        </Button>
        {isLast ? (
          <Button onClick={handleSubmit} variant="success" icon={<Trophy size={14} />}>
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={() => setCurrent(c => c + 1)} icon={<ChevronRight size={14} />}>
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

// Quiz Result
function QuizResult({ quiz, result, onRetry }) {
  const pct = Math.round((result.score / result.maxScore) * 100)

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Result Hero */}
      <div className={`rounded-lg p-8 text-center mb-6 ${result.passed ? 'bg-block-lime' : 'bg-block-pink'}`}>
        <div className="text-5xl mb-3">{result.passed ? '🎉' : '😔'}</div>
        <h1 className="text-3xl font-bold mb-1">{pct}%</h1>
        <div className="text-lg font-medium mb-1">{result.passed ? 'Passed!' : 'Not passed'}</div>
        <div className="text-sm text-ink/60">
          {result.score}/{result.maxScore} points · Passing score: {quiz.passingScore}%
        </div>
      </div>

      {/* Question Review */}
      <div className="space-y-4 mb-6">
        <h2 className="font-semibold">Answer Review</h2>
        {quiz.questions.map(q => {
          const given = result.answers[q.id]
          const correct = q.correctAnswer
          const isCorrect = q.type === 'single'
            ? given === correct
            : (given || []).sort().join() === correct.sort().join()

          return (
            <div key={q.id} className={`bg-white border rounded-lg p-4 ${isCorrect ? 'border-semantic-success/40' : 'border-semantic-error/40'}`}>
              <div className="flex items-start gap-2 mb-2">
                {isCorrect ? <CheckCircle size={16} className="text-semantic-success mt-0.5 flex-shrink-0" /> : <XCircle size={16} className="text-semantic-error mt-0.5 flex-shrink-0" />}
                <p className="text-sm font-medium">{q.text.slice(0, 100)}{q.text.length > 100 ? '...' : ''}</p>
              </div>
              <div className="ml-6 text-xs text-ink/60 space-y-1">
                <div className="flex gap-2">
                  <span className="text-ink/40">Your answer:</span>
                  <span className={isCorrect ? 'text-semantic-success font-medium' : 'text-semantic-error font-medium'}>
                    {Array.isArray(given) ? given.join(', ') : given || 'Not answered'}
                  </span>
                </div>
                {!isCorrect && (
                  <div className="flex gap-2">
                    <span className="text-ink/40">Correct:</span>
                    <span className="text-semantic-success font-medium">
                      {Array.isArray(correct) ? correct.join(', ') : correct}
                    </span>
                  </div>
                )}
                <div className="mt-2 bg-surface-soft rounded p-2 text-ink/70 italic">{q.explanation}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onRetry} className="flex-1">Try again</Button>
        <Button className="flex-1">Continue learning</Button>
      </div>
    </div>
  )
}

// History view
function QuizHistory({ quizId }) {
  const data = mockQuizAttempts
    .filter(a => a.quizId === quizId)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(a => ({ date: new Date(a.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }), score: a.score, passed: a.passed }))

  return (
    <div className="bg-white border border-hairline rounded-lg p-5">
      <h3 className="font-semibold mb-4">Attempt History</h3>
      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#000" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        {mockQuizAttempts.filter(a => a.quizId === quizId).reverse().map((a, i) => (
          <div key={a.id} className="flex items-center gap-3 text-sm">
            <span className="text-ink/40 w-20 text-xs">{new Date(a.date).toLocaleDateString()}</span>
            <div className="flex-1 h-1.5 bg-hairline rounded-full">
              <div className={`h-1.5 rounded-full ${a.passed ? 'bg-semantic-success' : 'bg-semantic-error'}`} style={{ width: `${a.score}%` }} />
            </div>
            <span className="font-mono text-xs w-10 text-right">{a.score}%</span>
            <Badge variant={a.passed ? 'success' : 'error'}>{a.passed ? 'Pass' : 'Fail'}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function QuizPage() {
  const { slug, quizId } = useParams()
  const navigate = useNavigate()
  const course = mockCourses.find(c => c.slug === slug)
  const quiz = mockQuizzes[course?.id]
  const [phase, setPhase] = useState('intro')
  const [result, setResult] = useState(null)

  if (!quiz) return <div className="p-10 text-center">Quiz not found</div>

  if (phase === 'playing') return <QuizPlayer quiz={quiz} onComplete={(r) => { setResult(r); setPhase('result') }} />
  if (phase === 'result') return <QuizResult quiz={quiz} result={result} onRetry={() => setPhase('playing')} />

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Link to={`/courses/${slug}`} className="flex items-center gap-1 text-sm text-ink/50 hover:text-ink mb-6">
        <ChevronLeft size={14} /> Back to course
      </Link>

      {/* Intro */}
      <div className="bg-white border border-hairline rounded-lg p-8 mb-6 text-center">
        <div className="text-5xl mb-4">🎯</div>
        <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
        <p className="text-ink/60 mb-6">{course?.title}</p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-surface-soft rounded-lg p-3">
            <div className="text-xl font-bold">{quiz.questions.length}</div>
            <div className="text-xs text-ink/50">Questions</div>
          </div>
          <div className="bg-surface-soft rounded-lg p-3">
            <div className="text-xl font-bold">{Math.floor(quiz.timeLimit / 60)}m</div>
            <div className="text-xs text-ink/50">Time limit</div>
          </div>
          <div className="bg-surface-soft rounded-lg p-3">
            <div className="text-xl font-bold">{quiz.passingScore}%</div>
            <div className="text-xs text-ink/50">Pass score</div>
          </div>
        </div>
        <Button size="lg" onClick={() => setPhase('playing')} className="w-full">
          Start Quiz
        </Button>
      </div>

      <QuizHistory quizId={quiz.id} />
    </div>
  )
}
