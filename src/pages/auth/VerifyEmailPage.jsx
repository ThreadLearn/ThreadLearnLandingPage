import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function VerifyEmailPage() {
  const navigate = useNavigate()
  const [resent, setResent] = useState(false)

  const handleResend = () => { setResent(true); setTimeout(() => setResent(false), 3000) }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 bg-block-lime rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail size={36} />
        </div>
        <h1 className="text-2xl font-semibold mb-3">Check your email</h1>
        <p className="text-ink/60 mb-6">
          We sent a verification link to your email address. Click the link to activate your account.
        </p>
        <div className="bg-surface-soft rounded-lg p-6 mb-6 text-left space-y-2 text-sm text-ink/70">
          <div>1. Open your email inbox</div>
          <div>2. Find email from <strong>ThreadLearn</strong></div>
          <div>3. Click the verification link</div>
          <div>4. Start learning!</div>
        </div>

        {/* Mock: simulate clicking link */}
        <Button className="w-full mb-4" onClick={() => navigate('/dashboard')}>
          I've verified my email
          <ArrowRight size={16} />
        </Button>

        <button
          onClick={handleResend}
          className="text-sm text-ink/60 hover:text-ink underline underline-offset-2"
        >
          {resent ? '✓ Email resent!' : 'Resend verification email'}
        </button>

        <div className="mt-6">
          <Link to="/login" className="text-sm text-ink/40 hover:text-ink">Back to login</Link>
        </div>
      </div>
    </div>
  )
}
