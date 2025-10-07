<script setup>
import GoogleCalendar from '../components/GoogleCalendar.vue';
import DataView from '@/components/DataView.vue';
import Card from 'primevue/card';
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-[1000px]">
    <Card>
      <template #title>
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Welcome</h2>
      </template>

      <template #content>
        <div class="text-center max-w-prose mx-auto space-y-6">
          <p class="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
            We offer convenient, flexible, and affordable options to help you meet your goals. Whether in-person or online, our programs are designed to be accessible and easy to follow.

            Led by knowledgeable and dedicated instructors, our sessions provide a supportive and engaging learning environment.

            If participation is required or recommended, registering early helps ensure you stay on track and meet any necessary requirements.

            Don’t miss out—  
            Sign up today and take the next step forward.
          </p>
        </div>

        <div class="mb-8">
          <DataView />
        </div>

        <div>
          <GoogleCalendar />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>

/* Override PrimeVue Card styles for seamless background */
.p-card {
  background-color: #f9f9f9 !important;
  border: none !important;
  box-shadow: none !important;
}
</style>
