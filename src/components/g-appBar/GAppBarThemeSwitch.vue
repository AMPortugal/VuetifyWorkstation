<template>
    <div>
        <VBtn
            v-if="currentTheme === 'light'"
            class="mr-5"
            density="comfortable"
            color="g-orange-1"
            icon="$mdiWeatherNight"
            variant="tonal"
            @click="currentTheme = 'dark'"
        />
        <VBtn
            v-else
            class="mr-5"
            density="comfortable"
            color="g-orange-1"
            icon="$mdiWhiteBalanceSunny"
            variant="tonal"
            @click="currentTheme = 'light'"
        />
    </div>
</template>
<script setup>
// Theme logic
const { currentTheme } = toRefs(useAppStore())
</script>
