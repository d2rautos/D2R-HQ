'use client'

import Link from 'next/link'
import { Coffee, Play, Square } from 'lucide-react'
import { formatDuration, useClock } from '@/components/hq/clock-provider'
import { NeonButton, Panel, PanelHeader, Tag } from '@/components/hq/primitives'

export function ClockWidget() {
  const { status, shift, workedMs, clockIn, clockOut, toggleBreak } = useClock()
  return (
    <Panel className="flex flex-col">
      <PanelHeader
        eyebrow="Shift"
        title="Duty status"
        action={
          <Tag tone={status === 'in' ? 'primary' : status === 'break' ? 'warning' : 'default'}>
            {status === 'in' ? 'Active' : status === 'break' ? 'Break' : 'Off duty'}
          </Tag>
        }
      />
      <div className="flex flex-1 flex-col justify-between gap-5 p-4 md:p-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{shift}</p>
          <p
            className="mt-1 font-mono text-4xl font-bold tabular-nums text-foreground data-[on=true]:text-primary data-[on=true]:text-glow"
            data-on={status === 'in'}
            aria-live="polite"
          >
            {formatDuration(workedMs)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {status === 'out' ? (
            <NeonButton onClick={clockIn} className="flex-1">
              <Play className="size-4" aria-hidden="true" /> Clock in
            </NeonButton>
          ) : (
            <>
              <NeonButton variant="outline" onClick={toggleBreak} className="flex-1">
                <Coffee className="size-4" aria-hidden="true" /> {status === 'break' ? 'Resume' : 'Break'}
              </NeonButton>
              <NeonButton variant="danger" onClick={clockOut} className="flex-1">
                <Square className="size-4" aria-hidden="true" /> Clock out
              </NeonButton>
            </>
          )}
        </div>
        <Link href="/clock" className="text-xs text-primary hover:underline">
          Open time terminal
        </Link>
      </div>
    </Panel>
  )
}
