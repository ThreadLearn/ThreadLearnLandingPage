import { useState } from 'react'
import { Award, Download, Share2, ExternalLink, Lock, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { mockCourses } from '../../data/mockCourses'

const earnedCertIds = ['c1', 'c2']

const mockCerts = mockCourses.filter(c => earnedCertIds.includes(c.id)).map((c, i) => ({
  id: `cert-${c.id}`,
  courseId: c.id,
  courseTitle: c.title,
  issuedDate: i === 0 ? '2026-03-15' : '2026-04-22',
  score: i === 0 ? 94 : 82,
  verifyUrl: `https://threadlearn.io/verify/cert-${c.id}-abc123`,
  color: i === 0 ? 'bg-block-lime' : 'bg-block-lilac',
}))

const inProgressCourses = mockCourses.filter(c => !earnedCertIds.includes(c.id) && ['c4', 'c7'].includes(c.id)).map(c => ({
  ...c,
  progress: c.id === 'c4' ? 65 : 30,
}))

export default function CertificatesPage() {
  const [copied, setCopied] = useState(null)

  const handleCopyLink = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">My Certificates</h1>
        <p className="text-sm text-ink/50">Verifiable proof of your concurrency skills</p>
      </div>

      {/* Earned */}
      <section className="mb-10">
        <div className="font-caption text-xs text-ink/40 mb-4">EARNED ({mockCerts.length})</div>
        <div className="space-y-4">
          {mockCerts.map(cert => (
            <div key={cert.id} className="border border-hairline rounded-xl overflow-hidden">
              {/* Certificate visual */}
              <div className={`${cert.color} px-8 py-6 flex items-center justify-between`}>
                <div>
                  <div className="font-caption text-xs text-ink/50 mb-1">CERTIFICATE OF COMPLETION</div>
                  <div className="font-bold text-lg">{cert.courseTitle}</div>
                  <div className="text-sm text-ink/60 mt-1">Issued {cert.issuedDate} · Score: {cert.score}%</div>
                </div>
                <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center">
                  <Award size={28} />
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-white flex items-center gap-2 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-ink/40 mb-0.5">Verify URL</div>
                  <div className="font-mono text-xs text-ink/60 truncate">{cert.verifyUrl}</div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={copied === cert.id ? <CheckCircle size={13} /> : <Share2 size={13} />}
                    onClick={() => handleCopyLink(cert.verifyUrl, cert.id)}
                  >
                    {copied === cert.id ? 'Copied!' : 'Copy link'}
                  </Button>
                  <Button variant="secondary" size="sm" icon={<Download size={13} />}>
                    Download PDF
                  </Button>
                  <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" icon={<ExternalLink size={13} />}>
                      View
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* In progress */}
      <section className="mb-10">
        <div className="font-caption text-xs text-ink/40 mb-4">IN PROGRESS</div>
        <div className="space-y-3">
          {inProgressCourses.map(course => (
            <div key={course.id} className="border border-hairline rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-soft flex items-center justify-center flex-shrink-0">
                <Lock size={16} className="text-ink/30" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm mb-1">{course.title}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-hairline rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                  </div>
                  <span className="text-xs text-ink/40 flex-shrink-0">{course.progress}%</span>
                </div>
              </div>
              <Link to={`/courses/${course.slug}`}>
                <Button variant="secondary" size="sm">Continue</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Locked */}
      <section>
        <div className="font-caption text-xs text-ink/40 mb-4">MORE CERTIFICATES TO EARN</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mockCourses.filter(c => !earnedCertIds.includes(c.id) && !['c4', 'c7'].includes(c.id)).slice(0, 4).map(course => (
            <div key={course.id} className="border border-hairline rounded-xl p-4 flex items-center gap-3 opacity-60">
              <div className="w-9 h-9 rounded-lg bg-surface-soft flex items-center justify-center flex-shrink-0">
                <Award size={16} className="text-ink/30" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{course.title}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Badge variant={course.isPremium ? 'navy' : 'default'}>{course.isPremium ? 'Premium' : 'Free'}</Badge>
                  <Badge variant="default">{course.level}</Badge>
                </div>
              </div>
              <Link to={`/courses/${course.slug}`}>
                <Button variant="ghost" size="sm">Enroll</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
