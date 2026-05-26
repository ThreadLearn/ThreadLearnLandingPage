import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    const res = login(form.email, form.password)
    setLoading(false)
    if (res.success) navigate('/dashboard')
    else setError(res.error)
  }

  const handleGoogle = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    loginWithGoogle()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-xl">
            <span className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-mono">TL</span>
            </span>
            ThreadLearn
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-hairline shadow-elevation-2 p-8">
          <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
          <p className="text-sm text-ink/60 mb-7">Log in to continue learning</p>

          {/* Demo hint */}
          <div className="bg-block-lime rounded-md px-4 py-3 mb-6 text-sm">
            <span className="font-medium">Demo: </span>
            Use any email from the mock data (e.g. <code className="bg-white/60 px-1 rounded text-xs">letritrung2605@gmail.com</code>)
          </div>

          {/* Google */}
          <Button
            variant="secondary"
            className="w-full mb-4"
            onClick={handleGoogle}
            loading={loading}
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
              </svg>
            }
          >
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-hairline" />
            <span className="text-xs text-ink/40">or</span>
            <div className="flex-1 h-px bg-hairline" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              icon={<Mail size={16} />}
              required
            />
            <div>
              <Input
                label="Password"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                icon={<Lock size={16} />}
                error={error}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-9 text-ink/40 hover:text-ink"
                style={{ position: 'relative', float: 'right', marginTop: '-36px', marginRight: '12px' }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-ink/60 hover:text-ink underline underline-offset-2">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              Log in
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-ink/60 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-ink underline underline-offset-2">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  )
}
