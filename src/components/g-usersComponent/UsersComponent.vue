<template>
    <div>
        <h1>Users</h1>
        <ul>
            <li v-for="user in users" :key="user.id">{{ user.name }} - {{ user.email }}</li>
        </ul>
        <button @click="fetchUsers">Fetch Users</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/utils/api';

const users = ref([]);

const fetchUsers = async () => {
    try {
        const response = await api.get('/users', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

fetchUsers();
</script>

<style scoped>
/* Estilos do componente */
</style>
