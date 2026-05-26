import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Share2, Bookmark, ThumbsUp, ArrowRight } from 'lucide-react'
import { mockPosts } from './BlogPage'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useState } from 'react'

const postContent = {
  'what-is-a-race-condition': `
## What is a Race Condition?

A race condition occurs when two or more threads access shared data **at the same time**, and the final result depends on the order of execution. Since thread scheduling is non-deterministic, the bug may appear intermittently — only on certain hardware, under load, or seemingly at random.

\`\`\`javascript
let counter = 0

// Thread A
function increment() {
  const temp = counter  // reads 0
  counter = temp + 1    // writes 1
}

// Thread B (runs concurrently)
function increment() {
  const temp = counter  // reads 0 (before A writes!)
  counter = temp + 1    // writes 1
}

// Expected: 2. Actual: 1
\`\`\`

## The TOCTOU Pattern

Time-Of-Check to Time-Of-Use (TOCTOU) is the most common race condition pattern. You check a condition, then act on it — but between the check and the action, another thread changes the state.

\`\`\`javascript
// TOCTOU example
if (account.balance >= amount) {
  // Another thread withdraws here!
  account.balance -= amount  // balance goes negative
}
\`\`\`

## How to Fix It

### Option 1: Atomics

\`\`\`javascript
const shared = new SharedArrayBuffer(4)
const counter = new Int32Array(shared)

// Atomic increment — thread-safe
Atomics.add(counter, 0, 1)
\`\`\`

### Option 2: Mutex / Lock

\`\`\`javascript
class Mutex {
  constructor() { this._lock = Promise.resolve() }

  lock() {
    let release
    const p = new Promise(r => release = r)
    const prev = this._lock
    this._lock = prev.then(() => p)
    return prev.then(() => release)
  }
}

const mutex = new Mutex()
const release = await mutex.lock()
try {
  counter++  // safe
} finally {
  release()
}
\`\`\`

## Summary

- Race conditions happen when shared state is modified concurrently without synchronization
- TOCTOU is the most common pattern — check then act
- Atomics are the fastest fix for simple counters
- Mutex/locks work for more complex critical sections

ThreadLearn's AI analyzer automatically detects both patterns in your submitted code.
  `,
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const post = mockPosts.find(p => p.slug === slug) || mockPosts[0]
  const related = mockPosts.filter(p => p.slug !== post.slug && p.tag === post.tag).slice(0, 2)
  const content = postContent[post.slug] || postContent['what-is-a-race-condition']
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likes, setLikes] = useState(47)

  const handleLike = () => {
    setLiked(l => !l)
    setLikes(n => liked ? n - 1 : n + 1)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-content mx-auto px-6 py-10">
        {/* Back */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-ink mb-8 transition-colors">
          <ArrowLeft size={15} /> Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Article */}
          <article>
            {/* Meta */}
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={post.tagVariant}>{post.tag}</Badge>
              <span className="font-caption text-xs text-ink/40 flex items-center gap-1"><Clock size={11} />{post.readTime} read</span>
            </div>

            <h1 className="text-headline font-bold mb-4 leading-tight">{post.title}</h1>
            <p className="text-body-sm text-ink/60 mb-6">{post.excerpt}</p>

            {/* Author */}
            <div className="flex items-center gap-3 py-4 border-y border-hairline mb-8">
              <div className={`w-10 h-10 rounded-full ${post.authorColor} flex items-center justify-center font-bold text-sm`}>
                {post.authorAvatar}
              </div>
              <div>
                <div className="font-medium text-sm">{post.author}</div>
                <div className="font-caption text-xs text-ink/40">Published {post.date}</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs border transition-colors ${liked ? 'bg-black text-white border-black' : 'border-hairline hover:border-black/30'}`}
                >
                  <ThumbsUp size={12} /> {likes}
                </button>
                <button
                  onClick={() => setBookmarked(b => !b)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${bookmarked ? 'bg-black text-white border-black' : 'border-hairline hover:border-black/30'}`}
                >
                  <Bookmark size={13} />
                </button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center border border-hairline hover:border-black/30 transition-colors">
                  <Share2 size={13} />
                </button>
              </div>
            </div>

            {/* Cover */}
            <div className={`${post.cover} rounded-xl h-56 mb-8`} />

            {/* Content renderer */}
            <div className="prose prose-sm max-w-none">
              {content.trim().split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-8 mb-3">{line.slice(3)}</h2>
                if (line.startsWith('### ')) return <h3 key={i} className="font-bold mt-5 mb-2">{line.slice(4)}</h3>
                if (line.startsWith('```')) return null
                if (line.startsWith('- ')) return <li key={i} className="text-sm text-ink/70 ml-4 list-disc">{line.slice(2)}</li>
                if (line.trim() === '') return <div key={i} className="h-3" />
                if (line.includes('`')) {
                  const parts = line.split('`')
                  return (
                    <p key={i} className="text-sm text-ink/70 leading-relaxed mb-2">
                      {parts.map((p, j) => j % 2 === 1 ? <code key={j} className="font-mono text-xs bg-surface-soft px-1.5 py-0.5 rounded">{p}</code> : p)}
                    </p>
                  )
                }
                return <p key={i} className="text-sm text-ink/70 leading-relaxed mb-2">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
              })}
            </div>

            {/* Code blocks rendered separately */}
            <div className="space-y-4 mt-4">
              {[
                { title: 'Race condition example', code: `let counter = 0\n\n// Thread A reads 0, Thread B reads 0\n// Both write 1 → result is 1, not 2\nfunction increment() {\n  const temp = counter\n  counter = temp + 1\n}` },
                { title: 'Fix with Atomics', code: `const shared = new SharedArrayBuffer(4)\nconst counter = new Int32Array(shared)\n\n// Atomic add — always thread-safe\nAtomics.add(counter, 0, 1)\nconsole.log(Atomics.load(counter, 0)) // guaranteed correct` },
              ].map(block => (
                <div key={block.title}>
                  <div className="text-xs font-medium text-ink/40 mb-2">{block.title}</div>
                  <pre className="bg-block-navy text-white text-xs font-mono p-4 rounded-lg overflow-x-auto leading-relaxed">{block.code}</pre>
                </div>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-block-lime rounded-xl p-5">
              <div className="font-bold mb-2 text-sm">Try it in ThreadLearn IDE</div>
              <p className="text-xs text-ink/60 mb-4 leading-relaxed">Run the race condition examples from this article in our browser-based IDE with AI analysis.</p>
              <Link to="/courses/intro-concurrent-programming">
                <Button size="sm" className="w-full">Open IDE <ArrowRight size={13} className="inline ml-1" /></Button>
              </Link>
            </div>

            {related.length > 0 && (
              <div>
                <div className="font-caption text-xs text-ink/40 mb-3">RELATED ARTICLES</div>
                <div className="space-y-3">
                  {related.map(p => (
                    <Link key={p.slug} to={`/blog/${p.slug}`} className="block border border-hairline rounded-lg p-4 hover:shadow-elevation-1 transition-shadow">
                      <Badge variant={p.tagVariant} className="mb-2">{p.tag}</Badge>
                      <div className="text-sm font-medium leading-snug hover:underline">{p.title}</div>
                      <div className="font-caption text-xs text-ink/40 mt-1 flex items-center gap-1"><Clock size={10} />{p.readTime}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="border border-hairline rounded-xl p-5">
              <div className="font-bold mb-1 text-sm">Newsletter</div>
              <p className="text-xs text-ink/60 mb-3">Weekly articles on concurrency and async programming.</p>
              <input type="email" placeholder="you@email.com" className="w-full px-3 py-2 rounded-pill border border-hairline text-xs mb-2 focus:outline-none focus:ring-1 focus:ring-black/20" />
              <Button size="sm" className="w-full">Subscribe</Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
