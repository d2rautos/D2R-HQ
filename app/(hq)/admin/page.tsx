import type { Metadata } from 'next'
import { AdminPanel } from '@/components/admin/admin-panel'
import { PageHeader, Tag } from '@/components/hq/primitives'

export const metadata: Metadata = { title: 'Admin Panel · D2R HQ' }

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Restricted access"
        title="Administrator panel"
        description="Manage roles, review requests and broadcast announcements to the whole crew."
        action={<Tag tone="warning">Admin clearance</Tag>}
      />
      <AdminPanel />
    </div>
  )
}
