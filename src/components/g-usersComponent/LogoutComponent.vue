<template>
    <v-btn @click="logout">Logout</v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
    authStore.logout();
    router.push('/');
};
</script>
