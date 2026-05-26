import { useState } from 'react'
import { Edit2, Plus, ToggleLeft, ToggleRight, Zap } from 'lucide-react'
import { mockPlans } from '../../data/mockPlans'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'

export default function AdminPlans() {
  const [plans, setPlans] = useState(mockPlans)
  const [selected, setSelected] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [disabledIds, setDisabledIds] = useState([])

  const togglePlan = (id) => setDisabledIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Subscription Plans</h1>
          <p className="text-sm text-ink/50">Manage pricing and feature access</p>
        </div>
        <Button onClick={() => setShowAdd(true)} icon={<Plus size={15} />}>Add plan</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {plans.map(plan => {
          const disabled = disabledIds.includes(plan.id)
          return (
            <div key={plan.id} className={`bg-white border rounded-lg p-6 ${disabled ? 'opacity-50 border-hairline' : 'border-black/20'}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    {plan.isPopular && <Badge variant="lilac"><Zap size={10} className="inline" /> Popular</Badge>}
                    <Badge variant={disabled ? 'error' : 'success'}>{disabled ? 'Disabled' : 'Active'}</Badge>
                  </div>
                  <div className="text-sm text-ink/60">{plan.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{plan.price === 0 ? 'Free' : `$${plan.price}`}</div>
                  {plan.price > 0 && <div className="text-xs text-ink/40">/ month</div>}
                </div>
              </div>

              <ul className="space-y-1.5 mb-5">
                {plan.features.slice(0, 5).map(f => (
                  <li key={f.text} className="flex items-center gap-2 text-xs">
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${f.included ? 'bg-semantic-success' : 'bg-hairline'}`} />
                    <span className={f.included ? '' : 'text-ink/40'}>{f.text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => setSelected(plan)} icon={<Edit2 size={13} />}>Edit</Button>
                <Button
                  variant={disabled ? 'success' : 'secondary'}
                  size="sm"
                  onClick={() => togglePlan(plan.id)}
                  icon={disabled ? <ToggleRight size={13} /> : <ToggleLeft size={13} />}
                >
                  {disabled ? 'Enable' : 'Disable'}
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Edit Plan" size="sm">
        {selected && (
          <div className="p-5 space-y-4">
            <Input label="Plan name" defaultValue={selected.name} />
            <Input label="Price (USD/month)" type="number" defaultValue={selected.price} />
            <Input label="Annual price (USD/year)" type="number" defaultValue={selected.annualPrice || 0} />
            <Input label="AI query limit / day" type="number" defaultValue={selected.id === 'premium' ? 30 : 10} />
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={() => setSelected(null)}>Save</Button>
              <Button variant="secondary" className="flex-1" onClick={() => setSelected(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Plan" size="sm">
        <div className="p-5 space-y-4">
          <Input label="Plan name" placeholder="e.g. Enterprise" />
          <Input label="Price (USD/month)" type="number" placeholder="29" />
          <Input label="AI query limit / day" type="number" placeholder="100" />
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={() => setShowAdd(false)}>Create plan</Button>
            <Button variant="secondary" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
