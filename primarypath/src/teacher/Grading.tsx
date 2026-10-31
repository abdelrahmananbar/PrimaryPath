import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, ChevronRight, Eye, Flag, Info, Minus, Pencil, Plus, RefreshCw, RotateCw, Search, Send, Shield, Sparkles, Star, Trash2, Undo2, Users, Volume2, X, MessageSquare, MessageCircle } from 'lucide-react'
import { Art } from '../art'
import { Modal, speak, useApp } from '../state'
import { AiBox, Confirm, Foot, Wizard } from './Shell'

const STEPS = ['Check scans', 'Confirm grades', 'Gaps and red flags', 'Feedback', 'Publish']
const ORDER = ['scans', 'grades', 'gaps', 'feedback', 'publish']

function useGradingShell() {
  const nav = useNavigate()
  const [leaving, setLeaving] = useState(false)
  const leaveModal = leaving && (
    <Confirm title="Leave grading for now?" body="Your progress is saved. You can carry on from Home whenever you are ready." cta="Leave" onCancel={() => setLeaving(false)} onOk={() => nav('/t')} />
  )
  return { onExit: () => setLeaving(true), leaveModal }
}

export default function Grading() {
  const { step = 'scans' } = useParams()
  const { onExit, leaveModal } = useGradingShell()
  const at = Math.max(ORDER.indexOf(step), 0)
  return (
    <Wizard title="Grading: Fractions quiz" steps={STEPS} at={at} saved="Saved" onExit={onExit}>
      {step === 'scans' && <Scans />}
      {step === 'grades' && <Grades />}
      {step === 'gaps' && <Gaps />}
      {step === 'feedback' && <Feedback />}
      {step === 'publish' && <Publish />}
      {leaveModal}
    </Wizard>
  )
}

const ROSTER = [['LA', 'Lina A.'], ['OH', 'Omar H.'], ['AK', 'Adam K.'], ['MS', 'Mariam S.'], ['NE', 'Nour E.'], ['YT', 'Youssef T.'], ['KB', 'Karim B.'], ['HM', 'Hana M.'], ['ZF', 'Ziad F.']]

function Scans() {
  const nav = useNavigate()
  const { demo, set, toast } = useApp()
  const [pupil, setPupil] = useState('Lina A.')
  const [word, setWord] = useState('denominater')
  const [zoom, setZoom] = useState(100)
  const [rot, setRot] = useState(0)
  const [q, setQ] = useState('')
  const checked = demo.scansChecked
  const status = (name: string) => {
    if (checked) return name === 'Lina A.' ? ['Checked by you', 'var(--t-ok)'] : ['Read cleanly', 'var(--t-ok)']
    if (name === 'Lina A.') return ['2 words to check', 'var(--t-warn)']
    if (name === 'Omar H.') return ['1 word to check', 'var(--t-warn)']
    return ['Read cleanly', 'var(--t-ok)']
  }
  const list = ROSTER.filter(([, n]) => n.toLowerCase().includes(q.toLowerCase()))
  const accept = () => {
    set({ scansChecked: true })
    toast(word === 'denominater' ? 'Spelling variant accepted. Grading uses this text.' : `Text corrected to “${word}”. Grading uses this text.`)
  }
  return (
    <main className="wrap wide" style={{ paddingTop: 32 }}>
      <div className="g-3col" style={{ display: 'grid', gridTemplateColumns: '272px minmax(0,1fr) minmax(0,1fr)', gap: 24, alignItems: 'start' }}>
        <section className="tc" style={{ padding: 8 }}>
          <div style={{ padding: 12 }}>
            <b style={{ fontSize: 16, fontWeight: 600 }}>Papers</b> <span className="sub">26</span>
            <label className="row input" style={{ marginTop: 12, gap: 8 }}><Search size={16} /><input style={{ border: 0, outline: 0, width: '100%' }} placeholder="Find a pupil" aria-label="Find a pupil" value={q} onChange={(e) => setQ(e.target.value)} /></label>
          </div>
          {list.map(([i, n]) => {
            const [label, color] = status(n)
            return (
              <button key={n} className={`pupil ${pupil === n ? 'on' : ''}`} aria-pressed={pupil === n} onClick={() => setPupil(n)}>
                <span className="av" style={pupil === n ? { background: '#fff' } : undefined}>{i}</span>
                <span><span style={{ fontWeight: 500 }}>{n}</span><br /><span className="small sub row" style={{ gap: 6 }}><i style={{ width: 6, height: 6, borderRadius: 3, background: color }} /> {label}</span></span>
              </button>
            )
          })}
        </section>
        <section className="tc" style={{ padding: 18 }}>
          <div className="row sb" style={{ marginBottom: 12 }}>
            <b style={{ fontWeight: 500 }}>Photo from {pupil.split(' ')[0]}, page 2 of 2</b>
            <div className="row" style={{ gap: 6 }}>
              <button className="tbtn" style={{ padding: 6 }} aria-label="Zoom out" onClick={() => setZoom(Math.max(100, zoom - 25))}><Minus size={18} /></button>
              <button className="tbtn" style={{ padding: 6 }} aria-label="Zoom in" onClick={() => { const z = Math.min(175, zoom + 25); setZoom(z); toast(`Zoomed to ${z}%. Drag to move around the page.`) }}><Plus size={18} /></button>
              <button className="tbtn" style={{ padding: 6 }} aria-label="Rotate" onClick={() => { setRot((rot + 90) % 360); toast('Page turned 90°.') }}><RotateCw size={18} /></button>
            </div>
          </div>
          <div style={{ overflow: 'auto', maxHeight: 760 }}>
            <div className="scan" style={{ transform: `scale(${zoom / 100}) rotate(${rot}deg)`, transformOrigin: 'top left', transition: 'transform .2s' }}>
              <div className="row sb"><div><b style={{ fontSize: 21 }}>Fractions quiz</b><br /><span className="sub small">Maths, Class 4B, Ms. Salma | 25 points</span></div><span aria-hidden="true" style={{ width: 54, height: 54, border: '2px solid #000', background: 'repeating-conic-gradient(#000 0 25%, #fff 0 50%) 0 0/16px 16px' }} /></div>
              <div className="row" style={{ border: '1.5px solid #000', padding: '6px 10px', margin: '14px 0 22px', maxWidth: 300 }}><span className="small">Name:</span><span className="hand" style={{ border: 0 }}>{pupil}</span></div>
              <p style={{ fontWeight: 500 }}>6. Which is bigger, 5/8 or 3/5? Show your working.</p>
              <p className="hand">5/8 because 5 is bigger than 3</p>
              <p style={{ fontWeight: 500, marginTop: 22 }}>7. Share 3 pizzas fairly between 4 friends. Explain.</p>
              <p className="hand">each gets 3/4 of a pizza</p>
              <p className="hand">cut every pizza in 4, everyone gets 3 bits</p>
              <p style={{ fontWeight: 500, marginTop: 22 }}>8. Which is bigger, 5/6 or 7/9? Prove it in two different ways.</p>
              <p className="hand">7/9 because 7 is bigger</p>
              <p className="hand">and 9 is bigger too</p>
              <p style={{ fontWeight: 500, marginTop: 22 }}>9. What do we call the bottom number of a fraction?</p>
              <p className="hand">the <span className={checked ? '' : 'hl'}>denominater</span></p>
            </div>
          </div>
        </section>
        <section className="tc col" style={{ gap: 14 }}>
          <h2 className="t2">What the AI read</h2>
          {[['Q6', 'Read with 98% confidence', '5/8 because 5 is bigger than 3'], ['Q8', 'Read with 96% confidence', '7/9 because 7 is bigger and 9 is bigger too']].map(([k, c, v]) => (
            <div key={k} style={{ border: '1px solid var(--t-line)', background: '#fbfbfd', borderRadius: 10, padding: 14 }}><span className="sub small"><b>{k}</b> &nbsp; {c}</span><p style={{ marginTop: 6 }}>{v}</p></div>
          ))}
          <div style={{ border: `1px solid ${checked ? 'var(--t-line)' : '#f4c97a'}`, background: checked ? '#fbfbfd' : 'var(--t-warn-tint)', borderRadius: 10, padding: 14 }}>
            <span className="small" style={{ color: checked ? 'var(--t-soft)' : 'var(--t-warn)' }}><b>Q9</b> &nbsp; {checked ? 'Checked by you, spelling variant accepted' : 'Read with 71% confidence'}</span>
            <p style={{ marginTop: 6 }}>the <span style={checked ? undefined : { color: 'var(--t-warn)', textDecoration: 'underline' }}>{word}</span></p>
          </div>
          {checked ? (
            <div className="banner"><Check size={18} /> All 26 papers checked</div>
          ) : (
            <>
              <div className="col" style={{ border: '1px solid var(--t-line)', borderRadius: 12, padding: 18 }}>
                <b style={{ fontWeight: 500 }}>Is this the word the pupil wrote?</b>
                <div className="row wrapr">
                  <input className="input" style={{ flex: 1, minWidth: 160, borderColor: 'var(--t-blue)' }} aria-label="Corrected word" value={word} onChange={(e) => setWord(e.target.value)} />
                  <button className="tbtn pri" onClick={accept}>Looks right</button>
                </div>
                <AiBox title="Spelling variant of “denominator”">The ink matches the letters. Grading can treat it as correct, since the quiz checks maths, not spelling.</AiBox>
              </div>
              <div><span className="small">Lina A.: 1 of 2 words checked</span><div className="prog" style={{ marginTop: 6 }}><i style={{ width: '50%' }} /></div></div>
              <button className="tbtn" style={{ alignSelf: 'flex-start' }} onClick={() => { setPupil('Omar H.'); accept() }}><ChevronRight size={18} /> Check Omar H. next</button>
            </>
          )}
        </section>
      </div>
      <Foot msg={checked ? 'All 26 papers checked. From now on, grading uses this text.' : '2 words left to check: 1 for Lina, 1 for Omar.'} next="Next: Confirm grades" nextDisabled={!checked} onNext={() => nav('/t/grade/grades')} />
    </main>
  )
}

const QUESTIONS: Record<string, { title: string; meta: string; done?: boolean }> = {
  Q1: { title: 'Shade 1/4 of the rectangle.', meta: '2 points, DOK 1. All 26 answers confirmed.', done: true },
  Q2: { title: 'Write the fraction for the shaded part.', meta: '2 points, DOK 1. All 26 answers confirmed.', done: true },
  Q3: { title: 'Which fraction is equal to 1/2?', meta: '2 points, DOK 1. All 26 answers confirmed.', done: true },
  Q4: { title: 'Which is bigger, 3/4 or 2/3? Explain how you know.', meta: '3 points, DOK 2. The AI grouped 26 answers into 4 groups. Confirm a whole group at once, or open it to grade one paper.' },
  Q5: { title: 'Order 1/3, 1/6 and 1/2.', meta: 'Not started, 26 answers to confirm' },
  Q6: { title: 'Which is bigger, 5/8 or 3/5? Show your working.', meta: 'Not started, 26 answers to confirm' },
  Q7: { title: 'Share 3 pizzas fairly between 4 friends. Explain.', meta: 'Not started, 26 answers to confirm' },
  Q8: { title: 'Which is bigger, 5/6 or 7/9? Prove it in two different ways.', meta: 'Not started, 26 answers to confirm' },
  Q9: { title: 'What do we call the bottom number of a fraction?', meta: 'Not started, 26 answers to confirm' },
}

function Grades() {
  const nav = useNavigate()
  const { demo, set, toast } = useApp()
  const [q, setQ] = useState('Q4')
  const [modal, setModal] = useState<'none' | 'change' | 'photo' | 'method'>('none')
  const [grade, setGrade] = useState(0)
  const [reason, setReason] = useState('')
  const [methodGrade, setMethodGrade] = useState(2)
  const [topGrade, setTopGrade] = useState(0)
  const confirmed = demo.confirmed
  const confirm = (id: string, msg: string) => {
    set({ confirmed: [...confirmed, id] })
    toast(msg, () => set({ confirmed }))
  }
  const count = 61 + (confirmed.includes('top') ? 7 : 0) + (confirmed.includes('noexp') ? 3 : 0) + (confirmed.includes('method') ? 1 : 0)
  const q4done = ['top', 'noexp', 'method'].every((x) => confirmed.includes(x))
  const undoChange = (i: number) => set({ changes: demo.changes.filter((_, j) => j !== i) })
  return (
    <main className="wrap">
      <div className="row wrapr" role="tablist" aria-label="Questions">
        {Object.keys(QUESTIONS).map((k) => {
          const done = QUESTIONS[k].done || (k === 'Q4' && q4done)
          return <button key={k} role="tab" aria-selected={q === k} className={`qtab ${q === k ? 'on' : done ? 'done' : ''}`} title={QUESTIONS[k].meta} onClick={() => setQ(k)}>{k}</button>
        })}
      </div>
      <div>
        <h1 className="t1" style={{ fontSize: 24 }}>{q} &nbsp;{QUESTIONS[q].title}</h1>
        <p className="sub" style={{ marginTop: 6 }}>{QUESTIONS[q].meta}</p>
      </div>
      <div className="g-side">
        {q === 'Q4' ? (
          <div className="col" style={{ gap: 16 }}>
            <div className="group" style={{ '--c': 'var(--t-ok)' } as React.CSSProperties}>
              <div className="row sb wrapr"><div><b style={{ fontWeight: 600 }}>Correct, used a common denominator</b><br /><span className="sub small">15 papers &nbsp; AI grade 3 / 3, 96% confident</span></div><span className="tag ok"><Check size={14} /> Confirmed</span></div>
            </div>
            <div className={`group ${confirmed.includes('top') ? '' : 'open'}`} style={{ '--c': 'var(--t-bad)' } as React.CSSProperties}>
              <div className="row sb wrapr"><div><b style={{ fontWeight: 600 }}>Compared the top numbers only</b><br /><span className="sub small">7 papers &nbsp; AI grade 0 / 3, 93% confident{topGrade !== 0 && `. You set ${topGrade} / 3`}</span></div>
                {confirmed.includes('top') ? <span className="tag ok"><Check size={14} /> Confirmed</span> : <span className="tag bad"><Flag size={13} /> Repeated mistake in Q6 and Q8 for 3 pupils</span>}
              </div>
              {!confirmed.includes('top') && (
                <>
                  <div className="row sb wrapr" style={{ border: '1px solid var(--t-line)', borderRadius: 10, background: '#fbfbfd', padding: '12px 16px' }}>
                    <span style={{ fontWeight: 500 }}>“3/4 is bigger than 2/3 because 3 is bigger than 2.”</span>
                    <button className="tlink" onClick={() => setModal('photo')}><Eye size={18} /> View photo</button>
                  </div>
                  <span className="small">Lina A., Omar H., Karim B. and 4 more</span>
                  <div className="row wrapr" style={{ alignItems: 'stretch' }}>
                    <div style={{ flex: 1, minWidth: 260 }}><AiBox title="Why 0 of 3">Mark scheme: “A wrong reason, even if the answer is right” = 0 pts. A bigger top number does not make a fraction bigger.</AiBox></div>
                    <div className="col" style={{ gap: 6, width: 196 }}>
                      <button className="tbtn pri" onClick={() => confirm('top', '7 grades confirmed for Q4')}>Confirm {topGrade} / 3</button>
                      <button className="tbtn" onClick={() => { setGrade(topGrade); setReason(''); setModal('change') }}><Pencil size={16} /> Change grade</button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="group" style={{ '--c': 'var(--t-warn)' } as React.CSSProperties}>
              <div className="row sb wrapr"><div><b style={{ fontWeight: 600 }}>Right answer, no explanation</b><br /><span className="sub small">3 papers &nbsp; AI grade 1 / 3, 88% confident</span></div>
                {confirmed.includes('noexp') ? <span className="tag ok"><Check size={14} /> Confirmed</span> : <button className="tbtn" style={{ width: 120 }} onClick={() => confirm('noexp', '3 grades confirmed for Q4.')}>Confirm</button>}
              </div>
            </div>
            <div className="group" style={{ '--c': 'var(--t-ai)' } as React.CSSProperties}>
              <div className="row sb wrapr"><div><b style={{ fontWeight: 600 }}>Different method</b><br /><span className="sub small">1 paper &nbsp; AI grade 2 / 3 ?, 61% confident</span></div>
                {confirmed.includes('method') ? <span className="tag ok"><Check size={14} /> {methodGrade} / 3 saved</span> : <span className="row wrapr"><span className="tag ai"><Sparkles size={13} /> Creative answer, needs your judgement</span><button className="tbtn" style={{ width: 120 }} onClick={() => setModal('method')}>Open</button></span>}
              </div>
            </div>
          </div>
        ) : (
          <section className="tc col">
            <p className="sub">{QUESTIONS[q].done ? 'You confirmed every answer for this question.' : 'The AI grouped these answers the same way as Q4. The demo walks through Q4 in full.'}</p>
            <button className="tbtn" style={{ alignSelf: 'flex-start' }} onClick={() => setQ('Q4')}>Go to Q4</button>
          </section>
        )}
        <aside className="col" style={{ gap: 24 }}>
          <section className="tc col">
            <h2 className="t2">Your changes</h2><span className="sub small">Changes need a reason.</span>
            {demo.changes.map((c, i) => (
              <div key={`${c.who}${i}`} className="col small" style={{ border: '1px solid var(--t-line)', borderRadius: 10, padding: 12, background: '#fbfbfd', gap: 6 }}>
                <b style={{ fontWeight: 600 }}>{c.who}</b>
                <span className="row" style={{ gap: 8 }}><span className="sub">AI {c.ai}</span><ChevronRight size={14} /><b style={{ color: 'var(--t-blue)' }}>You {c.you}</b></span>
                <span className="sub">Reason: {c.reason}</span>
                <button className="tlink" style={{ alignSelf: 'flex-start' }} onClick={() => undoChange(i)}>Undo</button>
              </div>
            ))}
            {demo.changes.length === 0 && <span className="sub small">No changes yet.</span>}
            <span className="small">Spelling variants accepted: 3</span>
          </section>
          <section className="tc col">
            <h2 className="t2">Progress</h2>
            <span className="sub small">{count} of 234 answers confirmed</span>
            <div className="prog"><i style={{ width: `${(count / 234) * 100}%`, background: 'var(--t-ok)' }} /></div>
            <span className="sub small">About 12 minutes left</span>
          </section>
        </aside>
      </div>
      <Foot back={() => nav('/t/grade/scans')} msg="Q1 to Q3 confirmed, plus one change in Q5. 6 questions to go." next="Next: Gaps and red flags" onNext={() => nav('/t/grade/gaps')} />
      {modal === 'change' && (
        <Modal label="Change grade" width={520} onClose={() => setModal('none')}>
          <div className="col" style={{ gap: 14 }}>
            <div className="row sb"><h2 className="t2" style={{ fontSize: 20 }}>Change the grade for this group</h2><button aria-label="Close" onClick={() => setModal('none')}><X size={20} /></button></div>
            <p className="sub">Q4, “Compared the top numbers only”, 7 papers</p>
            <div><span className="fl">New grade (out of 3)</span><div className="seg">{[0, 1, 2, 3].map((g) => <button key={g} aria-pressed={grade === g} style={{ padding: '8px 22px' }} onClick={() => setGrade(g)}>{g}</button>)}</div><p className="sub small" style={{ marginTop: 6 }}>AI grade was 0</p></div>
            <label><span className="fl row sb">Reason <span className="tag warn">Required</span></span><textarea className="ta" style={{ minHeight: 90 }} placeholder="Why are you changing it?" value={reason} onChange={(e) => setReason(e.target.value)} /></label>
            <p className="sub small">Add a reason so other teachers understand the change.</p>
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button className="tbtn" onClick={() => setModal('none')}>Cancel</button>
              <button className="tbtn pri" disabled={!reason.trim() || grade === 0} onClick={() => { set({ changes: [...demo.changes, { who: 'Q4 group, 7 papers', ai: 0, you: grade, reason: reason.trim() }] }); setTopGrade(grade); setModal('none'); toast('Grade changed. Your reason is saved with it.') }}>Save change</button>
            </div>
          </div>
        </Modal>
      )}
      {modal === 'photo' && (
        <Modal label="Answer photo" width={560} onClose={() => setModal('none')}>
          <div className="col">
            <h2 className="t2">Photo of the answer, Lina A., Q4</h2>
            <div className="scan"><p style={{ fontWeight: 500 }}>4. Which is bigger, 3/4 or 2/3? Explain how you know.</p><p className="hand">3/4 is bigger than 2/3 because 3 is bigger than 2</p></div>
            <div className="row sb"><span className="sub small">The checked text matches the photo.</span><button className="tbtn" onClick={() => setModal('none')}>Close</button></div>
          </div>
        </Modal>
      )}
      {modal === 'method' && (
        <Modal label="Different method" width={560} onClose={() => setModal('none')}>
          <div className="col" style={{ gap: 14 }}>
            <h2 className="t2">Different method, Nour E., Q4</h2>
            <div className="scan"><p style={{ fontWeight: 500 }}>4. Which is bigger, 3/4 or 2/3? Explain how you know.</p><p className="hand">I drew 2 pizzas. 3 of 4 is more pizza than 2 of 3.</p></div>
            <AiBox title="AI suggests 2 of 3 (61% sure)">A drawing can count as a reason.</AiBox>
            <div className="seg" style={{ alignSelf: 'flex-start' }}>{[0, 1, 2, 3].map((g) => <button key={g} aria-pressed={methodGrade === g} style={{ padding: '8px 22px' }} onClick={() => setMethodGrade(g)}>{g}</button>)}</div>
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button className="tbtn" onClick={() => setModal('none')}>Close</button>
              <button className="tbtn pri" onClick={() => { set({ confirmed: [...confirmed, 'method'] }); setModal('none'); toast(`Nour’s grade saved: ${methodGrade} of 3`) }}>Save grade</button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  )
}

const SKILLS = [['Comparing fractions with different denominators', 'Q4, Q6, Q8', 58, 'var(--t-bad)'], ['Explaining a method in words', 'Q7, Q8', 42, 'var(--t-warn)'], ['Ordering unit fractions', 'Q5', 19, '#98a2b3'], ['Equivalent fractions', 'Q3', 8, '#98a2b3']] as const

function Gaps() {
  const nav = useNavigate()
  const { demo, set } = useApp()
  const [modal, setModal] = useState<'none' | 'assign' | 'all' | 'dismiss'>('none')
  const [why, setWhy] = useState('A one-off mistake')
  const dismissed = demo.flag === 'dismissed'
  return (
    <main className="wrap">
      {dismissed && <div className="banner" style={{ background: '#eef0f5', color: '#3b4558' }} role="status">Red flag dismissed. Lina won’t get a Guardian.</div>}
      {demo.flag === 'assigned' && <div className="banner" role="status"><Check size={18} /> Fraction Guardian assigned{demo.all3 ? ' to 4 pupils' : ' to Lina'}</div>}
      {demo.all3 && demo.flag !== 'assigned' && <div className="banner" role="status"><Check size={18} /> Fraction Guardian assigned to 3 pupils</div>}
      <div><h1 className="t1">Where is the class stuck?</h1><p className="sub" style={{ marginTop: 6 }}>The AI looked for skills many pupils missed, and for pupils who made the same mistake more than once.</p></div>
      <div className="g2">
        <section className="tc col" style={{ gap: 18 }}>
          <h2 className="t2">Skills the class missed</h2>
          {SKILLS.map(([name, qs, pct, color]) => (
            <div key={name}>
              <div className="row sb"><span style={{ fontWeight: 500 }}>{name}</span><span className="small" style={{ color: pct >= 40 ? color : 'var(--t-soft)', fontWeight: 500, whiteSpace: 'nowrap' }}>{pct}% missed</span></div>
              <span className="sub small">{qs}</span>
              <div className="prog" style={{ marginTop: 6 }}><i style={{ width: `${pct}%`, background: color }} /></div>
            </div>
          ))}
        </section>
        <section className="tc flush" style={{ borderColor: dismissed ? 'var(--t-line)' : '#f4b8b2' }}>
          <div className="row" style={{ background: dismissed ? '#f1f3f8' : 'var(--t-bad-tint)', color: dismissed ? '#3b4558' : 'var(--t-bad)', padding: '14px 24px' }}>
            <Flag size={20} /><div><b style={{ fontWeight: 600 }}>{dismissed ? 'Red flag dismissed' : 'Same mistake 3 times'}</b><br /><span className="small">Lina A., 18 / 25 (72%)</span></div>
          </div>
          <div className="col" style={{ padding: 24 }}>
            <div className="g3" style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
              {[['Q4', '0 / 3', '3/4 vs 2/3'], ['Q6', '2 / 4', '5/8 vs 3/5'], ['Q8', '2 / 4', '5/6 vs 7/9']].map(([q, s, v]) => (
                <div key={q} style={{ border: '1px solid var(--t-line)', borderRadius: 10, padding: 12 }}><div className="row sb small"><span className="sub">{q}</span><b style={{ color: 'var(--t-bad)' }}>{s}</b></div><b style={{ fontWeight: 500 }}>{v}</b></div>
              ))}
            </div>
            <AiBox title="Pattern found, 90% confident">Lina compares the top numbers only. She ordered the unit fractions in Q5 correctly, so the gap is narrow and practice should be quick.</AiBox>
            <b style={{ fontWeight: 500 }}>Suggested practice</b>
            <div className="row sb wrapr" style={{ border: '1px solid var(--t-line)', borderRadius: 10, padding: 14 }}>
              <span className="row"><Art name="fractionGuardian" size={36} /><span><b style={{ fontWeight: 500 }}>Fraction Guardian</b><br /><span className="sub small">5 riddles, 1 puzzle, 3 videos, about 15 min</span></span></span>
              <button className="tlink" onClick={() => nav('/t/guardian')}>Preview practice <ChevronRight size={16} /></button>
            </div>
            {demo.flag === 'open' && (
              <div className="row wrapr">
                <button className="tbtn pri" onClick={() => setModal('assign')}><Shield size={18} /> Assign Guardian</button>
                <button className="tbtn ghost" onClick={() => setModal('dismiss')}>Dismiss flag</button>
              </div>
            )}
            {demo.flag !== 'open' && (
              <div className="row sb wrapr" style={{ background: dismissed ? '#f1f3f8' : 'var(--t-ok-tint)', color: dismissed ? '#3b4558' : 'var(--t-ok)', borderRadius: 10, padding: '10px 14px', fontWeight: 500 }}>
                <span className="row">{dismissed ? <X size={18} /> : <Check size={18} />} {dismissed ? `Dismissed: ${why.toLowerCase()}` : 'Fraction Guardian assigned'}</span>
                <button className="tlink" onClick={() => set({ flag: 'open' })}><Undo2 size={16} /> Undo</button>
              </div>
            )}
          </div>
        </section>
      </div>
      <section className="tc col">
        <div><h2 className="t2">Also made the same mistake twice</h2><p className="sub small">Assign the guardian to all of them at once, or one by one.</p></div>
        <div className="row sb wrapr">
          <div className="row wrapr">
            {[['OH', 'Omar H.'], ['KB', 'Karim B.'], ['HM', 'Hana M.']].map(([i, n]) => (
              <div key={n} className="row" style={{ border: '1px solid var(--t-line)', borderRadius: 10, padding: '10px 14px', minWidth: 190 }}><span className="av">{i}</span><span><b style={{ fontWeight: 500 }}>{n}</b><br /><span className="sub small">Q4 and Q6</span></span></div>
            ))}
          </div>
          {demo.all3 ? (
            <span className="row"><span className="tag ok"><Check size={14} /> Guardian assigned to all 3</span><button className="tlink" onClick={() => set({ all3: false })}>Undo</button></span>
          ) : (
            <button className="tbtn" onClick={() => setModal('all')}><Shield size={18} /> Assign to all 3</button>
          )}
        </div>
      </section>
      <Foot back={() => nav('/t/grade/grades')} msg="Assigning a guardian adds practice. It never changes a grade." next="Next: Feedback" onNext={() => nav('/t/grade/feedback')} />
      {modal === 'assign' && <Confirm title="Assign the Fraction Guardian to Lina?" body="It adds 5 short riddles to her map. Her grade stays the same." cta="Assign Guardian" onCancel={() => setModal('none')} onOk={() => { set({ flag: 'assigned' }); setModal('none') }} />}
      {modal === 'all' && <Confirm title="Assign the Fraction Guardian to 3 pupils?" body="Omar H., Karim B. and Hana M. each get 5 short riddles on their map. Grades stay the same." cta="Assign to all 3" onCancel={() => setModal('none')} onOk={() => { set({ all3: true }); setModal('none') }} />}
      {modal === 'dismiss' && (
        <Modal label="Dismiss red flag" width={480} onClose={() => setModal('none')}>
          <div className="col" style={{ gap: 12 }}>
            <h2 className="t2" style={{ fontSize: 20 }}>Dismiss Lina’s red flag?</h2>
            <p className="sub">Her answers stay as they are. Tell us why, so the AI learns and other teachers understand.</p>
            <b style={{ fontWeight: 600 }}>Reason</b>
            {['A one-off mistake', 'I already help her with this', 'The AI is wrong', 'Other'].map((r) => (
              <label key={r} className="row" style={{ cursor: 'pointer' }}><input type="radio" name="why" checked={why === r} onChange={() => setWhy(r)} /> {r}</label>
            ))}
            <div className="row" style={{ justifyContent: 'flex-end' }}><button className="tbtn" onClick={() => setModal('none')}>Cancel</button><button className="tbtn dngp" onClick={() => { set({ flag: 'dismissed' }); setModal('none') }}>Dismiss flag</button></div>
          </div>
        </Modal>
      )}
    </main>
  )
}

const DRAFTS = {
  Encouraging: {
    EN: 'Well done on putting 1/6, 1/3 and 1/2 in the right order, Lina!\n\nWhen two fractions have different bottom numbers, the top number alone can’t tell you which is bigger. Make the bottom numbers the same first: 3/4 is 9/12 and 2/3 is 8/12, so 3/4 is bigger.\n\nThe Fraction Guardian is waiting on your map to help you practise.',
    DE: 'Toll, dass du 1/6, 1/3 und 1/2 richtig geordnet hast, Lina!\n\nWenn zwei Brüche verschiedene Nenner haben, sagt dir der Zähler allein nicht, welcher größer ist. Mach zuerst die Nenner gleich: 3/4 ist 9/12 und 2/3 ist 8/12, also ist 3/4 größer.\n\nDer Bruch-Wächter wartet auf deiner Karte, damit du üben kannst.',
  },
  Short: {
    EN: 'Good ordering in Q5, Lina! To compare fractions, make the bottom numbers the same first: 3/4 is 9/12 and 2/3 is 8/12. Practise with the Fraction Guardian.',
    DE: 'Gut geordnet in Aufgabe 5, Lina! Um Brüche zu vergleichen, mach zuerst die Nenner gleich: 3/4 ist 9/12 und 2/3 ist 8/12. Übe mit dem Bruch-Wächter.',
  },
  'More detail': {
    EN: 'Well done on putting 1/6, 1/3 and 1/2 in the right order, Lina! You also got the multiplication right.\n\nIn Q4, Q6 and Q8 you looked only at the top numbers. A bigger top number does not always mean a bigger fraction. Cut both fractions into the same number of pieces: 3/4 is 9/12 and 2/3 is 8/12. 9 pieces is more than 8, so 3/4 is bigger.\n\nThe Fraction Guardian is waiting on your map to help you practise this.',
    DE: 'Toll, dass du 1/6, 1/3 und 1/2 richtig geordnet hast, Lina! Auch das Malnehmen war richtig.\n\nBei den Aufgaben 4, 6 und 8 hast du nur auf die Zähler geschaut. Ein größerer Zähler bedeutet nicht immer einen größeren Bruch. Teile beide Brüche in gleich viele Stücke: 3/4 ist 9/12 und 2/3 ist 8/12. 9 Stücke sind mehr als 8, also ist 3/4 größer.\n\nDer Bruch-Wächter wartet auf deiner Karte, damit du das üben kannst.',
  },
}
const FB_PUPILS = [['LA', 'Lina A.', false], ['OH', 'Omar H.', false], ['KB', 'Karim B.', false], ['HM', 'Hana M.', false], ['ZF', 'Ziad F.', false], ['AK', 'Adam K.', true], ['MS', 'Mariam S.', true], ['NE', 'Nour E.', true], ['YT', 'Youssef T.', true]] as const

function Feedback() {
  const nav = useNavigate()
  const { demo, set, toast } = useApp()
  const [tone, setTone] = useState<keyof typeof DRAFTS>('Encouraging')
  const [lang, setLang] = useState<'EN' | 'DE'>('EN')
  const [text, setText] = useState(DRAFTS.Encouraging.EN)
  const [pupil, setPupil] = useState('Lina A.')
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const pick = (t: keyof typeof DRAFTS, l: 'EN' | 'DE') => {
    setTone(t)
    setLang(l)
    setText(DRAFTS[t][l])
  }
  const keptCount = 21 + (demo.kept ? 1 : 0)
  return (
    <main className="wrap">
      <div className="g-3col" style={{ display: 'grid', gridTemplateColumns: '272px minmax(0,1fr) 288px', gap: 24, alignItems: 'start' }}>
        <section className="tc" style={{ padding: 8 }}>
          <div style={{ padding: 12 }}><h2 className="t2">Feedback</h2><span className="sub small">{keptCount} of 26 kept</span></div>
          {FB_PUPILS.map(([i, n, kept]) => {
            const isKept = kept || (n === 'Lina A.' && demo.kept)
            return (
              <button key={n} className={`pupil ${pupil === n ? 'on' : ''}`} aria-pressed={pupil === n} onClick={() => setPupil(n)}>
                <span className="av" style={pupil === n ? { background: '#fff' } : undefined}>{i}</span>
                <span><span style={{ fontWeight: 500 }}>{n}</span><br /><span className="small sub row" style={{ gap: 6 }}><i style={{ width: 6, height: 6, borderRadius: 3, background: isKept ? 'var(--t-ok)' : 'var(--t-ai)' }} /> {isKept ? 'Kept' : 'Draft ready'}</span></span>
              </button>
            )
          })}
        </section>
        <section className="tc col">
          <div className="row sb wrapr">
            <div><h2 style={{ fontSize: 22, fontWeight: 700 }}>{pupil}</h2><span className="sub small">{pupil === 'Lina A.' ? '18 / 25, 72%' : 'Demo shows Lina’s draft'}</span></div>
            {demo.flag === 'assigned' && <span className="tag ai"><Shield size={13} /> Guardian assigned</span>}
          </div>
          <div className="row wrapr" style={{ gap: 24 }}>
            <div><span className="sub small">Tone</span><div className="row wrapr" style={{ gap: 6, marginTop: 4 }}>{(Object.keys(DRAFTS) as (keyof typeof DRAFTS)[]).map((x) => <button key={x} className="tag" aria-pressed={tone === x} style={{ padding: '6px 12px', background: tone === x ? 'var(--t-blue-tint)' : '#fff', color: tone === x ? 'var(--t-blue)' : undefined, border: '1px solid var(--t-line)' }} onClick={() => pick(x, lang)}>{x}</button>)}</div></div>
            <div><span className="sub small">Language</span><br /><span className="seg" style={{ marginTop: 4 }}>{(['EN', 'DE'] as const).map((l) => <button key={l} aria-pressed={lang === l} onClick={() => pick(tone, l)}>{l}</button>)}</span></div>
          </div>
          <div style={{ border: '1px solid var(--t-blue)', borderRadius: 10, overflow: 'hidden' }}>
            <div className="row small" style={{ background: 'var(--t-ai-tint)', color: 'var(--t-ai)', padding: '8px 14px', fontWeight: 600, gap: 8 }}><Sparkles size={15} /> Drafted by AI from her answers. Edit anything.</div>
            <textarea className="ta" aria-label="Feedback draft" style={{ border: 0, minHeight: 220, borderRadius: 0 }} value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <span className="sub small">{words} words, reading age 8 to 9</span>
          <div className="row wrapr">
            <button className="tbtn pri" disabled={!text.trim()} onClick={() => { set({ kept: true }); toast('Feedback for Lina kept') }}><Check size={18} /> Keep</button>
            <button className="tbtn" onClick={() => { pick(tone === 'Encouraging' ? 'More detail' : 'Encouraging', lang); toast('New feedback draft written for Lina') }}><RefreshCw size={18} /> Regenerate</button>
            <button className="tbtn ghost" onClick={() => { const old = text; setText(''); toast('Draft cleared.', () => setText(old)) }}><Trash2 size={18} /> Clear</button>
          </div>
          <div style={{ background: '#fbfbfd', border: '1px solid var(--t-line)', borderRadius: 10, padding: 14 }}>
            <b style={{ fontWeight: 600 }}>Why the AI wrote this</b>
            <p className="sub small" style={{ marginTop: 4, lineHeight: 1.5 }}>Starts with something she did well (Q5), names one mistake (Q4, Q6, Q8), shows one worked example and points to the practice you assigned.</p>
          </div>
        </section>
        <aside className="col">
          <b style={{ fontWeight: 600 }}>What Lina will see</b>
          <div style={{ background: 'linear-gradient(#86cdf7,#d3edfc)', borderRadius: 18, padding: 20 }}>
            <div className="col" style={{ background: '#fff', borderRadius: 14, padding: 18, fontFamily: 'Andika', color: 'var(--ink)' }}>
              <span style={{ fontSize: 20 }}>Your fractions quiz</span>
              <span style={{ background: 'var(--sun)', borderRadius: 16, padding: '4px 18px', alignSelf: 'flex-start', fontSize: 18 }}>18 / 25</span>
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.45 }}>{text || '…'}</p>
              <button className="tbtn" style={{ background: 'var(--sky)', color: '#fff', border: 0, borderRadius: 24 }} onClick={() => speak(text, lang === 'DE' ? 'de' : 'en')}><Volume2 size={18} /> Read it to me</button>
            </div>
          </div>
        </aside>
      </div>
      <Foot back={() => nav('/t/grade/gaps')} msg={`${keptCount} drafts kept, ${26 - keptCount} left.`} next="Next: Review and publish" onNext={() => nav('/t/grade/publish')} />
    </main>
  )
}

function Publish() {
  const nav = useNavigate()
  const { demo } = useApp()
  const [modal, setModal] = useState(false)
  const guardians = (demo.flag === 'assigned' ? 1 : 0) + (demo.all3 ? 3 : 0)
  const names = [...(demo.flag === 'assigned' ? ['Lina A.'] : []), ...(demo.all3 ? ['Omar H.', 'Karim B.', 'Hana M.'] : [])].join(', ')
  const rows = [
    { icon: MessageSquare, title: 'Grades for 26 pupils', sub: 'In each pupil’s “My exams”, in English and German.', on: true },
    { icon: MessageCircle, title: '26 feedback notes', sub: 'All 26 kept by you. Read-aloud is on.', on: true },
    { icon: Shield, title: `${guardians} Fraction Guardian${guardians === 1 ? '' : 's'}`, sub: names || 'None assigned. You can go back to step 3.', on: guardians > 0 },
    { icon: Star, title: 'Fraction Guardian sticker', sub: 'Unlocks after each pupil beats the guardian.', on: true },
    { icon: Users, title: 'Message to parents', sub: 'Short summary with the grade. Off by default.', on: false },
  ]
  const [toggles, setToggles] = useState(rows.map((r) => r.on))
  const parents = toggles[4]
  return (
    <main className="wrap">
      <div><h1 className="t1">Publish the Fractions quiz results?</h1><p className="sub" style={{ marginTop: 6 }}>Pupils see their grade, your feedback and any guardian you assigned. Here is what will be sent.</p></div>
      <div className="g4">
        {[['26', 'papers graded', 'inherit'], ['76%', 'class average', 'var(--t-ok)'], [String(guardians), 'guardians assigned', 'var(--t-ai)'], [String(demo.changes.length), `grade${demo.changes.length === 1 ? '' : 's'} you changed`, 'var(--t-blue)']].map(([n, l, c]) => (
          <div key={l} className="tc"><strong style={{ fontSize: 30, color: c }}>{n}</strong><br /><span className="sub small">{l}</span></div>
        ))}
      </div>
      <div className="g-side" style={{ gridTemplateColumns: 'minmax(0,1fr) 396px' }}>
        <section className="tc col">
          <h2 className="t2">What gets sent</h2>
          {rows.map((r, i) => (
            <div key={r.title} className="row sb">
              <span className="row"><span className="av" style={{ borderRadius: 8 }}><r.icon size={18} /></span><span><b style={{ fontWeight: 500 }}>{r.title}</b><br /><span className="sub small">{r.sub}</span></span></span>
              <button className="switch" role="switch" aria-checked={toggles[i]} aria-label={r.title} onClick={() => setToggles(toggles.map((x, j) => (j === i ? !x : x)))}><i /></button>
            </div>
          ))}
        </section>
        <div className="col" style={{ gap: 24 }}>
          <section className="tc col">
            <h2 className="t2">Checks</h2>
            {['All 234 answers confirmed', '2 scans fixed, 3 spelling variants accepted', 'Every change has a reason'].map((c) => (
              <span key={c} className="row"><span className="av" style={{ background: 'var(--t-ok-tint)', color: 'var(--t-ok)', width: 26, height: 26 }}><Check size={15} /></span> {c}</span>
            ))}
          </section>
          <section className="tc row small" style={{ alignItems: 'flex-start', lineHeight: 1.5 }}>
            <Info size={18} style={{ flex: 'none' }} /> <span className="sub">AI helped read scans, suggest grades and draft feedback. Every grade and note was confirmed by you, Ms. Salma.</span>
          </section>
        </div>
      </div>
      <Foot back={() => nav('/t/grade/feedback')} msg="You can undo for 10 seconds after publishing." next="Publish results" icon={<Send size={18} />} onNext={() => setModal(true)} />
      {modal && <Confirm title="Publish results to 26 pupils?" body={`Pupils see their grades and feedback${parents ? ', and parents get a summary' : ''}. You can undo for 10 seconds after.`} cta="Publish results" onCancel={() => setModal(false)} onOk={() => nav('/t/published')} />}
    </main>
  )
}

export function GuardianPractice() {
  const nav = useNavigate()
  const { demo, set, toast } = useApp()
  const { onExit, leaveModal } = useGradingShell()
  const [modal, setModal] = useState(false)
  const [extra, setExtra] = useState(false)
  const [kind, setKind] = useState('Puzzle')
  const [idea, setIdea] = useState('Something with chocolate bars. Use easy words.')
  const [difficulty, setDifficulty] = useState('Same')
  const [drafts, setDrafts] = useState<string[]>([])
  const riddles = [
    ['Which is bigger, 3/4 or 2/3? Use the bars.', '94%', 'DOK 2'],
    ['Sara ate 2/6 of a cake, Ali ate 1/3. Who ate more?', '91%', 'DOK 2'],
    ['Order 2/5, 1/2 and 3/10 from smallest to biggest.', '86%', 'DOK 3'],
    ...(extra ? [['Is 5/10 the same as 1/2? Show how you know.', '92%', 'DOK 2'], ['A cake is cut into 8. Sami eats 3/8, Lina eats 1/4. Who ate more?', '88%', 'DOK 3']] : []),
  ]
  return (
    <Wizard title="Grading: Fractions quiz" steps={STEPS} at={2} saved="Saved" onExit={onExit}>
      <main className="wrap">
        <button className="tlink" style={{ alignSelf: 'flex-start' }} onClick={() => nav('/t/grade/gaps')}><ArrowLeft size={18} /> Back to gaps and red flags</button>
        <div>
          <div className="row wrapr"><h1 className="t1">Fraction Guardian practice</h1><span className="tag ai"><Sparkles size={13} /> Made by AI, checked by you</span></div>
          <p className="sub" style={{ marginTop: 6 }}>Built from the Q4 mark scheme and Lina’s mistakes in Q4, Q6 and Q8. Nothing reaches pupils until you assign it.</p>
        </div>
        <div className="g-side" style={{ gridTemplateColumns: 'minmax(0,1fr) 360px' }}>
          <div className="col" style={{ gap: 24 }}>
            <section className="tc col">
              <span className="tag" style={{ alignSelf: 'flex-start' }}>Puzzle</span>
              <h2 className="t2">Pizza Scale</h2>
              <p className="sub">Lina guesses which pizza has more, weighs them, then cuts both into 12 equal slices to see why.</p>
              <AiBox title="Why">Targets her “compare the top numbers” mistake. 90% confident.</AiBox>
              <div className="row wrapr">
                <button className="tbtn pri" onClick={() => nav('/t/preview/pizza')}><Eye size={18} /> Preview as Lina</button>
                <button className="tbtn" onClick={() => toast('Writing a new puzzle for this weak point…')}><RefreshCw size={18} /> Regenerate</button>
                <button className="tbtn" onClick={() => toast('Pizza Scale kept in Lina’s practice')}><Check size={18} /> Keep</button>
              </div>
            </section>
            <section className="tc col">
              <h2 className="t2">Riddles</h2><span className="sub small">5 riddles, easy to harder</span>
              {riddles.map(([q, c, d], i) => (
                <div key={q} className="row sb wrapr" style={{ borderTop: '1px solid var(--t-line)', paddingTop: 10 }}><span>{i + 1}. {q}</span><span className="row"><span className="small sub"><i className="ai-dot" style={{ background: 'var(--t-ok)' }} />{c}</span><span className={`tag ${d === 'DOK 3' ? 'dok3' : 'dok2'}`}>{d}</span></span></div>
              ))}
              {!extra && <button className="tlink" style={{ alignSelf: 'flex-start' }} onClick={() => setExtra(true)}>Show 2 more riddles</button>}
            </section>
            <section className="tc col">
              <h2 className="t2">Tiny videos</h2><span className="sub small">3 videos, 30 seconds each, read aloud by Pip</span>
              {['Cut it into equal slices', 'Why bigger bottom = smaller slices', 'Pizza party: who ate more?'].map((v) => (
                <div key={v} className="row sb" style={{ borderTop: '1px solid var(--t-line)', paddingTop: 10 }}><span>{v}</span><span className="sub small">0:30</span></div>
              ))}
            </section>
          </div>
          <aside className="col" style={{ gap: 24 }}>
            <section className="tc col">
              <h2 className="t2">Make more with AI</h2>
              <span className="fl">What should it make?</span>
              <div className="seg" style={{ alignSelf: 'flex-start' }}>{['Puzzle', 'Riddle', 'Video'].map((k) => <button key={k} aria-pressed={kind === k} onClick={() => setKind(k)}>{k}</button>)}</div>
              <label><span className="fl">Your idea (optional)</span><textarea className="ta" style={{ minHeight: 80 }} value={idea} onChange={(e) => setIdea(e.target.value)} /></label>
              <span className="fl">Difficulty</span>
              <div className="seg" style={{ alignSelf: 'flex-start' }}>{['Easier', 'Same', 'Harder'].map((k) => <button key={k} aria-pressed={difficulty === k} onClick={() => setDifficulty(k)}>{k}</button>)}</div>
              <button className="tbtn" onClick={() => { setDrafts([...drafts, `${kind} draft (${difficulty.toLowerCase()})${idea.trim() ? `: ${idea.trim()}` : ''}`]); toast('Draft puzzle added below. Check it before assigning.') }}><Sparkles size={18} /> Generate a draft</button>
              {drafts.map((d, i) => <div key={`${d}${i}`} className="aibox small">{d}</div>)}
            </section>
            <section className="tc col">
              <h2 className="t2">Ready to assign</h2>
              <div className="row"><span className="av warn">LA</span> <b style={{ fontWeight: 500 }}>Lina A.</b></div>
              <span className="sub small">5 riddles, 1 puzzle, 3 videos. About 15 minutes.</span>
              {demo.flag === 'assigned' ? <span className="tag ok" style={{ alignSelf: 'flex-start' }}><Check size={14} /> Assigned</span> : <button className="tbtn pri" onClick={() => setModal(true)}><Shield size={18} /> Assign Guardian to Lina</button>}
            </section>
          </aside>
        </div>
      </main>
      {modal && <Confirm title="Assign the Fraction Guardian to Lina?" body="It adds 5 short riddles to her map. Her grade stays the same." cta="Assign Guardian" onCancel={() => setModal(false)} onOk={() => { set({ flag: 'assigned' }); nav('/t/grade/gaps') }} />}
      {leaveModal}
    </Wizard>
  )
}
