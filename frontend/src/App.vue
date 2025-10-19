<script setup>
import Footer from './components/Footer.vue';
import Navigation from './components/Navigation.vue';
import { useStore } from '@/store.js';

const store = useStore();
store.loadClasses();
</script>

<template>
    <Navigation />
    <RouterView />
    <Footer />
</template>
