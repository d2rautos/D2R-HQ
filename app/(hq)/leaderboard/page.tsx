import type { Metadata } from 'next'
import { PageHeader } from '@/components/hq/primitives'
import { LeaderboardView } from '@/components/leaderboard/leaderboard-view'

export const metadata: Metadata = { title: 'Leaderboard · D2R HQ' }

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Season 7"
        title="Leaderboard"
        description="XP is earned from shift hours, completed systems and achievements. Monthly standings reset on the 1st."
      />
      <LeaderboardView />
    </div>
  )
}
