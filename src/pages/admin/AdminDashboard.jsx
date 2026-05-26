import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, BookOpen, DollarSign, Brain, TrendingUp, Activity } from 'lucide-react'
import { mockAdminStats } from '../../data/mockPlans'
import { StatCard } from '../../components/ui/Card'

const COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#f3c9b6', '#efd4d4', '#1f1d3d', '#f7f7f5']

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-ink/50 mt-1">Platform overview · May 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={mockAdminStats.totalUsers.toLocaleString()} icon={<Users size={20} />} trend={12} color="lime" />
        <StatCard label="Active Users" value={mockAdminStats.activeUsers.toLocaleString()} icon={<Activity size={20} />} trend={8} color="mint" />
        <StatCard label="Revenue (MoM)" value={`$${mockAdminStats.totalRevenue.toLocaleString()}`} icon={<DollarSign size={20} />} trend={15} color="coral" />
        <StatCard label="AI Queries" value={mockAdminStats.aiQueriesThisMonth.toLocaleString()} icon={<Brain size={20} />} trend={22} color="lilac" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <div className="bg-white border border-hairline rounded-lg p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={16} /> Enrollment Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockAdminStats.enrollmentTrend}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#000" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue */}
        <div className="bg-white border border-hairline rounded-lg p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <DollarSign size={16} /> Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockAdminStats.revenueTrend}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `$${v}`} />
              <Bar dataKey="revenue" fill="#dceeb1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Course Popularity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-hairline rounded-lg p-5">
          <h3 className="font-semibold mb-4">Course Popularity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockAdminStats.coursePopularity} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
              <Tooltip />
              <Bar dataKey="enrolled" fill="#c5b0f4" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-hairline rounded-lg p-5">
          <h3 className="font-semibold mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Free', value: 5600 },
                  { name: 'Premium', value: 1240 },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                <Cell fill="#dceeb1" />
                <Cell fill="#c5b0f4" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
