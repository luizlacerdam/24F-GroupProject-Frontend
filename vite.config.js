import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures correct asset resolution
  build: {
    outDir: 'dist', // This is the default for Vite, but ensure it's correct
  },
  server: {
    host: true, // Allows network access
  }
});
