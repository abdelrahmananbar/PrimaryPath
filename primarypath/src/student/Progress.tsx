import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Lock, ShieldCheck } from 'lucide-react'
import { Art } from '../art'
import { useApp } from '../state'
import { Pip, Spread, Student, useStickerCount } from './Shell'

export function Trail() {
  const { t, demo } = useApp()
  const nav = useNavigate()
  const [subject, setSubject] = useState('Maths')
  const stickers = useStickerCount()
  const points = [
    { x: 80, y: 60, s: 90, name: t('Shapes', 'Formen') },
    { x: 240, y: 230, s: 64, name: t('Times tables', 'Einmaleins') },
    { x: 400, y: 100, s: 85, name: t('Word problems', 'Textaufgaben') },
    { x: 540, y: 180, s: 72, name: t('Fractions', 'Brüche') },
  ]
  const line = points.map((p) => `${p.x},${p.y}`).join(' ')
  const weak = [
    { title: t('Comparing fractions', 'Brüche vergleichen'), meta: demo.beaten ? t('Maths · Before: 0 of 3 right · Now: 4 of 5', 'Mathe · Vorher: 0 von 3 · Jetzt: 4 von 5') : t('Maths · Fraction Guardian · 0 of 5 riddles', 'Mathe · Bruch-Wächter · 0 von 5 Rätseln'), status: demo.beaten ? t('Fixed today', 'Heute gelöst') : t('Practising', 'Am Üben'), fixed: demo.beaten, subject: 'Maths', hot: true },
    { title: t('Spelling long words', 'Lange Wörter schreiben'), meta: t('English · Spelling Guardian · 1 of 3 riddles', 'Englisch · Rechtschreib-Wächter · 1 von 3 Rätseln'), status: t('Practising', 'Am Üben'), fixed: false, subject: 'English' },
    { title: t('Times tables (7× and 8×)', 'Einmaleins (7× und 8×)'), meta: t('Maths · Before: 64% · Now: 85%', 'Mathe · Vorher: 64% · Jetzt: 85%'), status: t('Fixed 28 Sep', 'Gelöst 28. Sep'), fixed: true, subject: 'Maths' },
    { title: t('Plant parts', 'Pflanzenteile'), meta: t('Science · Before: 1 of 4 · Now: 4 of 4', 'Sachkunde · Vorher: 1 von 4 · Jetzt: 4 von 4'), status: t('Fixed 25 Sep', 'Gelöst 25. Sep'), fixed: true, subject: 'Science' },
    { title: t('Reading long questions', 'Lange Fragen lesen'), meta: t('English · Before: 2 of 5 · Now: 5 of 5', 'Englisch · Vorher: 2 von 5 · Jetzt: 5 von 5'), status: t('Fixed 20 Sep', 'Gelöst 20. Sep'), fixed: true, subject: 'English' },
    { title: t('Naming shapes', 'Formen benennen'), meta: t('Maths · Before: 3 of 6 · Now: 6 of 6', 'Mathe · Vorher: 3 von 6 · Jetzt: 6 von 6'), status: t('Fixed 15 Sep', 'Gelöst 15. Sep'), fixed: true, subject: 'Maths' },
  ]
  const fixedCount = weak.filter((w) => w.fixed).length
  const todo = weak.length - fixedCount
  const list = weak.filter((w) => subject === 'All' || w.subject === subject)
  const stats = [
    { n: fixedCount, label: t('weak points fixed', 'Schwachstellen gelöst'), bg: 'var(--leaf-tint)' },
    { n: todo, label: t('to practise', 'zum Üben'), bg: 'var(--grape-tint)' },
    { n: stickers, label: t('stickers earned', 'Sticker verdient'), bg: 'var(--sun-tint)' },
  ]
  return (
    <Student title={t('My trail so far', 'Mein Weg bisher')} tab="progress">
      <Spread
        pages={[21, 22]}
        left={
          <>
            <div className="chips">
              {[['All', 'Alle'], ['Maths', 'Mathe'], ['Science', 'Sachkunde'], ['English', 'Englisch'], ['German', 'Deutsch']].map(([en, de]) => (
                <button key={en} className="chip" aria-pressed={subject === en} onClick={() => setSubject(en)}>{t(en, de)}</button>
              ))}
            </div>
            <div className="card" style={{ background: 'var(--sky-tint)' }}>
              <svg viewBox="0 0 620 340" style={{ width: '100%' }} role="img" aria-label={points.map((p) => `${p.name} ${p.s}%`).join(', ')}>
                {[60, 140, 220, 280].map((y) => <line key={y} x1="30" x2="600" y1={y} y2={y} stroke="#c8d6ea" strokeWidth="2" />)}
                <polyline points={line} fill="none" stroke="#dcbb8a" strokeWidth="18" strokeLinejoin="round" />
                <polyline points={line} fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="9 10" />
                {points.map((p, i) => (
                  <g key={p.name}>
                    <circle cx={p.x} cy={p.y + 4} r="36" fill="#1f2547" />
                    <circle cx={p.x} cy={p.y} r="35" fill={i === 3 ? '#5bb8f0' : '#fff'} stroke="#1f2547" strokeWidth="3.5" />
                    <text x={p.x} y={p.y + 8} textAnchor="middle" fontFamily="Luckiest Guy" fontSize="20" fill="#1f2547">{p.s}%</text>
                    <text x={p.x} y="325" textAnchor="middle" fontFamily="Andika" fontWeight="700" fontSize="16" fill="#1f2547">{p.name}</text>
                  </g>
                ))}
              </svg>
            </div>
            {demo.beaten && <Pip>{t('Look! Comparing fractions moved to Fixed today.', 'Schau! Brüche vergleichen ist jetzt heute gelöst.')}</Pip>}
          </>
        }
        right={
          <>
            <div className="grid2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {stats.map((s) => (
                <div key={s.label} className="card lift col" style={{ background: s.bg, alignItems: 'center', textAlign: 'center', gap: 4, padding: 12 }}>
                  <span className="dsp" style={{ fontSize: 50 }}>{s.n}</span>
                  <b>{s.label}</b>
                </div>
              ))}
            </div>
            <div className="row wrapr">
              <h2 className="dsp" style={{ fontSize: 28 }}>{t('My weak points', 'Meine Schwachstellen')}</h2>
              <span className="soft" style={{ flex: 1, minWidth: 220 }}>{t('A weak point is fixed when you beat its Guardian.', 'Eine Schwachstelle ist gelöst, wenn du ihren Wächter besiegst.')}</span>
            </div>
            {list.map((w) => (
              <button
                key={w.title}
                className="row-a row sb"
                style={{ background: w.hot && w.fixed ? 'var(--leaf-tint)' : w.fixed ? '#fff' : 'var(--grape-tint)', cursor: w.fixed ? 'default' : 'pointer' }}
                onClick={() => !w.fixed && nav('/s/cave')}
              >
                <span>{w.title}<small>{w.meta}</small></span>
                <span className="row" style={{ border: '2px solid var(--ink)', background: w.fixed ? 'var(--leaf-tint)' : '#fff', borderRadius: 10, padding: '2px 10px', fontSize: 17, whiteSpace: 'nowrap', gap: 6 }}>
                  {w.fixed ? <Check size={18} /> : <ShieldCheck size={18} />} {w.status}
                </span>
              </button>
            ))}
          </>
        }
      />
    </Student>
  )
}

const FRAMES = ['#f27ba6', '#8c6bd9', '#5bb8f0']
const STYLES: Record<string, React.CSSProperties> = {
  Bubbly: { color: 'var(--sky)', WebkitTextStroke: '1px var(--ink)' },
  Purple: { color: '#5b34b8' },
  Rainbow: { backgroundImage: 'linear-gradient(90deg,#ef7b63,#ffcc4d,#6cc24a,#5bb8f0,#8c6bd9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' },
}

function StarBadge() {
  return (
    <svg viewBox="0 0 100 100" width="120" aria-hidden="true">
      <path d="M50 6l13 28 31 4-23 21 6 31-27-15-27 15 6-31L6 38l31-4z" fill="#8c6bd9" stroke="#1f2547" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="17" fill="#ffcc4d" stroke="#1f2547" strokeWidth="3" />
      <path d="M50 50V33a17 17 0 0 1 17 17z" fill="#fff" stroke="#1f2547" strokeWidth="3" />
    </svg>
  )
}
function HexBadge() {
  return (
    <svg viewBox="0 0 100 100" width="120" aria-hidden="true">
      <path d="M50 6l38 22v44L50 94 12 72V28z" fill="#6cc24a" stroke="#1f2547" strokeWidth="4" />
      <path d="M34 34l32 32M66 34L34 66" stroke="#1f2547" strokeWidth="13" strokeLinecap="round" />
      <path d="M34 34l32 32M66 34L34 66" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
    </svg>
  )
}
function ShapeBadge() {
  return (
    <svg viewBox="0 0 100 100" width="120" aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="#5bb8f0" stroke="#1f2547" strokeWidth="4" />
      <path d="M32 67l13-24 13 24z" fill="#ffcc4d" stroke="#1f2547" strokeWidth="3" />
      <rect x="52" y="30" width="19" height="19" rx="3" fill="#ef7b63" stroke="#1f2547" strokeWidth="3" />
      <circle cx="62" cy="64" r="9" fill="#fff" stroke="#1f2547" strokeWidth="3" />
    </svg>
  )
}
function LeafBadge() {
  return (
    <svg viewBox="0 0 100 100" width="120" aria-hidden="true">
      <path d="M50 6C78 28 84 66 50 94 16 66 22 28 50 6z" fill="#2bb3a3" stroke="#1f2547" strokeWidth="4" />
      <path d="M50 88V34M50 58L34 46M50 70L68 54M50 44l10-10" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
function BookBadge() {
  return (
    <svg viewBox="0 0 100 100" width="120" aria-hidden="true">
      <rect x="10" y="12" width="80" height="76" rx="10" fill="#f27ba6" stroke="#1f2547" strokeWidth="4" />
      <path d="M50 36C40 28 28 30 22 32v34c8-2 20-2 28 4 8-6 20-6 28-4V32c-6-2-18-4-28 4z" fill="#fff" stroke="#1f2547" strokeWidth="3" strokeLinejoin="round" />
      <path d="M50 36v34" stroke="#1f2547" strokeWidth="3" />
    </svg>
  )
}

export function Album() {
  const { t, demo, set, toast } = useApp()
  const nav = useNavigate()
  const [frame, setFrame] = useState(demo.frame)
  const [nameStyle, setNameStyle] = useState(demo.nameStyle)
  const stickers = useStickerCount()
  const owned = [
    ...(demo.beaten ? [{ name: t('Fraction Star', 'Bruch-Stern'), art: <StarBadge />, isNew: true }] : []),
    { name: t('Times-table Star', 'Einmaleins-Stern'), art: <HexBadge /> },
    { name: t('Shape Master', 'Formen-Meister'), art: <ShapeBadge /> },
    { name: t('Plant Expert', 'Pflanzen-Profi'), art: <LeafBadge /> },
    { name: t('Reading Rocket', 'Lese-Rakete'), art: <BookBadge /> },
  ]
  const empty = 9 - owned.length
  return (
    <Student title={t('My sticker album', 'Mein Stickeralbum')} tab="stickers">
      <Spread
        pages={[23, 24]}
        left={
          <>
            <h2 className="dsp" style={{ fontSize: 30 }}>{t(`My stickers · ${stickers} of 9`, `Meine Sticker · ${stickers} von 9`)}</h2>
            <div className="grid2" style={{ gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: 28 }}>
              {owned.map((s) => (
                <div key={s.name} className="col" style={{ alignItems: 'center', position: 'relative', fontWeight: 700, gap: 8 }}>
                  {s.isNew && <span className="new" style={{ position: 'absolute', top: 0, right: 0 }}>{t('New!', 'Neu!')}</span>}
                  {s.art}
                  {s.name}
                </div>
              ))}
              {Array.from({ length: empty }, (_, i) => (
                <div key={i} className="col soft" style={{ alignItems: 'center', gap: 8 }}>
                  <span className="dsp" style={{ width: 120, height: 120, borderRadius: '50%', border: '3px dashed #9aa1bd', background: '#f1f3f9', display: 'grid', placeItems: 'center', fontSize: 50, color: '#9aa1bd' }}>?</span>
                  {t('Beat a guardian', 'Besiege einen Wächter')}
                </div>
              ))}
            </div>
          </>
        }
        right={
          <>
            <h2 className="dsp" style={{ fontSize: 30 }}>{t('My look', 'Mein Aussehen')}</h2>
            <div className="row wrapr" style={{ gap: 30 }}>
              <div className="col" style={{ alignItems: 'center' }}>
                <span className="face" style={{ width: 186, height: 186, background: 'var(--sky-tint)', border: `7px solid ${frame}` }}><Art name="student" size={150} /></span>
                <span className="dsp" style={{ fontSize: 40, ...STYLES[nameStyle] }}>Lina</span>
              </div>
              <div className="col" style={{ flex: 1, minWidth: 220 }}>
                <h3 className="dsp" style={{ fontSize: 21 }}>{t('Picture frame', 'Bilderrahmen')}</h3>
                <div className="row" role="radiogroup" aria-label={t('Picture frame', 'Bilderrahmen')}>
                  {FRAMES.map((f) => (
                    <button key={f} role="radio" aria-checked={frame === f} aria-label={f} onClick={() => setFrame(f)} style={{ width: 56, height: 56, borderRadius: '50%', background: f, border: `${frame === f ? 5 : 3}px solid var(--ink)` }} />
                  ))}
                  <span title={t('Locked', 'Gesperrt')} style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid #9aa1bd', display: 'grid', placeItems: 'center', background: '#f1f3f9' }}><Lock size={22} color="#5b6280" /></span>
                </div>
                <h3 className="dsp" style={{ fontSize: 21, marginTop: 12 }}>{t('Name style', 'Namensstil')}</h3>
                <div className="row wrapr">
                  {Object.keys(STYLES).map((s) => (
                    <button key={s} className="chip" aria-pressed={nameStyle === s} style={nameStyle === s ? { background: 'var(--grape-tint)' } : undefined} onClick={() => setNameStyle(s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="card row" style={{ background: 'var(--grape-tint)' }}>
              <span className="face" style={{ width: 100, height: 100, background: 'var(--sky-tint)', border: `5px solid ${frame}` }}><Art name="student" size={80} /></span>
              <div>
                <span className="dsp" style={{ fontSize: 36, ...STYLES[nameStyle] }}>Lina</span>
                <p style={{ fontSize: 18, fontWeight: 700 }}>{t(`${demo.beaten ? 'Fraction Star' : 'Times-table Star'} · ${stickers} stickers`, `${demo.beaten ? 'Bruch-Stern' : 'Einmaleins-Stern'} · ${stickers} Sticker`)}</p>
              </div>
            </div>
            <Pip>{t('Beat one more guardian to unlock a new frame!', 'Besiege noch einen Wächter für einen neuen Rahmen!')}</Pip>
            <button
              className="kbtn"
              style={{ alignSelf: 'center' }}
              onClick={() => {
                set({ frame, nameStyle })
                toast(t('Your look is saved!', 'Dein Aussehen ist gespeichert!'))
                nav('/s/map')
              }}
            >
              <Check size={24} /> {t('Save my look', 'Speichern')}
            </button>
          </>
        }
      />
    </Student>
  )
}
