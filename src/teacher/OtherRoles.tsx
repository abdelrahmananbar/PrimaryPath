import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, Flag, Heart, HelpCircle, LogOut, Map, Search, Star, TrendingDown, UserPlus } from 'lucide-react'
import { Art } from '../art'
import { Modal, useApp } from '../state'
import { AccountPop, Brand, HelpPanel, LangSeg, NotesPop } from './Shell'

const CHILDREN = {
  lina: {
    i: 'LA', name: 'Lina A.', first: 'Lina', cls: 'Class 4B, Ms. Salma', teacher: 'Ms. Salma', quiz: 'Fractions quiz', published: 'Maths, published 12 Nov', score: 72, detail: '18 of 25 points. Class average 76%.',
    note: 'Lina ordered fractions well. She needs practice comparing fractions with different bottom numbers.', flag: true,
    avgLine: 'Last 4 exams. Class average this month: 76%.', bars: [['Shapes', 70], ['Tables', 78], ['Plants', 74], ['Fractions', 72]] as [string, number][], login: 'lina.a',
  },
  adam: {
    i: 'AA', name: 'Adam A.', first: 'Adam', cls: 'Class 2A, Mr. Karim', teacher: 'Mr. Karim', quiz: 'Shapes quiz', published: 'Maths, published 10 Nov', score: 90, detail: '9 of 10 points. Class average 82%.',
    note: 'Adam knows his shapes well. Next we look at angles.', flag: false,
    avgLine: 'Last 4 exams. Class average this month: 82%.', bars: [['Numbers', 88], ['Shapes', 90], ['Clocks', 85], ['Money', 80]] as [string, number][], login: 'adam.a',
  },
}

export function Parent() {
  const nav = useNavigate()
  const { toast, demo } = useApp()
  const [who, setWho] = useState<keyof typeof CHILDREN>('lina')
  const [choose, setChoose] = useState(false)
  const [notes, setNotes] = useState(false)
  const [answers, setAnswers] = useState(false)
  const c = CHILDREN[who]
  const done = demo.beaten ? 5 : 3
  return (
    <div className="tw">
      <header className="nav pt-nav">
        <Brand role="Parent" />
        <div className="nav-right" style={{ gap: 8 }}>
          <button className="ico tbtn" style={{ padding: 7 }} aria-label="Notifications" onClick={() => setNotes(!notes)}><Bell size={20} /><span className="red" /></button>
          <LangSeg />
          <button className="tbtn" style={{ padding: 7 }} aria-label="Log out" onClick={() => nav('/')}><LogOut size={20} /></button>
          {notes && (
            <NotesPop onClose={() => setNotes(false)} items={[
              { title: 'New result: Fractions quiz', sub: 'Lina got 72%. Feedback from her teacher.', when: '2 h', to: '/parent' },
              { title: `Lina finished ${done} of 5 riddles`, sub: 'Fraction Guardian practice', when: 'Today', to: '/parent' },
              { title: 'New exam to print', sub: 'Measuring length, hand in by 26 Nov', when: 'Yesterday', to: '/parent' },
            ]} />
          )}
        </div>
      </header>
      <main className="mob">
        <button className="tc row sb" style={{ padding: 12 }} onClick={() => setChoose(true)} aria-label="Choose a child">
          <span className="row"><span className="av warn" style={{ width: 42, height: 42 }}>{c.i}</span><span style={{ textAlign: 'left' }}><b style={{ fontWeight: 600 }}>{c.name}</b><br /><span className="sub small">{c.cls}</span></span></span>
          <ChevronDown size={20} />
        </button>
        <section className="tc col">
          <div><h2 className="t2">{c.quiz}</h2><span className="sub small">{c.published}</span></div>
          <strong style={{ fontSize: 40 }}>{c.score}%</strong>
          <span className="sub small">{c.detail}</span>
          <div style={{ borderTop: '1px solid var(--t-line)', paddingTop: 12 }}>
            <span className="sub small"><b>From {c.teacher}</b></span>
            <p style={{ lineHeight: 1.5, marginTop: 4 }}>{c.note}</p>
          </div>
          <button className="tlink" style={{ alignSelf: 'flex-start' }} onClick={() => setAnswers(true)}>See all answers</button>
        </section>
        {c.flag && (
          <section className="tc row" style={{ background: 'var(--t-bad-tint)', borderColor: '#f4b8b2', color: 'var(--t-bad)', alignItems: 'flex-start' }}>
            <Flag size={22} style={{ flex: 'none' }} />
            <span><b style={{ fontWeight: 600 }}>Needs extra help: comparing fractions</b><br /><span className="small">Same mistake in 3 questions. Practice is set.</span></span>
          </section>
        )}
        <section className="tc col">
          <div><h2 className="t2">Progress in Maths</h2><span className="sub small">{c.avgLine}</span></div>
          <div className="row" style={{ alignItems: 'flex-end', justifyContent: 'space-between', height: 110 }}>
            {c.bars.map(([l, v], i) => (
              <div key={l} className="col small" style={{ alignItems: 'center', gap: 2, flex: 1 }}>
                <b>{v}%</b>
                <div style={{ width: 40, height: (v - 40) * 1.2, background: i === c.bars.length - 1 && who === 'lina' ? 'var(--t-blue)' : '#b4dcff', borderRadius: 6 }} />
                <span className="sub">{l}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="tc col">
          <h2 className="t2">Practice at home</h2>
          {who === 'lina' ? (
            <>
              <span className="row"><Art name="fractionGuardian" size={44} /><span><b style={{ fontWeight: 600 }}>Fraction Guardian</b><br /><span className="sub small">{done} of 5 riddles done</span></span></span>
              <div className="prog"><i style={{ width: `${(done / 5) * 100}%`, background: 'var(--t-ai)' }} /></div>
              <span className="small">{demo.beaten ? 'Finished. Well done, Lina!' : 'About 5 minutes left. Lina can finish it in the app.'}</span>
            </>
          ) : <span className="sub">Nothing to practise right now. Adam is all caught up.</span>}
        </section>
        <section className="tc col">
          <div className="row sb"><h2 className="t2">{c.first}’s login</h2><button className="tlink small" onClick={() => toast(`A new picture code was sent to ${c.first}’s school.`)}>Reset code</button></div>
          <span className="row"><span className="sub" style={{ width: 90 }}>Name</span><b style={{ fontWeight: 600 }}>{c.login}</b></span>
          <span className="row"><span className="sub" style={{ width: 90 }}>Picture code</span>
            {[[Star, 'var(--sun)'], [Heart, 'var(--pink)'], [Map, 'var(--sky)']].map(([I, bg], i) => {
              const Icon = I as typeof Star
              return <span key={i} style={{ width: 32, height: 32, background: bg as string, border: '2px solid var(--ink)', borderRadius: 8, display: 'grid', placeItems: 'center' }}><Icon size={18} /></span>
            })}
          </span>
        </section>
        <p className="sub small">Grades were checked by {c.teacher}. AI helped with marking and the feedback draft.</p>
      </main>
      {choose && (
        <Modal label="Choose a child" width={390} onClose={() => setChoose(false)}>
          <div className="col">
            <h2 className="t2">Choose a child</h2>
            {(Object.keys(CHILDREN) as (keyof typeof CHILDREN)[]).map((k) => (
              <button key={k} className={`pupil ${who === k ? 'on' : ''}`} onClick={() => { setWho(k); setChoose(false) }}>
                <span className="av warn">{CHILDREN[k].i}</span><span><b style={{ fontWeight: 600 }}>{CHILDREN[k].name}</b><br /><span className="sub small">{CHILDREN[k].cls}</span></span>
              </button>
            ))}
            <button className="tbtn" onClick={() => { setChoose(false); toast('Ask your school for a code to add a child.') }}><UserPlus size={18} /> Add a child with a school code</button>
          </div>
        </Modal>
      )}
      {answers && (
        <Modal label="Answers" width={390} onClose={() => setAnswers(false)}>
          <div className="col">
            <h2 className="t2">{c.quiz}: answers</h2>
            <p className="sub small">Open the full paper at school or in {c.first}’s account. {c.detail}</p>
            <button className="tbtn pri" onClick={() => setAnswers(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export function Counsellor() {
  const [pop, setPop] = useState<'none' | 'notes' | 'account' | 'help'>('none')
  const toggle = (p: typeof pop) => setPop(pop === p ? 'none' : p)
  return (
    <div className="tw">
      <header className="nav">
        <Brand role="Counsellor" />
        <nav className="navlinks" aria-label="Main"><a className="active" href="#/counsellor" aria-current="page">Referrals</a></nav>
        <div className="nav-right">
          <label className="search"><Search size={16} /><input placeholder="Search" aria-label="Search" /></label>
          <LangSeg />
          <button className="ico" aria-label="Notifications" onClick={() => toggle('notes')}><Bell size={22} /><span className="red" /></button>
          <button className="ico" aria-label="Help" onClick={() => toggle('help')}><HelpCircle size={22} /></button>
          <button className="row" aria-label="Account" onClick={() => toggle('account')}><span className="av blue">MD</span><span className="account-name" style={{ fontWeight: 500 }}>Ms. Dina</span><ChevronDown size={18} /></button>
          {pop === 'notes' && <NotesPop onClose={() => setPop('none')} items={[
            { title: 'New referral: Youssef T.', sub: 'From Ms. Salma, Class 4B', when: 'Today', to: '/counsellor' },
            { title: 'Check-in with Malak S. tomorrow', sub: '10:00, counselling room', when: 'Yesterday', to: '/counsellor' },
          ]} />}
          {pop === 'account' && <AccountPop name="Ms. Dina" email="dina.counsellor@school.edu" initials="MD" />}
        </div>
      </header>
      {pop === 'help' && <HelpPanel onClose={() => setPop('none')} />}
      <main className="wrap">
        <div><h1 className="t1">Referrals</h1><p className="sub" style={{ marginTop: 6 }}>Pupils teachers asked you to look at. Only you and the referring teacher can see these notes.</p></div>
        <div className="g-side" style={{ gridTemplateColumns: '340px minmax(0,1fr)' }}>
          <section className="tc col" style={{ padding: 12 }}>
            <b className="sub small" style={{ padding: '4px 8px' }}>New</b>
            <div className="pupil on"><span className="av bad">YT</span><span style={{ flex: 1 }}><b style={{ fontWeight: 600 }}>Youssef T.</b><br /><span className="sub small">From Ms. Salma, Class 4B</span></span><span className="sub small">Today</span></div>
            <b className="sub small" style={{ padding: '4px 8px' }}>Earlier</b>
            <div className="pupil"><span className="av">AR</span><span><b style={{ fontWeight: 500 }}>Adam R.</b><br /><span className="sub small">From Mr. Karim, Class 3A. Closed</span></span></div>
            <div className="pupil"><span className="av">MS</span><span><b style={{ fontWeight: 500 }}>Malak S.</b><br /><span className="sub small">From Ms. Salma, Class 4B. Check-in planned</span></span></div>
          </section>
          <div className="col" style={{ gap: 24 }}>
            <section className="tc col">
              <div className="row wrapr"><span className="av bad" style={{ width: 48, height: 48 }}>YT</span><div><h2 style={{ fontSize: 22, fontWeight: 700 }}>Youssef T.</h2><span className="sub small">Class 4B, age 9. Referred by Ms. Salma today.</span></div><span className="tag bad" style={{ marginLeft: 'auto' }}><TrendingDown size={13} /> Decline</span></div>
              <div style={{ background: '#fbfbfd', border: '1px solid var(--t-line)', borderRadius: 10, padding: 14 }}>
                <b style={{ fontWeight: 600 }}>Teacher’s note</b>
                <p style={{ marginTop: 6, lineHeight: 1.5 }}>Youssef has been quieter in class and is leaving the end of papers blank. Parents not contacted yet. Could you check in with him this week?</p>
              </div>
            </section>
            <section className="tc col">
              <h2 className="t2">Shared with you</h2>
              {[['Maths', '78% to 52%, last 4 exams'], ['Science', '81% to 66%, last 4 exams'], ['Practice', '1 session in 3 weeks (class average: 4)']].map(([k, v]) => (
                <span key={k} className="row"><b style={{ width: 90, fontWeight: 500 }}>{k}</b><span className="sub">{v}</span></span>
              ))}
              <p className="sub small" style={{ borderTop: '1px solid var(--t-line)', paddingTop: 10 }}>Grades and alerts only. No answers, feedback notes or AI drafts are shared.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
