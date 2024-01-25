import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path'

export default defineConfig(({ mode }) => ({
    build: {
        outDir: './../dist',
        chunkSizeWarningLimit: 1000,
    },
    plugins: [vue()],
    server: {
        port: 9090,
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true
        }
    }
}));
