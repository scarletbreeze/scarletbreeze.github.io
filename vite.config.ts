import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 배포 대상: <username>.github.io 루트 → base '/'.
// 프로젝트 페이지(예: /hero_lab/)로 옮길 경우 VITE_BASE=/hero_lab/ 로 빌드.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@data': fileURLToPath(new URL('./data', import.meta.url)),
    },
  },
})
