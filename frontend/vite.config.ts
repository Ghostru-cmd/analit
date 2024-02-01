import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => ({
  base: './',
  build: {
    outDir: './../dist',
    chunkSizeWarningLimit: 1000
  },
  plugins: [vue()],
  server: {
    port: 9090
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
}))
