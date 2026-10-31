import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { AppProvider } from './state'
import './styles/base.css'
import './styles/student.css'
import './styles/teacher.css'

// The login page is designed on a 1440 × 1024 canvas. On desktop windows it scales
// to fit one screen; below 1240px the responsive layout takes over.
function fitCanvas() {
  const { innerWidth: w, innerHeight: h } = window
  const z = w <= 1240 ? 1 : Math.max(0.62, Math.min(1, w / 1440, h / 1024))
  document.documentElement.style.setProperty('--z', String(z))
}
fitCanvas()
window.addEventListener('resize', fitCanvas)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </HashRouter>
  </StrictMode>,
)
