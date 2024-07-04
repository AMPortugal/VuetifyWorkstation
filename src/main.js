import { createApp } from 'vue';
import App from './App.vue';
import { loadFonts } from '@UTI/webfontLoader';
import registerPlugins from '@UTI/autoImportMod';
import pinia from '@MOD/modStores';
import { FontAwesomeIcon } from '@CON/vuetify/_fontAwesome';
import '@STY/mainStyles';
import router from '@MOD/modRouter'; // Adicionar a importação do router

// Carregar as fontes
loadFonts()
    .then(() => {
        const app = createApp(App);

        // Registrar os plugins
        registerPlugins(app);

        // Registrar o Pinia
        app.use(pinia);

        // Registrar o router
        app.use(router); // Adicionar o uso do router

        // Registrar o componente FontAwesomeIcon globalmente
        app.component('FontAwesomeIcon', FontAwesomeIcon);

        app.mount('#app');
        return null; // Retornar um valor
    })
    .catch((error) => {
        console.error('Erro ao carregar as fontes:', error);
        throw error; // Lançar a exceção
    });
