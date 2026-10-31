import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export type Lang = 'en' | 'de'

export type GradeChange = { who: string; ai: number; you: number; reason: string }

export type Demo = {
  lang: Lang
  // student
  unread: string[]
  beaten: boolean
  frame: string
  nameStyle: string
  // grading
  scansChecked: boolean
  confirmed: string[]
  changes: GradeChange[]
  flag: 'open' | 'assigned' | 'dismissed'
  all3: boolean
  kept: boolean
  resolved: string[]
}

const initial: Demo = {
  lang: 'en',
  unread: ['result', 'practice'],
  beaten: false,
  frame: '#8c6bd9',
  nameStyle: 'Purple',
  scansChecked: false,
  confirmed: ['common'],
  changes: [{ who: 'Lina A., Q5', ai: 2, you: 3, reason: 'working was not asked for in this question, and the order is correct.' }],
  flag: 'open',
  all3: false,
  kept: false,
  resolved: [],
}

const KEY = 'primarypath-demo'

function load(): Demo {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...initial, ...JSON.parse(raw) } : initial
  } catch {
    return initial
  }
}

type ToastData = { id: number; msg: string; undo?: () => void }

type Ctx = {
  demo: Demo
  set: (patch: Partial<Demo>) => void
  reset: () => void
  t: (en: string, de: string) => string
  toast: (msg: string, undo?: () => void) => void
}

const AppContext = createContext<Ctx | null>(null)

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [demo, setDemo] = useState<Demo>(load)
  const [toastData, setToast] = useState<ToastData | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(demo))
    } catch {
      // Storage can be blocked; the demo still works for this session.
    }
    document.documentElement.lang = demo.lang
  }, [demo])

  const set = useCallback((patch: Partial<Demo>) => setDemo((d) => ({ ...d, ...patch })), [])
  const reset = useCallback(() => setDemo((d) => ({ ...initial, lang: d.lang })), [])
  const t = useCallback((en: string, de: string) => (demo.lang === 'de' ? de : en), [demo.lang])
  const toast = useCallback((msg: string, undo?: () => void) => {
    window.clearTimeout(timer.current)
    setToast({ id: Date.now(), msg, undo })
    timer.current = window.setTimeout(() => setToast(null), undo ? 6000 : 3500)
  }, [])

  return (
    <AppContext.Provider value={{ demo, set, reset, t, toast }}>
      {children}
      {toastData && (
        <div className="toast" role="status" key={toastData.id}>
          <span>{toastData.msg}</span>
          {toastData.undo && (
            <button
              onClick={() => {
                toastData.undo?.()
                setToast(null)
              }}
            >
              {t('Undo', 'Rückgängig')}
            </button>
          )}
          <button aria-label="Close" className="toast-x" onClick={() => setToast(null)}>
            <X size={16} />
          </button>
        </div>
      )}
    </AppContext.Provider>
  )
}

export function Modal({ onClose, children, width = 440, label }: { onClose: () => void; children: ReactNode; width?: number; label: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="scrim" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={label} style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

// Reads text aloud with the browser's built-in speech voices.
export function speak(text: string, lang: Lang, onEnd?: () => void) {
  if (!('speechSynthesis' in window)) {
    onEnd?.()
    return
  }
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang === 'de' ? 'de-DE' : 'en-GB'
  u.rate = 0.9
  u.onend = () => onEnd?.()
  u.onerror = () => onEnd?.()
  window.speechSynthesis.speak(u)
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
}
