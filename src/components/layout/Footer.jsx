import { Link } from 'react-router-dom'
import { GitBranch, Globe, ExternalLink } from 'lucide-react'

const links = {
  Product: [
    { label: 'Courses', to: '/courses' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Leaderboard', to: '/leaderboard' },
    { label: 'AI Analysis', to: '/ai' },
  ],
  Learn: [
    { label: 'Concurrency Basics', to: '/courses/intro-concurrent-programming' },
    { label: 'Race Conditions', to: '/courses/race-conditions-deadlock' },
    { label: 'Async Patterns', to: '/courses/async-await-event-loop' },
    { label: 'Worker Threads', to: '/courses/worker-threads-nodejs' },
  ],
  Company: [
    { label: 'About', to: '#' },
    { label: 'Blog', to: '#' },
    { label: 'Careers', to: '#' },
    { label: 'Contact', to: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Cookie Policy', to: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-hairline mt-auto">
      <div className="max-w-content mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <span className="w-7 h-7 bg-black rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-mono">TL</span>
              </span>
              ThreadLearn
            </Link>
            <p className="text-sm text-ink/60 leading-relaxed mb-4">
              Master concurrent programming with AI-powered analysis and hands-on coding.
            </p>
            <div className="flex gap-2">
              {[
                { icon: <GitBranch size={16} />, href: '#' },
                { icon: <Globe size={16} />, href: '#' },
                { icon: <ExternalLink size={16} />, href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-8 h-8 rounded-full bg-surface-soft flex items-center justify-center hover:bg-hairline transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="font-caption text-xs text-ink/40 mb-3">{category}</div>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-ink/70 hover:text-ink transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-hairline-soft pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-caption text-xs text-ink/40">
            © 2026 ThreadLearn. Built with ❤️ at FPT University.
          </p>
          <p className="font-caption text-xs text-ink/40">
            WDP301 — Group ThreadLearn
          </p>
        </div>
      </div>
    </footer>
  )
}
