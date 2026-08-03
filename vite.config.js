import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1500, // Set to 1.5MB if necessary
  },
  plugins: [react()],
})

