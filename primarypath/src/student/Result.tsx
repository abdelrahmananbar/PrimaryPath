import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown, ChevronRight, Eye, Flag, Mail, ShieldCheck, Star, Volume2, X } from 'lucide-react'
import { Art } from '../art'
import { speak, stopSpeaking, useApp } from '../state'
import { BackBtn, Pip, Spread, Student } from './Shell'

const ANSWERS = [
  { n: 1, q: ['6 × 7', '6 × 7'], s: 'right', pts: ['Right · 2 of 2', 'Richtig · 2 von 2'] },
  { n: 2, q: ['7 × 8', '7 × 8'], s: 'right', pts: ['Right · 2 of 2', 'Richtig · 2 von 2'] },
  { n: 3, q: ['Which fraction is shaded?', 'Welcher Bruch ist markiert?'], s: 'right', pts: ['Right · 2 of 2', 'Richtig · 2 von 2'] },
  { n: 4, q: ['Which is bigger?', 'Was ist größer?'], s: 'wrong', pts: ['Not yet · saved in my backpack', 'Noch nicht · in meinem Rucksack'] },
  { n: 5, q: ['Pizza problem', 'Pizza-Aufgabe'], s: 'almost', pts: ['Almost · 3 of 4', 'Fast · 3 von 4'] },
  { n: 6, q: ['Put in order', 'Ordne der Größe nach'], s: 'almost', pts: ['Almost · 2 of 4', 'Fast · 2 von 4'] },
  { n: 7, q: ['Crayons word problem', 'Textaufgabe Stifte'], s: 'right', pts: ['Right · 3 of 3', 'Richtig · 3 von 3'] },
  { n: 8, q: ['Who ate more?', 'Wer hat mehr gegessen?'], s: 'almost', pts: ['Almost · 2 of 4', 'Fast · 2 von 4'] },
  { n: 9, q: ['Name the bottom number', 'Wie heißt die untere Zahl?'], s: 'right', pts: ['Right · 2 of 2', 'Richtig · 2 von 2'] },
]
const STYLE: Record<string, { bg: string; icon: React.ReactNode }> = {
  right: { bg: 'var(--leaf-tint)', icon: <Check size={24} /> },
  wrong: { bg: 'var(--pink-tint)', icon: <X size={24} /> },
  almost: { bg: 'var(--sun-tint)', icon: '~' },
}

export function Result() {
  const { t, demo, set } = useApp()
  const nav = useNavigate()
  const [showAll, setShowAll] = useState(false)
  const [listening, setListening] = useState(false)
  const message = t(
    "Good work on multiplication, Lina! Let's practise comparing fractions with different bottom numbers.",
    'Super gemacht beim Malnehmen, Lina! Lass uns üben, Brüche mit verschiedenen Nennern zu vergleichen.',
  )

  useEffect(() => {
    if (demo.unread.includes('result')) set({ unread: demo.unread.filter((x) => x !== 'result') })
  }, [demo.unread, set])

  const shown = showAll ? ANSWERS : ANSWERS.filter((a) => [1, 4, 5].includes(a.n))

  return (
    <Student title={t('Fractions quiz · my result', 'Bruchrechnen · mein Ergebnis')} tab="exams">
      <Spread
        pages={[11, 12]}
        left={
          <>
            <div className="row wrapr">
              <BackBtn to="/s/exams" />
              <span className="dsp row" style={{ background: 'var(--leaf-tint)', border: '3px solid var(--ink)', borderRadius: 12, padding: '8px 14px 4px', transform: 'rotate(-2deg)', fontSize: 17 }}>
                <Check size={20} /> {t('Checked by your teacher', 'Geprüft von Frau Salma')}
              </span>
            </div>
            <div className="row wrapr" style={{ gap: 22, alignItems: 'center' }}>
              <div className="col" style={{ alignItems: 'center', margin: 'auto' }}>
                <div className="seal">72%</div>
                <span className="dsp" style={{ fontSize: 21 }}>{t('18 of 25 points', '18 von 25 Punkten')}</span>
              </div>
              <div className={`card ${listening ? 'reading' : ''}`} style={{ background: 'var(--sky-tint)', flex: 1, minWidth: 230 }}>
                <div className="row sb" style={{ marginBottom: 8 }}>
                  <span className="row dsp" style={{ fontSize: 19 }}><Art name="teacher" size={46} /> {t('Your teacher says:', 'Frau Salma sagt:')}</span>
                  <button
                    className="mark"
                    aria-label={t('Listen to message', 'Nachricht anhören')}
                    aria-pressed={listening}
                    onClick={() => {
                      if (listening) {
                        stopSpeaking()
                        setListening(false)
                      } else {
                        setListening(true)
                        speak(message, demo.lang, () => setListening(false))
                      }
                    }}
                  >
                    <Volume2 size={22} />
                  </button>
                </div>
                <p style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.4 }}>{message}</p>
              </div>
            </div>
            <div>
              <h2 className="dsp" style={{ fontSize: 24, marginBottom: 10 }}>{t('What went well', 'Das lief gut')}</h2>
              <div className="row wrapr" style={{ fontSize: 20, fontWeight: 700, gap: 40 }}>
                <span className="row"><Star fill="var(--sun)" size={32} /> {t('Multiplication', 'Malnehmen')}</span>
                <span className="row"><Star fill="var(--sun)" size={32} /> {t('Word problems', 'Textaufgaben')}</span>
              </div>
            </div>
            <div className="col">
              <h2 className="dsp" style={{ fontSize: 24 }}>{t('My answers', 'Meine Antworten')}</h2>
              {shown.map((a) => (
                <button
                  key={a.n}
                  className="row-a"
                  style={{ background: STYLE[a.s].bg, cursor: a.s === 'wrong' ? 'pointer' : 'default' }}
                  onClick={() => a.s === 'wrong' && nav('/s/cave')}
                >
                  <span className="mark">{STYLE[a.s].icon}</span>
                  <span>{a.n} · {t(a.q[0], a.q[1])}<small>{t(a.pts[0], a.pts[1])}</small></span>
                </button>
              ))}
              <button className="pill sm" style={{ alignSelf: 'flex-start' }} aria-expanded={showAll} onClick={() => setShowAll(!showAll)}>
                {showAll ? <ChevronDown size={20} /> : <ChevronRight size={20} />} {showAll ? t('Show fewer', 'Weniger') : t('See all 9 answers', 'Alle 9 Antworten')}
              </button>
            </div>
          </>
        }
        right={
          <div className="card lift col" style={{ background: 'var(--grape-tint)', alignItems: 'center', textAlign: 'center', gap: 16, flex: 1, transform: 'rotate(.5deg)', padding: 28 }}>
            <h2 className="dsp" style={{ fontSize: 30 }}>{t('A guardian appeared!', 'Ein Wächter ist da!')}</h2>
            <span style={{ background: '#fff', border: '3px solid var(--ink)', borderRadius: '50%', padding: 50 }}><Art name="fractionGuardian" size={150} /></span>
            <h3 className="dsp" style={{ fontSize: 30 }}>{t('Fraction Guardian', 'Bruch-Wächter')}</h3>
            <p className="soft" style={{ fontSize: 19 }}>{t('It grows from a mistake that keeps coming back:', 'Er wächst aus einem Fehler, der immer wieder passiert:')}</p>
            <h3 className="dsp" style={{ fontSize: 26 }}>{t('Comparing fractions', 'Brüche vergleichen')}</h3>
            <div className="note" style={{ background: '#fce9e3', textAlign: 'left' }}>
              <Flag color="#c8421f" size={28} style={{ flex: 'none' }} />
              {t('Needs extra help: comparing fractions. Your teacher will help you.', 'Achtung: Brüche vergleichen. Deine Lehrerin hilft dir dabei.')}
            </div>
            <button className="kbtn" style={{ padding: '18px 56px 14px', fontSize: 28 }} onClick={() => nav('/s/riddle')}><ShieldCheck size={28} /> {t('Beat it!', 'Besiege ihn!')}</button>
          </div>
        }
      />
    </Student>
  )
}

export function Mailbox() {
  const { t, demo } = useApp()
  const nav = useNavigate()
  const letters = [
    { id: 'result', icon: Mail, title: t('Your teacher wrote about your Fractions quiz', 'Deine Lehrerin hat über deinen Bruchrechnen-Test geschrieben'), when: t('Today', 'Heute'), cta: t('Read', 'Lesen'), to: '/s/result', bg: 'var(--pink-tint)' },
    { id: 'practice', icon: ShieldCheck, title: t('New practice: Fraction Guardian', 'Neue Übung: Bruch-Wächter'), when: t('Today', 'Heute'), cta: t('Go!', 'Los!'), to: '/s/cave', bg: 'var(--grape-tint)' },
    { id: 'science', icon: Eye, title: t('Your Science quiz is being checked', 'Dein Sachkunde-Test wird geprüft'), when: t('Yesterday', 'Gestern'), cta: t('Where?', 'Wo?'), to: '/s/sent', bg: '#fff' },
    { id: 'sticker', icon: Star, title: t('You got a sticker: Times-table Star', 'Du hast einen Sticker: Einmaleins-Stern'), when: t('2 weeks ago', 'Vor 2 Wochen'), cta: t('See', 'Ansehen'), to: '/s/stickers', bg: '#fff' },
  ]
  const n = demo.unread.length
  return (
    <Student title={t('My mailbox', 'Mein Briefkasten')} tab="map">
      <Spread
        pages={[13, 14]}
        left={
          <>
            <BackBtn to="/s/map" />
            <Pip>{n > 0 ? t(`You have ${n} new letter${n > 1 ? 's' : ''}!`, `Du hast ${n} neue${n > 1 ? '' : 'n'} Brief${n > 1 ? 'e' : ''}!`) : t('You read all your letters. Well done!', 'Du hast alle Briefe gelesen. Toll!')}</Pip>
            <div style={{ background: 'linear-gradient(#c7e7fa,#eef8fe)', border: '3px solid var(--ink)', borderRadius: 24, padding: '70px 0 40px', textAlign: 'center' }}>
              <Art name="post" size={190} />
            </div>
            <p className="soft" style={{ fontSize: 18 }}>{t('Letters from your teacher and Pip land here.', 'Briefe von deiner Lehrerin und Pip landen hier.')}</p>
          </>
        }
        right={
          <>
            {letters.map((l) => {
              const isNew = demo.unread.includes(l.id)
              const today = l.bg !== '#fff'
              return (
                <div key={l.id} className={`card row ${today ? 'lift' : ''}`} style={{ background: l.bg, alignItems: 'flex-start' }}>
                  <span className="mark" style={{ borderRadius: 14, width: 60, height: 60 }}><l.icon size={28} /></span>
                  <div className="col" style={{ flex: 1, gap: 10 }}>
                    <b style={{ fontSize: 20 }}>{l.title}</b>
                    <div className="row sb wrapr">
                      <span className="row soft">{l.when} {isNew && <span className="new">{t('New!', 'Neu!')}</span>}</span>
                      <button className={today ? 'kbtn' : 'pill'} style={today ? { padding: '10px 42px 6px', fontSize: 20 } : { padding: '10px 36px' }} onClick={() => nav(l.to)}>{l.cta}</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        }
      />
    </Student>
  )
}
