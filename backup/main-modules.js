// main-plugins
import vuetify from '@MOD/vuetify';
import pinia from '@MOD/main-stores';
import router from '@MOD/main-router';

export function registerPlugins(app) {
    app.use(vuetify).use(router).use(pinia);
}
