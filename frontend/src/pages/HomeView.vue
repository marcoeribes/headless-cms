<script setup>
import { useRouter } from 'vue-router';
import GoogleCalendar from '../components/GoogleCalendar.vue';
import { useStore } from '@/store.js';
import { storeToRefs } from 'pinia';

const store = useStore();
const { classes } = storeToRefs(store);
const router = useRouter();

function goToAbout() {
  router.push('/about');
}
</script>

<template>
  <h2>Home</h2>
  <button @click="goToAbout">Go to About</button>
  <GoogleCalendar />

  <div v-if="classes && classes.length">
    <h3>Class List:</h3>
    <ul v-for="item in classes" :key="item.id || item.title">
      <li>{{ item.title }}</li> 
    </ul>
  </div>
  <p v-else>Classes are loading or array is empty...</p>

  <h2>Done</h2>
</template>