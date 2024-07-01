<template>
    <div>
        <button @click="toggleTheme">Toggle Theme</button>
    </div>
</template>

<script setup>
import { useThemeStore } from '@STO/themeStore';

const themeStore = useThemeStore();

function toggleTheme() {
    themeStore.toggleTheme();
}
</script>
