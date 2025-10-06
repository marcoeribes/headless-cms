<script setup>
import { useRouter } from 'vue-router';
import { useStore } from '@/store.js';
import { storeToRefs } from 'pinia';

const store = useStore();
const router = useRouter();
const { classes } = storeToRefs(store);

function goToAbout() {
  router.push('/about');
}
</script>

<template>
  <h2>Class!</h2>
  <button @click="goToAbout">Go to About</button>

  
  <h2>Done</h2>
</template>
