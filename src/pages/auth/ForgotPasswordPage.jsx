import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <span className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-mono">TL</span>
            </span>
            ThreadLearn
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-hairline shadow-elevation-2 p-8">
          {sent ? (
            <div className="text-center">
              <CheckCircle size={48} className="text-semantic-success mx-auto mb-4" />
              <h1 className="text-2xl font-semibold mb-2">Email sent!</h1>
              <p className="text-sm text-ink/60 mb-6">
                We sent a password reset link to <strong>{email}</strong>. Check your inbox.
              </p>
              <Link to="/login">
                <Button variant="secondary" className="w-full">Back to login</Button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-1 text-sm text-ink/50 hover:text-ink mb-6">
                <ArrowLeft size={14} /> Back to login
              </Link>
              <h1 className="text-2xl font-semibold mb-2">Forgot password?</h1>
              <p className="text-sm text-ink/60 mb-7">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Email" type="email" placeholder="you@example.com" value={email}
                  onChange={e => setEmail(e.target.value)} icon={<Mail size={16} />} required />
                <Button type="submit" className="w-full" loading={loading}>Send reset link</Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
