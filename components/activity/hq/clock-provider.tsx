'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { shiftTypes } from '@/lib/mock-data'

export type ClockStatus = 'out' | 'in' | 'break'
export type ShiftType = (typeof shiftTypes)[number]

type ClockState = {
  status: ClockStatus
  shift: ShiftType
  startedAt: number | null
  breakStartedAt: number | null
  breakMs: number
  sessions: { id: string; shift: ShiftType; workedMs: number; endedAt: number }[]
}

type ClockContextValue = ClockState & {
  now: number
  workedMs: number
  setShift: (shift: ShiftType) => void
  clockIn: () => void
  clockOut: () => void
  toggleBreak: () => void
}

const ClockContext = createContext<ClockContextValue | null>(null)

export function ClockProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ClockState>({
    status: 'out',
    shift: 'Day Shift',
    startedAt: null,
    breakStartedAt: null,
    breakMs: 0,
    sessions: [],
  })
  const [now, setNow] = useState(0)

  useEffect(() => {
    if (state.status === 'out') return
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [state.status])

  const workedMs = useMemo(() => {
    if (!state.startedAt) return 0
    const currentBreak = state.breakStartedAt ? now - state.breakStartedAt : 0
    return Math.max(0, now - state.startedAt - state.breakMs - currentBreak)
  }, [now, state.startedAt, state.breakMs, state.breakStartedAt])

  const setShift = useCallback((shift: ShiftType) => setState((s) => ({ ...s, shift })), [])

  const clockIn = useCallback(() => {
    const t = Date.now()
    setNow(t)
    setState((s) => ({ ...s, status: 'in', startedAt: t, breakStartedAt: null, breakMs: 0 }))
  }, [])

  const toggleBreak = useCallback(() => {
    const t = Date.now()
    setState((s) => {
      if (s.status === 'in') return { ...s, status: 'break', breakStartedAt: t }
      if (s.status === 'break' && s.breakStartedAt)
        return { ...s, status: 'in', breakMs: s.breakMs + (t - s.breakStartedAt), breakStartedAt: null }
      return s
    })
  }, [])

  const clockOut = useCallback(() => {
    const t = Date.now()
    setState((s) => {
      if (!s.startedAt) return s
      const currentBreak = s.breakStartedAt ? t - s.breakStartedAt : 0
      const worked = Math.max(0, t - s.startedAt - s.breakMs - currentBreak)
      return {
        ...s,
        status: 'out',
        startedAt: null,
        breakStartedAt: null,
        breakMs: 0,
        sessions: [{ id: String(t), shift: s.shift, workedMs: worked, endedAt: t }, ...s.sessions],
      }
    })
  }, [])

  const value = useMemo(
    () => ({ ...state, now, workedMs, setShift, clockIn, clockOut, toggleBreak }),
    [state, now, workedMs, setShift, clockIn, clockOut, toggleBreak],
  )

  return <ClockContext.Provider value={value}>{children}</ClockContext.Provider>
}

export function useClock() {
  const ctx = useContext(ClockContext)
  if (!ctx) throw new Error('useClock must be used inside ClockProvider')
  return ctx
}

export function formatDuration(ms: number) {
  const total = Math.floor(ms / 1000)
  const h = String(Math.floor(total / 3600)).padStart(2, '0')
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}
