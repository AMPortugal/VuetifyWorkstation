/** @type {import('tailwindcss').Config} */
export default {
    prefix: 'tw-', // Prefixo para evitar conflitos de classes
    content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx,vue}'], // Arquivos para escanear classes Tailwind
    corePlugins: {
        preflight: true, // Resets globais de CSS do Tailwind
    },
    theme: {
        extend: {},
    },
    plugins: [],
    darkMode: 'class', // Suporte para modo escuro com classe 'dark'
    important: '#app', // Torna as classes do TailwindCSS mais específicas
};
