import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Enable polling for file changes
      interval: 100,    // Polling interval in milliseconds (adjust if needed)
    },
    hmr: {
      overlay: true,    // Enable overlay for HMR errors
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'], // Exclude lucide-react if it causes issues
  },
});
