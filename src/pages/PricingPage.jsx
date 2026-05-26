import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, Zap, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { mockPlans } from '../data/mockPlans'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { useAuth } from '../hooks/useAuth'
import { PageWrapper, AnimatedSection, AnimatedGroup, AnimatedItem } from '../components/ui/AnimatedSection'
import { fadeInUp, scaleIn } from '../lib/animations'

const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel your premium subscription at any time. You keep premium access until the end of your billing period.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and local Vietnamese payment methods through our payment gateway.' },
  { q: 'Is there a student discount?', a: 'Yes! FPT University students get 30% off annual premium. Contact us with your student email to claim.' },
  { q: 'How does the free tier work?', a: 'Free accounts get access to all beginner courses, 20 IDE runs/day, and 10 AI queries/day. No time limit.' },
  { q: 'Can I share my account?', a: 'Accounts are for individual use only. We monitor for shared access and may terminate accounts that violate this.' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <PageWrapper>
    <div className="bg-white">
      {/* Hero */}
      <section className="max-w-content mx-auto px-6 py-16 text-center">
        <AnimatedSection variants={fadeInUp} className="mb-0">
          <span className="font-eyebrow text-xs text-ink/40 block mb-4">Pricing</span>
          <h1 className="text-5xl font-light mb-4" style={{ fontWeight: 340 }}>Simple, transparent pricing</h1>
          <p className="text-body-lg text-ink/60 mb-8">Start free. Upgrade when you're ready.</p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-surface-soft rounded-pill p-1 mb-12">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors ${!annual ? 'bg-black text-white' : 'text-ink/60'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors flex items-center gap-1.5 ${annual ? 'bg-black text-white' : 'text-ink/60'}`}
            >
              Annual
              <span className="text-xs bg-semantic-success text-white px-1.5 py-0.5 rounded-pill">Save 30%</span>
            </button>
          </div>
        </AnimatedSection>

        {/* Plans */}
        <AnimatedGroup stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {mockPlans.map(plan => (
            <AnimatedItem key={plan.id} variants={scaleIn}>
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`bg-white rounded-lg border text-left p-7 relative ${plan.isPopular ? 'border-black shadow-elevation-2' : 'border-hairline'}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="black"><Zap size={10} className="inline" /> Most popular</Badge>
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-card-title font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-ink/60">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.price === 0 ? (
                    <div>
                      <span className="text-4xl font-bold">Free</span>
                      <span className="text-ink/40 ml-2">forever</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold">
                        ${annual ? Math.round(plan.annualPrice / 12) : plan.price}
                      </span>
                      <span className="text-ink/40 ml-2">/ month</span>
                      {annual && (
                        <div className="text-sm text-semantic-success mt-1">
                          Billed ${plan.annualPrice}/year (save ${plan.price * 12 - plan.annualPrice})
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  variant={plan.isPopular ? 'primary' : 'secondary'}
                  className="w-full mb-6"
                  onClick={() => user ? (plan.isPremium ? navigate('/checkout') : null) : navigate('/register')}
                >
                  {user?.isPremium && plan.id === 'premium' ? 'Current plan' : plan.ctaLabel}
                  {plan.id !== 'free' && <ArrowRight size={14} />}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map(f => (
                    <li key={f.text} className="flex items-start gap-2.5 text-sm">
                      {f.included
                        ? <Check size={16} className="text-semantic-success flex-shrink-0 mt-0.5" />
                        : <X size={16} className="text-ink/20 flex-shrink-0 mt-0.5" />
                      }
                      <span className={f.included ? '' : 'text-ink/40 line-through'}>{f.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedGroup>
      </section>

      {/* FAQ — Lime Block */}
      <section className="max-w-content mx-auto px-6 pb-16">
        <div className="bg-block-lime rounded-lg p-12">
          <span className="font-eyebrow text-xs text-ink/40 block mb-4">FAQ</span>
          <h2 className="text-4xl font-light mb-8" style={{ fontWeight: 340 }}>Common questions</h2>
          <AnimatedGroup stagger={0.08} className="space-y-2 max-w-2xl">
            {faqs.map((faq, i) => (
              <AnimatedItem key={i} variants={fadeInUp}>
                <div className="bg-white rounded-md overflow-hidden">
                  <button
                    className="w-full text-left flex justify-between items-center px-5 py-4 font-medium text-sm"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <span className="text-ink/40 ml-2">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-ink/70 border-t border-hairline-soft pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              </AnimatedItem>
            ))}
          </AnimatedGroup>
        </div>
      </section>
    </div>
    </PageWrapper>
  )
}
