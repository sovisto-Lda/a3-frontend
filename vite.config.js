import { defineConfig, loadEnv } from 'vite';
import removeConsole from 'vite-plugin-remove-console';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), removeConsole()],
    root: path.resolve(__dirname, 'src'),
    publicDir: path.resolve(__dirname, 'src/assets'),
    build: {
      outDir: '../build',
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, 'src/index.html'),
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    // Define ensures the env variable is replaced in your build
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
  };
});
