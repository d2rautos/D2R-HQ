import type { Metadata } from 'next'
import { ClockTerminal } from '@/components/clock/clock-terminal'
import { PageHeader } from '@/components/hq/primitives'

export const metadata: Metadata = { title: 'Clock In / Out · D2R HQ' }

export default function ClockPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Time terminal"
        title="Clock in / out"
        description="Pick your shift, start the timer, and take breaks as needed. Your status shows live to the crew."
      />
      <ClockTerminal />
    </div>
  )
}
