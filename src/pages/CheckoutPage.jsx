import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Shield, CheckCircle, Lock } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ card: '', expiry: '', cvc: '', name: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSuccess(true)
    setTimeout(() => navigate('/dashboard'), 3000)
  }

  if (success) return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <CheckCircle size={64} className="text-semantic-success mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-ink/60 mb-6">Welcome to Premium. You now have 30 AI queries/day and access to all courses.</p>
        <div className="inline-flex items-center gap-2 bg-block-lilac rounded-pill px-4 py-2 text-sm font-medium">
          Redirecting to dashboard...
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Complete your order</h1>

        {/* Order Summary */}
        <div className="bg-surface-soft rounded-lg p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold">ThreadLearn Premium</span>
            <span className="font-bold">$12/month</span>
          </div>
          <div className="text-sm text-ink/60 space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>$12.00</span></div>
            <div className="flex justify-between"><span>Tax</span><span>$0.00</span></div>
            <div className="flex justify-between font-semibold text-ink pt-2 border-t border-hairline mt-2">
              <span>Total</span><span>$12.00</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={14} className="text-semantic-success" />
            <span className="text-xs text-ink/50">SSL secured payment via payment gateway</span>
          </div>

          <Input
            label="Cardholder name"
            placeholder="Le Tri Trung"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            required
          />
          <Input
            label="Card number"
            placeholder="4242 4242 4242 4242"
            value={form.card}
            onChange={e => setForm(p => ({ ...p, card: e.target.value }))}
            icon={<CreditCard size={16} />}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Expiry" placeholder="MM/YY" value={form.expiry} onChange={e => setForm(p => ({ ...p, expiry: e.target.value }))} required />
            <Input label="CVC" placeholder="123" value={form.cvc} onChange={e => setForm(p => ({ ...p, cvc: e.target.value }))} icon={<Lock size={14} />} required />
          </div>

          <Button type="submit" className="w-full" size="lg" loading={loading}>
            Pay $12.00
          </Button>
          <p className="text-xs text-center text-ink/40">
            By completing your purchase you agree to our Terms of Service. You can cancel anytime.
          </p>
        </form>
      </div>
    </div>
  )
}
