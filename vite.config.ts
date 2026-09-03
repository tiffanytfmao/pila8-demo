import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://tiffanytfmao.github.io/pila8-demo/
export default defineConfig({
  base: '/pila8-demo/',
  plugins: [react()],
})
