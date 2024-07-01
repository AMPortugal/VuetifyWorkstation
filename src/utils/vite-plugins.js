import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import VueRouter from 'unplugin-vue-router/vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export function getVitePlugins() {
    return [
        Vue({
            template: { transformAssetUrls },
        }),
        Vuetify(),
        AutoImport({
            imports: ['vue', 'vue-router', '@vueuse/core'],
            dts: 'src/utils/auto-imports.d.ts',
        }),
        Components({
            dirs: ['src/components'],
            dts: 'src/utils/typed-components.d.ts',
        }),
        Pages({
            dirs: 'src/pages',
            extensions: ['vue'],
            exclude: ['**/components/*.vue'], // Excluir componentes que não são páginas
        }),
        Layouts({
            layoutsDirs: 'src/layouts',
            defaultLayout: 'DefaultLayout',
        }),
        VueRouter({ dts: 'src/utils/typed-routes.d.ts' }),
        {
            name: 'vitest',
            config() {
                return {
                    test: {
                        globals: true,
                        environment: 'jsdom',
                        coverage: {
                            reporter: ['text', 'json', 'html'],
                        },
                    },
                };
            },
        },
    ];
}
