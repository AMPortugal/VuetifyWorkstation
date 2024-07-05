import { createApp } from 'vue';
import App from './App.vue';
import { loadFonts } from './utils/webfontLoader.js';
import registerPlugins from '@UTI/autoImportMod';
import pinia from '@MOD/modStores';
import { FontAwesomeIcon } from '@CON/vuetify/_fontAwesome';
import '@STY/mainStyles';
import router from '@MOD/modRouter';

loadFonts()
    .then(() => {
        const app = createApp(App);
        registerPlugins(app);
        app.use(pinia);
        app.use(router);
        app.component('FontAwesomeIcon', FontAwesomeIcon);
        app.mount('#app');
        return null;
    })
    .catch((error) => {
        console.error('Erro ao carregar as fontes:', error);
        throw error;
    });
