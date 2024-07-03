<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-text-field
                    v-if="showSearch"
                    v-model="search"
                    density="comfortable"
                    color="g-orange-1"
                    label="Search"
                    @keyup.enter="performSearch"
                    @blur="toggleSearch"
                    class="mx-auto pa-1"
                    max-width="450"
                    clearable
                    width="450"
                    variant="underlined"
                    hide-details
                    single-line
                >
                </v-text-field>
                <v-btn
                    v-else
                    density="comfortable"
                    color="g-orange-1"
                    variant="tonal"
                    icon="$mdiMagnify"
                    @click="toggleSearch"
                >
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'

const showSearch = ref(false)
const search = ref('')

const toggleSearch = () => {
    showSearch.value = !showSearch.value
}

const performSearch = () => {
    console.log('Performing search for:', search.value)
    toggleSearch()
}
</script>
