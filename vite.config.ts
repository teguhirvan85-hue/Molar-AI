import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// - On GitHub Pages we serve from /Molar-AI/, set with: `npm run build -- --mode gh-pages`
// - On Vercel / Netlify / local preview, base is '/' (default).
export default defineConfig(({ mode }) => ({
  base: mode === 'gh-pages' ? '/Molar-AI/' : '/',
  plugins: [react()],
}))
