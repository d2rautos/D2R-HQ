import type { Metadata } from 'next'
import { ClockWidget } from '@/components/dashboard/clock-widget'
import {
  ContinueSystems,
  MiniLeaderboard,
  OperatorCard,
  RecentActivity,
  StatGrid,
  WeeklyHoursChart,
} from '@/components/dashboard/widgets'

export const metadata: Metadata = { title: 'Dashboard · D2R HQ' }

export default function DashboardPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <OperatorCard />
        </div>
        <ClockWidget />
      </div>
      <StatGrid />
      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <div className="space-y-4 md:space-y-6 lg:col-span-2">
          <WeeklyHoursChart />
          <RecentActivity />
        </div>
        <div className="space-y-4 md:space-y-6">
          <MiniLeaderboard />
          <ContinueSystems />
        </div>
      </div>
    </div>
  )
}
