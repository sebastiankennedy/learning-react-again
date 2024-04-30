import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
  server: {
    host: 'localhost',
    port: 22222,
    proxy: {
      '/api': 'http://api-driver.marsview.cc'
    },
    hmr: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [react()]
})
