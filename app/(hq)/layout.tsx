import { AppShell } from '@/components/hq/app-shell'
import { ClockProvider } from '@/components/hq/clock-provider'

export default function HQLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClockProvider>
      <AppShell>{children}</AppShell>
    </ClockProvider>
  )
}
