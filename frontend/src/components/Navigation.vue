<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import logoImage from '@/assets/images/logo.png';

const mobileMenuOpen = ref(false);
const route = useRoute();
</script>

<template>
  <header class="bg-blue-600 text-white shadow-md font-urbanist">
    <div class="w-full max-w-[1100px] mx-auto flex items-center justify-between px-6 md:px-24 py-4">
      <RouterLink :to="{ name: 'home' }" class="flex items-center space-x-2">
        <img :src="logoImage" alt="Logo" class="h-10" />
      </RouterLink>

      <nav class="hidden md:flex items-center space-x-6 text-base font-medium">
        <RouterLink
          to="/"
          :class="[
            'flex items-center space-x-2 hover:text-gray-200 transition-colors duration-200',
            route.path === '/' ? 'text-gray-300' : ''
          ]"
        >
          <i class="pi pi-home"></i>
          <span>Home</span>
        </RouterLink>

        <RouterLink
          to="/about"
          :class="[
            'flex items-center space-x-2 hover:text-gray-200 transition-colors duration-200',
            route.path === '/about' ? 'text-gray-300' : ''
          ]"
        >
          <i class="pi pi-info-circle"></i>
          <span>About</span>
        </RouterLink>

        <RouterLink
          to="/faq"
          :class="[
            'flex items-center space-x-2 hover:text-gray-200 transition-colors duration-200',
            route.path === '/faq' ? 'text-gray-300' : ''
          ]"
        >
          <i class="pi pi-question-circle"></i>
          <span>FAQs</span>
        </RouterLink>

        <RouterLink
          to="/contact"
          :class="[
            'flex items-center space-x-2 hover:text-gray-200 transition-colors duration-200',
            route.path === '/contact' ? 'text-gray-300' : ''
          ]"
        >
          <i class="pi pi-envelope"></i>
          <span>Contact</span>
        </RouterLink>
      </nav>

      <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden focus:outline-none">
        <i class="pi pi-bars text-2xl text-white"></i>
      </button>
    </div>

    <div v-if="mobileMenuOpen" class="md:hidden px-6 pb-4">
      <nav class="flex flex-col space-y-2 text-base font-medium">
        <RouterLink
          to="/"
          @click="mobileMenuOpen = false"
          :class="[
            'flex items-center space-x-2 hover:text-gray-200 transition-colors duration-200',
            route.path === '/' ? 'text-gray-300' : ''
          ]"
        >
          <i class="pi pi-home"></i>
          <span>Home</span>
        </RouterLink>

        <RouterLink
          to="/about"
          @click="mobileMenuOpen = false"
          :class="[
            'flex items-center space-x-2 hover:text-gray-200 transition-colors duration-200',
            route.path === '/about' ? 'text-gray-300' : ''
          ]"
        >
          <i class="pi pi-info-circle"></i>
          <span>About</span>
        </RouterLink>

        <RouterLink
          to="/faq"
          @click="mobileMenuOpen = false"
          :class="[
            'flex items-center space-x-2 hover:text-gray-200 transition-colors duration-200',
            route.path === '/faq' ? 'text-gray-300' : ''
          ]"
        >
          <i class="pi pi-question-circle"></i>
          <span>FAQs</span>
        </RouterLink>

        <RouterLink
          to="/contact"
          @click="mobileMenuOpen = false"
          :class="[
            'flex items-center space-x-2 hover:text-gray-200 transition-colors duration-200',
            route.path === '/contact' ? 'text-gray-300' : ''
          ]"
        >
          <i class="pi pi-envelope"></i>
          <span>Contact</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
