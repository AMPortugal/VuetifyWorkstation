<template>
    <div>
        <v-form @submit.prevent="login">
            <v-text-field v-model="loginData.login" label="Login" required></v-text-field>
            <v-text-field v-model="loginData.password" type="password" label="Password" required></v-text-field>
            <v-btn type="submit">Login</v-btn>
        </v-form>
        <v-alert v-if="error" type="error">{{ error }}</v-alert>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';

export default {
    setup() {
        const authStore = useAuthStore();
        const loginData = ref({ login: '', password: '' });
        const error = ref(null);

        const login = async () => {
            try {
                await authStore.login(loginData.value);
                this.$router.push('/useradmin/0');
            } catch (err) {
                error.value = 'Invalid login credentials';
            }
        };

        return {
            loginData,
            error,
            login,
        };
    },
};
</script>
