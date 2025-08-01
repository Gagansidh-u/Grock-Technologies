import { defineConfig } from 'vite';

export default defineConfig({
  // Enable ES modules
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth']
        }
      }
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore', 'firebase/auth']
  },
  // Enable compression
  server: {
    compress: true
  }
});