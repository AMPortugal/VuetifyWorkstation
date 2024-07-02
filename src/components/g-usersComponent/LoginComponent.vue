<template>
    <v-dialog v-model="dialog" persistent max-width="400">
        <v-card>
            <v-card-title>
                <span class="headline">Login</span>
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="login">
                    <v-text-field v-model="loginData.login" label="Login" required></v-text-field>
                    <v-text-field v-model="loginData.password" type="password" label="Password" required></v-text-field>
                    <v-btn type="submit">Login</v-btn>
                </v-form>
                <v-alert v-if="error" type="error">{{ error }}</v-alert>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const dialog = ref(true);
const authStore = useAuthStore();
const loginData = ref({ login: '', password: '' });
const error = ref(null);
const router = useRouter();

const login = async () => {
    try {
        await authStore.login(loginData.value);
        dialog.value = false; // Fecha o modal após login bem-sucedido
        router.push('/useradmin/0'); // Redireciona para a página useradmin/0
    } catch (err) {
        error.value = 'Invalid login credentials';
    }
};
</script>
