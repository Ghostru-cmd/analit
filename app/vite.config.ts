import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => ({
  build: {
    outDir: './../dist',
    chunkSizeWarningLimit: 1000,
  },
  plugins: [vue()],
  server: {
    port: 9090,
  },
  define: {
    'process.env': loadEnv(mode, process.cwd(), '')
  }
}));