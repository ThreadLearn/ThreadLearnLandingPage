import { useState } from 'react'
import { TrendingUp, TrendingDown, Users, DollarSign, Zap, BookOpen, Clock, Target } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, FunnelChart, Funnel, LabelList
} from 'recharts'
import { mockAdminStats } from '../../data/mockPlans'
import { Badge } from '../../components/ui/Badge'

const COLORS = ['#000000', '#c5b0f4', '#dceeb1', '#f3c9b6', '#c8e6cd', '#f4ecd6']

const retentionData = [
  { week: 'W1', retained: 100 },
  { week: 'W2', retained: 78 },
  { week: 'W3', retained: 64 },
  { week: 'W4', retained: 55 },
  { week: 'W5', retained: 49 },
  { week: 'W6', retained: 45 },
  { week: 'W7', retained: 43 },
  { week: 'W8', retained: 41 },
]

const funnelData = [
  { name: 'Visited site', value: 8420, fill: '#dceeb1' },
  { name: 'Registered', value: 3210, fill: '#c5b0f4' },
  { name: 'Started course', value: 1840, fill: '#f3c9b6' },
  { name: 'Completed lesson', value: 1240, fill: '#c8e6cd' },
  { name: 'Upgraded to Premium', value: 318, fill: '#1f1d3d' },
]

const aiUsageData = [
  { date: 'May 19', queries: 142 },
  { date: 'May 20', queries: 189 },
  { date: 'May 21', queries: 167 },
  { date: 'May 22', queries: 94 },
  { date: 'May 23', queries: 88 },
  { date: 'May 24', queries: 210 },
  { date: 'May 25', queries: 234 },
]

const courseCompletionData = [
  { name: 'Intro Concurrent', rate: 87 },
  { name: 'Race Conditions', rate: 74 },
  { name: 'Async/Await', rate: 69 },
  { name: 'Worker Threads', rate: 61 },
  { name: 'Mutex Patterns', rate: 52 },
]

const geoData = [
  { country: 'Vietnam', users: 842, pct: 68 },
  { country: 'United States', users: 186, pct: 15 },
  { country: 'Japan', users: 74, pct: 6 },
  { country: 'Singapore', users: 62, pct: 5 },
  { country: 'Others', users: 76, pct: 6 },
]

const kpis = [
  { label: 'Monthly Active Users', value: '1,240', change: '+12%', up: true, icon: <Users size={18} />, color: 'bg-block-lime' },
  { label: 'Monthly Revenue', value: '$3,816', change: '+8%', up: true, icon: <DollarSign size={18} />, color: 'bg-block-lilac' },
  { label: 'AI Queries / Day', value: '178', change: '+23%', up: true, icon: <Zap size={18} />, color: 'bg-block-coral' },
  { label: 'Avg Session Duration', value: '24m', change: '-3m', up: false, icon: <Clock size={18} />, color: 'bg-block-mint' },
  { label: 'Course Completions', value: '312', change: '+18%', up: true, icon: <BookOpen size={18} />, color: 'bg-block-cream' },
  { label: 'Premium Conversion', value: '9.9%', change: '+1.2pp', up: true, icon: <Target size={18} />, color: 'bg-surface-soft' },
]

const ranges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year']

export default function AdminAnalytics() {
  const [range, setRange] = useState('Last 30 days')

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-ink/50">Platform performance and user insights</p>
        </div>
        <div className="flex gap-1">
          {ranges.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-pill text-xs font-medium transition-colors ${range === r ? 'bg-black text-white' : 'bg-surface-soft hover:bg-hairline text-ink/70'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className={`${kpi.color} rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-white/50 rounded-lg flex items-center justify-center">{kpi.icon}</div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${kpi.up ? 'text-semantic-success' : 'text-semantic-error'}`}>
                {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {kpi.change}
              </span>
            </div>
            <div className="font-bold text-2xl">{kpi.value}</div>
            <div className="text-xs text-ink/50 mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-hairline rounded-xl p-5">
          <div className="font-bold mb-1 text-sm">Enrollment trend</div>
          <div className="text-xs text-ink/40 mb-4">New enrollments per month</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockAdminStats.enrollmentTrend}>
              <defs>
                <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#000000" fill="url(#enrollGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-hairline rounded-xl p-5">
          <div className="font-bold mb-1 text-sm">Revenue</div>
          <div className="text-xs text-ink/40 mb-4">Monthly revenue in USD</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockAdminStats.revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`$${v}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#c5b0f4" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Retention */}
      <div className="bg-white border border-hairline rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-bold text-sm">User Retention</div>
            <div className="text-xs text-ink/40">% of users still active after N weeks</div>
          </div>
          <Badge variant="lime">Cohort: May 2026</Badge>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={retentionData}>
            <defs>
              <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dceeb1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#dceeb1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} domain={[0, 100]} />
            <Tooltip formatter={v => [`${v}%`, 'Retained']} />
            <Area type="monotone" dataKey="retained" stroke="#86a830" fill="url(#retGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Funnel */}
        <div className="bg-white border border-hairline rounded-xl p-5 md:col-span-1">
          <div className="font-bold mb-1 text-sm">Conversion Funnel</div>
          <div className="text-xs text-ink/40 mb-4">Visitors → Premium users</div>
          <div className="space-y-2">
            {funnelData.map((step, i) => (
              <div key={step.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-ink/70">{step.name}</span>
                  <span className="font-medium">{step.value.toLocaleString()}</span>
                </div>
                <div className="h-5 rounded-sm overflow-hidden bg-hairline">
                  <div
                    className="h-full rounded-sm transition-all"
                    style={{
                      width: `${(step.value / funnelData[0].value) * 100}%`,
                      backgroundColor: step.fill,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI usage */}
        <div className="bg-white border border-hairline rounded-xl p-5 md:col-span-2">
          <div className="font-bold mb-1 text-sm">AI Query Volume</div>
          <div className="text-xs text-ink/40 mb-4">Daily AI analysis requests (last 7 days)</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={aiUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="queries" fill="#f3c9b6" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course completion rates */}
        <div className="bg-white border border-hairline rounded-xl p-5">
          <div className="font-bold mb-1 text-sm">Course Completion Rates</div>
          <div className="text-xs text-ink/40 mb-4">% of enrolled students who finish</div>
          <div className="space-y-3">
            {courseCompletionData.map(c => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-ink/70 truncate">{c.name}</span>
                  <span className="font-medium ml-2">{c.rate}%</span>
                </div>
                <div className="h-2 bg-hairline rounded-full overflow-hidden">
                  <div className="h-full bg-black rounded-full" style={{ width: `${c.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geography */}
        <div className="bg-white border border-hairline rounded-xl p-5">
          <div className="font-bold mb-1 text-sm">Users by Country</div>
          <div className="text-xs text-ink/40 mb-4">Top regions by active users</div>
          <div className="space-y-2">
            {geoData.map((g, i) => (
              <div key={g.country} className="flex items-center gap-3">
                <div className="text-xs text-ink/40 w-4">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span className="font-medium">{g.country}</span>
                    <span className="text-ink/50">{g.users.toLocaleString()} users</span>
                  </div>
                  <div className="h-1.5 bg-hairline rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${g.pct}%`, backgroundColor: COLORS[i] }} />
                  </div>
                </div>
                <div className="text-xs text-ink/40 w-8 text-right">{g.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
