import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/core" as *;
          @use "@/styles/layout" as *;
        `,
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' }
    ]
  }
})
