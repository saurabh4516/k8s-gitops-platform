import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/products': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/orders': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
      '/api/customers': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
  },
})
