import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: false,
        secure: false,
      },
      '/auth/google': {
        target: 'http://localhost:5000',
        changeOrigin: false,
        secure: false,
      },
      '/create-checkout-session': {
        target: 'http://localhost:5000',
        changeOrigin: false,
        secure: false,
      },
    },
  },
});
