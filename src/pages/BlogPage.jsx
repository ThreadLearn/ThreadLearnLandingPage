import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Tag, Search } from 'lucide-react'
import { Badge } from '../components/ui/Badge'

export const mockPosts = [
  {
    slug: 'what-is-a-race-condition',
    title: 'What Is a Race Condition? A Visual Guide',
    excerpt: 'Race conditions are one of the sneakiest bugs in software. Two threads, one shared resource, and timing that changes every run. Here\'s how to spot them.',
    author: 'Le Tri Trung',
    authorAvatar: 'LT',
    authorColor: 'bg-block-lime',
    date: '2026-05-10',
    readTime: '6 min',
    tag: 'Concurrency',
    tagVariant: 'lime',
    cover: 'bg-block-navy',
    featured: true,
  },
  {
    slug: 'atomics-vs-mutex-js',
    title: 'Atomics vs Mutex in JavaScript: Which Should You Use?',
    excerpt: 'SharedArrayBuffer + Atomics landed in browsers years ago, but most JS devs never reach for them. We compare both patterns with runnable code examples.',
    author: 'Nguyen Minh Duc',
    authorAvatar: 'ND',
    authorColor: 'bg-block-lilac',
    date: '2026-05-03',
    readTime: '8 min',
    tag: 'JavaScript',
    tagVariant: 'lilac',
    cover: 'bg-block-lilac',
    featured: false,
  },
  {
    slug: 'async-await-misconceptions',
    title: '5 async/await Misconceptions That Slow You Down',
    excerpt: 'async/await looks synchronous but it isn\'t. Most developers misunderstand what "blocking" means in the event loop — and it costs them in production.',
    author: 'Tran Thi Lan',
    authorAvatar: 'TL',
    authorColor: 'bg-block-coral',
    date: '2026-04-28',
    readTime: '5 min',
    tag: 'Async',
    tagVariant: 'coral',
    cover: 'bg-block-coral',
    featured: false,
  },
  {
    slug: 'worker-threads-nodejs-guide',
    title: 'A Practical Guide to Worker Threads in Node.js',
    excerpt: 'Node.js is single-threaded — until it isn\'t. Worker Threads let you offload CPU-intensive work without blocking the event loop. Here\'s the complete guide.',
    author: 'Pham Van Khanh',
    authorAvatar: 'PK',
    authorColor: 'bg-block-mint',
    date: '2026-04-20',
    readTime: '10 min',
    tag: 'Node.js',
    tagVariant: 'mint',
    cover: 'bg-block-mint',
    featured: false,
  },
  {
    slug: 'deadlock-detection-techniques',
    title: 'Deadlock Detection: Techniques That Actually Work',
    excerpt: 'Deadlocks are silent killers. Your app freezes, logs stop, and you have no idea why. We cover four techniques to detect and prevent them in production systems.',
    author: 'Hoang Thi Thu',
    authorAvatar: 'HT',
    authorColor: 'bg-block-cream',
    date: '2026-04-12',
    readTime: '7 min',
    tag: 'Concurrency',
    tagVariant: 'lime',
    cover: 'bg-block-cream',
    featured: false,
  },
  {
    slug: 'threadlearn-ai-analysis-deep-dive',
    title: 'How ThreadLearn\'s AI Detects Race Conditions',
    excerpt: 'A deep dive into the TOCTOU pattern detector and static analysis pipeline behind ThreadLearn AI. How we went from \"possible bug\" to precise line-level suggestions.',
    author: 'Le Tri Trung',
    authorAvatar: 'LT',
    authorColor: 'bg-block-lime',
    date: '2026-04-05',
    readTime: '12 min',
    tag: 'AI',
    tagVariant: 'lilac',
    cover: 'bg-block-navy',
    featured: false,
  },
]

const tags = ['All', 'Concurrency', 'JavaScript', 'Async', 'Node.js', 'AI']

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const filtered = mockPosts.filter(p => {
    const matchTag = activeTag === 'All' || p.tag === activeTag
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  const featured = mockPosts.find(p => p.featured)
  const rest = filtered.filter(p => !p.featured || search || activeTag !== 'All')

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-hairline py-16 px-6">
        <div className="max-w-content mx-auto">
          <div className="font-caption text-xs text-ink/40 mb-3">BLOG</div>
          <h1 className="text-headline font-bold mb-4">Concurrency, explained.</h1>
          <p className="text-body-sm text-ink/60 max-w-xl mb-8">In-depth articles on concurrent programming, JavaScript internals, and AI-assisted debugging — written by the ThreadLearn team.</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-pill border border-hairline text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-pill text-xs font-medium transition-colors ${activeTag === tag ? 'bg-black text-white' : 'bg-surface-soft hover:bg-hairline text-ink/70'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-content mx-auto px-6 py-12">
        {/* Featured post */}
        {!search && activeTag === 'All' && featured && (
          <div className="mb-12">
            <div className="font-caption text-xs text-ink/40 mb-4">FEATURED</div>
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className={`${featured.cover} rounded-xl p-10 mb-6 h-48 flex items-end`}>
                <Badge variant="navy" className="text-white border-white/20">Featured</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={featured.tagVariant}>{featured.tag}</Badge>
                    <span className="font-caption text-xs text-ink/40 flex items-center gap-1"><Clock size={11} />{featured.readTime}</span>
                  </div>
                  <h2 className="text-card-title font-bold group-hover:underline mb-3">{featured.title}</h2>
                  <p className="text-sm text-ink/60 leading-relaxed">{featured.excerpt}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${featured.authorColor} flex items-center justify-center font-bold text-xs`}>{featured.authorAvatar}</div>
                  <div>
                    <div className="text-sm font-medium">{featured.author}</div>
                    <div className="font-caption text-xs text-ink/40">{featured.date}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-ink/40 text-sm">No articles found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(search || activeTag !== 'All' ? filtered : rest).map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group border border-hairline rounded-xl overflow-hidden hover:shadow-elevation-2 transition-shadow">
                <div className={`${post.cover} h-36`} />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={post.tagVariant}>{post.tag}</Badge>
                    <span className="font-caption text-xs text-ink/40 flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug mb-2 group-hover:underline">{post.title}</h3>
                  <p className="text-xs text-ink/60 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${post.authorColor} flex items-center justify-center font-bold text-[10px]`}>{post.authorAvatar}</div>
                    <span className="text-xs text-ink/50">{post.author} · {post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
