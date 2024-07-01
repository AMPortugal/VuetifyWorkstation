import dns from 'dns';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import VueRouter from 'unplugin-vue-router/vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
    plugins: [
        VueRouter({ dts: 'src/utils/typed-router.d.ts' }),
        Layouts(),
        Pages({
            dirs: 'src/pages',
            importMode(filepath, options) {
                for (const page of options.dirs) {
                    if (page.baseRoute === '' && filepath.startsWith(`/${page.dir}/main-page`)) return 'sync';
                }
                return 'async';
            },
            extensions: ['vue'],
            exclude: ['**/components/**', '**/pages/**/stores/**', '**/pages/**/scripts/**'],
        }),
        Vue({
            template: { transformAssetUrls },
        }),
        Vuetify({
            autoImport: true,
            styles: {
                configFile: 'src/styles/scss/_variables.scss',
            },
        }),
        Components({
            dts: 'src/utils/typed-components.d.ts',
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia',
                '@vueuse/core',
                {
                    'vue-router': ['createRouter', 'createWebHistory', 'useRouter', 'useRoute'],
                    vuetify: ['useDisplay', 'createVuetify', 'useTheme'],
                },
            ],
            dirs: ['src/utils/**', 'src/stores/**/**', 'src/pages/**/**/stores'],
            dts: 'src/utils/auto-imports.d.ts',
            eslintrc: {
                enabled: true,
            },
            vueTemplate: true,
        }),
    ],
    resolve: {
        dedupe: ['vue'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@ASS': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@API': fileURLToPath(new URL('./src/backend', import.meta.url)),
            '@COM': fileURLToPath(new URL('./src/components', import.meta.url)),
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
    define: { 'process.env': {} },
    optimizeDeps: {
        exclude: ['pinia', 'vuetify'],
        entries: ['src/**/*.vue'],
    },
    clearScreen: false,
    server: {
        https: false,
        host: true,
        open: false,
        cors: true,
        strictPort: false,
        port: 3000,
    },
    preview: {
        port: 3089,
    },
});
