import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize for mobile performance
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          routing: ['react-router-dom'],
          auth: ['@auth0/auth0-react'],
          payments: ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          ui: ['ldrs']
        }
      }
    },
    // Optimize chunk size for mobile
    chunkSizeWarningLimit: 1000,
  },
  // Enable compression for better mobile loading
  server: {
    compress: true
  }
})
