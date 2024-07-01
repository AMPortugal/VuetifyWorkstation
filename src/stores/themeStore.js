import { defineStore } from 'pinia';

export const useThemeStore = defineStore('themeStore', {
    state: () => ({
        theme: 'lightTheme', // Estado inicial do tema
    }),
    actions: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            this.applyTheme();
        },
        applyTheme() {
            const html = document.documentElement;
            if (this.theme === 'dark') {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        },
    },
    persist: true, // Configuração de persistência
});
