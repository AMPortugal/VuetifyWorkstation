import { defineConfig } from 'cypress';
export default defineConfig({
    e2e: {
        setupNodeEvents() {
            // Implement node event listeners here removido (on, config)
        },
        baseUrl: 'http://localhost:3000',
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    },
    component: {
        devServer: {
            framework: 'vue',
            bundler: 'vite',
        },
        specPattern: 'src/components/**/*.cy.{js,jsx,ts,tsx}',
    },
});
