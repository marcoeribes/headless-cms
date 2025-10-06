<script setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';

const router = useRouter();

function goTo(page) {
  router.push({ name: page });
}
</script>

<template>
  <header class="header">
    <div class="logo">
      <RouterLink :to="{ name: 'home' }">
        <img src="../../public/images/logo.png" alt="Logo" height="40" />
      </RouterLink>
    </div>

    <nav class="nav-links">
      <Button label="Home" class="p-button-text" @click="goTo('home')" />
      <Button label="About" class="p-button-text" @click="goTo('about')" />
      <Button label="Services" class="p-button-text" @click="goTo('services')" />
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
