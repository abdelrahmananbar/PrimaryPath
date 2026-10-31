import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Check, Eye, FileText, FolderOpen, Layers, Lightbulb, Lock, Map as MapIcon, RotateCcw, Send, Upload as UploadIcon, X } from 'lucide-react'
import { Art } from '../art'
import { Modal, useApp } from '../state'
import { BackBtn, Pip, Spread, Student, UploadSteps } from './Shell'

// Selected pages stay in memory for this visit; nothing is uploaded anywhere.
type PageImg = { id: number; url?: string; blurry?: boolean }
let pagesStore: PageImg[] = []
let nextId = 1
const samplePages = (blurrySecond: boolean): PageImg[] => [{ id: nextId++ }, { id: nextId++, blurry: blurrySecond }]

const ANSWERS = ['1) 6 × 7 = 42', '2) 7 × 8 = 56', '3) 3/8', '4) 3/4 is smoler becaus 3 is les than 4', '5) each child gets 2 slices', '6) 1/2 , 2/5 , 3/4', '7) 24 × 4 = 96 crayons', '8) Ali ate more? same 2/6 = 1/3', '9) denominater']

export function PickPaper() {
  const { t } = useApp()
  const nav = useNavigate()
  const file = useRef<HTMLInputElement>(null)
  const [over, setOver] = useState(false)

  const takeFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    pagesStore = Array.from(files).map((f) => ({ id: nextId++, url: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined }))
    nav('/s/check')
  }

  const tips = [
    { icon: Layers, label: t('Flat on a table', 'Flach auf dem Tisch'), bg: 'var(--sun-tint)' },
    { icon: Lightbulb, label: t('Good light', 'Gutes Licht'), bg: 'var(--sky-tint)' },
    { icon: FileText, label: t('All 4 corners', 'Alle 4 Ecken'), bg: 'var(--leaf-tint)' },
    { icon: Camera, label: t('One photo per page', 'Ein Foto pro Seite'), bg: 'var(--pink-tint)' },
  ]

  return (
    <Student title={t('Send my paper', 'Mein Blatt senden')} tab="exams">
      <Spread
        pages={[5, 6]}
        left={
          <>
            <BackBtn to="/s/exams" />
            <UploadSteps at={1} />
            <Pip>{t('Put your paper in the post box. I will check the language for you!', 'Leg dein Blatt in den Briefkasten. Ich prüfe die Sprache für dich!')}</Pip>
            <div className="grid2">
              <label>
                <span className="lbl">{t('Subject', 'Fach')}</span>
                <select className="select" defaultValue="Maths">
                  <option value="Maths">{t('Maths', 'Mathe')}</option>
                  <option value="Science">{t('Science', 'Sachkunde')}</option>
                  <option value="English">{t('English', 'Englisch')}</option>
                  <option value="German">{t('German', 'Deutsch')}</option>
                </select>
              </label>
              <label>
                <span className="lbl">{t('Which exam?', 'Welche Prüfung?')}</span>
                <select className="select" defaultValue="Fractions quiz">
                  <option value="Fractions quiz">{t('Fractions quiz', 'Bruchrechnen')}</option>
                  <option value="Measuring length">{t('Measuring length', 'Längen messen')}</option>
                </select>
              </label>
            </div>
            <div
              className={`drop ${over ? 'over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setOver(true) }}
              onDragLeave={() => setOver(false)}
              onDrop={(e) => { e.preventDefault(); setOver(false); takeFiles(e.dataTransfer.files) }}
            >
              <Art name="post" size={80} />
              <h2 className="dsp" style={{ fontSize: 28 }}>{t('Drop your photos here', 'Leg deine Fotos hier ab')}</h2>
              <button
                className="kbtn"
                style={{ width: '100%' }}
                onClick={() => {
                  // The prototype's photo path demonstrates the "too blurry" recovery.
                  pagesStore = samplePages(true)
                  nav('/s/check')
                }}
              >
                <Camera size={24} /> {t('Take a photo', 'Foto machen')}
              </button>
              <button className="pill" style={{ width: '100%', padding: 14 }} onClick={() => file.current?.click()}><FolderOpen size={22} /> {t('Choose a file', 'Datei wählen')}</button>
              <input ref={file} type="file" accept="image/*,application/pdf" multiple hidden onChange={(e) => takeFiles(e.target.files)} />
              <span className="soft">{t('A photo or a PDF is fine', 'Ein Foto oder PDF ist okay')}</span>
            </div>
          </>
        }
        right={
          <>
            <h2 className="dsp" style={{ fontSize: 30 }}>{t('How to take a good photo', 'So gelingt dein Foto')}</h2>
            <div className="grid2">
              {tips.map((x, i) => (
                <div key={x.label} className="card lift col" style={{ background: x.bg, alignItems: 'center', textAlign: 'center', minHeight: 200 }}>
                  <span className="mark" style={{ alignSelf: 'flex-start' }}>{i + 1}</span>
                  <x.icon size={56} strokeWidth={1.3} />
                  <h3 className="dsp" style={{ fontSize: 21 }}>{x.label}</h3>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 19, fontWeight: 700 }}>{t("Tip: after you take the photo, you'll check it on the next page before it's sent.", 'Tipp: Nach dem Foto prüfst du es auf der nächsten Seite, bevor es gesendet wird.')}</p>
          </>
        }
      />
    </Student>
  )
}

function Paper({ page }: { page: PageImg }) {
  return (
    <div className={`paper ${page.blurry ? 'blurry' : ''}`}>
      {page.url ? (
        <img src={page.url} alt="Your paper" />
      ) : (
        <>
          <div>Fractions quiz — Lina A. — 4B</div>
          {ANSWERS.map((a) => <div key={a}>{a}</div>)}
        </>
      )}
    </div>
  )
}

export function CheckPaper() {
  const { t, toast } = useApp()
  const nav = useNavigate()
  const [pages, setPages] = useState<PageImg[]>(() => (pagesStore.length ? pagesStore : samplePages(false)))
  const [confirm, setConfirm] = useState(false)
  const [ticks, setTicks] = useState([false, false, false])
  const blurryAt = pages.findIndex((p) => p.blurry)
  const hasBlurry = blurryAt >= 0

  const update = (next: PageImg[]) => {
    pagesStore = next
    setPages(next)
  }

  const facts = [
    [t('Subject', 'Fach'), t('Maths', 'Mathe')],
    [t('Exam', 'Prüfung'), t('Fractions quiz', 'Bruchrechnen')],
    [t('Pages', 'Seiten'), String(pages.length)],
    [t('Language', 'Sprache'), t('English (found by itself)', 'Englisch (automatisch erkannt)')],
  ]
  const checks = [
    t('My name is on every page', 'Mein Name steht auf jeder Seite'),
    t(`All ${pages.length} pages are in the photos`, `Alle ${pages.length} Seiten sind auf den Fotos`),
    t('I can read my writing', 'Ich kann meine Schrift lesen'),
  ]

  return (
    <Student title={t('Send my paper', 'Mein Blatt senden')} tab="exams">
      <Spread
        pages={[7, 8]}
        left={
          <>
            <BackBtn to="/s/upload" />
            <UploadSteps at={2} />
            <div className="grid2">
              {pages.map((p, i) => (
                <div key={p.id} className="col" style={{ alignItems: 'center' }}>
                  <div style={{ width: '100%', outline: p.blurry ? '4px solid var(--coral)' : 'none', borderRadius: 10 }}><Paper page={p} /></div>
                  <h3 className="dsp" style={{ fontSize: 21 }}>{t(`Page ${i + 1}`, `Seite ${i + 1}`)}</h3>
                  <div className="row wrapr" style={{ justifyContent: 'center' }}>
                    <button className="pill sm" onClick={() => update(pages.map((x) => (x.id === p.id ? { ...x, blurry: false } : x)))}><Camera size={18} /> {t('Retake', 'Neu')}</button>
                    <button className="pill sm" disabled={pages.length === 1} style={{ opacity: pages.length === 1 ? 0.5 : 1 }} onClick={() => update(pages.filter((x) => x.id !== p.id))}><X size={18} /> {t('Remove', 'Weg')}</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="drop row dsp" style={{ flexDirection: 'row', justifyContent: 'center', fontSize: 21 }} onClick={() => update([...pages, { id: nextId++ }])}>
              <Camera size={30} /> {t('Add another page', 'Noch eine Seite')}
            </button>
          </>
        }
        right={
          <>
            <Pip>
              {hasBlurry
                ? t(`Oops! Page ${blurryAt + 1} is a bit blurry. Take it again so your teacher can read it.`, `Hoppla! Seite ${blurryAt + 1} ist unscharf. Mach sie nochmal, damit deine Lehrerin sie lesen kann.`)
                : t('Can you read every page? If not, take it again.', 'Kannst du jede Seite lesen? Wenn nicht, mach sie nochmal.')}
            </Pip>
            <div className="card lift col" style={{ background: 'var(--sun-tint)' }}>
              <div className="row sb">
                <h2 className="dsp" style={{ fontSize: 26 }}>{t('We found', 'Wir fanden')}</h2>
                <button className="pill sm" onClick={() => nav('/s/upload')}>{t('Change', 'Ändern')}</button>
              </div>
              {facts.map(([k, v]) => (
                <div key={k} className="row" style={{ fontSize: 19 }}><span className="soft" style={{ width: 146 }}>{k}</span><b>{v}</b></div>
              ))}
            </div>
            <button className="kbtn" disabled={hasBlurry} onClick={() => setConfirm(true)}><Send size={24} /> {t('Send to your teacher', 'An deine Lehrerin senden')}</button>
            <p className="row soft" style={{ fontSize: 18 }}>
              <Lock size={20} />
              {hasBlurry
                ? t(`Retake page ${blurryAt + 1} first, then you can send.`, `Mach zuerst Seite ${blurryAt + 1} neu, dann kannst du senden.`)
                : t('Your teacher checks everything before you get a score.', 'Deine Lehrerin prüft alles, bevor du Punkte bekommst.')}
            </p>
          </>
        }
      />
      {confirm && (
        <Modal label="Ready to send" width={560} onClose={() => setConfirm(false)}>
          <div className="col" style={{ fontFamily: 'Andika', color: 'var(--ink)', gap: 14, fontSize: 19 }}>
            <h2 className="dsp" style={{ fontSize: 30 }}>{t('Ready to send?', 'Bereit zum Senden?')}</h2>
            <p>{t('Check these with a grown-up:', 'Prüfe das mit einem Erwachsenen:')}</p>
            {checks.map((c, i) => (
              <label key={c} className="row" style={{ fontWeight: 700, cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: 26, height: 26 }} checked={ticks[i]} onChange={() => setTicks(ticks.map((x, j) => (j === i ? !x : x)))} />
                {c}
              </label>
            ))}
            <div className="row sb wrapr">
              <button className="pill" onClick={() => setConfirm(false)}>{t('Go back', 'Zurück')}</button>
              <button
                className="kbtn"
                disabled={ticks.includes(false)}
                onClick={() => {
                  toast(t('Whoosh! Your paper is on its way.', 'Wusch! Dein Blatt ist unterwegs.'))
                  nav('/s/sent')
                }}
              >
                {t('Yes, send it!', 'Ja, senden!')}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Student>
  )
}

export function Sent() {
  const { t } = useApp()
  const nav = useNavigate()
  return (
    <Student title={t('Whoosh! Sent!', 'Wusch! Gesendet!')} tab="exams">
      <div className="single">
        <UploadSteps at={4} />
        <div style={{ maxWidth: 820 }}>
          <Pip size={90}>{t("Sent! Your teacher will check your Fractions quiz. You don't need to do anything now. I'll tell you when it's ready.", 'Gesendet! Deine Lehrerin prüft deinen Bruchrechnen-Test. Du musst jetzt nichts tun. Ich sage dir, wenn er fertig ist.')}</Pip>
        </div>
        <svg className="trail-svg" viewBox="0 0 1130 330" role="img" aria-label={t('Sent. You are here: your teacher reads it. Next: grading, then result ready.', 'Gesendet. Du bist hier: Lehrerin liest. Danach: Bewerten, dann Ergebnis da.')}>
          <path d="M120 245C230 170 310 150 415 150C490 150 530 262 630 260C740 258 810 165 1000 150" fill="none" stroke="#dcbb8a" strokeWidth="20" strokeLinecap="round" />
          <path d="M120 245C230 170 310 150 415 150C490 150 530 262 630 260C740 258 810 165 1000 150" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="9 12" />
          <g stroke="#1f2547" strokeWidth="4">
            <circle cx="90" cy="176" r="44" fill="#1f2547" />
            <circle cx="90" cy="170" r="44" fill="#6cc24a" />
            <circle cx="415" cy="156" r="44" fill="#1f2547" />
            <circle cx="415" cy="150" r="44" fill="#5bb8f0" />
          </g>
          <path d="M75 170l11 12 20-24" fill="none" stroke="#1f2547" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M395 150s8-14 20-14 20 14 20 14-8 14-20 14-20-14-20-14z" fill="none" stroke="#1f2547" strokeWidth="3.5" />
          <circle cx="415" cy="150" r="6" fill="none" stroke="#1f2547" strokeWidth="3.5" />
          <rect x="350" y="50" width="130" height="36" rx="18" fill="#ef7b63" stroke="#1f2547" strokeWidth="2" />
          <text x="415" y="74" textAnchor="middle" fontFamily="Andika" fontWeight="700" fontSize="17" fill="#1f2547">{t('You are here', 'Du bist hier')}</text>
          <circle cx="716" cy="210" r="44" fill="#fff" stroke="#9aa1bd" strokeWidth="4" />
          <text x="716" y="224" textAnchor="middle" fontFamily="Luckiest Guy" fontSize="38" fill="#5b6280">3</text>
          <path d="M955 150v-12c0-34 102-34 102 0v12z" fill="#ef7b63" stroke="#1f2547" strokeWidth="4" />
          <rect x="955" y="130" width="102" height="52" rx="4" fill="#ffcc4d" stroke="#1f2547" strokeWidth="4" />
          <path d="M955 150h102" stroke="#1f2547" strokeWidth="4" />
          <rect x="996" y="136" width="20" height="26" rx="4" fill="#fff" stroke="#1f2547" strokeWidth="4" />
          <g fontFamily="Luckiest Guy" fontSize="24" textAnchor="middle" fill="#1f2547" stroke="#fff" strokeWidth="6" paintOrder="stroke">
            <text x="90" y="250">{t('Sent', 'Gesendet')}</text>
            <text x="415" y="232">{t('Your teacher reads it', 'Lehrerin liest')}</text>
            <text x="716" y="290" fill="#5b6280">{t('Grading', 'Bewerten')}</text>
            <text x="1006" y="222">{t('Result ready', 'Ergebnis da')}</text>
          </g>
        </svg>
        <div className="grid2 trail-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', margin: '30px 0', textAlign: 'center', alignItems: 'end' }}>
          <div className="col" style={{ alignItems: 'center' }}>
            <span className="dot done" style={{ width: 90, height: 90 }}><Check size={40} /></span>
            <span className="dsp" style={{ fontSize: 22 }}>{t('Sent', 'Gesendet')}</span>
          </div>
          <div className="col" style={{ alignItems: 'center' }}>
            <span className="new" style={{ padding: '6px 14px' }}>{t('You are here', 'Du bist hier')}</span>
            <span className="dot now" style={{ width: 90, height: 90 }}><Eye size={40} /></span>
            <span className="dsp" style={{ fontSize: 22 }}>{t('Your teacher reads it', 'Lehrerin liest')}</span>
          </div>
          <div className="col" style={{ alignItems: 'center' }}>
            <span className="dot" style={{ width: 90, height: 90, fontSize: 34 }}>3</span>
            <span className="dsp soft" style={{ fontSize: 22 }}>{t('Grading', 'Bewerten')}</span>
          </div>
          <div className="col" style={{ alignItems: 'center' }}>
            <span className="dot" style={{ width: 90, height: 90, fontSize: 34 }}>4</span>
            <span className="dsp soft" style={{ fontSize: 22 }}>{t('Result ready', 'Ergebnis da')}</span>
          </div>
        </div>
        <div className="row sb wrapr" style={{ marginTop: 'auto', paddingBottom: 30, gap: 18 }}>
          <button className="pill" onClick={() => nav('/s/check')}><RotateCcw size={20} /> {t('Oops! Take it back', 'Hoppla! Zurückholen')}</button>
          <button className="pill" onClick={() => { pagesStore = []; nav('/s/upload') }}><UploadIcon size={20} /> {t('Upload another', 'Noch eins hochladen')}</button>
          <button className="kbtn" onClick={() => nav('/s/map')}><MapIcon size={24} /> {t('Back to my map', 'Zurück zur Karte')}</button>
        </div>
      </div>
    </Student>
  )
}
