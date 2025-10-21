<script setup>
import Footer from './components/Footer.vue';
import Navigation from './components/Navigation.vue';
import { useStore } from '@/store.js';

const store = useStore();
store.loadClasses();
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <Navigation />
        <main class="flex-1 flex items-center justify-center">
            <RouterView />
        </main>
        <Footer />
    </div>
</template>
