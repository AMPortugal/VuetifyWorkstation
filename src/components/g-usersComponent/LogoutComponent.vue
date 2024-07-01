<template>
    <div>
        <button @click="logoutUser">Logout</button>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';

export default {
    name: 'LogoutButton',
    setup() {
        const authStore = useAuthStore();

        const logoutUser = () => {
            authStore.logout();
        };

        return {
            logoutUser,
        };
    },
};
</script>
