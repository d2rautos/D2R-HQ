import { cn } from '@/lib/utils'
import type { MemberStatus } from '@/lib/mock-data'

export function Panel({
  className,
  children,
  as: Tag = 'section',
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: 'section' | 'div' | 'article' | 'aside' }) {
  return (
    <Tag
      className={cn(
        'relative rounded-lg border border-border bg-card/80 backdrop-blur-sm',
        'before:pointer-events-none before:absolute before:-left-px before:-top-px before:size-3 before:rounded-tl-lg before:border-l-2 before:border-t-2 before:border-primary',
        'after:pointer-events-none after:absolute after:-bottom-px after:-right-px after:size-3 after:rounded-br-lg after:border-b-2 after:border-r-2 after:border-primary',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function PanelHeader({
  title,
  eyebrow,
  action,
}: {
  title: string
  eyebrow?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3 md:px-5">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        )}
        <h2 className="truncate font-display text-sm font-semibold uppercase tracking-wider text-foreground">
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h1 className="mt-1 text-balance font-display text-2xl font-bold uppercase tracking-wide text-foreground md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </header>
  )
}

export function Avatar({
  callsign,
  size = 'md',
  highlight = false,
}: {
  callsign: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  highlight?: boolean
}) {
  const sizes = {
    sm: 'size-8 text-[10px]',
    md: 'size-10 text-xs',
    lg: 'size-14 text-sm',
    xl: 'size-20 text-lg',
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md border font-display font-bold',
        highlight
          ? 'border-primary bg-primary/20 text-primary glow-sm'
          : 'border-border bg-secondary text-accent-foreground',
        sizes[size],
      )}
    >
      {callsign.slice(0, 2)}
    </span>
  )
}

const statusStyles: Record<MemberStatus, { dot: string; label: string }> = {
  online: { dot: 'bg-success', label: 'Online' },
  'on-shift': { dot: 'bg-primary', label: 'On shift' },
  away: { dot: 'bg-warning', label: 'Away' },
  offline: { dot: 'bg-muted-foreground/50', label: 'Offline' },
  suspended: { dot: 'bg-destructive', label: 'Suspended' },
}

export function StatusBadge({ status }: { status: MemberStatus }) {
  const s = statusStyles[status]
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={cn('size-2 rounded-full', s.dot)} aria-hidden="true" />
      {s.label}
    </span>
  )
}

export function Tag({
  children,
  tone = 'default',
}: {
  children: React.ReactNode
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
}) {
  const tones = {
    default: 'border-border bg-secondary text-muted-foreground',
    primary: 'border-primary/40 bg-primary/15 text-primary',
    success: 'border-success/40 bg-success/10 text-success',
    warning: 'border-warning/40 bg-warning/10 text-warning',
    danger: 'border-destructive/40 bg-destructive/10 text-destructive',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
    >
      <div
        className="h-full rounded-full bg-primary shadow-[0_0_10px_var(--primary)] transition-[width] duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export function NeonButton({
  className,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger'
}) {
  const variants = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_-4px_var(--primary)]',
    outline: 'border border-primary/50 text-primary hover:bg-primary/10',
    ghost: 'text-muted-foreground hover:bg-secondary hover:text-foreground',
    danger: 'border border-destructive/50 text-destructive hover:bg-destructive/10',
  }
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold uppercase tracking-wider transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
