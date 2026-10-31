import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertTriangle, ArrowRight, Bell, Calendar, Check, CheckCircle2, ChevronRight, CircleCheck, ClipboardCheck, Clock, FileText, Flag, Info, MessageSquare, PartyPopper, Pencil, Plus, RefreshCw, Send, Shield, Sparkles, Star, TrendingDown, TrendingUp, Users, X } from 'lucide-react'
import { Modal, useApp } from '../state'
import { AiBox, Confirm, Sparkline, Teacher, Trend } from './Shell'

export function Home() {
  const nav = useNavigate()
  const { demo } = useApp()
  const kpis = [
    { n: '6', l: 'Exams this term', s: '1 waiting to be graded', c: 'var(--t-blue)', bg: 'var(--t-blue-tint)', icon: FileText, to: '/t/exams', sc: 'inherit' },
    { n: '76%', l: 'Class average', s: '+4% vs last month', c: 'var(--t-ok)', bg: 'var(--t-ok-tint)', icon: TrendingUp, to: '/t/insights', sc: 'var(--t-ok)' },
    { n: String(2 - demo.resolved.length), l: 'Open alerts', s: '1 decline, 1 red flag', c: 'var(--t-bad)', bg: 'var(--t-bad-tint)', icon: Bell, to: '/t/alerts', sc: 'var(--t-bad)' },
    { n: '41', l: 'Stickers earned', s: '12 guardians beaten', c: 'var(--t-warn)', bg: 'var(--t-warn-tint)', icon: Star, to: '/t/classes', sc: 'var(--t-warn)' },
  ]
  return (
    <Teacher>
      <main className="wrap">
        <div className="row sb wrapr">
          <div className="col" style={{ gap: 10 }}>
            <h1 className="t1">Good morning, Ms. Salma</h1>
            <div className="row wrapr"><select className="input" style={{ width: 172 }} aria-label="Class" defaultValue="4B"><option value="4B">Class 4B · Maths</option></select><span className="sub">26 students · Thursday, 12 November</span></div>
          </div>
          <button className="tbtn pri" style={{ padding: '12px 32px' }} onClick={() => nav('/t/new/choose')}><Plus size={20} /> New exam</button>
        </div>
        <section className="hero">
          <div className="col" style={{ gap: 14 }}>
            <span className="tag" style={{ alignSelf: 'flex-start', background: 'rgb(255 255 255 / .2)', color: '#fff' }}>Next up</span>
            <h2 style={{ fontSize: 30, fontWeight: 700 }}>Grade the Fractions quiz</h2>
            <p style={{ lineHeight: 1.5, opacity: .9 }}>All 26 papers are in. The AI has pre-graded them — you check and confirm every grade before students see anything.</p>
            <div className="row wrapr small" style={{ gap: 20 }}>
              <span className="row" style={{ gap: 6 }}><Calendar size={15} /> Class 4B, Maths</span>
              <span className="row" style={{ gap: 6 }}><ClipboardCheck size={15} /> 9 questions</span>
              <span className="row" style={{ gap: 6 }}><Clock size={15} /> 25 points</span>
            </div>
            <div className="row wrapr">
              <button className="tbtn" style={{ color: 'var(--t-ink)', padding: '12px 24px' }} onClick={() => nav('/t/grade/scans')}>Start grading</button>
              <button className="tbtn" style={{ background: 'none', color: '#fff', borderColor: '#fff', padding: '12px 24px' }} onClick={() => nav('/t/exams')}>View exam</button>
            </div>
          </div>
          <div className="glass col">
            <div className="row"><Sparkles size={22} /><div><b>AI pre-graded 26 papers</b><br /><span className="small" style={{ opacity: .85 }}>You decide. Nothing is sent until you confirm.</span></div></div>
            {[['High confidence', 21, '#6ee7a8'], ['Needs a closer look', 5, '#ffc53d'], ['Spelling variants accepted', 3, '#c4b0ff']].map(([l, n, c]) => (
              <div key={l as string} className="row sb"><span className="row" style={{ gap: 8 }}><i style={{ width: 8, height: 8, borderRadius: 4, background: c as string }} /> {l}</span><b>{n}</b></div>
            ))}
            <div className="row" style={{ gap: 2 }}>
              <i style={{ flex: 21, height: 6, background: '#6ee7a8', borderRadius: 3 }} /><i style={{ flex: 5, height: 6, background: '#ffc53d', borderRadius: 3 }} />
            </div>
          </div>
        </section>
        <div className="g4">
          {kpis.map((k) => (
            <button key={k.l} className="tc kpi" onClick={() => nav(k.to)}>
              <span className="ic" style={{ background: k.bg, color: k.c }}><k.icon size={22} /></span>
              <strong>{k.n}</strong>
              <span className="sub">{k.l}</span>
              <span className="small" style={{ color: k.sc }}>{k.s}</span>
            </button>
          ))}
        </div>
        <section className="tc flush">
          <div className="row sb" style={{ padding: '18px 24px' }}>
            <h2 className="t2">Needs your attention</h2>
            <Link to="/t/alerts" className="tlink" style={{ textDecoration: 'none' }}>View all <ArrowRight size={18} /></Link>
          </div>
          {[
            { icon: TrendingDown, av: 'warn', title: 'Youssef T. — grades dropping', body: 'Down in Maths and Science for 3 exams in a row. Message his parents or refer him to Ms. Dina.', cta: 'Review', to: '/t/alerts/youssef' },
            { icon: Flag, av: 'bad', title: 'Same mistake 3 times — Lina A.', body: 'Compared only the top numbers in Q4, Q6 and Q8. Assign the Fraction Guardian so she can practise.', cta: 'Assign Guardian', to: '/t/grade/gaps' },
          ].map((x) => (
            <div key={x.title} className="row sb wrapr" style={{ padding: '20px 24px', borderTop: '1px solid var(--t-line)' }}>
              <span className={`av ${x.av}`} style={{ width: 44, height: 44, alignSelf: 'flex-start' }}><x.icon size={20} /></span>
              <div style={{ flex: 1, minWidth: 240 }}><b style={{ fontWeight: 600 }}>{x.title}</b><p className="sub" style={{ maxWidth: 520, lineHeight: 1.45, marginTop: 4 }}>{x.body}</p></div>
              <button className="tbtn" onClick={() => nav(x.to)}>{x.cta}</button>
            </div>
          ))}
        </section>
      </main>
    </Teacher>
  )
}

const EXAM_ROWS = [
  { name: 'Fractions quiz', sub: 'Maths, 9 questions', status: 'Grading', tag: 'warn', papers: '26 / 26', avg: '–', date: '12 Nov', cta: 'Continue grading', to: '/t/grade/scans', pri: true },
  { name: 'Measuring length', sub: 'Maths, 8 questions', status: 'Draft', tag: '', papers: '–', avg: '–', date: '26 Nov', cta: 'Edit draft', to: '/t/new/choose' },
  { name: 'Plants and seeds', sub: 'Science, 10 questions', status: 'Published', tag: 'ok', papers: '26 / 26', avg: '81%', date: '28 Oct', cta: 'View results', to: '/t/insights' },
  { name: 'Times tables check', sub: 'Maths, 20 questions', status: 'Published', tag: 'ok', papers: '25 / 26', avg: '84%', date: '14 Oct', cta: 'View results', to: '/t/insights' },
  { name: 'Shapes and angles', sub: 'Maths, 7 questions', status: 'Published', tag: 'ok', papers: '26 / 26', avg: '73%', date: '30 Sep', cta: 'View results', to: '/t/insights' },
  { name: 'Water cycle', sub: 'Science, 6 questions', status: 'Published', tag: 'ok', papers: '24 / 26', avg: '79%', date: '16 Sep', cta: 'View results', to: '/t/insights' },
]

export function Exams() {
  const nav = useNavigate()
  return (
    <Teacher>
      <main className="wrap">
        <div className="row sb wrapr">
          <div><h1 className="t1">Exams</h1><p className="sub" style={{ marginTop: 6 }}>Create, grade and publish exams for Class 4B.</p></div>
          <button className="tbtn pri" onClick={() => nav('/t/new/choose')}><Plus size={20} /> New exam</button>
        </div>
        <div className="tc flush scrollx">
          <table className="tbl">
            <thead><tr><th>Exam</th><th>Status</th><th>Papers</th><th>Average</th><th>Date</th><th><span style={{ position: 'absolute', left: -9999 }}>Action</span></th></tr></thead>
            <tbody>
              {EXAM_ROWS.map((e) => (
                <tr key={e.name}>
                  <td><b style={{ fontWeight: 600 }}>{e.name}</b><br /><span className="sub small">{e.sub}</span></td>
                  <td><span className={`tag ${e.tag}`}>{e.status}</span></td>
                  <td>{e.papers}</td><td>{e.avg}</td><td>{e.date}</td>
                  <td style={{ textAlign: 'right' }}><button className={`tbtn ${e.pri ? 'pri' : ''}`} onClick={() => nav(e.to)}>{e.cta}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Teacher>
  )
}

const PUPILS = [
  { i: 'LA', n: 'Lina A.', note: 'Same mistake 3 times', noteC: 'var(--t-warn)', av: 'warn', q: 72, s: [68, 72, 74, 70], weak: 'Comparing fractions', g: true, st: 5, to: '/t/classes/lina' },
  { i: 'YT', n: 'Youssef T.', note: 'Grades dropping', noteC: 'var(--t-bad)', av: 'bad', q: 52, s: [78, 70, 62, 52], weak: 'Several topics', g: false, st: 2, to: '/t/alerts/youssef', red: true },
  { i: 'AK', n: 'Adam K.', q: 88, s: [85, 86, 86, 88], st: 7 },
  { i: 'MS', n: 'Mariam S.', q: 84, s: [82, 82, 84, 84], st: 6 },
  { i: 'OH', n: 'Omar H.', q: 64, s: [65, 67, 66, 64], weak: 'Comparing fractions', g: true, st: 3 },
  { i: 'NE', n: 'Nour E.', q: 92, s: [90, 89, 92, 91], st: 8 },
  { i: 'KB', n: 'Karim B.', q: 68, s: [70, 66, 68, 68], weak: 'Comparing fractions', g: true, st: 4 },
  { i: 'HM', n: 'Hana M.', q: 70, s: [68, 71, 70, 70], weak: 'Comparing fractions', g: true, st: 4 },
  { i: 'ZF', n: 'Ziad F.', q: 80, s: [78, 79, 78, 80], weak: 'Ordering fractions', st: 5 },
] as { i: string; n: string; note?: string; noteC?: string; av?: string; q: number; s: number[]; weak?: string; g?: boolean; st: number; to?: string; red?: boolean }[]

function ClassTabs() {
  const { toast } = useApp()
  return (
    <span className="seg" role="group" aria-label="Class">
      {['Class 4A', 'Class 4B', 'Class 5A'].map((c) => (
        <button key={c} aria-pressed={c === 'Class 4B'} style={{ padding: '8px 24px' }} onClick={() => c !== 'Class 4B' && toast('This demo has data for Class 4B only.')}>{c}</button>
      ))}
    </span>
  )
}

export function Roster() {
  const nav = useNavigate()
  const [view, setView] = useState('all')
  const list = PUPILS.filter((p) => (view === 'all' ? true : view === 'attention' ? !!p.note : p.g))
  const tabs = [
    { id: 'all', label: 'All pupils', n: 26, icon: Users },
    { id: 'attention', label: 'Needs attention', n: 2, icon: AlertTriangle },
    { id: 'guardians', label: 'Guardians active', n: 4, icon: Shield },
  ]
  return (
    <Teacher>
      <main className="wrap">
        <div className="row sb wrapr">
          <div><h1 className="t1">Classes</h1><p className="sub" style={{ marginTop: 6 }}>Class 4B: 26 pupils, Maths and Science. Counsellor: Ms. Dina.</p></div>
          <ClassTabs />
        </div>
        <div className="row wrapr" style={{ gap: 28, borderBottom: '1px solid var(--t-line)' }} role="tablist">
          {tabs.map((x) => (
            <button key={x.id} role="tab" aria-selected={view === x.id} className="row" style={{ gap: 8, padding: '10px 0', fontWeight: 500, color: view === x.id ? 'var(--t-blue)' : '#3b4558', borderBottom: view === x.id ? '2px solid var(--t-blue)' : '2px solid transparent' }} onClick={() => setView(x.id)}>
              <x.icon size={18} /> {x.label} <span className="tag small">{x.n}</span>
            </button>
          ))}
        </div>
        <div className="tc flush scrollx">
          <table className="tbl">
            <thead><tr><th>Pupil</th><th>Fractions quiz</th><th>Last 4 exams</th><th>Weak point</th><th>Guardian</th><th>Stickers</th><th /></tr></thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.n} className={p.to ? 'click' : ''} onClick={() => p.to && nav(p.to)}>
                  <td><span className="row"><span className={`av ${p.av ?? ''}`}>{p.i}</span><span>{p.to ? <Link to={p.to} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }} onClick={(e) => e.stopPropagation()}>{p.n}</Link> : <span style={{ fontWeight: 500 }}>{p.n}</span>}{p.note && <><br /><span className="small" style={{ color: p.noteC }}>{p.note}</span></>}</span></span></td>
                  <td style={{ fontWeight: 600, color: p.red ? 'var(--t-bad)' : undefined }}>{p.q}%</td>
                  <td><Sparkline values={p.s} color={p.red ? 'var(--t-bad)' : undefined} /></td>
                  <td>{p.weak ? <span className="tag">{p.weak}</span> : '–'}</td>
                  <td>{p.g ? <span className="tag ai"><Shield size={13} /> Assigned</span> : '–'}</td>
                  <td><span className="row" style={{ gap: 6, fontWeight: 600 }}>{p.st} <Star size={15} color="#e8890c" /></span></td>
                  <td>{p.to && <ChevronRight size={18} color="#5b6478" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Teacher>
  )
}

export function LinaProfile() {
  const nav = useNavigate()
  const { toast, demo } = useApp()
  const [tab, setTab] = useState('Overview')
  const [noteOpen, setNoteOpen] = useState(false)
  const [notes, setNotes] = useState(['Talked with Lina about comparing fractions. She liked the pizza example.'])
  const [draft, setDraft] = useState('')
  const tabs: [string, number?][] = [['Overview'], ['Exams', 6], ['Practice', 2], ['Notes', notes.length]]
  return (
    <Teacher>
      <main className="wrap">
        <nav className="row small" aria-label="Breadcrumb"><Link to="/t/classes" className="sub" style={{ textDecoration: 'none' }}>Class 4B</Link><ChevronRight size={14} /><b>Lina A.</b></nav>
        <div className="row sb wrapr">
          <div className="row"><span className="av warn" style={{ width: 64, height: 64, fontSize: 20 }}>LA</span><div><h1 className="t1">Lina A.</h1><p className="sub">Class 4B, age 9. Parent: Mrs. A. (English and German)</p></div></div>
          <div className="row"><button className="tbtn" onClick={() => nav('/t/classes/lina/message')}><MessageSquare size={18} /> Message parent</button><button className="tbtn" onClick={() => setNoteOpen(true)}><Pencil size={18} /> Add a note</button></div>
        </div>
        <div className="row wrapr" style={{ gap: 28, borderBottom: '1px solid var(--t-line)' }} role="tablist">
          {tabs.map(([x, n]) => (
            <button key={x} role="tab" aria-selected={tab === x} style={{ padding: '10px 0', fontWeight: 500, color: tab === x ? 'var(--t-blue)' : '#3b4558', borderBottom: tab === x ? '2px solid var(--t-blue)' : '2px solid transparent' }} onClick={() => setTab(x)}>{x} {n !== undefined && <span className="tag small">{n}</span>}</button>
          ))}
        </div>
        {tab === 'Overview' && (
          <>
            <div className="g-side" style={{ gridTemplateColumns: 'minmax(0,1fr) 368px' }}>
              <section className="tc">
                <h2 className="t2">Maths scores this term</h2><p className="sub small">Class average shown as a dashed line</p>
                <Trend avg height={220} labels={['Shapes', 'Times tables', 'Plants', 'Fractions']} series={[{ name: 'Class average', color: '#9a9db0', values: [68, 85, 80, 76], dashed: true }, { name: 'Lina', color: '#1570ef', values: [64, 76, 72, 72] }]} />
              </section>
              <section className="tc col">
                <h2 className="t2">At a glance</h2>
                {[['Latest score', '72% (18 / 25)'], ['Class average', '76%'], ['Stickers', '5 of 12'], ['Practice this week', '2 sessions, 18 min']].map(([k, v]) => (
                  <div key={k} style={{ borderTop: '1px solid var(--t-line)', paddingTop: 8 }}><span className="sub small">{k}</span><br /><b style={{ fontWeight: 600 }}>{v}</b></div>
                ))}
              </section>
            </div>
            <section className="tc col">
              <h2 className="t2">Weak points and guardians</h2>
              {[
                { title: 'Comparing fractions', sub: demo.beaten ? 'Fraction Guardian, Beaten on 14 Nov' : 'Fraction Guardian, Waiting on her map', subC: demo.beaten ? 'var(--t-ok)' : undefined, before: 33, after: demo.beaten ? 83 : null },
                { title: 'Spelling maths words', sub: 'Spelling Guardian, Waiting on her map', before: 60, after: null },
              ].map((w) => (
                <div key={w.title} className="row wrapr" style={{ border: '1px solid var(--t-line)', borderRadius: 12, padding: '14px 18px', background: '#fbfbfd', gap: 20 }}>
                  <div style={{ flex: 2, minWidth: 220 }}><b style={{ fontWeight: 600 }}>{w.title}</b><br /><span className="small sub" style={{ color: w.subC }}>{w.sub}</span></div>
                  <div style={{ flex: 1, minWidth: 180 }}><span className="sub small">Before</span><div className="row"><div className="prog" style={{ flex: 1 }}><i style={{ width: `${w.before}%`, background: '#f5900b' }} /></div><b className="small">{w.before}%</b></div></div>
                  <div style={{ flex: 1, minWidth: 180 }}><span className="sub small">After</span>{w.after ? <div className="row"><div className="prog" style={{ flex: 1 }}><i style={{ width: `${w.after}%`, background: 'var(--t-ok)' }} /></div><b className="small" style={{ color: 'var(--t-ok)' }}>{w.after}%</b></div> : <div className="small sub">Not started yet</div>}</div>
                </div>
              ))}
            </section>
          </>
        )}
        {tab === 'Exams' && <section className="tc col">{[['Fractions quiz', '72%', '12 Nov'], ['Plants and seeds', '74%', '28 Oct'], ['Times tables check', '78%', '14 Oct'], ['Shapes and angles', '70%', '30 Sep']].map(([e, s, d]) => <div key={e} className="row sb"><span>{e}</span><span className="sub">{d}</span><b>{s}</b></div>)}</section>}
        {tab === 'Practice' && <section className="tc col"><div className="row sb"><span>Fraction Guardian</span><b>{demo.beaten ? 'Beaten' : 'Assigned'}</b></div><div className="row sb"><span>Spelling Guardian</span><b>1 of 3 riddles</b></div></section>}
        {tab === 'Notes' && <section className="tc col">{notes.map((n) => <p key={n} style={{ borderLeft: '3px solid var(--t-line)', paddingLeft: 12 }}>{n}</p>)}</section>}
      </main>
      {noteOpen && (
        <Modal label="Add a note" width={480} onClose={() => setNoteOpen(false)}>
          <div className="col" style={{ gap: 14 }}>
            <h2 className="t2" style={{ fontSize: 20 }}>Add a note about Lina</h2>
            <p className="sub small">Only teachers and Ms. Dina can see notes.</p>
            <textarea className="ta" aria-label="Note" autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Talked with Lina about comparing fractions. She liked the pizza example." />
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button className="tbtn" onClick={() => setNoteOpen(false)}>Cancel</button>
              <button className="tbtn pri" disabled={!draft.trim()} onClick={() => { setNotes([draft.trim(), ...notes]); setDraft(''); setNoteOpen(false); toast('Note saved to Lina’s profile') }}>Save note</button>
            </div>
          </div>
        </Modal>
      )}
    </Teacher>
  )
}

function Timeline({ steps }: { steps: { label: string; when: string; done: boolean }[] }) {
  return (
    <div className="col" style={{ gap: 4 }}>
      {steps.map((s) => (
        <div key={s.label} className="tline">
          {s.done ? <CheckCircle2 size={20} color="var(--t-ok)" /> : <Clock size={20} color="#9aa1b3" />}
          <span style={{ flex: 1, fontWeight: s.done ? 500 : 400 }}>{s.label}</span>
          <span className="sub small">{s.when}</span>
        </div>
      ))}
    </div>
  )
}

type Outcome = 'none' | 'sent' | 'referred' | 'failed'

function ActionPanel({ who, parentLabel, drafts, altDraft, parentConfirm, referConfirm, outcome, setOutcome, backTo, backLabel, sentTitle, sentBody, parentReadLabel, referBody, showFail }: {
  who: string; parentLabel: string; drafts: { en: string; de: string }; altDraft: string; parentConfirm: [string, string]; referConfirm: [string, string]; outcome: Outcome; setOutcome: (o: Outcome) => void; backTo: string; backLabel: string; sentTitle: string; sentBody: string; parentReadLabel: string; referBody: string; showFail?: boolean
}) {
  const nav = useNavigate()
  const { toast } = useApp()
  const [mode, setMode] = useState<'parent' | 'refer'>('parent')
  const [lang, setLang] = useState<'en' | 'de'>('en')
  const [text, setText] = useState(drafts)
  const [modal, setModal] = useState<'none' | 'send' | 'refer'>('none')
  const [note, setNote] = useState(`Could you check in with ${who} this week?`)

  if (outcome !== 'none') {
    const undo = () => setOutcome('none')
    return (
      <section className="tc col" aria-live="polite">
        {outcome === 'failed' ? (
          <>
            <h2 className="t2 row" style={{ color: 'var(--t-bad)' }}><AlertTriangle size={20} /> Message not sent</h2>
            <p className="sub">The connection dropped. Your message is saved, so nothing is lost.</p>
            <div className="row"><button className="tbtn pri" onClick={() => setOutcome('sent')}><RefreshCw size={18} /> Try again</button><button className="tbtn" onClick={() => nav(backTo)}>{backLabel}</button></div>
          </>
        ) : (
          <>
            <h2 className="t2 row"><CircleCheck size={22} color="var(--t-ok)" /> {outcome === 'sent' ? sentTitle : 'Referred to Ms. Dina'}</h2>
            <p className="sub">{outcome === 'sent' ? sentBody : referBody}</p>
            <Timeline steps={outcome === 'sent' ? [{ label: 'Sent', when: 'Today, 21:10', done: true }, { label: 'Delivered', when: '', done: true }, { label: parentReadLabel, when: 'Waiting', done: false }] : [{ label: 'Sent', when: 'Today, 21:10', done: true }, { label: 'Received by Ms. Dina', when: 'Today, 21:11', done: true }, { label: 'Check-in planned', when: 'Waiting', done: false }]} />
            <div className="row"><button className="tbtn" onClick={() => nav(backTo)}>{backLabel}</button><button className="tbtn ghost" onClick={undo}>Undo</button></div>
          </>
        )}
      </section>
    )
  }

  return (
    <section className="tc col">
      <h2 className="t2">What would you like to do?</h2>
      <div className="col" style={{ border: mode === 'parent' ? '2px solid var(--t-blue)' : '1px solid var(--t-line)', borderRadius: 12, padding: 14 }}>
        <div className="row sb wrapr">
          <button className="row" style={{ textAlign: 'left' }} aria-pressed={mode === 'parent'} onClick={() => setMode('parent')}>
            <span className={`radio ${mode === 'parent' ? 'on' : ''}`} />
            <span><b style={{ fontWeight: 600 }}>{parentLabel}</b><br /><span className="sub small">Draft by AI in English and German. Edit before sending.</span></span>
          </button>
          <span className="seg">{(['en', 'de'] as const).map((l) => <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>)}</span>
        </div>
        {mode === 'parent' && (
          <>
            <textarea className="ta" aria-label="Message draft" style={{ minHeight: 200, background: '#fbfbfd' }} value={text[lang]} onChange={(e) => setText({ ...text, [lang]: e.target.value })} />
            <div className="row wrapr">
              <button className="tbtn pri" disabled={!text[lang].trim()} onClick={() => setModal('send')}><Send size={18} /> Approve and send</button>
              <button className="tbtn" onClick={() => { setText({ ...text, en: altDraft }); setLang('en'); toast('New draft written. Check it before you send.') }}><RefreshCw size={18} /> Regenerate</button>
              {showFail && <button className="tbtn ghost small" onClick={() => setOutcome('failed')}>Simulate lost connection</button>}
            </div>
          </>
        )}
      </div>
      <div className="col" style={{ border: mode === 'refer' ? '2px solid var(--t-blue)' : '1px solid var(--t-line)', borderRadius: 12, padding: 14 }}>
        <button className="row" style={{ textAlign: 'left' }} aria-pressed={mode === 'refer'} onClick={() => setMode('refer')}>
          <span className={`radio ${mode === 'refer' ? 'on' : ''}`} />
          <span><b style={{ fontWeight: 600 }}>Refer to the counsellor, Ms. Dina</b><br /><span className="sub small">She gets the results and your note. Parents are not told automatically.</span></span>
        </button>
        {mode === 'refer' && (
          <>
            <label><span className="fl">Your note</span><textarea className="ta" value={note} onChange={(e) => setNote(e.target.value)} /></label>
            <button className="tbtn pri" style={{ alignSelf: 'flex-start' }} onClick={() => setModal('refer')}>Refer to Ms. Dina</button>
          </>
        )}
      </div>
      {modal === 'send' && <Confirm title={parentConfirm[0]} body={parentConfirm[1]} cta="Send message" onCancel={() => setModal('none')} onOk={() => { setModal('none'); setOutcome('sent') }} />}
      {modal === 'refer' && <Confirm title={referConfirm[0]} body={referConfirm[1]} cta="Refer to Ms. Dina" onCancel={() => setModal('none')} onOk={() => { setModal('none'); setOutcome('referred') }} />}
    </section>
  )
}

export function LinaMessage() {
  const [outcome, setOutcome] = useState<Outcome>('none')
  return (
    <Teacher>
      <main className="wrap">
        <nav className="row small" aria-label="Breadcrumb"><Link to="/t/classes/lina" className="sub" style={{ textDecoration: 'none' }}>Lina A.</Link><ChevronRight size={14} /><b>Message parent</b></nav>
        <div><h1 className="t1">{outcome === 'none' ? 'Next step for Lina' : 'Message Lina’s parent'}</h1><p className="sub" style={{ marginTop: 6 }}>{outcome === 'none' ? 'Message her parent, or ask the counsellor to check in.' : 'To Mrs. A., Lina’s mother. Sent in the app and by email.'}</p></div>
        <div className="g2" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.5fr)', alignItems: 'start' }}>
          <section className="tc col">
            <h2 className="t2">What the message is based on</h2>
            {[['Fractions quiz', '18 of 25 (72%), class average 76%'], ['Repeated mistake', 'Compared only the top numbers in Q4, Q6 and Q8'], ['Practice assigned', 'Fraction Guardian, about 10 minutes']].map(([k, v]) => (
              <div key={k}><b style={{ fontWeight: 600 }}>{k}</b><br /><span className="sub small">{v}</span></div>
            ))}
          </section>
          <ActionPanel
            who="Lina" parentLabel="Drafted by AI from Lina’s results" outcome={outcome} setOutcome={setOutcome}
            drafts={{ en: 'Dear Mrs. A.,\n\nLina did well on the Fractions quiz (18 of 25). She mixes up which fraction is bigger when the bottom numbers are different, so I have given her a short practice game in the app, the Fraction Guardian.\n\nKind regards,\nMs. Salma', de: 'Liebe Frau A.,\n\nLina hat beim Bruchrechnen-Test gut abgeschnitten (18 von 25). Sie verwechselt, welcher Bruch größer ist, wenn die Nenner verschieden sind. Deshalb habe ich ihr ein kurzes Übungsspiel in der App gegeben, den Bruch-Wächter.\n\nFreundliche Grüße\nFrau Salma' }}
            altDraft={'Dear Mrs. A.,\n\nLina scored 18 of 25 on the Fractions quiz. Comparing fractions with different bottom numbers is the one thing to work on, and the Fraction Guardian in the app will help her practise it.\n\nKind regards,\nMs. Salma'}
            parentConfirm={['Send this message to Mrs. A.?', 'She gets it in the app and by email. You can undo for 10 seconds.']}
            referConfirm={['Refer Lina to Ms. Dina?', 'She sees Lina’s results and your note. Her parent is not told automatically.']}
            backTo="/t/classes/lina" backLabel="Back to profile"
            sentTitle="Message sent to Mrs. A." sentBody="She’ll see it in the app and by email. Replies appear in Alerts." parentReadLabel="Read by Mrs. A."
            referBody="She has Lina’s results and your note. Parents are not told automatically."
          />
        </div>
      </main>
    </Teacher>
  )
}

export function Insights() {
  const missed = [['Q8', 'Which is bigger, 5/6 or 7/9?', 58], ['Q6', 'Which is bigger, 5/8 or 3/5?', 46], ['Q4', 'Which is bigger, 3/4 or 2/3?', 42], ['Q7', 'Share 3 pizzas between 4 friends', 38], ['Q5', 'Order 1/3, 1/6 and 1/2', 19]] as const
  const dok = [['DOK 1', 92, '#2e90fa', 'dok1'], ['DOK 2', 70, '#7a5af8', 'dok2'], ['DOK 3', 61, '#f79009', 'dok3']] as const
  return (
    <Teacher>
      <main className="wrap">
        <div className="row sb wrapr">
          <div><h1 className="t1">Insights</h1><p className="sub" style={{ marginTop: 6 }}>How the class did on an exam, and whether practice is helping.</p></div>
          <div className="row wrapr"><ClassTabs /><select className="input" style={{ width: 220 }} aria-label="Exam" defaultValue="f"><option value="f">Fractions quiz, 12 Nov</option></select></div>
        </div>
        <div className="row" style={{ background: 'var(--t-ai-tint)', border: '1px solid #ddd2fb', borderRadius: 14, padding: '16px 20px', color: '#4a2aa8' }}>
          <span className="av" style={{ background: '#fff', color: 'var(--t-ai)' }}><Sparkles size={18} /></span>
          <div><b style={{ fontWeight: 600 }}>The class is strong on recall but drops on comparing fractions.</b><br /><span className="small">AI summary, 87% confident. Based on 26 papers and 41 practice sessions. Check the questions below for the evidence.</span></div>
        </div>
        <div className="g2">
          <section className="tc col">
            <div><h2 className="t2">Most-missed questions</h2><p className="sub small">Share of points lost</p></div>
            {missed.map(([q, text, pct]) => (
              <div key={q}>
                <div className="row sb small"><span className="row"><b>{q}</b> <span className="sub">{text}</span></span><b style={{ color: pct >= 40 ? 'var(--t-bad)' : undefined }}>{pct}%</b></div>
                <div className="prog" style={{ marginTop: 6 }}><i style={{ width: `${pct}%`, background: pct >= 40 ? '#f46a5e' : '#98a2b3' }} /></div>
              </div>
            ))}
          </section>
          <section className="tc col">
            <div><h2 className="t2">Average score by DOK level</h2><p className="sub small">Points earned out of points possible</p></div>
            <div className="row" style={{ alignItems: 'flex-end', justifyContent: 'space-around', height: 250, borderBottom: '1px solid var(--t-line)' }}>
              {dok.map(([d, v, c]) => (
                <div key={d} className="col" style={{ alignItems: 'center', gap: 4 }}><b>{v}%</b><div style={{ width: 72, height: v * 2.2, background: c, borderRadius: '8px 8px 0 0' }} /></div>
              ))}
            </div>
            <div className="row" style={{ justifyContent: 'space-around' }}>{dok.map(([d, , , k]) => <span key={d} className={`tag ${k}`}>{d}</span>)}</div>
          </section>
        </div>
        <section className="tc col">
          <div><h2 className="t2">Guardians, before and after</h2><p className="sub small">Correct answers on the skill, first try in practice vs latest try</p></div>
          {[{ n: 'Fraction Guardian', s: '4 pupils, 3 beaten', a: 35, b: 79, l: '35% to 79%' }, { n: 'Spelling Guardian', s: '3 pupils, not started', a: 58, l: '58% so far' }].map((g) => (
            <div key={g.n} className="row wrapr" style={{ gap: 24 }}>
              <div style={{ width: 200 }}><b style={{ fontWeight: 600 }}>{g.n}</b><br /><span className="sub small">{g.s}</span></div>
              <div className="prog" style={{ flex: 1, minWidth: 180, position: 'relative', overflow: 'visible' }}>
                <i style={{ width: `${g.a}%`, background: '#ffc53d' }} />
                {g.b && <span style={{ position: 'absolute', left: `${g.b}%`, top: -4, width: 16, height: 16, borderRadius: '50%', background: 'var(--t-ok)' }} />}
              </div>
              <b style={{ width: 100, color: g.b ? 'var(--t-ok)' : undefined }}>{g.l}</b>
            </div>
          ))}
        </section>
      </main>
    </Teacher>
  )
}

export function Alerts() {
  const nav = useNavigate()
  const { demo, toast } = useApp()
  const [rules, setRules] = useState(false)
  const [drop, setDrop] = useState(3)
  const [times, setTimes] = useState(3)
  const [auto, setAuto] = useState(false)
  const alerts = [
    { id: 'youssef', n: 'Youssef T.', tag: 'Decline', tagC: 'bad', icon: TrendingDown, title: 'Grades dropping in Maths and Science', body: 'Down in 3 exams in a row: Maths 78% to 52%, Science 81% to 66%.', cta: 'Review', pri: true, to: '/t/alerts/youssef', av: 'bad' },
    { id: 'lina', n: 'Lina A.', tag: 'Red flag', tagC: 'warn', icon: Flag, title: 'Same mistake 3 times', body: 'Compared the top numbers only in Q4, Q6 and Q8. Fraction Guardian assigned, practice not finished yet.', cta: 'View progress', pri: false, to: '/t/classes/lina', av: 'warn' },
  ].filter((a) => !demo.resolved.includes(a.id))
  return (
    <Teacher>
      <main className="wrap" style={{ gap: 16 }}>
        <div style={{ marginBottom: 8 }}><h1 className="t1">Alerts</h1><p className="sub" style={{ marginTop: 6 }}>Pupils who may need help. Alerts are suggestions; you decide what happens next.</p></div>
        {alerts.map((a) => (
          <section key={a.id} className="tc row wrapr" style={{ alignItems: 'flex-start', gap: 20, padding: '20px 24px' }}>
            <span className={`av ${a.av}`} style={{ width: 44, height: 44 }}><a.icon size={20} /></span>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div className="row wrapr"><b style={{ fontWeight: 600, fontSize: 16 }}>{a.n}</b><span className={`tag ${a.tagC}`}>{a.tag}</span></div>
              <p style={{ fontWeight: 500, marginTop: 6 }}>{a.title}</p>
              <p className="sub small" style={{ marginTop: 4, lineHeight: 1.45 }}>{a.body}</p>
            </div>
            <div className="col" style={{ alignItems: 'flex-end', gap: 16 }}>
              <span className="sub small">Today</span>
              <button className={`tbtn ${a.pri ? 'pri' : ''}`} style={{ width: 144 }} onClick={() => nav(a.to)}>{a.cta}</button>
            </div>
          </section>
        ))}
        {alerts.length === 0 && <section className="tc row"><PartyPopper color="var(--t-ok)" /> No open alerts. Nice work.</section>}
        <section className="tc row sb wrapr" style={{ marginTop: 16, padding: '20px' }}>
          <span className="row small" style={{ flex: 1, minWidth: 240 }}><Info size={18} style={{ flex: 'none' }} /> You get a decline alert when a pupil’s score drops in {drop} exams in a row, and a red flag when the same mistake shows up {times} times.</span>
          <button className="tlink small" onClick={() => setRules(true)}>Change rules</button>
        </section>
      </main>
      {rules && (
        <Modal label="Alert rules" width={520} onClose={() => setRules(false)}>
          <div className="col" style={{ gap: 16 }}>
            <div className="row sb"><h2 className="t2" style={{ fontSize: 20 }}>Alert rules</h2><button aria-label="Close" onClick={() => setRules(false)}><X size={20} /></button></div>
            <p className="sub">Choose when PrimaryPath tells you about a pupil.</p>
            <div><b style={{ fontWeight: 600 }}>Grades dropping</b><div className="row">When scores drop in <input className="input" style={{ width: 70 }} type="number" min={2} max={6} aria-label="Exams in a row" value={drop} onChange={(e) => setDrop(Number(e.target.value))} /> exams in a row</div></div>
            <div><b style={{ fontWeight: 600 }}>Same mistake</b><div className="row">When a pupil makes the same mistake <input className="input" style={{ width: 70 }} type="number" min={2} max={6} aria-label="Times" value={times} onChange={(e) => setTimes(Number(e.target.value))} /> times</div></div>
            <div className="row sb"><div><b style={{ fontWeight: 600 }}>Tell the counsellor</b><br /><span className="sub small">Send decline alerts to Ms. Dina automatically</span></div><button className="switch" role="switch" aria-checked={auto} aria-label="Tell the counsellor" onClick={() => setAuto(!auto)}><i /></button></div>
            <div className="row" style={{ justifyContent: 'flex-end' }}><button className="tbtn" onClick={() => setRules(false)}>Cancel</button><button className="tbtn pri" onClick={() => { setRules(false); toast('Alert rules saved') }}>Save rules</button></div>
          </div>
        </Modal>
      )}
    </Teacher>
  )
}

export function YoussefAlert() {
  const nav = useNavigate()
  const { demo, set } = useApp()
  const [outcome, setOutcome] = useState<Outcome>('none')
  return (
    <Teacher>
      <main className="wrap">
        <nav className="row small" aria-label="Breadcrumb"><Link to="/t/alerts" className="sub" style={{ textDecoration: 'none' }}>Alerts</Link><ChevronRight size={14} /><b>Youssef T.</b></nav>
        <div>
          <div className="row wrapr"><h1 className="t1">Youssef’s grades are dropping</h1><span className="tag bad"><TrendingDown size={14} /> Decline</span></div>
          <p className="sub" style={{ marginTop: 6 }}>Class 4B, age 9. Counsellor: Ms. Dina.</p>
        </div>
        <div className="g2" style={{ alignItems: 'start' }}>
          <div className="col" style={{ gap: 24 }}>
            <section className="tc">
              <h2 className="t2">Last 4 exams</h2>
              <div className="row small" style={{ margin: '6px 0' }}><span className="row" style={{ gap: 6 }}><i style={{ width: 8, height: 8, borderRadius: 4, background: '#1570ef' }} /> Maths</span><span className="row" style={{ gap: 6 }}><i style={{ width: 8, height: 8, borderRadius: 4, background: '#7a5af8' }} /> Science</span></div>
              <Trend labels={['Shapes', 'Times tables', 'Plants', 'Fractions']} series={[{ name: 'Maths', color: '#1570ef', values: [78, 70, 61, 52] }, { name: 'Science', color: '#7a5af8', values: [81, 77, 75, 66] }]} />
            </section>
            <AiBox title="What the AI noticed, 84% confident">
              <ul style={{ margin: '4px 0 12px', paddingLeft: 18, lineHeight: 1.6 }}>
                <li>Scores fell in both subjects at the same time, so it is probably not one topic.</li>
                <li>He finished only 1 practice session in 3 weeks (class average: 4).</li>
                <li>His last two papers had blank answers at the end.</li>
              </ul>
              This is a pattern, not a diagnosis. Talk to Youssef before deciding.
            </AiBox>
            <button className="tbtn ghost" style={{ alignSelf: 'flex-start' }} onClick={() => { set({ resolved: [...demo.resolved, 'youssef'] }); nav('/t/alerts') }}><Check size={18} /> Mark as resolved</button>
          </div>
          <ActionPanel
            who="Youssef" parentLabel="Send a message to his parents" outcome={outcome} setOutcome={setOutcome} showFail
            drafts={{ en: 'Dear Mr. and Mrs. T.,\n\nYoussef’s recent Maths and Science results have been lower than usual. He is a capable pupil, and I would like to help him get back on track. Could we have a short call this week? You can reply here or book a time below.\n\nKind regards,\nMs. Salma', de: 'Liebe Familie T.,\n\nYoussefs Ergebnisse in Mathe und Sachkunde waren zuletzt niedriger als sonst. Er ist ein fähiger Schüler, und ich möchte ihm helfen, wieder auf Kurs zu kommen. Könnten wir diese Woche kurz telefonieren? Sie können hier antworten oder unten einen Termin buchen.\n\nFreundliche Grüße\nFrau Salma' }}
            altDraft={'Dear Mr. and Mrs. T.,\n\nI have noticed that Youssef’s last few results in Maths and Science have dipped. I would love to talk about how we can support him together. Is a short call this week possible?\n\nKind regards,\nMs. Salma'}
            parentConfirm={['Send this message to Youssef’s parents?', 'They get it in the app and by email, in English and German. You can undo for 10 seconds.']}
            referConfirm={['Refer Youssef to Ms. Dina?', 'She sees his grades, alerts and your note. His parents are not told automatically.']}
            backTo="/t/alerts" backLabel="Back to alerts"
            sentTitle="Message sent to Youssef’s parents" sentBody="Sent in English and German. You’ll see their reply in Alerts." parentReadLabel="Read by parents"
            referBody="She has the chart and your note. Parents are not told automatically."
          />
        </div>
      </main>
    </Teacher>
  )
}

export function Published() {
  const nav = useNavigate()
  const [left, setLeft] = useState(10)
  useEffect(() => {
    if (left <= 0) return
    const id = window.setTimeout(() => setLeft(left - 1), 1000)
    return () => window.clearTimeout(id)
  }, [left])
  return (
    <Teacher>
      <main className="wrap" style={{ maxWidth: 720, textAlign: 'center', alignItems: 'center' }}>
        {left > 0 && (
          <div className="banner" style={{ alignSelf: 'stretch', justifyContent: 'space-between' }} role="status">
            <span className="row"><Check size={18} /> Published. Pupils are being notified.</span>
            <button className="tlink" onClick={() => nav('/t/grade/publish')}>Undo ({left}s)</button>
          </div>
        )}
        <CheckCircle2 size={72} color="var(--t-ok)" style={{ marginTop: 48 }} />
        <h1 className="t1">Results published to Class 4B</h1>
        <p className="sub" style={{ fontSize: 17 }}>26 pupils can now see their grade and feedback. 4 guardians are waiting on their maps.</p>
        <div className="row wrapr" style={{ justifyContent: 'center' }}>
          <button className="tbtn pri" onClick={() => nav('/t')}>Back to Home</button>
          <button className="tbtn" onClick={() => nav('/t/insights')}>View class insights</button>
        </div>
      </main>
    </Teacher>
  )
}
