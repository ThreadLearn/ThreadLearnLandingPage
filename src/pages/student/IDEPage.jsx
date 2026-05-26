import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Play, RotateCcw, Brain, Copy, ChevronLeft, AlertTriangle, CheckCircle, Lightbulb, Loader } from 'lucide-react'
import Editor from '@monaco-editor/react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { mockCodeTemplates, mockExecutionResults, mockAIResults } from '../../data/mockAI'
import { useAuth } from '../../hooks/useAuth'

export default function IDEPage() {
  const { slug, lessonId } = useParams()
  const { user } = useAuth()
  const [code, setCode] = useState(mockCodeTemplates.race_condition_example)
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState(null)
  const [activePanel, setActivePanel] = useState('output')
  const [copied, setCopied] = useState(false)

  const handleRun = async () => {
    setRunning(true)
    setOutput(null)
    await new Promise(r => setTimeout(r, 1200))
    setOutput(mockExecutionResults.success)
    setRunning(false)
    setActivePanel('output')
  }

  const handleAnalyze = async () => {
    if (!user.isPremium && user.aiUsageToday >= user.aiLimit) return
    setAnalyzing(true)
    setAiResult(null)
    await new Promise(r => setTimeout(r, 2000))
    setAiResult(mockAIResults[0])
    setAnalyzing(false)
    setActivePanel('ai')
  }

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] border-b border-[#444] flex-shrink-0">
        <Link
          to={lessonId ? `/courses/${slug}/lessons/${lessonId}` : `/courses/${slug}`}
          className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 mr-2"
        >
          <ChevronLeft size={13} /> Back to lesson
        </Link>

        <div className="flex-1" />

        <select
          className="bg-[#3c3c3c] text-white/70 text-xs px-2 py-1.5 rounded border border-[#555] focus:outline-none"
          defaultValue="javascript"
        >
          <option value="javascript">JavaScript</option>
        </select>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => setCode(mockCodeTemplates.race_condition_example)}
          icon={<RotateCcw size={13} />}
          className="bg-[#3c3c3c] border-[#555] text-white/70 hover:bg-[#4c4c4c]"
        >
          Reset
        </Button>
        <Button
          size="sm"
          onClick={handleRun}
          loading={running}
          icon={<Play size={13} />}
          className="bg-semantic-success hover:opacity-90"
        >
          Run
        </Button>
        <Button
          size="sm"
          variant={user.isPremium ? 'primary' : 'secondary'}
          onClick={handleAnalyze}
          loading={analyzing}
          icon={<Brain size={13} />}
          className={user.isPremium ? 'bg-block-lilac text-ink hover:opacity-90' : 'bg-[#3c3c3c] border-[#555] text-white/70'}
        >
          AI Analyze
          {!user.isPremium && <span className="ml-1 text-[10px] text-white/40">{user.aiUsageToday}/{user.aiLimit}</span>}
        </Button>
      </div>

      {/* Editor + Output */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={v => setCode(v || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              minimap: { enabled: false },
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              tabSize: 2,
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="w-96 flex-shrink-0 border-l border-[#444] flex flex-col bg-[#1e1e1e]">
          {/* Panel Tabs */}
          <div className="flex border-b border-[#444] flex-shrink-0">
            {[
              { id: 'output', label: 'Output' },
              { id: 'ai', label: 'AI Analysis', badge: aiResult?.raceConditions?.length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors ${
                  activePanel === tab.id ? 'text-white border-b-2 border-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {tab.label}
                {tab.badge > 0 && (
                  <span className="bg-semantic-error text-white text-[10px] px-1.5 py-0.5 rounded-full">{tab.badge}</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activePanel === 'output' && (
              <>
                {!output && !running && (
                  <div className="text-white/30 text-sm text-center mt-8">
                    Click <strong>Run</strong> to execute your code
                  </div>
                )}
                {running && (
                  <div className="flex items-center gap-2 text-white/50 text-sm mt-8 justify-center">
                    <Loader size={16} className="animate-spin" /> Executing...
                  </div>
                )}
                {output && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {output.status === 'success' ? (
                        <Badge variant="success">Passed</Badge>
                      ) : (
                        <Badge variant="error">Error</Badge>
                      )}
                      <span className="text-xs text-white/30">{output.runtime} · {output.memory}</span>
                    </div>

                    {output.stdout && (
                      <div>
                        <div className="font-caption text-[10px] text-white/30 mb-1">STDOUT</div>
                        <pre className="bg-[#2d2d2d] rounded p-3 text-sm text-green-400 font-mono whitespace-pre-wrap">
                          {output.stdout}
                        </pre>
                      </div>
                    )}
                    {output.stderr && (
                      <div>
                        <div className="font-caption text-[10px] text-white/30 mb-1">STDERR</div>
                        <pre className="bg-[#2d2d2d] rounded p-3 text-sm text-red-400 font-mono whitespace-pre-wrap">
                          {output.stderr}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {activePanel === 'ai' && (
              <>
                {!aiResult && !analyzing && (
                  <div className="text-white/30 text-sm text-center mt-8 space-y-2">
                    <Brain size={32} className="mx-auto opacity-30" />
                    <p>Click <strong>AI Analyze</strong> to detect race conditions</p>
                    {!user.isPremium && (
                      <p className="text-xs text-block-lilac/70">{user.aiUsageToday}/{user.aiLimit} free queries used</p>
                    )}
                  </div>
                )}
                {analyzing && (
                  <div className="flex flex-col items-center gap-3 mt-8 text-white/50 text-sm">
                    <Loader size={24} className="animate-spin text-block-lilac" />
                    <p>Analyzing code structure...</p>
                    <p className="text-xs text-white/30">Running AST analysis + BM25 retrieval</p>
                  </div>
                )}
                {aiResult && (
                  <div className="space-y-4">
                    {/* Summary */}
                    <div className="bg-[#2d2d2d] rounded-md p-3 text-xs text-white/70 leading-relaxed">
                      {aiResult.summary}
                    </div>

                    {/* Race Conditions */}
                    {aiResult.raceConditions.length > 0 && (
                      <div>
                        <div className="font-caption text-[10px] text-white/30 mb-2">RACE CONDITIONS</div>
                        {aiResult.raceConditions.map(rc => (
                          <div key={rc.id} className="bg-semantic-error/10 border border-semantic-error/30 rounded-md p-3 mb-2">
                            <div className="flex items-center gap-1.5 mb-1">
                              <AlertTriangle size={12} className="text-semantic-error" />
                              <span className="text-xs font-semibold text-semantic-error uppercase">{rc.severity}</span>
                              <span className="text-xs text-white/40">Line {rc.line}–{rc.endLine}</span>
                            </div>
                            <div className="text-xs text-white/40 mb-1">Pattern: {rc.pattern}</div>
                            <p className="text-xs text-white/70">{rc.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Suggestions */}
                    {aiResult.suggestions.length > 0 && (
                      <div>
                        <div className="font-caption text-[10px] text-white/30 mb-2">SUGGESTIONS</div>
                        {aiResult.suggestions.map(s => (
                          <div key={s.id} className="bg-semantic-success/10 border border-semantic-success/30 rounded-md p-3 mb-3">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Lightbulb size={12} className="text-semantic-success" />
                              <span className="text-xs font-semibold text-white/80">{s.title}</span>
                            </div>
                            <p className="text-xs text-white/60 mb-2">{s.description}</p>
                            <div className="relative">
                              <pre className="bg-[#1e1e1e] rounded p-2 text-[11px] text-[#d4d4d4] font-mono overflow-x-auto">
                                {s.code}
                              </pre>
                              <button
                                onClick={() => handleCopy(s.code)}
                                className="absolute top-2 right-2 text-white/30 hover:text-white/70"
                              >
                                <Copy size={11} />
                              </button>
                            </div>
                            <div className="flex items-center gap-3 mt-2 text-xs text-white/30">
                              <span>Complexity: {s.complexity}</span>
                              <span>Speedup: {s.speedup}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
