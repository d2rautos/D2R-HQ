import Image from 'next/image'
import { Logo } from '@/components/hq/logo'
import { LoginForm } from '@/components/login/login-form'
import { Panel } from '@/components/hq/primitives'

const stats = [
  { label: 'Operators', value: '128' },
  { label: 'On shift', value: '23' },
  { label: 'Systems', value: '64' },
]

export default function LoginPage() {
  return (
    <main className="relative grid min-h-dvh bg-background lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border lg:block">
        <Image
          src="/images/login-hero.png"
          alt="Cyber operator facing a giant neon purple holographic screen"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 scanlines" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 p-10">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-primary">{'// Season 7 live'}</p>
          <h2 className="mt-3 max-w-md text-balance font-display text-4xl font-black uppercase leading-tight text-foreground">
            Clock in. Level up. <span className="text-primary text-glow">Own the board.</span>
          </h2>
          <dl className="mt-8 flex gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="relative flex items-center justify-center bg-grid px-4 py-10 sm:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 size-80 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="relative w-full max-w-md">
          <div className="mb-8 flex justify-center lg:justify-start">
            <Logo />
          </div>
          <Panel className="p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">Secure terminal</p>
            <h1 className="mt-1 font-display text-2xl font-bold uppercase tracking-wide">Operator login</h1>
            <p className="mb-6 mt-2 text-sm leading-relaxed text-muted-foreground">
              Authenticate to access the D2R command center.
            </p>
            <LoginForm />
          </Panel>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            New recruit? <a href="#" className="font-medium text-primary hover:underline">Request access</a>
          </p>
        </div>
      </div>
    </main>
  )
}
