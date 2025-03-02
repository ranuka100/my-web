import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification for production
    minify: 'terser', // Use Terser for minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs from production builds
      },
      output: {
        comments: false, // Remove comments from output
      },
    },
    rollupOptions: {
      // Additional Rollup options for advanced configurations
      output: {
        // Custom output configurations (e.g., chunking)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0]; // Split vendor code into separate chunks
          }
        },
      },
    },
  },
  define: {
    // Define global constants for your app
    'process.env': {}, // Helps with environment variables
  },
});