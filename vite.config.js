import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 2005,
    proxy: {
      '/api': {
        target: 'http://localhost:2005',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
