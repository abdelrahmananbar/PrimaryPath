import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Backpack, Check, Lightbulb, PlayCircle, Pizza, RotateCcw, Star, Volume2, X } from 'lucide-react'
import { Art } from '../art'
import { Modal, speak, useApp } from '../state'
import { Pip, Spread, Student } from './Shell'

const BACKPACK = [
  { q: ['Which is bigger: 3/4 or 2/3?', 'Was ist größer: 3/4 oder 2/3?'], meta: 'Maths · Fractions · Fractions quiz Q4 · 12 Oct', subject: 'Maths', topic: 'Fractions' },
  { q: ['Put in order: 1/2, 2/5, 3/4', 'Ordne: 1/2, 2/5, 3/4'], meta: 'Maths · Fractions · Fractions quiz Q6 · 12 Oct', subject: 'Maths', topic: 'Fractions' },
  { q: ['Sara ate 2/6, Ali ate 1/3. Who ate more?', 'Sara aß 2/6, Ali aß 1/3. Wer aß mehr?'], meta: 'Maths · Fractions · Fractions quiz Q8 · 12 Oct', subject: 'Maths', topic: 'Fractions' },
  { q: ['Name the parts of a plant', 'Nenne die Teile einer Pflanze'], meta: 'Science · Plants · Plants quiz Q2 · 2 Oct', subject: 'Science', topic: 'Plants' },
]

export function Cave() {
  const { t, demo, set } = useApp()
  const nav = useNavigate()
  const [subject, setSubject] = useState('All')
  const [topic, setTopic] = useState('All topics')

  useEffect(() => {
    if (demo.unread.includes('practice')) set({ unread: demo.unread.filter((x) => x !== 'practice') })
  }, [demo.unread, set])

  const items = BACKPACK.filter((b) => (subject === 'All' || b.subject === subject) && (topic === 'All topics' || b.topic === topic))
  const beatenRow = (name: string, art: 'beaten', to: string) => (
    <div className="card row wrapr" style={{ background: '#f1f3f9', borderColor: '#9aa1bd' }}>
      <Art name={art} size={100} />
      <div className="col" style={{ flex: 1, gap: 8 }}>
        <h3 className="dsp soft" style={{ fontSize: 22 }}>{name}</h3>
        <div className="row sb wrapr">
          <span className="dsp row" style={{ background: 'var(--leaf)', border: '3px solid var(--ink)', borderRadius: 10, padding: '6px 12px 2px', fontSize: 18, transform: 'rotate(-3deg)' }}><Check size={18} /> {t('Beaten!', 'Besiegt!')}</span>
          <button className="pill" onClick={() => nav(to)}>{t('See sticker', 'Sticker ansehen')}</button>
        </div>
      </div>
    </div>
  )

  return (
    <Student title={t('The guardian cave', 'Die Wächter-Höhle')} tab="practice">
      <Spread
        pages={[15, 16]}
        left={
          <>
            <h2 className="dsp" style={{ fontSize: 30 }}>{t('Guardians to beat', 'Wächter zum Besiegen')}</h2>
            <div className="grid2">
              {!demo.beaten && (
                <div className="card lift col" style={{ background: 'var(--grape-tint)', alignItems: 'center', textAlign: 'center' }}>
                  <span style={{ background: '#fff', border: '3px solid var(--ink)', borderRadius: '50%', padding: 34 }}><Art name="fractionGuardian" size={108} /></span>
                  <h3 className="dsp" style={{ fontSize: 24 }}>{t('Fraction Guardian', 'Bruch-Wächter')}</h3>
                  <p className="soft">{t('Maths · weak point: comparing fractions', 'Mathe · Schwachstelle: Brüche vergleichen')}</p>
                  <Dots total={5} done={0} />
                  <b>{t('5 riddles · 0 done', '5 Rätsel · 0 fertig')}</b>
                  <button className="kbtn" style={{ width: '100%' }} onClick={() => nav('/s/riddle')}>{t('Fight!', 'Kämpfen!')}</button>
                </div>
              )}
              <div className="card lift col" style={{ background: 'var(--pink-tint)', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ background: '#fff', border: '3px solid var(--ink)', borderRadius: '50%', padding: 34 }}><Art name="spelling" size={108} /></span>
                <h3 className="dsp" style={{ fontSize: 24 }}>{t('Spelling Guardian', 'Rechtschreib-Wächter')}</h3>
                <p className="soft">{t('English · weak point: spelling long words', 'Englisch · Schwachstelle: lange Wörter')}</p>
                <Dots total={3} done={1} />
                <b>{t('3 riddles · 1 done', '3 Rätsel · 1 fertig')}</b>
                <button className="kbtn" style={{ width: '100%' }} onClick={() => nav('/s/riddle')}>{t('Fight!', 'Kämpfen!')}</button>
              </div>
            </div>
            {beatenRow(t('Times-table Guardian', 'Einmaleins-Wächter'), 'beaten', '/s/stickers')}
            {demo.beaten && beatenRow(t('Fraction Guardian', 'Bruch-Wächter'), 'beaten', '/s/stickers')}
          </>
        }
        right={
          <>
            <h2 className="dsp row" style={{ fontSize: 28 }}><Backpack size={32} /> {t('My backpack of tricky questions', 'Mein Rucksack mit kniffligen Fragen')}</h2>
            <div className="chips">
              {[['All', 'Alle'], ['Maths', 'Mathe'], ['Science', 'Sachkunde'], ['English', 'Englisch']].map(([en, de]) => (
                <button key={en} className="chip" aria-pressed={subject === en} onClick={() => setSubject(en)}>{t(en, de)}</button>
              ))}
            </div>
            <div className="row wrapr" style={{ fontWeight: 700 }}>
              {t('Topic:', 'Thema:')}
              {['All topics', 'Fractions', 'Times tables', 'Plants'].map((x) => (
                <button key={x} className="pill sm" aria-pressed={topic === x} style={{ boxShadow: 'none' }} onClick={() => setTopic(x)}>{x}</button>
              ))}
            </div>
            {items.map((b) => (
              <div key={b.meta} className="card row sb wrapr" style={{ padding: '14px 18px' }}>
                <div className="col" style={{ flex: 1, minWidth: 200, gap: 12 }}>
                  <b style={{ fontSize: 20 }}>{t(b.q[0], b.q[1])}</b>
                  <span className="soft">{b.meta}</span>
                </div>
                <button className="pill" onClick={() => nav('/s/riddle')}>{t('Try again', 'Nochmal')}</button>
              </div>
            ))}
            {items.length === 0 && <p className="soft">{t('Nothing tricky here. Nice!', 'Hier ist nichts Kniffliges. Super!')}</p>}
            <Pip>{t('This is your own question bank. Every question you missed is saved here. Get it right and it leaves!', 'Das ist deine eigene Fragensammlung. Jede verpasste Frage ist hier. Löst du sie, verschwindet sie!')}</Pip>
          </>
        }
      />
    </Student>
  )
}

function Dots({ total, done }: { total: number; done: number }) {
  return (
    <span className="row" style={{ gap: 10 }} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <i key={i} style={{ width: 28, height: 28, borderRadius: '50%', border: '3px solid var(--ink)', background: i < done ? 'var(--leaf)' : '#fff' }} />
      ))}
    </span>
  )
}

const HINTS: [string, string][] = [
  ['Look at the two bars. Which coloured part is longer?', 'Schau dir die zwei Balken an. Welcher farbige Teil ist länger?'],
  ['Make the bottom numbers the same. Try cutting both into 12 pieces.', 'Mach die unteren Zahlen gleich. Teile beide in 12 Stücke.'],
  ['3/4 = 9/12 and 2/3 = 8/12. Which has more pieces?', '3/4 = 9/12 und 2/3 = 8/12. Was hat mehr Stücke?'],
]
const VIDEO = [
  { a: '3/4', b: '2/3', cutA: 4, cutB: 3, en: "Which piece is bigger? Let's cut both the same way!", de: 'Welches Stück ist größer? Teilen wir beide gleich!' },
  { a: '9/12', b: '8/12', cutA: 12, cutB: 12, en: 'Now both have 12 pieces: 9 and 8.', de: 'Jetzt haben beide 12 Stücke: 9 und 8.' },
  { a: '3/4', b: '2/3', cutA: 12, cutB: 12, en: '9 pieces is more than 8. So 3/4 is bigger!', de: '9 Stücke sind mehr als 8. Also ist 3/4 größer!' },
]

function Bar({ parts, filled, color }: { parts: number; filled: number; color: string }) {
  return (
    <span className="bar" aria-hidden="true">
      {Array.from({ length: parts }, (_, i) => <i key={i} style={{ background: i < filled ? color : '#fff' }} />)}
    </span>
  )
}

export function Riddle() {
  const { t, demo } = useApp()
  const nav = useNavigate()
  const [choice, setChoice] = useState<string | null>(null)
  const [state, setState] = useState<'ask' | 'wrong' | 'right'>('ask')
  const [hints, setHints] = useState(0)
  const [video, setVideo] = useState(-1)
  const question = t('Which fraction is bigger?', 'Welcher Bruch ist größer?')

  useEffect(() => {
    if (video < 0 || video >= 2) return
    const id = window.setTimeout(() => setVideo((v) => v + 1), 3500)
    return () => window.clearTimeout(id)
  }, [video])

  const answers: [string, string, string][] = [['3/4', '3/4', '3/4'], ['2/3', '2/3', '2/3'], ['same', 'The same', 'Gleich groß']]
  const check = () => {
    if (choice === '3/4') setState('right')
    else setState('wrong')
  }
  const right = state === 'right'
  const stars = right ? 3 : 2

  return (
    <Student title={t('Fraction Guardian · riddle 2 of 5', 'Bruch-Wächter · Rätsel 2 von 5')} tab="practice">
      <div className="single">
        <div className="row sb wrapr">
          <button className="pill" onClick={() => nav('/s/cave')}><X size={20} /> {t('Stop for now', 'Pause')}</button>
          <span className="row dsp" style={{ fontSize: 20 }}>
            <Dots total={5} done={right ? 2 : 1} />
            {right ? t('2 of 5 done', '2 von 5 fertig') : t('Riddle 2 of 5', 'Rätsel 2 von 5')}
          </span>
          <div className="card" style={{ background: 'var(--sun-tint)', padding: '6px 14px' }}>
            <span className="soft">{t('My level', 'Mein Level')}</span>
            <div className="row dsp" style={{ gap: 4, fontSize: 17 }}>
              {[0, 1, 2].map((i) => <Star key={i} size={26} fill={i < stars ? 'var(--sun)' : '#fff'} />)}
              &nbsp;{right ? t('Level up!', 'Level hoch!') : t('Just right', 'Passt!')}
            </div>
          </div>
        </div>
        <div className="row wrapr" style={{ alignItems: 'stretch', gap: 24 }}>
          <div className="card col" style={{ background: 'var(--sky-tint)', alignItems: 'center', justifyContent: 'center', width: 200, flex: 'none' }}>
            <span className="face" style={{ background: '#fff' }}><Art name="student" size={100} /></span>
            <span className="dsp" style={{ fontSize: 24 }}>Lina</span>
          </div>
          <div className="card lift col" style={{ flex: 1, minWidth: 280, gap: 18 }}>
            <div className="row sb">
              <h2 className="dsp" style={{ fontSize: 32, flex: 1, textAlign: 'center' }}>{question}</h2>
              <button className="mark" aria-label={t('Read the riddle', 'Rätsel vorlesen')} onClick={() => speak(question, demo.lang)}><Volume2 size={22} /></button>
            </div>
            <div className="row dsp" style={{ fontSize: 32, justifyContent: 'center', gap: 24 }}>3/4 <Bar parts={4} filled={3} color="var(--grape)" /></div>
            <div className="row dsp" style={{ fontSize: 32, justifyContent: 'center', gap: 24 }}>2/3 <Bar parts={3} filled={2} color="var(--pink)" /></div>
          </div>
          <div className="card col" style={{ background: 'var(--grape-tint)', alignItems: 'center', width: 200, flex: 'none', gap: 8 }}>
            <Art name="fractionGuardian" size={110} />
            <span className="dsp" style={{ fontSize: 18, textAlign: 'center' }}>{t('Fraction Guardian', 'Bruch-Wächter')}</span>
            <span className="energy" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <i key={i} className={i < (right ? 3 : 4) ? 'on' : ''} />)}</span>
            <span className="soft">{t(`Energy ${right ? 3 : 4}/5`, `Energie ${right ? 3 : 4}/5`)}</span>
          </div>
        </div>
        <div className="grid2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
          {answers.map(([id, en, de]) => (
            <button
              key={id}
              className={`ans ${right && id === '3/4' ? 'ok' : ''}`}
              aria-pressed={choice === id}
              disabled={right}
              onClick={() => {
                setChoice(id)
                if (id !== '3/4') {
                  setState('wrong')
                } else {
                  setState('ask')
                }
              }}
            >
              {t(en, de)}
            </button>
          ))}
        </div>
        {state === 'wrong' && (
          <div className="note" role="alert" style={{ background: '#fce9e3' }}>
            {t(`Not quite! ${choice === '2/3' ? '2/3 is a bit smaller.' : 'They are not the same.'} Look at the bars and pick again.`, `Nicht ganz! ${choice === '2/3' ? '2/3 ist etwas kleiner.' : 'Sie sind nicht gleich groß.'} Schau auf die Balken und wähle nochmal.`)}
          </div>
        )}
        {hints > 0 && !right && (
          <div className="note" role="status">
            <Lightbulb size={26} style={{ flex: 'none' }} />
            <span>{t(`Hint ${hints} of 3: `, `Tipp ${hints} von 3: `)}{t(HINTS[hints - 1][0], HINTS[hints - 1][1])}</span>
          </div>
        )}
        {right ? (
          <div className="card col" style={{ background: 'var(--leaf-tint)', gap: 12 }} role="status">
            <h3 className="dsp" style={{ fontSize: 28 }}>{t('Yes! 3/4 is bigger.', 'Ja! 3/4 ist größer.')}</h3>
            <b>{t("Here's why, step by step:", 'Warum? Schritt für Schritt:')}</b>
            {[t('Make the bottom numbers the same: 12', 'Mach die unteren Zahlen gleich: 12'), t('3/4 = 9/12 and 2/3 = 8/12', '3/4 = 9/12 und 2/3 = 8/12'), t('9 pieces is more than 8 pieces', '9 Stücke sind mehr als 8 Stücke')].map((s, i) => (
              <div className="row" key={s} style={{ fontSize: 19, fontWeight: 700 }}><span className="mark" style={{ width: 36, height: 36 }}>{i + 1}</span> {s}</div>
            ))}
            <div className="row sb wrapr">
              <span className="soft">{t('Riddles get a little harder now. You can do it!', 'Die Rätsel werden jetzt etwas schwerer. Du schaffst das!')}</span>
              <button className="kbtn" onClick={() => nav('/s/beaten')}>{t('Next riddle', 'Nächstes Rätsel')}</button>
            </div>
          </div>
        ) : (
          <div className="row sb wrapr" style={{ gap: 18 }}>
            <div className="row wrapr">
              <button className="pill" disabled={hints === 3} style={{ opacity: hints === 3 ? 0.5 : 1 }} onClick={() => setHints(hints + 1)}>
                <Lightbulb size={20} />
                {state === 'wrong' && hints === 0 ? t('Show me a clue', 'Zeig mir einen Tipp') : hints === 0 ? t('I need a hint', 'Ich brauche einen Tipp') : t(`Hint ${Math.min(hints + 1, 3)} of 3`, `Tipp ${Math.min(hints + 1, 3)} von 3`)}
              </button>
              <button className="pill" onClick={() => setVideo(0)}><PlayCircle size={20} /> {t('Tiny video (30 s)', 'Mini-Video (30 s)')}</button>
              <button className="pill" onClick={() => nav('/s/pizza')}><Pizza size={20} /> {t('Pizza scale', 'Pizza-Waage')}</button>
            </div>
            <div className="col" style={{ alignItems: 'center', gap: 8 }}>
              <button className="kbtn" disabled={!choice || state === 'wrong'} style={{ padding: '16px 54px 12px', fontSize: 28 }} onClick={check}>{t('Check!', 'Prüfen!')}</button>
              {!choice && <span className="soft">{t('Pick an answer first', 'Wähle zuerst eine Antwort')}</span>}
            </div>
          </div>
        )}
      </div>
      {video >= 0 && (
        <Modal label="Tiny video" width={760} onClose={() => setVideo(-1)}>
          <div className="col" style={{ fontFamily: 'Andika', color: 'var(--ink)', gap: 16, alignItems: 'center' }}>
            <div className="row sb" style={{ width: '100%' }}>
              <h2 className="dsp" style={{ fontSize: 26 }}>{t('Tiny video · 30 s', 'Mini-Video · 30 s')}</h2>
              <button className="pill sm" onClick={() => setVideo(-1)}><X size={18} /> {t('Close', 'Schließen')}</button>
            </div>
            <div className="col" style={{ width: '100%', gap: 20, padding: 22, background: 'var(--sky-tint)', borderRadius: 16 }}>
              <div className="row dsp" style={{ fontSize: 28, justifyContent: 'center' }}>{VIDEO[video].a} <Bar parts={VIDEO[video].cutA} filled={VIDEO[video].cutA === 12 ? 9 : 3} color="var(--grape)" /></div>
              <div className="row dsp" style={{ fontSize: 28, justifyContent: 'center' }}>{VIDEO[video].b} <Bar parts={VIDEO[video].cutB} filled={VIDEO[video].cutB === 12 ? 8 : 2} color="var(--pink)" /></div>
            </div>
            <p style={{ fontSize: 20, fontWeight: 700, textAlign: 'center' }}>{t(VIDEO[video].en, VIDEO[video].de)}</p>
            <div style={{ height: 10, width: '100%', border: '2px solid var(--ink)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--grape)', width: `${[27, 60, 100][video]}%`, transition: 'width .5s' }} />
            </div>
            <span className="soft">{`0:${['08', '18', '30'][video]} / 0:30 · ${t('subtitles on', 'Untertitel an')}`}</span>
            {video === 2 && <button className="kbtn" onClick={() => setVideo(-1)}>{t('Back to the riddle', 'Zurück zum Rätsel')}</button>}
          </div>
        </Modal>
      )}
    </Student>
  )
}

export function Beaten() {
  const { t, set, demo } = useApp()
  const nav = useNavigate()
  useEffect(() => {
    if (!demo.beaten) set({ beaten: true })
  }, [demo.beaten, set])
  return (
    <Student title={t('You did it!', 'Geschafft!')} tab="practice">
      <Spread
        left={
          <div className="col" style={{ alignItems: 'center', textAlign: 'center', gap: 18, margin: 'auto 0' }}>
            <Art name="sticker" size={230} />
            <h2 className="dsp" style={{ fontSize: 34 }}>{t('You beat the Fraction Guardian!', 'Du hast den Bruch-Wächter besiegt!')}</h2>
            <p style={{ fontSize: 20, fontWeight: 700 }}>{t('4 of 5 riddles right · new sticker: Fraction Star', '4 von 5 Rätseln richtig · neuer Sticker: Bruch-Stern')}</p>
          </div>
        }
        right={
          <div className="col" style={{ gap: 20, margin: 'auto 0' }}>
            <div className="card lift" style={{ background: 'var(--leaf-tint)' }}>
              <b style={{ fontSize: 20 }}>{t('Weak point fixed:', 'Schwachstelle gelöst:')}</b>
              <h3 className="dsp" style={{ fontSize: 28, margin: '8px 0' }}>{t('Comparing fractions', 'Brüche vergleichen')}</h3>
              <p className="soft">{t('Your teacher can see that you fixed it.', 'Deine Lehrerin kann sehen, dass du es gelöst hast.')}</p>
            </div>
            <Pip>{t('You only get a sticker when you fix a real weak point. You earned this one!', 'Sticker gibt es nur, wenn du eine echte Schwachstelle löst. Den hast du dir verdient!')}</Pip>
            <button className="kbtn sun" onClick={() => nav('/s/stickers')}><Star size={24} /> {t('Stick it in my album', 'Ins Album kleben')}</button>
            <div className="row wrapr" style={{ justifyContent: 'center' }}>
              <button className="pill" onClick={() => nav('/s/riddle')}><RotateCcw size={20} /> {t('Play again', 'Nochmal spielen')}</button>
              <button className="pill" onClick={() => nav('/s/cave')}>{t('Back to the cave', 'Zurück zur Höhle')}</button>
            </div>
          </div>
        }
      />
    </Student>
  )
}
