<template>
    <div>
        <h1>Admin Page</h1>
        <p>Bem vindo a página de administração</p>
        <v-btn @click="logout">Logout</v-btn>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
    authStore.logout();
    router.push('/homepage/0');
};
</script>

<style scoped>
/* Seus estilos aqui */
</style>
