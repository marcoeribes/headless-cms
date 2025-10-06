<script setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import logoImage from '@/assets/images/logo.png';

const router = useRouter();

function goTo(page) {
  router.push({ name: page });
}
</script>

<template>
  <header class="header">
    <nav class="nav-links">
      <RouterLink :to="{ name: 'home' }" class="nav-links">
        <img :src="logoImage" alt="Logo" height="40" />
      </RouterLink>
      <Button label="Class CMS" class="p-button-text" @click="goTo('home')" />
    </nav>

    <nav class="nav-links">
      <Button label="Home" class="p-button-text" @click="goTo('home')" />
      <Button label="About" class="p-button-text" @click="goTo('about')" />
      <Button label="FAQs" class="p-button-text" @click="goTo('faq')" />
      <Button label="Contact" class="p-button-text" @click="goTo('contact')" />
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #3b82f6; /* Blue background */
  color: white;
}

.nav-links :deep(.p-button-text) {
  color: white;
  margin-left: 1rem;
  font-weight: 600;
}
</style>