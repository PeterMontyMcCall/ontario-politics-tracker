import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: 'src-client',
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/articles': 'http://localhost:3000'  // Adjust if your API path is different
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true
    }
});