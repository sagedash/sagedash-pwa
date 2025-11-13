import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInclude: ['**/_redirects'],
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
