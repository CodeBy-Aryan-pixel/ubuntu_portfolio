import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@tensorflow') || id.includes('seedrandom')) {
              return 'tensorflow-vendor';
            }
            if (id.includes('recharts') || id.includes('d3-') || id.includes('victory-vendor')) {
              return 'charts-vendor';
            }
            if (id.includes('react-icons') || id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'motion-vendor';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
