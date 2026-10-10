import { cn } from '@/lib/utils'

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative inline-flex size-9 items-center justify-center rounded-md border border-primary bg-primary/15 glow-sm">
        <span className="font-display text-xs font-black tracking-tighter text-primary text-glow">D2R</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-black uppercase tracking-[0.2em] text-foreground">
            D2R <span className="text-primary text-glow">HQ</span>
          </span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Cyber Purple
          </span>
        </span>
      )}
    </span>
  )
}
