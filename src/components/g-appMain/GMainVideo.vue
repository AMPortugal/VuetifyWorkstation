<template>
    <div class="video-background">
        <video autoplay loop muted playsinline>
            <source src="./video/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div class="overlay"></div>
        <div class="content">
            <transition mode="in-out" name="slide-fade">
                <v-card
                    v-if="currentCard"
                    :key="currentCard.title"
                    class="v-card-content"
                    color="primary"
                    elevation="3"
                    height="210"
                    max-width="460"
                    variant="outlined"
                >
                    <v-card-title>
                        <div
                            class="text-primary text-h5"
                            style="font-family: 'Roboto', sans-serif; font-weight: 500; font-style: normal"
                        >
                            {{ currentCard.title }}
                        </div>
                    </v-card-title>
                    <v-divider
                        :thickness="2"
                        class="border-opacity-100 ml-4"
                        color="primary"
                        length="426"
                        style="border-color: rgb(30, 38, 72)"
                    ></v-divider>
                    <v-card-text class="text-secondary">
                        {{ currentCard.summary }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-2" color="primary" variant="outlined" @click="goToArticle(currentCard.link)"
                            >Saber Mais
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-icon
                            class="mr-2"
                            color="primary"
                            icon="$mdiHeart"
                            @click="shareArticle(currentCard.link)"
                        ></v-icon>
                        <v-icon
                            class="mr-2"
                            color="primary"
                            icon="$mdiBookmark"
                            @click="shareArticle(currentCard.link)"
                        ></v-icon>
                        <v-icon
                            class="mr-2"
                            color="primary"
                            icon="$mdiShareVariant"
                            @click="shareArticle(currentCard.link)"
                        ></v-icon>
                    </v-card-actions>
                </v-card>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

// Dados dos cards (simulação de dados dinâmicos)
const cards = ref([
    {
        title: 'Título do Artigo 1',
        summary:
            'Este é um resumo do artigo 1 que tem no máximo 30 palavras. Ele fornece uma visão geral do conteúdo do artigo.',
        link: '/',
    },
    {
        title: 'Título do Artigo 2',
        summary:
            'Este é um resumo do artigo 2 que tem no máximo 30 palavras. Ele fornece uma visão geral do conteúdo do artigo.',
        link: '/',
    },
]);

// Índice do card atual
const currentCardIndex = ref(0);

// Computed para obter o card atual
const currentCard = computed(() => cards.value[currentCardIndex.value]);

// Funções para ações dos botões
const goToArticle = (link) => {
    window.location.href = link;
};

const shareArticle = (link) => {
    alert(`Compartilhar o artigo: ${link}`);
};

// Função para trocar de card
const changeCard = () => {
    currentCardIndex.value = (currentCardIndex.value + 1) % cards.value.length;
};

// Animação de slide (troca de card a cada 5 segundos)
onMounted(() => {
    setInterval(changeCard, 5000);
});
</script>

<style lang="css" scoped>
.video-background {
    position: relative;
    width: 100%;
    height: 380px; /* Altura ajustável */
    overflow: hidden;
}

.video-background video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ajusta o vídeo para cobrir a área */
    transform: translate(-50%, -50%);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(247, 149, 7, 0.3); /* Cor do overlay com transparência */
    z-index: 1;
}

.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.v-card-content {
    width: 100%;
    max-width: 460px;
    height: 210px;
    background: rgba(239, 238, 241, 0.3);
}

.slide-fade-enter-active {
    transition:
        transform 0.2s ease,
        opacity 0.1s ease;
}

.slide-fade-leave-active {
    transition:
        transform 0.2s ease,
        opacity 0.1s ease;
}

.slide-fade-enter-from {
    opacity: 90%;
    transform: translateX(50%);
}

.slide-fade-leave-to {
    opacity: 90%;
    transform: translateX(-50%);
}
</style>
