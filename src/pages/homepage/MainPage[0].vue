<template>
    <div>
        <GMainVideo />
        <!-- Seu conteúdo existente -->
        <v-btn color="primary" @click="isLoginModalOpen = true">Login</v-btn>

        <!-- Modal de Login -->
        <v-dialog v-model="isLoginModalOpen" max-width="400px">
            <template v-slot:default="dialog">
                <LoginComponent @close="dialog.value = false" />
            </template>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginComponent from '@/components/g-usersComponent/LoginComponent.vue';

const isLoginModalOpen = ref(false);
</script>

<style scoped>
/* Seus estilos aqui */
</style>
