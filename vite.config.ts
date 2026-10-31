import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the build works on GitHub Pages sub-paths as well as Vercel.
export default defineConfig({
  plugins: [react()],
  base: './',
})
