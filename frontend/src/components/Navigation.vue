<script setup>
import { ref } from 'vue';
import logoImage from '@/assets/images/logo.png';

const mobileMenuOpen = ref(false);
</script>

<template>
  <header class="bg-blue-600 text-white shadow-md font-urbanist">
    <div class="w-full max-w-[1100px] mx-auto flex items-center justify-between px-6 md:px-24 py-4">
      <RouterLink :to="{ name: 'home' }" class="flex items-center space-x-2">
        <img :src="logoImage" alt="Logo" class="h-10" />
        <span class="text-xl font-semibold tracking-wide">Class CMS</span>
      </RouterLink>

      <nav class="hidden md:flex items-center space-x-6 text-base font-medium">
        <RouterLink
          to="/"
          class="hover:text-gray-200 transition-colors duration-200"
          active-class="underline text-white"
          exact
        >
          Home
        </RouterLink>
        <RouterLink
          to="/about"
          class="hover:text-gray-200 transition-colors duration-200"
          active-class="underline text-white"
        >
          About
        </RouterLink>
        <RouterLink
          to="/faq"
          class="hover:text-gray-200 transition-colors duration-200"
          active-class="underline text-white"
        >
          FAQs
        </RouterLink>
        <RouterLink
          to="/contact"
          class="hover:text-gray-200 transition-colors duration-200"
          active-class="underline text-white"
        >
          Contact
        </RouterLink>
      </nav>

      <!-- Hamburger for mobile -->
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden focus:outline-none">
        <i class="pi pi-bars text-2xl text-white"></i>
      </button>
    </div>

    <!-- Mobile Nav Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden px-6 pb-4">
      <nav class="flex flex-col space-y-2 text-base font-medium">
        <RouterLink
          to="/"
          class="hover:text-gray-200 transition-colors duration-200"
          active-class="underline text-white"
          exact
          @click="mobileMenuOpen = false"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/about"
          class="hover:text-gray-200 transition-colors duration-200"
          active-class="underline text-white"
          @click="mobileMenuOpen = false"
        >
          About
        </RouterLink>
        <RouterLink
          to="/faq"
          class="hover:text-gray-200 transition-colors duration-200"
          active-class="underline text-white"
          @click="mobileMenuOpen = false"
        >
          FAQs
        </RouterLink>
        <RouterLink
          to="/contact"
          class="hover:text-gray-200 transition-colors duration-200"
          active-class="underline text-white"
          @click="mobileMenuOpen = false"
        >
          Contact
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.font-urbanist {
  font-family: 'Urbanist', sans-serif;
}
</style>