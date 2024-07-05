<template>
    <v-app-bar color="g-background" :height="150" :elevation="4" style="padding-left: 30px" :location="'top'">
        <template #prepend>
            <v-img :aspect-ratio="1" src="@/assets/img/logo.png" width="100" height="100" cover />
        </template>

        <template #title>
            <div class="d-flex align-center">
                <div
                    class="text-g-orange-2 text-h3"
                    style="font-family: 'Roboto', sans-serif; font-weight: 700; font-style: normal"
                >
                    RBN<span class="text-g-orange-1">ox Móveis</span>
                </div>
                <GAppSearch />
            </div>
        </template>

        <template #append>
            <GAppBarThemeSwitch />
            <v-divider
                :thickness="3"
                class="border-opacity-100 mr-3 mt-8"
                length="80"
                color="g-orange-1"
                vertical
            ></v-divider>
            <v-btn
                class="mr-2"
                density="comfortable"
                color="g-orange-1"
                variant="tonal"
                icon="$mdiAccountOutline"
            ></v-btn>
            <v-btn class="mr-2" density="comfortable" color="g-orange-1" variant="tonal" icon="$mdiLogout"></v-btn>
        </template>
    </v-app-bar>
</template>
<script setup>
import GAppSearch from '@COM/g-appBar/GAppSearch.vue';
import GAppBarThemeSwitch from '@COM/g-appBar/GAppBarThemeSwitch.vue';
</script>
