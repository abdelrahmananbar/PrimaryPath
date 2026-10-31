import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Scissors, Scale, X } from 'lucide-react'
import { Art } from '../art'
import { useApp } from '../state'

// Draws a pizza cut into `cuts` slices with `filled` of them coloured.
function Pie({ cuts, filled, color, size = 150 }: { cuts: number; filled: number; color: string; size?: number }) {
  const r = 46
  const slice = (i: number) => {
    const a0 = (i / cuts) * 2 * Math.PI - Math.PI / 2
    const a1 = ((i + 1) / cuts) * 2 * Math.PI - Math.PI / 2
    const large = a1 - a0 > Math.PI ? 1 : 0
    return `M50 50L${50 + r * Math.cos(a0)} ${50 + r * Math.sin(a0)}A${r} ${r} 0 ${large} 1 ${50 + r * Math.cos(a1)} ${50 + r * Math.sin(a1)}Z`
  }
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      {Array.from({ length: cuts }, (_, i) => (
        <path key={i} d={slice(i)} fill={i < filled ? color : '#fdfbf3'} stroke="#1f2547" strokeWidth="1.4" />
      ))}
      <circle cx="50" cy="50" r={r} fill="none" stroke="#1f2547" strokeWidth="2.6" />
    </svg>
  )
}

const PURPLE = '#8c6bd9'
const PINK = '#f490b4'

export default function PizzaScale({ preview }: { preview?: boolean }) {
  const { t } = useApp()
  const nav = useNavigate()
  const [guess, setGuess] = useState<string | null>(null)
  const [step, setStep] = useState<'predict' | 'weigh' | 'cut' | 'equal'>('predict')
  const exit = preview ? '/t/guardian' : '/s/riddle'

  useEffect(() => {
    if (step !== 'cut') return
    const id = window.setTimeout(() => setStep('equal'), 1800)
    return () => window.clearTimeout(id)
  }, [step])

  const at = step === 'predict' ? (guess ? 1 : 0) : step === 'weigh' ? 2 : 3
  const say =
    step === 'predict'
      ? guess
        ? t('Let’s test your guess on the magic scale!', 'Testen wir deinen Tipp auf der Zauberwaage!')
        : t('Which pizza has more? Tap your guess!', 'Welche Pizza hat mehr? Tippe auf deinen Tipp!')
      : step === 'weigh'
        ? t('3/4 is heavier! But the slices are different sizes… how can we compare fairly?', '3/4 ist schwerer! Aber die Stücke sind verschieden groß … wie vergleichen wir fair?')
        : step === 'cut'
          ? t('Snip snip! Cutting both pizzas into 12 equal slices…', 'Schnipp schnapp! Beide Pizzen werden in 12 gleiche Stücke geteilt …')
          : t('You did it! Same-size slices make it fair. Lina gets 1 more slice.', 'Geschafft! Gleich große Stücke machen es fair. Lina bekommt 1 Stück mehr.')

  return (
    <div className="st">
      <div className="hills" />
      <main className="pz">
        <div className="pz-card">
          {preview && <span className="new" style={{ alignSelf: 'center', padding: '4px 14px' }}>{t('Teacher preview. Pupils do not see this bar.', 'Lehrer-Vorschau. Schüler sehen diesen Hinweis nicht.')}</span>}
          <div className="row sb wrapr">
            <h1 className="dsp" style={{ fontSize: 40 }}>{t('Pizza Scale', 'Pizza-Waage')}</h1>
            <span className="row" aria-label={`Step ${at + 1} of 4`}>
              {[0, 1, 2, 3].map((i) => (
                <i key={i} style={{ width: 22, height: 22, borderRadius: '50%', border: '3px solid var(--ink)', background: i < at ? 'var(--leaf)' : i === at ? 'var(--sky)' : '#fff' }} />
              ))}
            </span>
            <div className="col" style={{ alignItems: 'flex-end', gap: 10 }}>
              <button className="pill" onClick={() => nav(exit)}><X size={20} /> {preview ? t('Exit preview', 'Vorschau beenden') : t('Back to the riddle', 'Zurück zum Rätsel')}</button>
              <span className="row" style={{ background: 'var(--grape-tint)', border: '2px solid var(--ink)', borderRadius: 20, padding: '4px 14px', fontSize: 16 }}>
                {t('Guardian energy', 'Wächter-Energie')}
                <span className="energy">{[0, 1, 2, 3, 4].map((i) => <i key={i} className={i < 4 ? 'on' : ''} />)}</span>
              </span>
            </div>
          </div>

          <div className="col" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 22 }}>
            {step === 'predict' && (
              <>
                {!guess && <p style={{ fontSize: 22, fontWeight: 700, textAlign: 'center' }}>{t('Lina and Sami share pizza. Lina gets 3/4, Sami gets 2/3.', 'Lina und Sami teilen Pizza. Lina bekommt 3/4, Sami bekommt 2/3.')}</p>}
                <div className="row wrapr" style={{ justifyContent: 'center', gap: 32 }}>
                  {([['3/4', 4, 3, PURPLE], ['2/3', 3, 2, PINK]] as const).map(([name, cuts, filled, color], i) => (
                    <div key={name} className="row" style={{ gap: 32 }}>
                      {i === 1 && <span className="dsp" style={{ fontSize: 30 }}>{t('or', 'oder')}</span>}
                      <button className="pcard" aria-pressed={guess === name} onClick={() => setGuess(name)}>
                        {guess === name && <span className="new">{t('My guess!', 'Mein Tipp!')}</span>}
                        <Pie cuts={cuts} filled={filled} color={color} size={190} />
                        {name}
                        {!guess && <span style={{ font: '700 16px Andika' }}>{t('Tap if this has more', 'Tippe, wenn das mehr ist')}</span>}
                      </button>
                    </div>
                  ))}
                </div>
                {guess && <button className="kbtn sun" onClick={() => setStep('weigh')}><Scale size={26} /> {t('Weigh it!', 'Wiegen!')}</button>}
              </>
            )}
            {step === 'weigh' && (
              <>
                <svg viewBox="0 0 800 440" style={{ width: '100%', maxWidth: 780 }} role="img" aria-label={t('The scale tips towards 3/4', 'Die Waage neigt sich zu 3/4')}>
                  <path d="M340 430L370 390H430L460 430Z" fill={PURPLE} stroke="#1f2547" strokeWidth="4" />
                  <rect x="388" y="90" width="24" height="305" fill={PURPLE} stroke="#1f2547" strokeWidth="4" />
                  <g fill="none" stroke="#1f2547" strokeWidth="3">
                    <path d="M130 140L60 310M130 140L200 310M670 40L600 210M670 40L740 210" />
                  </g>
                  <path d="M130 142L670 40" stroke="#1f2547" strokeWidth="17" strokeLinecap="round" />
                  <path d="M130 142L670 40" stroke="#ffcc4d" strokeWidth="10" strokeLinecap="round" />
                  <circle cx="400" cy="90" r="19" fill="#ffcc4d" stroke="#1f2547" strokeWidth="4" />
                  <path d="M40 310H220C210 345 50 345 40 310Z" fill="#e6f4fd" stroke="#1f2547" strokeWidth="3" />
                  <path d="M580 210H760C750 245 590 245 580 210Z" fill="#e6f4fd" stroke="#1f2547" strokeWidth="3" />
                  <foreignObject x="60" y="170" width="140" height="140"><Pie cuts={4} filled={3} color={PURPLE} size={140} /></foreignObject>
                  <foreignObject x="600" y="70" width="140" height="140"><Pie cuts={3} filled={2} color={PINK} size={140} /></foreignObject>
                  <text x="130" y="378" textAnchor="middle" fontFamily="Luckiest Guy" fontSize="30" fill="#1f2547">3/4</text>
                  <text x="670" y="278" textAnchor="middle" fontFamily="Luckiest Guy" fontSize="30" fill="#1f2547">2/3</text>
                </svg>
                <span className="dsp" style={{ background: 'var(--leaf)', border: '3px solid var(--ink)', borderRadius: 20, padding: '8px 60px 4px', fontSize: 20 }}>{t('3/4 is heavier!', '3/4 ist schwerer!')}</span>
                <button className="kbtn sun" onClick={() => setStep('cut')}><Scissors size={26} /> {t('Magic knife', 'Zaubermesser')}</button>
              </>
            )}
            {(step === 'cut' || step === 'equal') && (
              <>
                <div className="row wrapr" style={{ justifyContent: 'center', gap: 44 }}>
                  {([['3/4', 9, 3, 4, PURPLE], ['2/3', 8, 2, 3, PINK]] as const).map(([name, n12, filled, cuts, color]) => (
                    <div key={name} className="col dsp" style={{ alignItems: 'center', fontSize: 30 }}>
                      {step === 'equal' ? <Pie cuts={12} filled={n12} color={color} size={230} /> : <Pie cuts={cuts} filled={filled} color={color} size={230} />}
                      {step === 'equal' ? `${n12}/12` : name}
                      {step === 'equal' && <span style={{ fontSize: 22 }}>{t(`${n12} slices`, `${n12} Stücke`)}</span>}
                    </div>
                  ))}
                </div>
                {step === 'equal' && (
                  <>
                    <p className="note" style={{ background: 'var(--leaf-tint)' }}><Check size={24} /> {t('3/4 = 9/12 and 2/3 = 8/12, so 9 > 8!', '3/4 = 9/12 und 2/3 = 8/12, also 9 > 8!')}</p>
                    <button className="kbtn" onClick={() => nav(exit)}>{preview ? t('Exit preview', 'Vorschau beenden') : t('Back to the riddle', 'Zurück zum Rätsel')}</button>
                  </>
                )}
              </>
            )}
          </div>

          <div className="bubble" style={{ maxWidth: 720 }}>
            <Art name="pip" size={72} />
            <p aria-live="polite">{say}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
