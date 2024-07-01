<template>
    <div>
        <h1>Admin Page</h1>
        <p>Bem-vindo à página de administração!</p>
    </div>
</template>

<script>
export default {
    name: 'UserAdminPage',
    beforeRouteEnter(to, from, next) {
        const isAuthenticated = !!localStorage.getItem('token');
        if (!isAuthenticated) {
            next({ name: 'Login' });
        } else {
            next();
        }
    },
    beforeRouteUpdate(to, from, next) {
        const isAuthenticated = !!localStorage.getItem('token');
        if (!isAuthenticated) {
            next({ name: 'Login' });
        } else {
            next();
        }
    },
};
</script>

<style scoped>
h1 {
    color: #2c3e50;
}
</style>
