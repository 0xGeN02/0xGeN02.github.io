import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    base: '/0xGeN02.github.io/',
    chunkSizeWarningLimit: 1000000,
    assetsDir: './'
  }
})

