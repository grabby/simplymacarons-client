import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        blog: 'blog.html',
        cart: 'cart.html',
        invoice: 'invoice.html',
        admin: 'admin.html',
        'macaron-care-instructions': 'macaron-care-instructions.html'
      }
    }
  },
  server: {
    port: 5175,
    open: true
  }
}) 