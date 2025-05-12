import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // ✅ ensures all routes are relative
  plugins: [react()]
})
