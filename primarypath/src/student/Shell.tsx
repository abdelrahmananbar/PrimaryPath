import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Check, ChevronLeft, FileText, HelpCircle, LogOut, Mail, Map, Route, ShieldCheck, Star, User, Volume2, X } from 'lucide-react'
import { Art } from '../art'
import { Modal, speak, stopSpeaking, useApp } from '../state'

const TABS = [
  { id: 'map', to: '/s/map', icon: Map, en: 'Map', de: 'Karte', bg: 'var(--leaf-tint)', c: 'var(--leaf)' },
  { id: 'exams', to: '/s/exams', icon: FileText, en: 'My exams', de: 'Prüfungen', bg: 'var(--sky-tint)', c: 'var(--sky)' },
  { id: 'practice', to: '/s/cave', icon: ShieldCheck, en: 'Practice', de: 'Üben', bg: 'var(--grape-tint)', c: 'var(--grape)' },
  { id: 'progress', to: '/s/progress', icon: Route, en: 'Progress', de: 'Mein Weg', bg: 'var(--teal-tint)', c: 'var(--teal)' },
  { id: 'stickers', to: '/s/stickers', icon: Star, en: 'Stickers', de: 'Sticker', bg: 'var(--pink-tint)', c: 'var(--pink)' },
] as const

export type TabId = (typeof TABS)[number]['id']

export function useStickerCount() {
  const { demo } = useApp()
  return demo.beaten ? 5 : 4
}

export function Student({ title, tab, children }: { title: string; tab: TabId; children: ReactNode }) {
  const { demo, set, t } = useApp()
  const stickers = useStickerCount()
  const [reading, setReading] = useState(false)
  const [menu, setMenu] = useState<'none' | 'me' | 'how'>('none')
  const book = useRef<HTMLDivElement>(null)
  const nav = useNavigate()

  const toggleRead = () => {
    if (reading) {
      stopSpeaking()
      setReading(false)
      return
    }
    setReading(true)
    speak(book.current?.innerText.replace(/\s+/g, ' ') ?? '', demo.lang, () => setReading(false))
  }

  return (
    <div className="st">
      <div className="cloud" style={{ left: -40, top: 170 }} />
      <div className="cloud" style={{ right: -20, top: 110 }} />
      <div className="cloud" style={{ right: -30, top: 820 }} />
      <div className="hills" />
      <header className="st-top">
        <Link to="/s/map" className="chunk st-logo dsp" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Art name="logo" size={46} /> PrimaryPath
        </Link>
        <h1 className="chunk st-title dsp">{title}</h1>
        <div className="chunk st-lang" role="group" aria-label="Language">
          <button aria-pressed={demo.lang === 'en'} onClick={() => set({ lang: 'en' })}>EN</button>
          <button aria-pressed={demo.lang === 'de'} onClick={() => set({ lang: 'de' })}>DE</button>
        </div>
        <button className="chunk tool read" aria-pressed={reading} onClick={toggleRead}>
          <Volume2 size={22} /> {t('Read to me', 'Vorlesen')}
        </button>
        <div className="st-tools">
          <Link to="/s/mail" className="chunk tool" aria-label={`Mailbox, ${demo.unread.length} new`} style={{ color: 'inherit' }}>
            <Mail size={32} />
            {demo.unread.length > 0 && <span className="badge">{demo.unread.length}</span>}
          </Link>
          <Link to="/s/stickers" className="chunk tool stickers" aria-label={`${stickers} stickers`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Star size={24} /> {stickers}
          </Link>
          <button className="chunk tool me" aria-label="My menu" onClick={() => setMenu('me')}>
            <Art name="student" size={60} />
          </button>
        </div>
      </header>
      <div className="st-body">
        <div className="book" ref={book}>{children}</div>
        <nav className="st-tabs" aria-label="Book tabs">
          {TABS.map((x) => (
            <Link
              key={x.id}
              to={x.to}
              className={`tabb ${x.id === tab ? 'on' : ''}`}
              aria-current={x.id === tab ? 'page' : undefined}
              style={{ background: x.bg, color: 'inherit', textDecoration: 'none', '--tabc': x.c } as React.CSSProperties}
            >
              <x.icon size={32} /> {t(x.en, x.de)}
            </Link>
          ))}
        </nav>
      </div>
      {menu === 'me' && (
        <Modal label="My menu" width={380} onClose={() => setMenu('none')}>
          <div className="col" style={{ fontFamily: 'Andika', color: 'var(--ink)', alignItems: 'center', gap: 14 }}>
            <span className="face" style={{ background: 'var(--sky-tint)', borderColor: demo.frame, borderWidth: 5 }}>
              <Art name="student" size={100} />
            </span>
            <h2 className="dsp" style={{ fontSize: 28 }}>Lina A.</h2>
            <p className="soft">{t('Class 4B · Ms. Salma', 'Klasse 4B · Frau Salma')}</p>
            <button className="pill" style={{ width: '100%' }} onClick={() => nav('/s/stickers')}><User size={20} /> {t('My profile', 'Mein Profil')}</button>
            <button className="pill" style={{ width: '100%' }} onClick={() => setMenu('how')}><HelpCircle size={20} /> {t('How does PrimaryPath work?', 'Wie funktioniert PrimaryPath?')}</button>
            <button className="pill" style={{ width: '100%' }} onClick={() => nav('/')}><LogOut size={20} /> {t('Log out', 'Abmelden')}</button>
            <button className="pill" style={{ width: '100%' }} onClick={() => setMenu('none')}><X size={20} /> {t('Close', 'Schließen')}</button>
          </div>
        </Modal>
      )}
      {menu === 'how' && (
        <Modal label="How PrimaryPath works" width={760} onClose={() => setMenu('none')}>
          <div className="col" style={{ fontFamily: 'Andika', color: 'var(--ink)', gap: 14, fontSize: 18 }}>
            <h2 className="dsp" style={{ fontSize: 30 }}>{t('How PrimaryPath works', 'So funktioniert PrimaryPath')}</h2>
            <p>{t('Your book has 5 tabs on the right. Tap one to jump there.', 'Dein Buch hat 5 Reiter rechts. Tippe auf einen, um dorthin zu springen.')}</p>
            {[
              [Map, t('Map', 'Karte'), t('Your home. Go anywhere from here.', 'Dein Zuhause. Von hier kommst du überall hin.')],
              [FileText, t('My exams', 'Prüfungen'), t('See results and new exams to print.', 'Sieh Ergebnisse und neue Prüfungen zum Drucken.')],
              [ShieldCheck, t('Practice', 'Üben'), t('Beat Guardians to fix tricky questions.', 'Besiege Wächter, um knifflige Fragen zu lösen.')],
              [BookOpen, t('Progress', 'Mein Weg'), t('See how much you have grown.', 'Sieh, wie viel du schon kannst.')],
              [Star, t('Stickers', 'Sticker'), t('Your sticker album and your look.', 'Dein Stickeralbum und dein Aussehen.')],
            ].map(([Icon, name, text]) => {
              const I = Icon as typeof Map
              return (
                <div className="row" key={name as string}>
                  <span className="mark"><I size={22} /></span>
                  <b style={{ width: 110 }}>{name as string}</b>
                  <span>{text as string}</span>
                </div>
              )
            })}
            <p className="soft">{t('At the top: the post-box has news from your teacher, Read to me reads the page out loud, and EN or DE changes the language.', 'Oben: Im Briefkasten sind Nachrichten von deiner Lehrerin, Vorlesen liest die Seite laut vor, und EN oder DE ändert die Sprache.')}</p>
            <button className="kbtn" onClick={() => setMenu('none')}><Check size={22} /> {t('Got it!', 'Verstanden!')}</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export function Spread({ left, right, pages }: { left: ReactNode; right: ReactNode; pages?: [number, number] }) {
  return (
    <div className="spread">
      <section className="page">
        {left}
        {pages && <span className="pgno">page {pages[0]}</span>}
      </section>
      <section className="page">
        {right}
        {pages && <span className="pgno">page {pages[1]}</span>}
      </section>
    </div>
  )
}

export function Pip({ children, size = 76 }: { children: ReactNode; size?: number }) {
  return (
    <div className="bubble">
      <Art name="pip" size={size} />
      <p>{children}</p>
    </div>
  )
}

export function BackBtn({ to, label }: { to: string; label?: string }) {
  const { t } = useApp()
  return (
    <Link to={to} className="pill" style={{ alignSelf: 'flex-start', textDecoration: 'none', color: 'inherit' }}>
      <ChevronLeft size={22} /> {label ?? t('Back', 'Zurück')}
    </Link>
  )
}

export function UploadSteps({ at }: { at: 1 | 2 | 3 | 4 }) {
  const { t } = useApp()
  const names = [t('Pick', 'Wählen'), t('Check', 'Prüfen'), t('Send', 'Senden')]
  return (
    <div className="steps">
      {names.map((n, i) => (
        <div key={n} className={i + 1 <= at ? 'reached' : ''}>
          <span className={`dot ${i + 1 < at ? 'done' : i + 1 === at ? 'now' : ''}`}>{i + 1 < at ? <Check size={24} /> : i + 1}</span>
          {n}
        </div>
      ))}
    </div>
  )
}
