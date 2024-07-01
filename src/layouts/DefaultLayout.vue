<template>
    <v-app>
        <v-main>
            <router-view v-slot="{ Component }">
                <template v-if="Component">
                    <v-fade-transition hide-on-leave>
                        <v-container fluid>
                            <component :is="Component || LoadingProgress" />
                        </v-container>
                    </v-fade-transition>
                </template>
                <template v-else>
                    <LoadingProgress />
                </template>
            </router-view>
        </v-main>
    </v-app>
</template>

<script setup>
import LoadingProgress from '@COM/g-progressBar/LoadingProgress';
</script>
