import dns from 'dns';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';

import { getVitePlugins } from './src/utils/vite-plugins';
import { VitePWA } from 'vite-plugin-pwa';

dns.setDefaultResultOrder('verbatim');

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [
            ...getVitePlugins(),
            VitePWA({
                registerType: 'autoUpdate',
                includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
                manifest: {
                    name: 'Vuetify 3 Workstation',
                    short_name: 'Vuetify3',
                    description: 'Workstation based in Vuetify 3',
                    theme_color: '#ffffff',
                    icons: [
                        {
                            src: 'pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                        },
                    ],
                },
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@ASS': fileURLToPath(new URL('./src/assets', import.meta.url)),
                '@API': fileURLToPath(new URL('./src/backend', import.meta.url)),
                '@COM': fileURLToPath(new URL('./src/components', import.meta.url)),
                '@CON': fileURLToPath(new URL('./src/config', import.meta.url)),
                '@LAY': fileURLToPath(new URL('./src/layouts', import.meta.url)),
                '@PAG': fileURLToPath(new URL('./src/pages', import.meta.url)),
                '@MOD': fileURLToPath(new URL('./src/modules', import.meta.url)),
                '@STO': fileURLToPath(new URL('./src/stores', import.meta.url)),
                '@THE': fileURLToPath(new URL('./src/themes', import.meta.url)),
                '@STY': fileURLToPath(new URL('./src/styles', import.meta.url)),
                '@UTI': fileURLToPath(new URL('./src/utils', import.meta.url)),
            },
            extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
        },
        test: {
            environment: 'jsdom',
            globals: true,
            coverage: {
                reporter: ['text', 'json', 'html'],
            },
        },
        define: { 'process.env': env },
        optimizeDeps: {
            include: ['axios'],
            exclude: ['pinia', 'vuetify'],
            entries: ['./src/**/*.vue'],
        },
        clearScreen: false,
        server: {
            port: 3000,
        },
        preview: {
            port: 3089,
        },
        build: {
            sourcemap: false,
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    },
                },
            },
        },
    };
});

/* npm run migrate:specific -- -Timestamp 2024-06-23T23-39-insertUsers */
