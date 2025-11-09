import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@cats': '/src/features/cats',
      '@breeds': '/src/features/breeds',
      '@shared': '/src/shared',
    },
  },
});
