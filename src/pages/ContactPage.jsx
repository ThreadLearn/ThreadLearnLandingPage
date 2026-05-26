import { useState } from 'react'
import { Mail, MessageSquare, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'

const faqs = [
  { q: 'How do I get started?', a: 'Create a free account, pick a course, and start coding in our browser IDE — no setup needed.' },
  { q: 'Is there a student discount?', a: 'Yes! FPT University students get 50% off Premium with a valid .fpt.edu.vn email.' },
  { q: 'Can I access courses offline?', a: 'Lesson content can be downloaded for offline reading on Premium plans. The IDE requires internet.' },
  { q: 'How does the AI analysis work?', a: 'Submit code via the IDE or AI page. Our static analyzer detects race conditions, TOCTOU patterns, and deadlock risks, then suggests fixes.' },
]

const channels = [
  { icon: <Mail size={20} />, color: 'bg-block-lime', label: 'Email us', value: 'threadlearn@fpt.edu.vn', sub: 'Response within 24h' },
  { icon: <MessageSquare size={20} />, color: 'bg-block-lilac', label: 'Discord community', value: 'discord.gg/threadlearn', sub: '500+ members' },
  { icon: <MapPin size={20} />, color: 'bg-block-coral', label: 'Campus office', value: 'FPT University, HCM', sub: 'Building A, Room 204' },
  { icon: <Clock size={20} />, color: 'bg-block-mint', label: 'Office hours', value: 'Mon–Fri, 8am–5pm', sub: 'GMT+7 (Vietnam)' },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-hairline py-16 px-6">
        <div className="max-w-content mx-auto">
          <Badge variant="lime" className="mb-4">Contact</Badge>
          <h1 className="text-headline font-bold mb-3">Get in touch</h1>
          <p className="text-body-sm text-ink/60 max-w-lg">Have a question about courses, billing, or want to collaborate? We'd love to hear from you.</p>
        </div>
      </section>

      <div className="max-w-content mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-bold text-lg mb-6">Send a message</h2>

            {sent ? (
              <div className="bg-block-lime rounded-xl p-8 text-center">
                <CheckCircle size={40} className="mx-auto mb-3" />
                <div className="font-bold text-lg mb-1">Message sent!</div>
                <p className="text-sm text-ink/60">We'll get back to you within 24 hours at {form.email}.</p>
                <button onClick={() => setSent(false)} className="mt-4 text-sm underline text-ink/50 hover:text-ink">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Your name"
                    placeholder="Nguyen Van A"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1.5">Subject</label>
                  <select
                    className="w-full px-3 py-2.5 rounded-md border border-hairline text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    required
                  >
                    <option value="">Select a topic...</option>
                    <option>General question</option>
                    <option>Technical support</option>
                    <option>Billing & subscription</option>
                    <option>Course feedback</option>
                    <option>Partnership / collaboration</option>
                    <option>Bug report</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Describe your question or issue..."
                    className="w-full px-3.5 py-3 rounded-md border border-hairline text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20 resize-none"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" loading={loading} icon={<Send size={14} />} className="w-full">
                  Send message
                </Button>
              </form>
            )}
          </div>

          {/* Right side */}
          <div className="space-y-8">
            {/* Contact channels */}
            <div>
              <h2 className="font-bold text-lg mb-4">Other ways to reach us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {channels.map(c => (
                  <div key={c.label} className="border border-hairline rounded-xl p-4 flex gap-3">
                    <div className={`w-9 h-9 rounded-lg ${c.color} flex items-center justify-center flex-shrink-0`}>{c.icon}</div>
                    <div>
                      <div className="text-xs text-ink/40 mb-0.5">{c.label}</div>
                      <div className="text-sm font-medium">{c.value}</div>
                      <div className="text-xs text-ink/50">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick FAQs */}
            <div>
              <h2 className="font-bold text-lg mb-4">Quick answers</h2>
              <div className="space-y-3">
                {faqs.map(faq => (
                  <details key={faq.q} className="border border-hairline rounded-lg group">
                    <summary className="px-4 py-3 text-sm font-medium cursor-pointer list-none flex items-center justify-between hover:bg-surface-soft rounded-lg">
                      {faq.q}
                      <span className="text-ink/40 group-open:rotate-180 transition-transform">↓</span>
                    </summary>
                    <div className="px-4 pb-3 text-sm text-ink/60">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-surface-soft rounded-xl overflow-hidden h-36 flex items-center justify-center border border-hairline">
              <div className="text-center text-ink/40">
                <MapPin size={24} className="mx-auto mb-2" />
                <div className="text-xs">FPT University Ho Chi Minh City</div>
                <div className="text-xs">Lot E2a-7, D1 Street, Long Thanh My Ward</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
