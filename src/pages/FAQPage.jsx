import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { PageWrapper, AnimatedSection, AnimatedGroup, AnimatedItem } from '../components/ui/AnimatedSection'
import { fadeInDown, fadeInUp, fadeInLeft } from '../lib/animations'

const faqData = {
  'Getting Started': [
    { q: 'What is ThreadLearn?', a: 'ThreadLearn is an interactive learning platform focused on concurrent programming. We teach threads, async patterns, race conditions, and deadlocks through browser-based IDE exercises with AI-powered feedback.' },
    { q: 'Do I need to install anything?', a: 'No. Everything runs in your browser — code editor, runtime, and AI analysis. Just create an account and start coding.' },
    { q: 'What programming languages are supported?', a: 'Currently JavaScript (Node.js) is the primary language. Python and Go support are on the roadmap for Q3 2026.' },
    { q: 'Is ThreadLearn suitable for beginners?', a: 'Yes! We have beginner-friendly courses that start with basic async/await before moving into advanced concurrency patterns. You just need basic programming knowledge.' },
    { q: 'How long does it take to complete a course?', a: 'Beginner courses take 4–6 hours. Intermediate courses 6–10 hours. Advanced courses 10–15 hours. You can pause and resume any time.' },
  ],
  'Courses & Learning': [
    { q: 'How are courses structured?', a: 'Each course has video lessons, interactive code exercises in the browser IDE, quizzes, and a final assessment. Completing all earns a verifiable certificate.' },
    { q: 'Can I skip lessons I already know?', a: 'Yes. You can jump to any lesson in a course you\'ve enrolled in. The progress tracker marks what you\'ve completed.' },
    { q: 'Are courses self-paced?', a: 'Completely self-paced. No deadlines, no cohorts. Learn on your schedule.' },
    { q: 'What is the AI analysis feature?', a: 'Submit code to our AI analyzer and it will detect race conditions, TOCTOU patterns, and deadlock risks within seconds, with line-level explanations and fix suggestions.' },
    { q: 'How does the in-browser IDE work?', a: 'We use Monaco Editor (the same editor as VS Code) running in your browser. Code is executed in a sandboxed Node.js environment. No data is sent to external servers.' },
  ],
  'Pricing & Subscription': [
    { q: 'Is there a free plan?', a: 'Yes. The Free plan gives you access to 3 introductory courses, 10 AI analyses per day, and community features.' },
    { q: 'What does Premium include?', a: 'Premium ($12/month) unlocks all courses, 30 AI analyses per day, certificates, offline reading, and priority support.' },
    { q: 'Is there a student discount?', a: 'FPT University students get 50% off Premium with a valid university email. Contact us with your .fpt.edu.vn address to claim.' },
    { q: 'Can I cancel my subscription?', a: 'Yes, anytime from Settings → Subscription. You keep Premium access until the end of the billing period.' },
    { q: 'What payment methods are accepted?', a: 'Credit/debit cards (Visa, Mastercard), PayPal, and bank transfer (Vietnam domestic banks).' },
  ],
  'Certificates': [
    { q: 'How do I earn a certificate?', a: 'Complete all lessons in a course and pass the final quiz with 70% or higher. Certificates are issued automatically and added to your profile.' },
    { q: 'Are certificates verifiable?', a: 'Yes. Each certificate has a unique URL that anyone can verify. We also plan to add LinkedIn integration in Q2 2026.' },
    { q: 'Do certificates expire?', a: 'No. Certificates are permanent and tied to your account forever.' },
    { q: 'Is a certificate available on the Free plan?', a: 'Certificates require a Premium subscription to unlock and issue.' },
  ],
  'Technical': [
    { q: 'What browsers are supported?', a: 'Chrome 90+, Firefox 88+, Edge 90+, Safari 14+. The IDE requires a modern browser. Mobile is supported for reading lessons but not the IDE.' },
    { q: 'My code isn\'t running — what do I do?', a: 'Try refreshing the IDE, clearing browser cache, or disabling browser extensions. If the issue persists, contact support with your browser version and error message.' },
    { q: 'Is my code stored?', a: 'Code submitted via the IDE is temporarily stored for analysis and can be saved manually. We don\'t share or train on your code without consent.' },
    { q: 'Is there a dark mode?', a: 'The IDE uses a dark theme by default. Full dark mode for the platform UI is on our Q3 2026 roadmap.' },
  ],
}

const categories = Object.keys(faqData)

// Accordion item with AnimatePresence height animation
function FAQAccordionItem({ item, index, openIndex, onToggle }) {
  const isOpen = openIndex === index
  return (
    <AnimatedItem variants={fadeInUp}>
      <div className="border border-hairline rounded-lg overflow-hidden">
        <motion.button
          className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-surface-soft transition-colors"
          onClick={() => onToggle(isOpen ? null : index)}
          whileTap={{ scale: 0.995 }}
        >
          <span className="font-medium text-sm">{item.q}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 text-ink/40"
          >
            <ChevronDown size={16} />
          </motion.span>
        </motion.button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-5 pb-4 text-sm text-ink/60 leading-relaxed border-t border-hairline pt-3">
                {item.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedItem>
  )
}

// Search result accordion item (separate index namespace)
function SearchAccordionItem({ item, index, openIndex, onToggle }) {
  const isOpen = openIndex === index
  return (
    <div className="border border-hairline rounded-lg overflow-hidden">
      <motion.button
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-surface-soft transition-colors"
        onClick={() => onToggle(isOpen ? null : index)}
        whileTap={{ scale: 0.995 }}
      >
        <div>
          <Badge variant="default" className="mb-1">{item.category}</Badge>
          <div className="font-medium text-sm">{item.q}</div>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-ink/40"
        >
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-4 text-sm text-ink/60 leading-relaxed border-t border-hairline pt-3">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Getting Started')
  const [openIndex, setOpenIndex] = useState(null)

  const allItems = Object.entries(faqData).flatMap(([cat, items]) => items.map(item => ({ ...item, category: cat })))

  const searchResults = search.trim()
    ? allItems.filter(item =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
      )
    : null

  return (
    <PageWrapper>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-block-navy text-white py-16 px-6">
          <AnimatedSection variants={fadeInDown}>
            <div className="max-w-content mx-auto text-center">
              <h1 className="text-headline font-bold mb-3">Frequently Asked Questions</h1>
              <p className="text-body-sm text-white/60 mb-8">Everything you need to know about ThreadLearn.</p>
              <div className="relative max-w-md mx-auto">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setOpenIndex(null) }}
                  className="w-full pl-10 pr-4 py-3 rounded-pill bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>
          </AnimatedSection>
        </section>

        <div className="max-w-content mx-auto px-6 py-12">
          {searchResults ? (
            <div>
              <div className="font-caption text-xs text-ink/40 mb-4">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{search}"</div>
              {searchResults.length === 0 ? (
                <div className="text-center py-16 text-ink/40">
                  <div className="text-4xl mb-3">🤔</div>
                  <div className="font-medium mb-1">No results found</div>
                  <p className="text-sm">Try different keywords or <Link to="/contact" className="underline">contact us</Link>.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((item, i) => (
                    <SearchAccordionItem
                      key={i}
                      item={item}
                      index={i}
                      openIndex={openIndex}
                      onToggle={setOpenIndex}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
              {/* Category nav */}
              <AnimatedGroup stagger={0.07} className="space-y-1 lg:sticky lg:top-6 lg:self-start">
                {categories.map(cat => (
                  <AnimatedItem key={cat} variants={fadeInLeft}>
                    <motion.button
                      onClick={() => { setActiveCategory(cat); setOpenIndex(null) }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeCategory === cat ? 'bg-black text-white font-medium' : 'text-ink/60 hover:bg-surface-soft'}`}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {cat}
                      <span className="ml-2 text-xs opacity-50">{faqData[cat].length}</span>
                    </motion.button>
                  </AnimatedItem>
                ))}
              </AnimatedGroup>

              {/* FAQ items */}
              <div>
                <AnimatedSection variants={fadeInDown} delay={0.05}>
                  <h2 className="font-bold text-lg mb-5">{activeCategory}</h2>
                </AnimatedSection>
                <AnimatedGroup stagger={0.07} className="space-y-2">
                  {faqData[activeCategory].map((item, i) => (
                    <FAQAccordionItem
                      key={`${activeCategory}-${i}`}
                      item={item}
                      index={i}
                      openIndex={openIndex}
                      onToggle={setOpenIndex}
                    />
                  ))}
                </AnimatedGroup>
              </div>
            </div>
          )}

          {/* Contact CTA */}
          <AnimatedSection variants={fadeInUp} delay={0.1} className="mt-16">
            <div className="bg-surface-soft rounded-xl p-8 text-center">
              <MessageSquare size={28} className="mx-auto mb-3 text-ink/40" />
              <h3 className="font-bold mb-2">Still have questions?</h3>
              <p className="text-sm text-ink/60 mb-4">Can't find the answer you're looking for? Our team is happy to help.</p>
              <Link to="/contact"><Button>Contact support</Button></Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageWrapper>
  )
}
