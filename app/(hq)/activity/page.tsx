import type { Metadata } from 'next'
import { ActivityFeed } from '@/components/activity/activity-feed'
import { PageHeader } from '@/components/hq/primitives'

export const metadata: Metadata = { title: 'Activity Feed · D2R HQ' }

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Live transmission"
        title="Activity feed"
        description="Everything happening across HQ — shifts, completions, rank changes and admin actions."
      />
      <ActivityFeed />
    </div>
  )
}
