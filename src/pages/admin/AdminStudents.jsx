import { useState } from 'react'
import { Search, UserPlus, Lock, Unlock, Edit2, ChevronDown } from 'lucide-react'
import { mockUsers } from '../../data/mockUsers'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'

export default function AdminStudents() {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState(mockUsers.filter(u => u.role === 'student'))
  const [selected, setSelected] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [lockedIds, setLockedIds] = useState([])

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const toggleLock = (id) => {
    setLockedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-sm text-ink/50">{users.length} total students</p>
        </div>
        <Button onClick={() => setShowAdd(true)} icon={<UserPlus size={15} />}>
          Add student
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          icon={<Search size={16} />}
        />
      </div>

      <div className="bg-white border border-hairline rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-hairline bg-surface-soft">
              <th className="text-left px-4 py-3 font-medium text-xs text-ink/50 uppercase tracking-wide">Student</th>
              <th className="text-left px-4 py-3 font-medium text-xs text-ink/50 uppercase tracking-wide hidden md:table-cell">Level</th>
              <th className="text-left px-4 py-3 font-medium text-xs text-ink/50 uppercase tracking-wide hidden lg:table-cell">Plan</th>
              <th className="text-left px-4 py-3 font-medium text-xs text-ink/50 uppercase tracking-wide hidden lg:table-cell">Joined</th>
              <th className="text-left px-4 py-3 font-medium text-xs text-ink/50 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, idx) => {
              const isLocked = lockedIds.includes(u.id)
              return (
                <tr key={u.id} className={`${idx > 0 ? 'border-t border-hairline-soft' : ''} hover:bg-surface-soft transition-colors`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={u.avatar} name={u.name} size="sm" />
                      <div>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-ink/40">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="font-mono text-xs">Lv.{u.level} · {u.xp?.toLocaleString()} XP</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <Badge variant={u.isPremium ? 'lilac' : 'lime'}>{u.isPremium ? 'Premium' : 'Free'}</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-ink/40 hidden lg:table-cell">{u.joinedAt}</td>
                  <td className="px-4 py-3">
                    <Badge variant={isLocked ? 'error' : 'success'}>{isLocked ? 'Locked' : 'Active'}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => setSelected(u)}
                        className="w-7 h-7 rounded flex items-center justify-center hover:bg-surface-soft"
                        title="Edit"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => toggleLock(u.id)}
                        className="w-7 h-7 rounded flex items-center justify-center hover:bg-surface-soft"
                        title={isLocked ? 'Unlock' : 'Lock'}
                      >
                        {isLocked ? <Unlock size={13} className="text-semantic-success" /> : <Lock size={13} className="text-semantic-error" />}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-ink/40 text-sm">No students found</div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Edit Student" size="sm">
        {selected && (
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Avatar src={selected.avatar} name={selected.name} size="lg" />
              <div>
                <div className="font-semibold">{selected.name}</div>
                <div className="text-xs text-ink/50">{selected.email}</div>
              </div>
            </div>
            <Input label="Name" defaultValue={selected.name} />
            <Input label="Email" defaultValue={selected.email} />
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={() => setSelected(null)}>Save</Button>
              <Button variant="secondary" className="flex-1" onClick={() => setSelected(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Student" size="sm">
        <div className="p-5 space-y-4">
          <Input label="Full name" placeholder="Student name" />
          <Input label="Email" type="email" placeholder="student@example.com" />
          <Input label="Initial password" type="password" placeholder="Temporary password" />
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={() => setShowAdd(false)}>Create account</Button>
            <Button variant="secondary" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
