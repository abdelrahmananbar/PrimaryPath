import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Bell, Check, ChevronDown, ChevronLeft, ChevronRight, HelpCircle, LogOut, Search, Sparkles, X } from 'lucide-react'
import { Modal, useApp } from '../state'

export function Brand({ role }: { role: string }) {
  return (
    <span className="brand">
      <span className="mark-p">P</span> PrimaryPath <span className="role-tag">{role}</span>
    </span>
  )
}

export function LangSeg() {
  const { demo, set } = useApp()
  return (
    <span className="seg" role="group" aria-label="Language">
      <button aria-pressed={demo.lang === 'en'} onClick={() => set({ lang: 'en' })}>EN</button>
      <button aria-pressed={demo.lang === 'de'} onClick={() => set({ lang: 'de' })}>DE</button>
    </span>
  )
}

const TEACHER_NOTES = [
  { title: 'Youssef T.’s grades are dropping', sub: 'Maths and Science, 3 exams in a row', when: '2 h', to: '/t/alerts/youssef' },
  { title: 'Lina A. made the same mistake 3 times', sub: 'Compared top numbers in Q4, Q6, Q8', when: '2 h', to: '/t/grade/gaps' },
  { title: 'All 26 Fractions quiz papers are in', sub: 'The AI has pre-graded them', when: '5 h', to: '/t/grade/scans' },
  { title: 'Mrs. A. read your message', sub: 'About Lina’s Fraction Guardian', when: 'Yesterday', to: '/t/classes/lina' },
]

export function NotesPop({ items, footer, onClose }: { items: { title: string; sub: string; when: string; to: string }[]; footer?: { label: string; to: string }; onClose: () => void }) {
  const nav = useNavigate()
  const [read, setRead] = useState(false)
  return (
    <div className="pop">
      <div className="row sb" style={{ padding: '14px 16px' }}>
        <b>Notifications</b>
        <button className="tlink small" onClick={() => setRead(true)}>Mark all as read</button>
      </div>
      {items.map((n) => (
        <button key={n.title} className="pop-item" onClick={() => { onClose(); nav(n.to) }}>
          <span className="row sb">
            <b style={{ fontWeight: read ? 500 : 600 }}>{n.title}</b>
            <span className="sub small">{n.when}</span>
          </span>
          <span className="sub small">{n.sub}</span>
        </button>
      ))}
      {footer && <button className="pop-item tlink" style={{ justifyContent: 'center' }} onClick={() => { onClose(); nav(footer.to) }}>{footer.label}</button>}
    </div>
  )
}

export function AccountPop({ name, email, initials }: { name: string; email: string; initials: string }) {
  const nav = useNavigate()
  return (
    <div className="pop" style={{ width: 280 }}>
      <div className="row" style={{ padding: 16 }}>
        <span className="av blue">{initials}</span>
        <span><b>{name}</b><br /><span className="sub small">{email}</span></span>
      </div>
      <button className="pop-item row" onClick={() => nav('/')}><LogOut size={18} /> Log out</button>
    </div>
  )
}

export function HelpPanel({ onClose }: { onClose: () => void }) {
  const { toast } = useApp()
  const [open, setOpen] = useState('What is DOK?')
  const items = [
    ['How AI grading works', 'The AI suggests, you confirm every grade.'],
    ['What is DOK?', 'Depth of Knowledge: how deep the thinking goes.'],
    ['Writing a mark scheme', 'Give points for what the answer must show.'],
    ['Scanning pupils’ papers', 'Tips for clear photos and fixing words.'],
  ]
  return (
    <aside className="side" aria-label="Help">
      <div className="row sb"><h2 className="t2">Help</h2><button aria-label="Close" onClick={onClose}><X size={20} /></button></div>
      <input className="input" placeholder="Search help" aria-label="Search help" />
      <b className="sub small">Popular</b>
      {items.map(([title, sub]) => (
        <div key={title} className="col" style={{ borderTop: '1px solid var(--t-line)', paddingTop: 10, gap: 6 }}>
          <button style={{ textAlign: 'left' }} aria-expanded={open === title} onClick={() => setOpen(open === title ? '' : title)}>
            <b>{title}</b><br /><span className="sub small">{sub}</span>
          </button>
          {open === title && title === 'What is DOK?' && (
            <div className="col small" style={{ background: 'var(--t-bg)', borderRadius: 10, padding: 12 }}>
              <span>DOK (Depth of Knowledge) shows how deep the thinking in a question is.</span>
              <span><span className="tag dok1">DOK 1</span> <b>Recall</b>: Remember a fact or follow a rule.</span>
              <span><span className="tag dok2">DOK 2</span> <b>Skills</b>: Use a concept, compare, explain one step.</span>
              <span><span className="tag dok3">DOK 3</span> <b>Strategic thinking</b>: Reason over several steps and justify.</span>
            </div>
          )}
        </div>
      ))}
      <div className="tc col" style={{ marginTop: 'auto' }}>
        <b>Still stuck?</b>
        <span className="sub small">Our team usually answers within a school day.</span>
        <button className="tbtn" onClick={() => { onClose(); toast('Message sent to support. We reply within a school day.') }}>Contact support</button>
      </div>
    </aside>
  )
}

export function Teacher({ children }: { children: ReactNode }) {
  const { t, demo } = useApp()
  const [pop, setPop] = useState<'none' | 'notes' | 'account' | 'help'>('none')
  const links = [
    { to: '/t', en: 'Home', de: 'Start', end: true },
    { to: '/t/exams', en: 'Exams', de: 'Prüfungen' },
    { to: '/t/classes', en: 'Classes', de: 'Klassen' },
    { to: '/t/insights', en: 'Insights', de: 'Einblicke' },
    { to: '/t/alerts', en: 'Alerts', de: 'Hinweise' },
  ]
  const openAlerts = 2 - demo.resolved.length
  const toggle = (p: typeof pop) => setPop(pop === p ? 'none' : p)
  return (
    <div className="tw">
      <header className="nav">
        <Link to="/t" style={{ textDecoration: 'none', color: 'inherit' }}><Brand role={t('Teacher', 'Lehrkraft')} /></Link>
        <nav className="navlinks" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {t(l.en, l.de)}
              {l.to === '/t/alerts' && openAlerts > 0 && <span className="count">{openAlerts}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="nav-right">
          <label className="search"><Search size={16} /><input placeholder={t('Search', 'Suchen')} aria-label="Search" /></label>
          <LangSeg />
          <button className="ico" aria-label="Notifications" aria-expanded={pop === 'notes'} onClick={() => toggle('notes')}><Bell size={22} /><span className="red" /></button>
          <button className="ico" aria-label="Help" onClick={() => toggle('help')}><HelpCircle size={22} /></button>
          <button className="row" aria-label="Account" aria-expanded={pop === 'account'} onClick={() => toggle('account')}>
            <span className="av blue">MS</span>
            <span className="account-name" style={{ fontWeight: 500 }}>Ms. Salma</span>
            <ChevronDown size={18} />
          </button>
          {pop === 'notes' && <NotesPop items={TEACHER_NOTES} footer={{ label: 'See all alerts', to: '/t/alerts' }} onClose={() => setPop('none')} />}
          {pop === 'account' && <AccountPop name="Ms. Salma" email="salma.hassan@school.edu" initials="MS" />}
        </div>
      </header>
      {pop === 'help' && <HelpPanel onClose={() => setPop('none')} />}
      {children}
    </div>
  )
}

export function Confirm({ title, body, cta, onCancel, onOk, danger }: { title: string; body: string; cta: string; onCancel: () => void; onOk: () => void; danger?: boolean }) {
  return (
    <Modal label={title} onClose={onCancel}>
      <div className="col" style={{ gap: 14 }}>
        <h2 className="t2" style={{ fontSize: 20 }}>{title}</h2>
        <p className="sub" style={{ lineHeight: 1.5 }}>{body}</p>
        <div className="row" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
          <button className="tbtn" onClick={onCancel}>Cancel</button>
          <button className={`tbtn ${danger ? 'dngp' : 'pri'}`} onClick={onOk}>{cta}</button>
        </div>
      </div>
    </Modal>
  )
}

export function Wizard({ title, steps, at, saved, onExit, children }: { title: string; steps: string[]; at: number; saved: string; onExit: () => void; children: ReactNode }) {
  return (
    <div className="tw">
      <header className="wiz">
        <button className="row sub" onClick={onExit} style={{ gap: 8, fontWeight: 500 }}><X size={20} /> Exit</button>
        <b style={{ fontSize: 16 }}>{title}</b>
        <ol className="wiz-steps" style={{ listStyle: 'none', padding: 0 }}>
          {steps.map((s, i) => (
            <li key={s} className="row" style={{ gap: 10 }}>
              {i > 0 && <span className={`wiz-line ${i <= at ? 'done' : ''}`} />}
              <span className={`wiz-step ${i === at ? 'now' : i < at ? 'done' : ''}`} aria-current={i === at ? 'step' : undefined}>
                <span className="n">{i < at ? <Check size={14} /> : i + 1}</span> {s}
              </span>
            </li>
          ))}
        </ol>
        <span className="sub small">{saved}</span>
      </header>
      {children}
    </div>
  )
}

export function Foot({ back, msg, next, nextDisabled, onNext, icon }: { back?: () => void; msg: string; next: string; nextDisabled?: boolean; onNext: () => void; icon?: ReactNode }) {
  return (
    <div className="foot">
      {back && <button className="tbtn ghost" onClick={back}><ChevronLeft size={18} /> Back</button>}
      <span className="msg" aria-live="polite">{msg}</span>
      <button className="tbtn pri" disabled={nextDisabled} onClick={onNext}>{icon} {next} {!icon && <ChevronRight size={18} />}</button>
    </div>
  )
}

export function AiBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="aibox">
      <b><Sparkles size={16} /> {title}</b>
      {children}
    </div>
  )
}

export function Sparkline({ values, color = 'var(--t-blue)' }: { values: number[]; color?: string }) {
  const min = 40
  const max = 100
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 110},${30 - ((v - min) / (max - min)) * 30}`).join(' ')
  return (
    <svg width="110" height="32" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  )
}

export function Trend({ series, labels, height = 180, avg }: { series: { name: string; color: string; values: number[]; dashed?: boolean }[]; labels: string[]; height?: number; avg?: boolean }) {
  const w = 640
  const x = (i: number) => 40 + (i / (labels.length - 1)) * (w - 90)
  const y = (v: number) => height - 30 - ((v - 40) / 60) * (height - 50)
  return (
    <svg viewBox={`0 0 ${w} ${height}`} style={{ width: '100%' }} role="img" aria-label={series.map((s) => `${s.name}: ${s.values.join(', ')}`).join('; ')}>
      {[50, 70, 90].map((g) => <line key={g} x1="30" x2={w - 30} y1={y(g)} y2={y(g)} stroke="#eef0f5" />)}
      {series.map((s) => (
        <g key={s.name}>
          <polyline points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} fill="none" stroke={s.color} strokeWidth={s.dashed ? 2 : 3} strokeDasharray={s.dashed ? '7 6' : undefined} />
          {avg && !s.dashed && s.values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="5" fill="#fff" stroke={s.color} strokeWidth="3" />)}
        </g>
      ))}
      {labels.map((l, i) => <text key={l} x={x(i)} y={height - 6} textAnchor="middle" fontSize="13" fill="#5b6478">{l}</text>)}
    </svg>
  )
}
