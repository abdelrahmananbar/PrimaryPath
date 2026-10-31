import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, ChevronLeft, ChevronRight, Eye, Printer, Send, Sparkles, Star, Upload } from 'lucide-react'
import { Art } from '../art'
import { useApp } from '../state'
import { BackBtn, Pip, Spread, Student } from './Shell'

function Place({ art, name, sub, to, style, labelBg }: { art: 'dorf' | 'mountain' | 'lab' | 'woods'; name: string; sub: string; to?: string; style: React.CSSProperties; labelBg: string }) {
  const nav = useNavigate()
  return (
    <button className="place" style={style} onClick={() => to && nav(to)} disabled={!to} aria-label={`${name}, ${sub}`}>
      <Art name={art} size={185} />
      <span className="plabel" style={{ background: labelBg }}>{name}</span>
      {sub}
    </button>
  )
}

export function MapPage() {
  const { t, demo } = useApp()
  const nav = useNavigate()
  return (
    <Student title={t('My adventure map', 'Meine Abenteuerkarte')} tab="map">
      <div className="map">
        <svg className="path" viewBox="0 0 1222 860" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 500 C150 470 300 580 430 510 L430 560 C300 640 150 520 0 550Z" fill="#c7e7fa" stroke="#1f2547" strokeWidth="3" />
          <g fill="none" stroke="#dcbb8a" strokeWidth="16" strokeLinecap="round">
            <path d="M260 270 C320 290 380 300 430 320" />
            <path d="M240 690 C320 650 380 600 430 550" />
            <path d="M800 340 C860 300 910 250 970 220" />
            <path d="M800 470 C860 500 910 515 980 520" />
            <path d="M628 590 L628 640" />
          </g>
          <g fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="10 12">
            <path d="M260 270 C320 290 380 300 430 320" />
            <path d="M240 690 C320 650 380 600 430 550" />
            <path d="M800 340 C860 300 910 250 970 220" />
            <path d="M800 470 C860 500 910 515 980 520" />
          </g>
        </svg>
        <div style={{ position: 'absolute', left: 40, top: 26, width: 'min(520px, 80%)' }} className="map-pip">
          <Pip>{t('Hi Lina! Your Fractions quiz is back. Where shall we go?', 'Hallo Lina! Dein Bruchrechnen-Test ist zurück. Wohin gehen wir?')}</Pip>
        </div>
        <Place art="dorf" name="Deutsch-Dorf" sub={t('1 exam', '1 Prüfung')} style={{ left: '4%', top: '17%' }} labelBg="var(--pink-tint)" />
        <Place art="mountain" name={t('Maths Mountain', 'Mathe-Berg')} sub={t('4 exams · 1 new', '4 Prüfungen · 1 neu')} to="/s/exams" style={{ left: '3%', top: '65%' }} labelBg="var(--grape-tint)" />
        <Place art="lab" name={t('Science Lab', 'Forscher-Labor')} sub={t('2 exams', '2 Prüfungen')} style={{ right: '4%', top: '10%' }} labelBg="var(--leaf-tint)" />
        <Place art="woods" name={t('Word Woods', 'Wörterwald')} sub={t('2 exams', '2 Prüfungen')} style={{ right: '4%', top: '45%' }} labelBg="var(--sun-tint)" />
        <div className="post">
          <div style={{ background: 'var(--sky-tint)', padding: '20px 0 0', borderBottom: '3px solid var(--ink)' }}><Art name="post" size={170} /></div>
          <div className="col" style={{ padding: 18, alignItems: 'center', gap: 10 }}>
            <h2 className="dsp" style={{ fontSize: 30 }}>{t('Post office', 'Postamt')}</h2>
            <p style={{ fontSize: 18, fontWeight: 700 }}>{t('Send a photo of your quiz paper to your teacher.', 'Schicke deiner Lehrerin ein Foto von deinem Test.')}</p>
            <button className="kbtn" onClick={() => nav('/s/upload')}><Upload size={22} /> {t('Upload my exam', 'Test hochladen')}</button>
          </div>
        </div>
        <div className="card lift cavec">
          <Art name="cave" size={140} />
          <div className="col" style={{ gap: 8 }}>
            <h2 className="dsp" style={{ fontSize: 26 }}>{t('Guardian cave', 'Wächter-Höhle')}</h2>
            <p style={{ fontWeight: 700 }}>{demo.beaten ? t('1 guardian is waiting for you', '1 Wächter wartet auf dich') : t('2 guardians are waiting for you', '2 Wächter warten auf dich')}</p>
            <button className="kbtn grape" style={{ alignSelf: 'flex-start', padding: '10px 24px 6px', fontSize: 20 }} onClick={() => nav('/s/cave')}>{t('Enter', 'Hinein')}</button>
          </div>
        </div>
        <section className="news">
          <div className="row sb" style={{ background: 'var(--sky)', padding: '10px 16px 6px', borderBottom: '3px solid var(--ink)' }}>
            <h2 className="dsp" style={{ fontSize: 26 }}>{t('News', 'Neues')}</h2>
            {demo.unread.length > 0 && <span className="new">{t(`${demo.unread.length} new`, `${demo.unread.length} neu`)}</span>}
          </div>
          <div className="col" style={{ padding: 14, fontWeight: 700 }}>
            <div className="row sb">
              <span className="row"><Check color="#1e9e63" size={22} /> {t('Your Fractions quiz is checked!', 'Dein Bruchrechnen-Test ist geprüft!')}</span>
              <button className="kbtn" style={{ padding: '8px 18px 4px', fontSize: 20 }} onClick={() => nav('/s/result')}>{t('Open', 'Öffnen')}</button>
            </div>
            <div className="row soft" style={{ fontWeight: 400, borderTop: '2px solid var(--line)', paddingTop: 8 }}>
              <Eye size={20} style={{ flex: 'none' }} /> {t('Science quiz · step 2 of 4: Your teacher reads it', 'Sachkunde-Test · Schritt 2 von 4: Deine Lehrerin liest ihn')}
            </div>
          </div>
        </section>
      </div>
    </Student>
  )
}

const EXAMS = [
  { n: 1, title: ['Shapes quiz', 'Formen-Test'], score: 90, date: '14 Sep', bg: 'var(--leaf-tint)' },
  { n: 2, title: ['Times tables', 'Einmaleins'], score: 64, date: '21 Sep', bg: 'var(--sun-tint)' },
  { n: 3, title: ['Word problems', 'Textaufgaben'], score: 85, date: '28 Sep', bg: 'var(--sky-tint)' },
  { n: 4, title: ['Fractions quiz', 'Bruchrechnen'], score: 72, date: '12 Oct', bg: 'var(--pink-tint)', isNew: true },
]

export function MyExams() {
  const { t } = useApp()
  const nav = useNavigate()
  const [subject, setSubject] = useState('Maths')
  const subjects: [string, string][] = [['All', 'Alle'], ['Maths', 'Mathe'], ['Science', 'Sachkunde'], ['English', 'Englisch'], ['German', 'Deutsch']]
  const list = subject === 'All' || subject === 'Maths' ? EXAMS : []
  const stages = [t('1. Sent', '1. Gesendet'), t('2. Your teacher reads it', '2. Lehrerin liest'), t('3. Grading', '3. Bewerten'), t('4. Result ready', '4. Ergebnis da')]
  return (
    <Student title={t('Maths Mountain', 'Mathe-Berg')} tab="exams">
      <Spread
        pages={[3, 4]}
        left={
          <>
            <BackBtn to="/s/map" label={t('Back to map', 'Zurück zur Karte')} />
            <Pip>{t('These are your Maths exams. Tap one to open it!', 'Das sind deine Mathe-Prüfungen. Tippe auf eine!')}</Pip>
            <div style={{ background: 'linear-gradient(#c7e7fa,#eef8fe)', border: '3px solid var(--ink)', borderRadius: 24, padding: '30px 30px 0', textAlign: 'center' }}>
              <Art name="mountain" size={380} />
            </div>
            <div>
              <h2 className="dsp" style={{ fontSize: 24, marginBottom: 14 }}>{t('After you send a paper', 'Nach dem Senden')}</h2>
              <div className="stages">
                {stages.map((s, i) => {
                  const I = [Send, Eye, Sparkles, Star][i]
                  return (
                    <div key={s}>
                      <span className="mark" style={{ background: ['var(--sky-tint)', 'var(--sun-tint)', 'var(--grape-tint)', 'var(--leaf-tint)'][i] }}><I size={24} /></span>
                      {s}
                    </div>
                  )
                })}
              </div>
              <p className="soft" style={{ marginTop: 10 }}>{t('You see your score at step 4, after your teacher checks it.', 'Du siehst deine Punkte bei Schritt 4, nachdem deine Lehrerin geprüft hat.')}</p>
            </div>
          </>
        }
        right={
          <>
            <div className="chips">
              {subjects.map(([en, de]) => (
                <button key={en} className="chip" aria-pressed={subject === en} onClick={() => setSubject(en)}>{t(en, de)}</button>
              ))}
            </div>
            <div className="grid2">
              {list.map((e) => (
                <button
                  key={e.n}
                  className="card lift col"
                  style={{ background: e.bg, position: 'relative', alignItems: 'center', opacity: e.n === 4 ? 1 : 0.98 }}
                  onClick={() => e.n === 4 && nav('/s/result')}
                  aria-label={`${e.title[0]}, ${e.score}%`}
                >
                  {e.isNew && <span className="new" style={{ position: 'absolute', top: -12, right: -8 }}>{t('New!', 'Neu!')}</span>}
                  <span className="row dsp" style={{ alignSelf: 'flex-start', fontSize: 20 }}>
                    <span className="mark" style={{ width: 42, height: 42 }}>{e.n}</span> {t(e.title[0], e.title[1])}
                  </span>
                  <span className="dsp" style={{ fontSize: 56 }}>{e.score}%</span>
                  <span style={{ fontWeight: 700 }}>{e.date}</span>
                  <span className="dsp" style={{ background: 'var(--leaf)', border: '3px solid var(--ink)', borderRadius: 12, padding: '6px 10px 2px', alignSelf: 'flex-start', fontSize: 16 }}>{t('Result ready', 'Ergebnis da')}</span>
                </button>
              ))}
              {list.length === 0 && <p className="soft" style={{ gridColumn: '1 / -1' }}>{t('No exams here yet.', 'Noch keine Prüfungen hier.')}</p>}
            </div>
            <div className="row sb wrapr" style={{ border: '3px dashed var(--ink)', borderRadius: 18, padding: 20, background: '#fff4f0' }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <h3 className="dsp" style={{ fontSize: 24 }}>{t('New exam is here!', 'Neue Prüfung ist da!')}</h3>
                <p>{t('Measuring length. Have a look first!', 'Längen messen. Schau sie dir zuerst an!')}</p>
              </div>
              <button className="kbtn" onClick={() => nav('/s/new-exam')}>{t('View exam', 'Ansehen')} <Eye size={22} /></button>
            </div>
          </>
        }
      />
    </Student>
  )
}

const PAPER: string[][] = [
  ['1. How long is the pencil? Use the ruler.', '2. Which is longer, 1 m or 90 cm?', '3. Draw a line 7 cm long.'],
  ['4. Measure the blue line. How many cm is it?', '5. 100 cm is the same as ___ m.', '6. Put in order: 30 cm, 1 m, 45 cm.'],
]

export function NewExamPaper() {
  const { t, toast } = useApp()
  const nav = useNavigate()
  const [page, setPage] = useState(0)
  const steps = [
    { icon: Printer, title: t('Print it', 'Drucken'), text: t('Ask a grown-up to help with the printer.', 'Bitte einen Erwachsenen um Hilfe beim Drucken.') },
    { icon: Star, title: t('Write on it', 'Ausfüllen'), text: t('Use a pencil. Write your name at the top.', 'Nimm einen Bleistift. Schreib oben deinen Namen.') },
    { icon: Send, title: t('Take a photo', 'Foto machen'), text: t('Lay the paper flat in good light.', 'Leg das Blatt flach ins gute Licht.') },
  ]
  return (
    <Student title={t('New exam', 'Neue Prüfung')} tab="exams">
      <Spread
        pages={[3, 4]}
        left={
          <>
            <BackBtn to="/s/map" label={t('Back to map', 'Zurück zur Karte')} />
            <div className="row sb wrapr">
              <h2 className="dsp" style={{ fontSize: 28 }}>{t('Measuring length', 'Längen messen')}</h2>
              <span className="new" style={{ padding: '4px 12px' }}>{t('Hand in by Thu 26 Nov', 'Abgabe bis Do 26. Nov')}</span>
            </div>
            <div className="card" style={{ background: '#fffdf8', minHeight: 380, boxShadow: '0 6px 0 var(--ink)' }}>
              <div className="row sb" style={{ marginBottom: 16 }}>
                <b>{t('Maths, Class 4B, Ms. Salma', 'Mathe, Klasse 4B, Frau Salma')}</b>
                <span className="soft" style={{ border: '2px solid var(--ink)', padding: '8px 6px', fontSize: 12 }}>scan me</span>
              </div>
              <p style={{ border: '2px solid var(--ink)', padding: '6px 10px', marginBottom: 18 }}>{t('Name:', 'Name:')}</p>
              {PAPER[page].map((q) => (
                <p key={q} style={{ padding: '14px 0 26px', borderBottom: '2px dotted var(--line)', fontSize: 18 }}>{q}</p>
              ))}
              <p className="soft" style={{ textAlign: 'center', marginTop: 10 }}>{t(`page ${page + 1} of 2`, `Seite ${page + 1} von 2`)}</p>
            </div>
            <div className="row sb">
              <button className="pill sm" disabled={page === 0} style={{ opacity: page === 0 ? 0.4 : 1 }} aria-label="Previous page" onClick={() => setPage(0)}><ChevronLeft size={20} /></button>
              <b>{t(`Page ${page + 1} of 2`, `Seite ${page + 1} von 2`)}</b>
              <button className="pill sm" disabled={page === 1} style={{ opacity: page === 1 ? 0.4 : 1 }} aria-label="Next page" onClick={() => setPage(1)}><ChevronRight size={20} /></button>
            </div>
          </>
        }
        right={
          <>
            <Pip>{t('A new exam from your teacher! Print it and write with a pencil.', 'Eine neue Prüfung von deiner Lehrerin! Druck sie aus und schreib mit Bleistift.')}</Pip>
            {steps.map((s, i) => (
              <div key={s.title} className="card row" style={{ background: ['var(--sun-tint)', 'var(--sky-tint)', 'var(--leaf-tint)'][i] }}>
                <span className="mark">{i + 1}</span>
                <s.icon size={30} />
                <div><h3 className="dsp" style={{ fontSize: 22 }}>{s.title}</h3><p>{s.text}</p></div>
              </div>
            ))}
            <button className="kbtn sun" onClick={() => { window.print(); toast(t('Opening the print window…', 'Druckfenster wird geöffnet…')) }}><Printer size={24} /> {t('Print my exam', 'Prüfung drucken')}</button>
            <button className="kbtn" onClick={() => nav('/s/upload')}><Upload size={24} /> {t('I wrote it, upload it', 'Fertig, hochladen')}</button>
            <p className="soft">{t('No printer? Ask your teacher for a paper copy at school.', 'Kein Drucker? Frag deine Lehrerin nach einer Papierkopie.')}</p>
            <p className="soft">{t('You can only upload this exam after you write on it. Your teacher reads your handwriting, so write big and clear!', 'Du kannst die Prüfung erst hochladen, wenn du sie ausgefüllt hast. Schreib groß und deutlich!')}</p>
            <Link to="/s/exams" className="soft">{t('Back to my exams', 'Zurück zu meinen Prüfungen')}</Link>
          </>
        }
      />
    </Student>
  )
}
