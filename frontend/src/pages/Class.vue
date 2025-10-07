<script setup>
import { computed, ref } from 'vue'; 
import { useRoute } from 'vue-router'; 
import { useStore } from '@/store.js';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Card from 'primevue/card';
import 'primeicons/primeicons.css';

const store = useStore();
const route = useRoute();
const { classes, contact } = storeToRefs(store);
const classId = computed(() => route.params.id);

const c = computed(() => {
  if (classes.value && classId.value) {
    return classes.value.find(item => item.id === classId.value);
  }
  return null; 
});

const mapUrl = computed(() => {
  if (c.value?.location) {
    const encodedLocation = encodeURIComponent(c.value.location);
    return `https://maps.google.com/maps?q=${encodedLocation}&output=embed`;
  }
  return '';
});

</script>

<template>
  <div class="page-container px-4 py-6 flex justify-center">
    <div class="flex flex-col lg:flex-row gap-6  max-w-[1200px]">

      <!-- Left Column -->
      <div class="lg:w-5/8 w-full flex flex-col">
        <div v-if="c" class="flex-1">
          <Card class="h-full max-w-[600px] flex flex-col">
            <template #title>
              {{ c.title }}
            </template>

            <template #content>
              <p>
                <i class="pi pi-info-circle"></i>
                <strong>Description:</strong><br />
                {{ c.description }}
              </p>
              <p>
                <i class="pi pi-calendar"></i>
                <strong>Date:</strong> {{ c.month }} {{ c.day }} @ {{ c.startTime }} - {{ c.endTime }}
              </p>
              <p>
                <i class="pi pi-credit-card"></i>
                <strong>Price:</strong> {{ c.price }}
              </p>
              <p>
                <i class="pi pi-map-marker"></i>
                <strong>Location:</strong><br />
                {{ c.location || 'N/A' }}
              </p>
              <p>
                <i class="pi pi-envelope"></i>
                <strong>Email:</strong> {{ contact.email }}
              </p>
              <p>
                <i class="pi pi-phone"></i>
                <strong>Call or Text:</strong> {{ contact.phone }}
              </p>

              <Button 
                type="button" 
                label="Register" 
                size="large" 
                aria-label="Register" 
                :loading="loading" 
                @click="load" 
                class="mt-4"
              />
            </template>
          </Card>
        </div>

        <div v-else-if="classes.length === 0">
          <p>Loading class data...</p>
        </div>
        <div v-else>
          <p>Class with ID <strong>{{ classId }}</strong> not found.</p>
        </div>
      </div>

      <div v-if="c" class="lg:w-3/8 w-full flex flex-col justify-evenly items-center gap-4">
        <div v-if="c.imageUrl" class="w-full max-w-[600px] aspect-[4/3] rounded-xl overflow-hidden relative">
          <img 
            :src="c.imageUrl" 
            alt="Location image" 
            class="w-full h-full object-cover rounded-xl" 
          />
        </div>
        <div v-if="c.location" class="w-full max-w-[600px] aspect-[4/3] rounded-xl overflow-hidden relative">
          <iframe
            :src="mapUrl"
            class="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container i {
  margin-right: 0.5rem;
}
</style>