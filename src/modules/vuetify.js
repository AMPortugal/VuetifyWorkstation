import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases as mdiAliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { aliases as faAliases, fa } from 'vuetify/iconsets/fa-svg';
import { aliases as mdAliases, md } from 'vuetify/iconsets/md';
import { fontIcons, mainIcons, nativeDefaults } from '@CON/vuetify/mainConfig';
import { darkTheme, lightTheme } from '@THE/mainThemes';

const vuetifyConfig = {
    theme: {
        defaultTheme: 'lightTheme',
        themes: {
            lightTheme,
            darkTheme,
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases: {
            ...mdiAliases,
            ...mainIcons.mdiIcons,
            ...faAliases,
            ...fontIcons.faIcons,
            ...mdAliases,
            ...mainIcons.mdIcons,
        },
        sets: {
            mdi,
            fa,
            md,
        },
    },
};

// Aplicar defaults nativos se estiverem presentes
if (nativeDefaults) {
    vuetifyConfig.defaults = nativeDefaults;
}

const vuetify = createVuetify(vuetifyConfig);

export function install(app) {
    app.use(vuetify);
}
