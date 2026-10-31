import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertTriangle, Camera, Check, ChevronRight, ChevronUp, FileText, Info, Pencil, Plus, RefreshCw, Sparkles, Trash2, Undo2, Upload, X } from 'lucide-react'
import { Art } from '../art'
import { Modal, useApp } from '../state'
import { AiBox, Confirm, Foot, Wizard } from './Shell'

const STEPS = ['Choose how', 'Add questions', 'Check DOK levels', 'Reward sticker', 'Confirm']
const AT: Record<string, number> = { choose: 0, ai: 0, reading: 0, writing: 0, blurry: 0, questions: 1, 'questions-ai': 1, dok: 2, sticker: 3, confirm: 4 }

export default function NewExam() {
  const { step = 'choose' } = useParams()
  const nav = useNavigate()
  const [leaving, setLeaving] = useState(false)
  const at = AT[step] ?? 0
  const title = at > 0 ? 'Fractions quiz' : step === 'reading' || step === 'blurry' ? 'Fractions_quiz.pdf' : 'Untitled exam'
  return (
    <Wizard title={title} steps={STEPS} at={at} saved="Draft saved" onExit={() => setLeaving(true)}>
      {step === 'choose' && <Choose />}
      {step === 'ai' && <Generate />}
      {step === 'reading' && <Working title="Reading your exam…" sub="This takes about 15 seconds. You can check every question in the next step." head="2 pages, 1.4 MB" stages={['Uploaded', 'Reading the pages', 'Finding questions', 'Suggesting DOK levels']} to="/t/new/questions" back="/t/new/choose" />}
      {step === 'writing' && <Working title="Writing your questions…" sub="This takes about 20 seconds. You check every question in the next step." head="Your prompt: fractions quiz, Class 4B. 9 questions, 25 points, DOK 30 / 40 / 30" stages={['Reading your prompt', 'Choosing question types', 'Writing questions', 'Adding DOK levels and mark schemes']} to="/t/new/questions-ai" back="/t/new/ai" />}
      {step === 'blurry' && <Blurry />}
      {(step === 'questions' || step === 'questions-ai') && <Questions ai={step === 'questions-ai'} />}
      {step === 'dok' && <Dok />}
      {step === 'sticker' && <Sticker />}
      {step === 'confirm' && <ConfirmStep />}
      {leaving && <Confirm title="Leave this exam?" body="It is saved as a draft in Exams, so you can finish it later." cta="Leave" onCancel={() => setLeaving(false)} onOk={() => nav('/t/exams')} />}
    </Wizard>
  )
}

function Choose() {
  const nav = useNavigate()
  const file = useRef<HTMLInputElement>(null)
  const [drag, setDrag] = useState(false)
  const past = [['Fractions quiz', 'Maths, Class 4B, used 12 Nov'], ['Plants and seeds', 'Science, Class 4B, used 28 Oct'], ['Times tables check', 'Maths, Class 4A, used 14 Oct']]
  return (
    <main className="wrap">
      <div><h1 className="t1">How do you want to add questions?</h1><p className="sub" style={{ marginTop: 6 }}>Pick one. Either way the AI only suggests, and you check every question before the exam is saved.</p></div>
      <div className="g2">
        <button className="opt" aria-pressed="true">
          <span className="row sb"><span className="av" style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--t-blue-tint)', color: 'var(--t-blue)' }}><Upload size={22} /></span><span className="radio on" /></span>
          <b style={{ fontSize: 20, fontWeight: 600 }}>Import an exam I already have</b>
          <span className="sub" style={{ lineHeight: 1.5 }}>Upload a PDF or a photo of a printed exam. The AI reads each question and suggests a DOK level for it.</span>
          <span className="row wrapr" style={{ gap: 6 }}>{['PDF', 'JPG or PNG', 'Up to 20 MB'].map((x) => <span key={x} className="tag">{x}</span>)}</span>
        </button>
        <button className="opt" aria-pressed="false" onClick={() => nav('/t/new/ai')}>
          <span className="row sb"><span className="av" style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--t-ai-tint)', color: 'var(--t-ai)' }}><Sparkles size={22} /></span><span className="radio" /></span>
          <b style={{ fontSize: 20, fontWeight: 600 }}>Generate questions with AI</b>
          <span className="sub" style={{ lineHeight: 1.5 }}>Give a topic, how many questions, the DOK mix and question types. You get a draft to review and edit.</span>
          <span className="row wrapr" style={{ gap: 6 }}>{['Topic', 'Number of questions', 'DOK mix', 'Question types'].map((x) => <span key={x} className="tag">{x}</span>)}</span>
        </button>
      </div>
      <div
        className="dropz"
        style={drag ? { background: 'var(--t-blue-tint)' } : undefined}
        onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); nav('/t/new/reading') }}
      >
        <span className="av" style={{ width: 48, height: 48, background: 'var(--t-blue-tint)', color: 'var(--t-blue)' }}><Upload size={22} /></span>
        <b style={{ fontWeight: 600 }}>Drop your exam here, or choose a file</b>
        <span className="sub small">A clear photo works too. Keep the whole page in view and avoid shadows.</span>
        <div className="row">
          <button className="tbtn" onClick={() => file.current?.click()}><FileText size={18} /> Choose file</button>
          <button className="tbtn" onClick={() => nav('/t/new/blurry')}><Camera size={18} /> Take a photo</button>
          <input ref={file} hidden type="file" accept=".pdf,image/*" onChange={(e) => e.target.files?.length && nav('/t/new/reading')} />
        </div>
      </div>
      <div className="col">
        <b style={{ fontWeight: 600 }}>Or start from one of your past exams</b>
        <div className="g3">
          {past.map(([n, s]) => (
            <button key={n} className="tc row sb" style={{ padding: 16, textAlign: 'left' }} onClick={() => nav('/t/new/questions')}>
              <span className="row"><span className="av" style={{ borderRadius: 8 }}><FileText size={18} /></span><span><b style={{ fontWeight: 600 }}>{n}</b><br /><span className="sub small">{s}</span></span></span>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      </div>
      <Foot msg="You can switch methods later without losing work." next="Next: Add questions" onNext={() => nav('/t/new/reading')} />
    </main>
  )
}

const PROMPT = 'A 30-minute fractions quiz for Class 4B (age 9). Focus on comparing fractions with different denominators, because many pupils compare only the top numbers. Start with 3 easy warm-up questions, then 4 that ask pupils to explain their thinking, and end with 2 challenge problems about sharing food fairly. Use simple words, real-life examples and pictures pupils can shade. Pupils write on paper, so leave space to show working.'

function Generate() {
  const nav = useNavigate()
  const [prompt, setPrompt] = useState(PROMPT)
  const [types, setTypes] = useState(['Multiple choice', 'Short answer', 'Drawing'])
  const [mix, setMix] = useState({ d1: 30, d2: 40, d3: 30 })
  const add = (s: string) => setPrompt((p) => `${p} ${s}.`)
  const sum = mix.d1 + mix.d2 + mix.d3
  return (
    <main className="wrap">
      <div className="row sb wrapr">
        <div><h1 className="t1">Describe the exam you want</h1><p className="sub" style={{ marginTop: 6 }}>Write it like you would brief a colleague. The settings on the right keep the AI on track.</p></div>
        <span className="seg"><button aria-pressed="false" onClick={() => nav('/t/new/choose')}>Import a file</button><button aria-pressed="true">Generate with AI</button></span>
      </div>
      <div className="g-side" style={{ gridTemplateColumns: 'minmax(0,1fr) 400px' }}>
        <section className="tc col">
          <label><span className="fl row sb">Your prompt <span className="sub small" style={{ fontWeight: 400 }}>{prompt.length} / 1000</span></span><textarea className="ta" style={{ minHeight: 240 }} maxLength={1000} value={prompt} onChange={(e) => setPrompt(e.target.value)} /></label>
          <span className="fl">Add to your prompt</span>
          <div className="row wrapr" style={{ gap: 8 }}>
            {['Use real-life examples', 'Add a word problem', 'One challenge question', 'Simple words for age 9', 'Include a drawing task', 'Match last term’s quiz'].map((x) => <button key={x} className="tag" style={{ padding: '6px 12px' }} onClick={() => add(x)}><Plus size={13} /> {x}</button>)}
          </div>
          <AiBox title="The AI writes a draft only">In the next step you see each question with its DOK level, confidence and reason, and you keep, edit or remove it.</AiBox>
        </section>
        <section className="tc col">
          <h2 className="t2">Settings</h2>
          <label><span className="fl">Topic</span><input className="input" defaultValue="Fractions: comparing and ordering" /></label>
          <div className="g2" style={{ gap: 12 }}>
            <label><span className="fl">Subject</span><input className="input" defaultValue="Maths" /></label>
            <label><span className="fl">Class</span><input className="input" defaultValue="Class 4B, age 9" /></label>
            <label><span className="fl">Questions</span><input className="input" type="number" defaultValue={9} min={1} /></label>
            <label><span className="fl">Total points</span><input className="input" type="number" defaultValue={25} min={1} /></label>
          </div>
          <span className="fl">DOK mix by points</span>
          <div className="g3" style={{ gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {(['d1', 'd2', 'd3'] as const).map((k, i) => <label key={k} className="small">DOK {i + 1} %<input className="input" type="number" min={0} max={100} value={mix[k]} onChange={(e) => setMix({ ...mix, [k]: Number(e.target.value) })} /></label>)}
          </div>
          {sum !== 100 && <span className="small" style={{ color: 'var(--t-bad)' }}><AlertTriangle size={14} /> The mix adds up to {sum}%. It must be 100%.</span>}
          <span className="fl">Question types</span>
          <div className="row wrapr" style={{ gap: 8 }}>
            {['Multiple choice', 'Short answer', 'Drawing', 'Open answer', 'True or false', 'Matching'].map((x) => {
              const on = types.includes(x)
              return <button key={x} className={`tag ${on ? 'dok1' : ''}`} aria-pressed={on} style={{ padding: '6px 12px' }} onClick={() => setTypes(on ? types.filter((y) => y !== x) : [...types, x])}>{on && <Check size={13} />} {x}</button>
            })}
          </div>
          <label className="row small" style={{ cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Printable, with space to write answers</label>
        </section>
      </div>
      <Foot msg="Takes about 20 seconds. You review every question next." next="Generate draft" icon={<Sparkles size={18} />} nextDisabled={!prompt.trim() || sum !== 100 || types.length === 0} onNext={() => nav('/t/new/writing')} />
    </main>
  )
}

function Working({ title, sub, head, stages, to, back }: { title: string; sub: string; head: string; stages: string[]; to: string; back: string }) {
  const nav = useNavigate()
  const [at, setAt] = useState(0)
  useEffect(() => {
    if (at >= stages.length) {
      nav(to, { replace: true })
      return
    }
    const id = window.setTimeout(() => setAt(at + 1), 900)
    return () => window.clearTimeout(id)
  }, [at, stages.length, nav, to])
  return (
    <main className="wrap" style={{ maxWidth: 640 }}>
      <section className="tc col" style={{ marginTop: 40, gap: 16 }}>
        <h1 className="t1" style={{ fontSize: 26 }}>{title}</h1>
        <p className="sub">{sub}</p>
        <span className="tag" style={{ alignSelf: 'flex-start' }}>{head}</span>
        <div className="col" aria-live="polite">
          {stages.map((s, i) => (
            <div key={s} className="row">
              {i < at ? <Check size={18} color="var(--t-ok)" /> : i === at ? <span className="spin" /> : <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--t-line)' }} />}
              <span className={i > at ? 'sub' : ''}>{s}{i === at && s.includes('questions') && !s.includes('types') ? ': 6 of 9' : ''}</span>
            </div>
          ))}
        </div>
        <button className="tbtn" style={{ alignSelf: 'flex-start' }} onClick={() => nav(back)}>Cancel</button>
      </section>
    </main>
  )
}

function Blurry() {
  const nav = useNavigate()
  return (
    <main className="wrap" style={{ maxWidth: 640 }}>
      <section className="tc col" style={{ marginTop: 40, gap: 16 }}>
        <h1 className="t1 row" style={{ fontSize: 26 }}><AlertTriangle color="var(--t-warn)" /> We couldn’t read page 2</h1>
        <p className="sub">The photo is too blurry. Page 1 is fine: 5 questions found.</p>
        <div className="col small" style={{ background: '#fbfbfd', border: '1px solid var(--t-line)', borderRadius: 10, padding: 14 }}>
          <b>Photo_page2.jpg</b><span className="sub">Taken just now</span>
          <span className="row" style={{ gap: 6 }}><Check size={15} color="var(--t-ok)" /> Page 1 read, 5 questions found</span>
          <span className="row" style={{ gap: 6 }}><X size={15} color="var(--t-bad)" /> Page 2 too blurry to read</span>
        </div>
        <p className="sub small">Tip: lay the page flat, near a window, and keep the whole page in view.</p>
        <div className="row wrapr">
          <button className="tbtn pri" onClick={() => nav('/t/new/reading')}><Camera size={18} /> Take a new photo</button>
          <button className="tbtn" onClick={() => nav('/t/new/reading')}>Upload a file instead</button>
          <button className="tbtn" onClick={() => nav('/t/new/questions')}>Type page 2 myself</button>
          <button className="tbtn ghost" onClick={() => nav('/t/new/choose')}>Cancel</button>
        </div>
      </section>
    </main>
  )
}

type Q = { n: number; text: string; dok: number; pts: number; conf: number }
const QUESTIONS: Q[] = [
  { n: 1, text: 'Shade 1/4 of the rectangle.', dok: 1, pts: 2, conf: 96 },
  { n: 2, text: 'Write the fraction for the shaded part.', dok: 1, pts: 2, conf: 74 },
  { n: 3, text: 'Which fraction is equal to 1/2? 2/4, 2/3, 3/4', dok: 1, pts: 2, conf: 98 },
  { n: 4, text: 'Which is bigger, 3/4 or 2/3? Explain how you know.', dok: 2, pts: 3, conf: 91 },
  { n: 5, text: 'Put 1/3, 1/6 and 1/2 in order from smallest to biggest.', dok: 2, pts: 3, conf: 94 },
  { n: 6, text: 'Which is bigger, 5/8 or 3/5? Show your working.', dok: 2, pts: 4, conf: 89 },
  { n: 7, text: 'Share 3 pizzas fairly between 4 friends. How much does each get? Explain.', dok: 3, pts: 3, conf: 86 },
  { n: 8, text: 'Which is bigger, 5/6 or 7/9? Prove it in two different ways.', dok: 2, pts: 4, conf: 68 },
  { n: 9, text: 'What do we call the bottom number of a fraction?', dok: 1, pts: 2, conf: 97 },
]
const dotColor = (c: number) => (c >= 85 ? 'var(--t-ok)' : c >= 75 ? 'var(--t-warn)' : 'var(--t-bad)')

function Questions({ ai }: { ai: boolean }) {
  const nav = useNavigate()
  const { toast } = useApp()
  const [qs, setQs] = useState(QUESTIONS)
  const [open, setOpen] = useState<number | null>(4)
  const [kept, setKept] = useState<number[]>(QUESTIONS.filter((q) => q.conf >= 75).map((q) => q.n))
  const [crit, setCrit] = useState([{ pts: 3, text: 'Right answer with a correct reason (common denominator or a drawing)' }, { pts: 1, text: 'Right answer, no reason given' }, { pts: 0, text: 'A wrong reason, even if the answer is right' }])
  const [modal, setModal] = useState<'none' | 'remove' | 'dok' | 'crit'>('none')
  const [editing, setEditing] = useState<number | null>(null)
  const [pts, setPts] = useState(0)
  const [desc, setDesc] = useState('')
  const total = qs.reduce((s, q) => s + q.pts, 0)
  const toCheck = qs.filter((q) => !kept.includes(q.n)).length
  const current = qs.find((q) => q.n === open)

  const startCrit = (i: number | null) => {
    setEditing(i)
    setPts(i === null ? 0 : crit[i].pts)
    setDesc(i === null ? '' : crit[i].text)
    setModal('crit')
  }

  return (
    <main className="wrap">
      <div><h1 className="t1">Check the questions the AI {ai ? 'wrote' : 'found'}</h1><p className="sub" style={{ marginTop: 6 }}>{ai ? 'Written from your prompt. Open a question to check its mark scheme, type and DOK level.' : 'Open a question to check its mark scheme, type and DOK level. Nothing is used until you keep it.'}</p></div>
      <div className="g-side" style={{ gridTemplateColumns: 'minmax(0,1fr) 336px' }}>
        <section className="tc flush">
          <div className="row" style={{ padding: '18px 24px' }}><h2 className="t2">Questions</h2><span className="tag ok"><Check size={13} /> {kept.length} kept</span>{toCheck > 0 && <span className="tag warn"><AlertTriangle size={13} /> {toCheck} to check</span>}</div>
          {qs.map((q) => {
            const isKept = kept.includes(q.n)
            return (
              <div key={q.n}>
                <button className="qrow" aria-expanded={open === q.n} onClick={() => setOpen(open === q.n ? null : q.n)}>
                  <span className="num" style={!isKept ? { background: 'var(--t-warn-tint)', color: 'var(--t-warn)' } : undefined}>{q.n}</span>
                  <span style={{ fontWeight: open === q.n ? 600 : 500 }}>{q.text}</span>
                  <span className={`tag dok${q.dok}`}>DOK {q.dok}</span>
                  <span className="sub small hide-sm">{q.pts} pts</span>
                  <span className="small hide-sm"><i className="ai-dot" style={{ background: dotColor(q.conf) }} />{q.conf}%</span>
                  <span className="hide-sm">{isKept ? <Check size={18} color="var(--t-ok)" /> : <span className="tag warn">Check</span>}</span>
                  <span>{open === q.n ? <ChevronUp size={18} /> : null}</span>
                </button>
                {open === q.n && current && (
                  <div className="col" style={{ padding: '0 24px 18px 60px', gap: 14 }}>
                    <div className="row wrapr" style={{ gap: 40 }}>
                      <div><span className="sub small">Type</span><br /><span className="tag">Short answer</span></div>
                      <label><span className="sub small">Points</span><br /><input className="input" style={{ width: 64, padding: 6 }} type="number" min={1} max={10} value={q.pts} onChange={(e) => setQs(qs.map((x) => (x.n === q.n ? { ...x, pts: Number(e.target.value) } : x)))} /></label>
                      <div><span className="sub small row" style={{ gap: 6 }}>DOK level <button aria-label="What is DOK?" onClick={() => setModal('dok')}><Info size={15} /></button></span><span className="seg">{[1, 2, 3].map((d) => <button key={d} aria-pressed={q.dok === d} onClick={() => setQs(qs.map((x) => (x.n === q.n ? { ...x, dok: d } : x)))}>{d}</button>)}</span></div>
                    </div>
                    <div className="col" style={{ border: '1px solid var(--t-line)', borderRadius: 10, padding: 14 }}>
                      <div className="row"><b style={{ fontWeight: 600 }}>Mark scheme</b><span className="tag ai"><Sparkles size={13} /> Suggested by AI</span></div>
                      {crit.map((c, i) => (
                        <div key={c.text} className="row">
                          <span className={`tag ${c.pts === 0 ? 'bad' : 'dok1'}`} style={{ width: 52, justifyContent: 'center' }}>{c.pts} {c.pts === 1 ? 'pt' : 'pts'}</span>
                          <span style={{ flex: 1 }}>{c.text}</span>
                          <button aria-label="Edit criterion" onClick={() => startCrit(i)}><Pencil size={16} /></button>
                          <button aria-label="Delete criterion" onClick={() => { const old = crit; setCrit(crit.filter((_, j) => j !== i)); toast('Criterion removed.', () => setCrit(old)) }}><Trash2 size={16} /></button>
                        </div>
                      ))}
                      <button className="tlink" style={{ border: '1px dashed #cfd4df', borderRadius: 8, padding: 8, justifyContent: 'center' }} onClick={() => startCrit(null)}><Plus size={16} /> Add criterion</button>
                    </div>
                    <AiBox title={`Why DOK ${q.dok}, ${q.conf}% confident`}>Pupils compare two fractions with different denominators and explain their thinking. That is more than recall, but it is one step, not a multi-step problem.</AiBox>
                    <div className="row sb wrapr">
                      <button className="tbtn ghost" style={{ color: 'var(--t-bad)' }} onClick={() => setModal('remove')}><Trash2 size={18} /> Remove</button>
                      <span className="row wrapr">
                        <button className="tbtn ghost" onClick={() => toast(`New version of Q${q.n} written. The old one is kept.`)}><RefreshCw size={18} /> Regenerate</button>
                        <button className="tbtn" onClick={() => { const v = window.prompt(`Edit Q${q.n}`, q.text); if (v) setQs(qs.map((x) => (x.n === q.n ? { ...x, text: v } : x))) }}><Pencil size={18} /> Edit</button>
                        <button className="tbtn pri" onClick={() => { if (!isKept) setKept([...kept, q.n]); setOpen(null); toast(`Q${q.n} kept in the exam`) }}><Check size={18} /> Keep question</button>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </section>
        <aside className="col" style={{ gap: 24 }}>
          <section className="tc col">
            <h2 className="t2">From your {ai ? 'prompt' : 'file'}</h2>
            {ai ? (
              <>
                <p className="sub small">“A 30-minute fractions quiz for Class 4B. Focus on comparing fractions with different denominators…”</p>
                <span className="small">9 questions, 25 points, DOK 30 / 40 / 30</span>
                <button className="tbtn" onClick={() => nav('/t/new/ai')}><Pencil size={16} /> Edit prompt</button>
                <button className="tbtn" onClick={() => toast('Writing 9 new questions from your prompt…')}><RefreshCw size={16} /> Regenerate all</button>
              </>
            ) : (
              <>
                <div className="row" style={{ border: '1px solid var(--t-line)', borderRadius: 10, padding: 12, background: '#fbfbfd' }}><FileText color="var(--t-bad)" /><span><b style={{ fontWeight: 600 }}>Fractions_quiz.pdf</b><br /><span className="sub small">2 pages, read in 14 seconds</span></span></div>
                <div className="g2" style={{ gap: 8 }}>
                  {[1, 2].map((p) => <div key={p} className="small sub"><div style={{ height: 150, border: '1px solid var(--t-line)', borderRadius: 4, background: 'repeating-linear-gradient(#fff,#fff 16px,#e4e7ef 17px,#fff 19px)', marginBottom: 4 }} />Page {p}</div>)}
                </div>
                <button className="tbtn ghost" onClick={() => nav('/t/new/choose')}><RefreshCw size={16} /> Replace file</button>
              </>
            )}
          </section>
          <section className="tc col small">
            <b style={{ fontSize: 15, fontWeight: 600 }}>How sure the AI is</b>
            {[['85% or more', 'Usually right, still yours to check', 90], ['75 to 84%', 'Worth a quick look', 80], ['Below 75%', 'Please check carefully', 60]].map(([r, t, c]) => (
              <span key={r as string} className="row"><i className="ai-dot" style={{ background: dotColor(c as number), margin: 0 }} /><b style={{ width: 78 }}>{r}</b><span className="sub">{t}</span></span>
            ))}
          </section>
        </aside>
      </div>
      <Foot back={() => nav(ai ? '/t/new/ai' : '/t/new/choose')} msg={`${qs.length} questions, ${total} points. ${toCheck > 0 ? `${toCheck} need a quick look.` : 'All checked.'}`} next="Next: Check DOK levels" onNext={() => nav('/t/new/dok')} />
      {modal === 'remove' && current && (
        <Confirm danger title={`Remove Q${current.n} from the exam?`} body={`Its mark scheme is removed too. The exam total goes from ${total} to ${total - current.pts} points.`} cta="Remove question"
          onCancel={() => setModal('none')}
          onOk={() => {
            const old = qs
            const next = qs.filter((q) => q.n !== current.n)
            setQs(next)
            setOpen(null)
            setModal('none')
            toast(`Q${current.n} removed. Total is now ${total - current.pts} points`, () => setQs(old))
          }}
        />
      )}
      {modal === 'dok' && <DokExplainer onClose={() => setModal('none')} />}
      {modal === 'crit' && (
        <Modal label="Criterion" width={520} onClose={() => setModal('none')}>
          <div className="col" style={{ gap: 14 }}>
            <div className="row sb"><h2 className="t2" style={{ fontSize: 20 }}>{editing === null ? 'Add criterion' : 'Edit criterion'}</h2><button aria-label="Close" onClick={() => setModal('none')}><X size={20} /></button></div>
            <p className="sub">Q{open} {current?.text}</p>
            <label><span className="fl">Points</span><input className="input" style={{ width: 90 }} type="number" min={0} max={current?.pts ?? 3} value={pts} onChange={(e) => setPts(Number(e.target.value))} /></label>
            <p className="sub small">Q{open} is worth {current?.pts} points, so use {current?.pts} or less.</p>
            <label><span className="fl">What earns these points</span><textarea className="ta" style={{ minHeight: 80 }} placeholder="Describe what the answer must show…" value={desc} onChange={(e) => setDesc(e.target.value)} /></label>
            <button className="tlink" style={{ alignSelf: 'flex-start', color: 'var(--t-ai)' }} onClick={() => { setDesc('Right answer with a partly correct reason'); toast('Suggested by AI. Check it before saving.') }}><Sparkles size={16} /> Suggest wording with AI</button>
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button className="tbtn" onClick={() => setModal('none')}>Cancel</button>
              <button
                className="tbtn pri"
                disabled={!desc.trim() || pts > (current?.pts ?? 3) || pts < 0}
                onClick={() => {
                  if (editing === null) {
                    setCrit([...crit, { pts, text: desc.trim() }])
                    toast(`Criterion added to Q${open}`)
                  } else {
                    setCrit(crit.map((c, i) => (i === editing ? { pts, text: desc.trim() } : c)))
                    toast('Criterion saved')
                  }
                  setModal('none')
                }}
              >
                {editing === null ? 'Add' : 'Save'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  )
}

function DokExplainer({ onClose }: { onClose: () => void }) {
  return (
    <Modal label="What is DOK?" width={360} onClose={onClose}>
      <div className="col">
        <h2 className="t2">What is DOK?</h2>
        <p className="sub small">Depth of Knowledge: how deep the thinking in a question is, counted by points.</p>
        <span className="row small"><span className="tag dok1">DOK 1</span> Recall</span>
        <span className="row small"><span className="tag dok2">DOK 2</span> Skills and concepts</span>
        <span className="row small"><span className="tag dok3">DOK 3</span> Strategic thinking</span>
        <button className="tbtn pri" onClick={onClose}>Got it</button>
      </div>
    </Modal>
  )
}

function Dok() {
  const nav = useNavigate()
  const { toast } = useApp()
  const [q8Changed, setQ8] = useState(true)
  const [explain, setExplain] = useState(false)
  const [why, setWhy] = useState(false)
  const [swap, setSwap] = useState(false)
  const mix = q8Changed ? [32, 40, 28] : [32, 56, 12]
  const onTarget = !([32 - 30, mix[1] - 40, mix[2] - 30].some((d) => Math.abs(d) > 5))
  const cols = [
    { d: 1, name: 'Recall', pts: 8, pct: mix[0], target: 30, qs: ['Q1', 'Q2', 'Q3', 'Q9'] },
    { d: 2, name: 'Skills and concepts', pts: q8Changed ? 10 : 14, pct: mix[1], target: 40, qs: q8Changed ? ['Q4', 'Q5', 'Q6'] : ['Q4', 'Q5', 'Q6', 'Q8'] },
    { d: 3, name: 'Strategic thinking', pts: q8Changed ? 7 : 3, pct: mix[2], target: 30, qs: q8Changed ? ['Q7', 'Q8'] : ['Q7'] },
  ]
  return (
    <main className="wrap">
      <div>
        <h1 className="t1 row">Is the thinking level (DOK) balanced? <button aria-label="What is DOK?" onClick={() => setExplain(true)}><Info size={18} /></button></h1>
        <p className="sub" style={{ marginTop: 6 }}>DOK is measured by points, so harder questions count for more. Your school target is 30% recall, 40% skills, 30% strategic thinking.</p>
      </div>
      <section className="tc col" style={{ gap: 16 }}>
        <div className="row"><h2 className="t2">Your mix by points</h2><span className={`tag ${onTarget ? 'ok' : 'warn'}`}>{onTarget ? <Check size={13} /> : <AlertTriangle size={13} />} {onTarget ? 'On target' : 'Off target'}</span></div>
        <div className="row" style={{ gap: 4, color: '#fff', fontWeight: 600, fontSize: 13 }}>
          {mix.map((m, i) => <span key={i} style={{ flex: m, background: ['#2e90fa', '#7a5af8', '#f79009'][i], padding: '6px 12px', borderRadius: 6, minWidth: 0 }}>{m}%</span>)}
        </div>
        <div className="g3">
          {cols.map((c) => (
            <div key={c.d} className="col" style={{ gap: 6 }}>
              <span className="row"><span className={`tag dok${c.d}`}>DOK {c.d}</span> <b style={{ fontWeight: 600 }}>{c.name}</b></span>
              <span className="small">{c.pts} pts, {c.pct}% (target {c.target}%)</span>
              <span className="row wrapr" style={{ gap: 4 }}>{c.qs.map((q) => <span key={q} className={`tag dok${c.d}`}>{q}</span>)}</span>
            </div>
          ))}
        </div>
      </section>
      <div className="g2">
        <section className="tc col">
          <div><h2 className="t2">Your changes</h2><p className="sub small">The AI suggests, you decide. Changes are kept with the exam.</p></div>
          {q8Changed ? (
            <div className="col small" style={{ border: '1px solid var(--t-line)', borderRadius: 10, background: '#fbfbfd', padding: 14 }}>
              <b style={{ fontWeight: 600 }}>Q8 Which is bigger, 5/6 or 7/9? Prove it in two ways.</b>
              <span className="row">AI said <span className="tag dok2">DOK 2</span> <ChevronRight size={14} /> You set <span className="tag dok3">DOK 3</span></span>
              <span className="row sb">Reason: needs two methods and a short proof. <button className="tbtn ghost" onClick={() => { setQ8(false); toast('Q8 is back to DOK 2, as the AI suggested') }}><Undo2 size={16} /> Undo</button></span>
            </div>
          ) : <button className="tbtn" style={{ alignSelf: 'flex-start' }} onClick={() => setQ8(true)}>Set Q8 to DOK 3</button>}
        </section>
        <section className="tc col" style={{ background: 'var(--t-ai-tint)', borderColor: '#ddd2fb', color: '#4a2aa8' }}>
          <span className="row"><span className="av" style={{ background: '#fff', color: 'var(--t-ai)', borderRadius: 8 }}><Sparkles size={18} /></span><span><b style={{ color: 'var(--t-ai)', fontWeight: 600 }}>AI suggestion, 82% confident</b><br /><span className="small">Recall is 2% above target</span></span></span>
          <p style={{ lineHeight: 1.5 }}>Every level is within 5% of the school target, so no change is needed. If you want an exact match, I can suggest a 1-point recall question to swap for part of Q3.</p>
          {swap && <p className="small" style={{ background: '#fff', borderRadius: 8, padding: 10 }}>Swap idea: replace part of Q3 with “Name the top number of 3/4.” (1 point, DOK 1)</p>}
          <div className="row sb wrapr">
            <span className="row">
              <button className="tbtn" onClick={() => { setSwap(false); toast('DOK mix kept') }}>Keep as is</button>
              <button className="tbtn" style={{ background: 'none' }} onClick={() => { setSwap(true); toast('Here is a swap idea. Nothing changes until you keep it.') }}>Show a swap</button>
            </span>
            <button className="tlink" style={{ color: 'var(--t-ai)' }} onClick={() => setWhy(!why)}>Why am I seeing this?</button>
          </div>
          {why && <p className="small">The AI compares your points per DOK level with your school’s target mix each time you change a question.</p>}
        </section>
      </div>
      <Foot back={() => nav('/t/new/questions')} msg={onTarget ? 'Mix is on target.' : 'Mix is off target. You can still continue.'} next="Next: Reward sticker" onNext={() => nav('/t/new/sticker')} />
      {explain && <DokExplainer onClose={() => setExplain(false)} />}
    </main>
  )
}

function Sticker() {
  const nav = useNavigate()
  const { toast } = useApp()
  const file = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [fname, setFname] = useState('fraction-guardian.png')
  const [name, setName] = useState('Fraction Guardian')
  const [earn, setEarn] = useState('beat')
  const [safe, setSafe] = useState(true)
  return (
    <main className="wrap">
      <div><h1 className="t1">Add a reward sticker</h1><p className="sub" style={{ marginTop: 6 }}>Pupils who practise the weak point and beat its guardian get this sticker in their album.</p></div>
      <div className="g-side" style={{ gridTemplateColumns: 'minmax(0,1fr) 400px' }}>
        <section className="tc col" style={{ gap: 16 }}>
          <div>
            <span className="fl">Sticker picture</span>
            <div className="row wrapr">
              <span style={{ width: 108, height: 108, border: '1px solid var(--t-line)', borderRadius: 12, display: 'grid', placeItems: 'center', overflow: 'hidden' }}>{url ? <img src={url} alt="Sticker preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <Art name="fractionGuardian" size={88} />}</span>
              <div className="col" style={{ gap: 4 }}>
                <b style={{ fontWeight: 500 }}>{fname}</b><span className="sub small">640 × 640 px, 84 KB</span>
                <span className="small row" style={{ gap: 6, color: 'var(--t-ok)' }}><Check size={14} /> Transparent background found</span>
                <button className="tbtn" style={{ alignSelf: 'flex-start' }} onClick={() => { toast('Choose a new picture (PNG, at least 512 × 512)'); file.current?.click() }}>Replace</button>
                <input ref={file} hidden type="file" accept="image/png" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setUrl(URL.createObjectURL(f)); setFname(f.name) } }} />
              </div>
            </div>
            <p className="sub small" style={{ marginTop: 6 }}>PNG with a transparent background, at least 512 × 512 px.</p>
          </div>
          <label className="row" style={{ border: '1px solid var(--t-line)', borderRadius: 10, padding: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
            <input type="checkbox" checked={safe} onChange={(e) => setSafe(e.target.checked)} />
            <span><b style={{ fontWeight: 600 }}>This picture is OK for children</b><br /><span className="sub small">Required. No text, logos, faces of real people or anything scary.</span></span>
          </label>
          <label><span className="fl">Sticker name</span><input className="input" value={name} onChange={(e) => setName(e.target.value)} /><span className="sub small">Pupils see this name in their sticker album.</span></label>
          <div className="col" style={{ gap: 6 }}>
            <span className="fl">Linked weak point</span>
            <span>Comparing fractions with different denominators</span>
            <AiBox title="Suggested by AI, 88% confident">Q4, Q6 and Q8 all test this skill, and they are worth 11 of the 25 points.</AiBox>
          </div>
          <div className="col" style={{ gap: 6 }}>
            <span className="fl">Who earns it</span>
            <label className="row" style={{ cursor: 'pointer' }}><input type="radio" name="earn" checked={earn === 'beat'} onChange={() => setEarn('beat')} /> Pupils who beat the {name || 'guardian'} practice</label>
            <label className="row" style={{ cursor: 'pointer' }}><input type="radio" name="earn" checked={earn === 'all'} onChange={() => setEarn('all')} /> Everyone who finishes the quiz</label>
          </div>
        </section>
        <section className="tc col" style={{ alignItems: 'center', textAlign: 'center', background: 'var(--sky-tint)' }}>
          <b style={{ fontWeight: 600 }}>Preview in the pupil app</b>
          {url ? <img src={url} alt="" style={{ width: 150 }} /> : <Art name="fractionGuardian" size={150} />}
          <p style={{ fontFamily: 'Andika', fontSize: 17, color: 'var(--ink)' }}>“You beat the {name || 'guardian'}! A new sticker is in your album.”</p>
          <span className="sub small">Shown with the yellow reward star, like other stickers.</span>
        </section>
      </div>
      <Foot back={() => nav('/t/new/dok')} msg={safe ? 'Optional step. You can skip the sticker.' : 'Tick “OK for children” to use this sticker.'} next="Next: Confirm" nextDisabled={!safe} onNext={() => nav('/t/new/confirm')} />
    </main>
  )
}

function ConfirmStep() {
  const nav = useNavigate()
  const { toast } = useApp()
  const [when, setWhen] = useState('date')
  const [print, setPrint] = useState('home')
  const [saved, setSaved] = useState(false)
  const facts: [string, string, string?][] = [
    ['Class', 'Class 4B, Maths (26 pupils)', '/t/new/choose'],
    ['Questions', '9 questions, 25 points, all checked by you', '/t/new/questions'],
    ['DOK mix', 'DOK 1, 32% · DOK 2, 40% · DOK 3, 28%', '/t/new/dok'],
    ['Sticker', 'Fraction Guardian, for comparing fractions', '/t/new/sticker'],
  ]
  return (
    <main className="wrap">
      <div><h1 className="t1">Ready to save the Fractions quiz?</h1><p className="sub" style={{ marginTop: 6 }}>Check the summary. You can edit any part by going back.</p></div>
      <div className="g-side" style={{ gridTemplateColumns: 'minmax(0,1fr) 380px' }}>
        <div className="col" style={{ gap: 24 }}>
          <section className="tc col">
            {facts.map(([k, v, to]) => (
              <div key={k} className="row sb" style={{ borderBottom: '1px solid var(--t-line)', paddingBottom: 10 }}><span><span className="sub small">{k}</span><br /><span style={{ fontWeight: 500 }}>{v}</span></span>{to && <button className="tlink" onClick={() => nav(to)}>Edit</button>}</div>
            ))}
          </section>
          <section className="tc col">
            <h2 className="t2">When pupils see it</h2>
            <label className="row" style={{ cursor: 'pointer' }}><input type="radio" name="when" checked={when === 'date'} onChange={() => setWhen('date')} /> <span><b style={{ fontWeight: 500 }}>On the exam date: Thursday, 12 November</b><br /><span className="sub small">Pupils get a “New exam” letter and can print it</span></span></label>
            <label className="row" style={{ cursor: 'pointer' }}><input type="radio" name="when" checked={when === 'draft'} onChange={() => setWhen('draft')} /> <span><b style={{ fontWeight: 500 }}>Keep as a draft</b><br /><span className="sub small">Only you can see it</span></span></label>
          </section>
          <section className="tc col">
            <h2 className="t2">Printable exam</h2>
            <p className="sub small">Fractions_quiz_4B.pdf, 2 pages. Every page has a name box, answer lines and a QR code so photos match the right pupil.</p>
            <div className="row"><button className="tbtn" onClick={() => toast('Opening the printable PDF in a new tab…')}>Preview</button><button className="tbtn" onClick={() => toast('Fractions_quiz_4B.pdf downloaded')}>Download PDF</button></div>
            <label className="row" style={{ cursor: 'pointer' }}><input type="radio" name="print" checked={print === 'home'} onChange={() => setPrint('home')} /> <span>Pupils print it at home<br /><span className="sub small">Print button in their “My exams”</span></span></label>
            <label className="row" style={{ cursor: 'pointer' }}><input type="radio" name="print" checked={print === 'class'} onChange={() => setPrint('class')} /> <span>I print copies for class<br /><span className="sub small">26 copies, collected on the day</span></span></label>
          </section>
        </div>
        <section className="tc col">
          <h2 className="t2">Before you save</h2>
          {[['Every AI suggestion was reviewed', '9 kept, 0 removed, 1 DOK change'], ['DOK mix is within 5% of target', 'Recall 32%, skills 40%, strategic 28%'], ['Sticker marked OK for children', 'Checked by you just now']].map(([a, b]) => (
            <span key={a} className="row" style={{ alignItems: 'flex-start' }}><Check size={18} color="var(--t-ok)" style={{ flex: 'none', marginTop: 2 }} /><span><b style={{ fontWeight: 500 }}>{a}</b><br /><span className="sub small">{b}</span></span></span>
          ))}
          <p className="sub small" style={{ borderTop: '1px solid var(--t-line)', paddingTop: 10, lineHeight: 1.5 }}>This exam used AI to read your file and suggest DOK levels. The final questions and levels are your decisions and are saved with a record of what you changed.</p>
        </section>
      </div>
      <Foot back={() => nav('/t/new/sticker')} msg="Nothing reaches pupils until the exam date." next="Save exam" icon={<Check size={18} />} onNext={() => setSaved(true)} />
      {saved && (
        <Modal label="Exam saved" onClose={() => setSaved(false)}>
          <div className="col" style={{ alignItems: 'center', textAlign: 'center', gap: 14 }}>
            <span className="av" style={{ width: 56, height: 56, background: 'var(--t-ok-tint)', color: 'var(--t-ok)' }}><Check size={28} /></span>
            <h2 className="t2" style={{ fontSize: 20 }}>Fractions quiz saved</h2>
            <p className="sub">{when === 'draft' ? 'It is kept as a draft. Only you can see it.' : 'Pupils get a “New exam” letter on 12 Nov and can print it. You can still edit it until then.'}</p>
            <button className="tbtn pri" onClick={() => nav('/t/exams')}>Back to Exams</button>
          </div>
        </Modal>
      )}
    </main>
  )
}
