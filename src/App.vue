<template>
    <v-app>
        <GAppBar />
        <GAppNav />
        <router-view></router-view>
    </v-app>
</template>

<script setup>
import GAppBar from '@COM/g-appBar/GAppBar.vue';
import GAppNav from '@COM/g-appBar/GAppNav.vue';
</script>
