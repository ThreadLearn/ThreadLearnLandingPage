import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Send, History, AlertTriangle, Lightbulb, Copy, Download, Clock, CheckCircle, Loader } from 'lucide-react'
import Editor from '@monaco-editor/react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { mockAIResults } from '../../data/mockAI'
import { useAuth } from '../../hooks/useAuth'

export default function AIPage() {
  const { user } = useAuth()
  const [code, setCode] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [view, setView] = useState('analyze')
  const [copied, setCopied] = useState(null)

  const canAnalyze = user.aiUsageToday < user.aiLimit

  const handleAnalyze = async () => {
    if (!canAnalyze || !code.trim()) return
    setAnalyzing(true)
    setResult(null)
    await new Promise(r => setTimeout(r, 2500))
    setResult(mockAIResults[0])
    setAnalyzing(false)
  }

  const handleCopy = (text, id) => {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  const usagePercent = (user.aiUsageToday / user.aiLimit) * 100

  return (
    <div className="max-w-content mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <span className="font-eyebrow text-xs text-ink/40 block mb-2">AI-Powered</span>
          <h1 className="text-3xl font-light mb-1" style={{ fontWeight: 340 }}>Code Analysis</h1>
          <p className="text-ink/60 text-sm">Detect race conditions, deadlocks, and get multithreading recommendations</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('analyze')}
            className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors ${view === 'analyze' ? 'bg-black text-white' : 'bg-surface-soft hover:bg-hairline'}`}
          >
            Analyze
          </button>
          <button
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors flex items-center gap-1.5 ${view === 'history' ? 'bg-black text-white' : 'bg-surface-soft hover:bg-hairline'}`}
          >
            <History size={14} /> History
          </button>
        </div>
      </div>

      {view === 'analyze' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Input */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Your Code</h2>
              <div className="flex items-center gap-2">
                <Badge variant={usagePercent > 80 ? 'coral' : user.isPremium ? 'lilac' : 'lime'}>
                  {user.aiUsageToday}/{user.aiLimit} queries
                </Badge>
                {!user.isPremium && (
                  <Link to="/pricing" className="text-xs underline text-ink/50">Upgrade</Link>
                )}
              </div>
            </div>

            {/* Usage bar */}
            <div className="mb-4">
              <div className="h-1.5 bg-hairline rounded-full overflow-hidden">
                <div
                  className={`h-1.5 rounded-full transition-all ${usagePercent > 80 ? 'bg-semantic-error' : 'bg-black'}`}
                  style={{ width: `${Math.min(usagePercent, 100)}%` }}
                />
              </div>
              <div className="text-xs text-ink/40 mt-1">
                {user.aiLimit - user.aiUsageToday} queries remaining today. Resets at midnight.
              </div>
            </div>

            <div className="border border-hairline rounded-lg overflow-hidden">
              <div className="bg-surface-soft px-4 py-2 border-b border-hairline flex items-center justify-between">
                <span className="font-eyebrow text-xs text-ink/40">JavaScript</span>
                <button
                  onClick={() => setCode(code || "let counter = 0;\n\nasync function increment() {\n  const current = counter;\n  await fetch('/api/log');\n  counter = current + 1;\n}\n\nawait Promise.all(Array(50).fill(0).map(increment));")}
                  className="text-xs text-ink/40 hover:text-ink underline"
                >
                  Load example
                </button>
              </div>
              <Editor
                height="340px"
                defaultLanguage="javascript"
                value={code}
                onChange={v => setCode(v || '')}
                theme="vs-dark"
                options={{
                  fontSize: 13,
                  fontFamily: '"JetBrains Mono", monospace',
                  minimap: { enabled: false },
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  padding: { top: 12 },
                }}
              />
            </div>

            <div className="mt-3 flex gap-2">
              <Button
                onClick={handleAnalyze}
                loading={analyzing}
                disabled={!canAnalyze || !code.trim()}
                icon={<Brain size={16} />}
                className="flex-1"
              >
                {!canAnalyze ? 'Daily limit reached' : 'Analyze code'}
              </Button>
              {!canAnalyze && (
                <Link to="/pricing">
                  <Button variant="magenta" icon={<Brain size={16} />}>Upgrade</Button>
                </Link>
              )}
            </div>
          </div>

          {/* Results */}
          <div>
            <h2 className="font-semibold mb-3">Analysis Result</h2>

            {!result && !analyzing && (
              <div className="h-[440px] flex flex-col items-center justify-center bg-surface-soft rounded-lg text-center">
                <Brain size={40} className="text-ink/20 mb-4" />
                <p className="text-ink/40 text-sm">Paste your JavaScript code and click Analyze</p>
                <p className="text-xs text-ink/30 mt-1">AST analysis + BM25 pattern matching</p>
              </div>
            )}

            {analyzing && (
              <div className="h-[440px] flex flex-col items-center justify-center bg-surface-soft rounded-lg">
                <Loader size={32} className="animate-spin text-block-lilac mb-4" />
                <p className="font-medium mb-1">Analyzing...</p>
                <p className="text-xs text-ink/40">Running AST parser + race condition detector</p>
              </div>
            )}

            {result && (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {/* Summary */}
                <div className={`rounded-lg p-4 ${result.raceConditions.length ? 'bg-semantic-error/10 border border-semantic-error/20' : 'bg-semantic-success/10 border border-semantic-success/20'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {result.raceConditions.length ? (
                      <AlertTriangle size={16} className="text-semantic-error" />
                    ) : (
                      <CheckCircle size={16} className="text-semantic-success" />
                    )}
                    <span className="font-semibold text-sm">
                      {result.raceConditions.length
                        ? `${result.raceConditions.length} race condition${result.raceConditions.length > 1 ? 's' : ''} found`
                        : 'No race conditions detected'}
                    </span>
                  </div>
                  <p className="text-sm text-ink/70">{result.summary}</p>
                </div>

                {/* Race Conditions */}
                {result.raceConditions.map(rc => (
                  <div key={rc.id} className="bg-white border border-semantic-error/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="error">{rc.severity}</Badge>
                      <Badge variant="default">{rc.pattern}</Badge>
                      <span className="text-xs text-ink/40 font-mono">Line {rc.line}–{rc.endLine}</span>
                    </div>
                    <p className="text-sm font-medium mb-1">{rc.description}</p>
                    <p className="text-sm text-ink/60">{rc.detail}</p>
                  </div>
                ))}

                {/* Suggestions */}
                {result.suggestions.map(s => (
                  <div key={s.id} className="bg-white border border-hairline rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb size={16} className="text-semantic-warning" />
                      <span className="font-semibold text-sm">{s.title}</span>
                    </div>
                    <p className="text-sm text-ink/60 mb-3">{s.description}</p>
                    <div className="relative">
                      <pre className="bg-[#1e1e1e] text-[#d4d4d4] rounded-md p-3 text-xs font-mono overflow-x-auto">
                        {s.code}
                      </pre>
                      <button
                        onClick={() => handleCopy(s.code, s.id)}
                        className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 rounded px-2 py-1 text-[10px] text-white/60 flex items-center gap-1"
                      >
                        <Copy size={10} />
                        {copied === s.id ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-ink/40">
                      <span>Complexity: {s.complexity}</span>
                      <span>Speedup: {s.speedup}</span>
                    </div>
                  </div>
                ))}

                <Button variant="secondary" size="sm" icon={<Download size={14} />} onClick={() => {}}>
                  Export report
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {view === 'history' && (
        <div className="space-y-4">
          <h2 className="font-semibold">Analysis History</h2>
          {mockAIResults.map(r => (
            <div key={r.id} className="bg-white border border-hairline rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${r.raceConditions.length ? 'bg-semantic-error/10' : 'bg-semantic-success/10'}`}>
                    {r.raceConditions.length ? <AlertTriangle size={14} className="text-semantic-error" /> : <CheckCircle size={14} className="text-semantic-success" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {r.raceConditions.length ? `${r.raceConditions.length} race condition found` : 'Clean — no issues'}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-ink/40 mt-0.5">
                      <Clock size={11} />
                      {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => { setCode(r.code); setView('analyze') }}>
                    Re-analyze
                  </Button>
                </div>
              </div>
              <pre className="bg-surface-soft rounded-md p-3 text-xs font-mono overflow-x-auto max-h-32 text-ink/70">
                {r.code.slice(0, 200)}{r.code.length > 200 ? '...' : ''}
              </pre>
              <p className="text-sm text-ink/60 mt-2">{r.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
