// src/utils/autoImportModules.js
/*
import router from '@MOD/main-router';
import pinia from '@MOD/main-stores';
import vuetify from '@MOD/vuetify';

export default [router, pinia, vuetify];
*/
const modules = import.meta.glob('../modules/*.js', { eager: true });

export default (app) => {
    Object.values(modules).forEach((module) => {
        if (typeof module.install === 'function') {
            module.install(app);
        }
    });
};
