import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Map, Star } from 'lucide-react'
import { Art } from './art'
import type { ArtName } from './art'
import { useApp } from './state'

const ROLES: { id: string; label: [string, string]; art: ArtName; bg: string; to: string; email: string }[] = [
  { id: 'student', label: ['Student', 'Schüler'], art: 'student', bg: 'var(--sky-tint)', to: '/s/map', email: '' },
  { id: 'teacher', label: ['Teacher', 'Lehrkraft'], art: 'teacher', bg: 'var(--teal-tint)', to: '/t', email: 'salma.hassan@school.edu' },
  { id: 'parent', label: ['Parent', 'Eltern'], art: 'parent', bg: 'var(--pink-tint)', to: '/parent', email: 'mrs.a@family.example' },
  { id: 'counsellor', label: ['Counsellor', 'Beratung'], art: 'counsellor', bg: 'var(--grape-tint)', to: '/counsellor', email: 'dina.counsellor@school.edu' },
]

const PICTURES = [
  { icon: Star, bg: 'var(--sun)', name: 'star' },
  { icon: Heart, bg: 'var(--pink)', name: 'heart' },
  { icon: Map, bg: 'var(--sky)', name: 'map' },
]

export default function Login() {
  const nav = useNavigate()
  const { t, reset } = useApp()
  const [role, setRole] = useState(ROLES[0])
  const isStudent = role.id === 'student'

  return (
    <main className="login">
      <div className="cloud" style={{ left: '7%', top: 150 }} />
      <div className="cloud" style={{ right: '7%', top: 230 }} />
      <div className="hills" />
      <div className="chunk st-logo dsp" style={{ fontSize: 36, padding: '12px 36px' }}>
        <Art name="logo" size={52} /> PrimaryPath
      </div>
      <h1 className="dsp" style={{ fontSize: 38 }}>{t('Who are you?', 'Wer bist du?')}</h1>
      <div className="roles">
        {ROLES.map((r) => (
          <button key={r.id} className="role" aria-pressed={role.id === r.id} onClick={() => setRole(r)}>
            <span className="face" style={{ background: r.bg }}>
              <Art name={r.art} size={106} />
            </span>
            {t(r.label[0], r.label[1])}
          </button>
        ))}
      </div>
      <form
        className="chunk col"
        style={{ padding: 28, width: '100%', maxWidth: 500, gap: 16 }}
        onSubmit={(e) => {
          e.preventDefault()
          reset()
          nav(role.to)
        }}
      >
        <h2 className="dsp" style={{ fontSize: 26 }}>{t(`Log in as ${role.label[0]}`, `Anmelden: ${role.label[1]}`)}</h2>
        {isStudent ? (
          <>
            <label>
              <span className="lbl">{t('My name', 'Mein Name')}</span>
              <input className="field" defaultValue="lina.a" autoComplete="username" />
            </label>
            <div>
              <span className="lbl">{t('My secret picture code', 'Mein geheimer Bildercode')}</span>
              <div className="row wrapr">
                {PICTURES.map((p) => (
                  <span key={p.name} className="piccode" style={{ background: p.bg }} role="img" aria-label={p.name}>
                    <p.icon size={28} />
                  </span>
                ))}
                <span className="soft" style={{ marginLeft: 12 }}>{t('Forgot? Ask your parent.', 'Vergessen? Frag deine Eltern.')}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <label>
              <span className="lbl">{t('School email', 'Schul-E-Mail')}</span>
              <input key={role.id} className="field" type="email" defaultValue={role.email} autoComplete="username" />
            </label>
            <label>
              <span className="lbl row sb">
                {t('Password', 'Passwort')} <span className="soft" style={{ fontWeight: 400 }}>{t('Forgot password?', 'Passwort vergessen?')}</span>
              </span>
              <input className="field" type="password" defaultValue="demo-pass" autoComplete="current-password" />
            </label>
          </>
        )}
        <button className="kbtn" type="submit">{isStudent ? t("Let's go!", 'Los geht’s!') : t('Log in', 'Anmelden')}</button>
      </form>
    </main>
  )
}
