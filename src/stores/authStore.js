// src/stores/authStore.js
import { defineStore } from 'pinia';
import api from '../utils/api.js';

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        user: null,
    }),
    getters: {
        isAuthenticated: (state) => {
            if (!state['token']) return false;
            const { exp } = parseJwt(state['token']);
            return Date.now() < exp * 1000;
        },
    },
    actions: {
        async login(loginData) {
            try {
                const response = await api.post('/login', loginData);
                const token = response.data.token;
                this.token = token;
                this.user = parseJwt(token);
                localStorage.setItem('token', token);
            } catch (err) {
                console.error('Error logging in:', err);
                throw err;
            }
        },
        logout() {
            this.token = '';
            this.user = null;
            localStorage.removeItem('token');
        },
        async fetchUser() {
            if (this.token) {
                this.user = parseJwt(this.token);
            }
        },
    },
});

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join(''),
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}
