import type { Metadata } from 'next'
import { PageHeader } from '@/components/hq/primitives'
import { SystemsLibrary } from '@/components/systems/systems-library'

export const metadata: Metadata = { title: 'Systems Library · D2R HQ' }

export default function SystemsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge base"
        title="Systems library"
        description="Playbooks, protocols and training for every part of HQ. Complete systems to earn XP and climb the leaderboard."
      />
      <SystemsLibrary />
    </div>
  )
}
