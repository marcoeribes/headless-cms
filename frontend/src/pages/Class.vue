<script setup>
import { computed } from 'vue'; 
import { useRoute } from 'vue-router'; 
import { useStore } from '@/store.js';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'

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
  <div Class="page-container">

    <div v-if="c">
      <h2>{{ c.title }}</h2>
      <p>
        <i class="pi pi-info-circle"></i>
        <strong>Description:</strong> {{ c.description }}
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
        <i class="pi pi-calendar"></i>
        <strong>Location:</strong> {{ c.location || 'N/A' }}
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
      />
    </div>

    <div v-else-if="classes.length === 0">
      <p>Loading class data...</p>
    </div>
    <div v-else>
      <p>Class with ID **{{ classId }}** not found.</p>
    </div>

    <div v-if="c?.location" style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe
        :src="mapUrl"
        style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;"
        allowfullscreen
      ></iframe>
    </div>

    <div v-if="c?.location" style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <img :src="c.imageUrl" alt="location image" class="standard-image"/>
    </div>
  </div>
</template>

<style scoped>
  .page-container i {
    margin-right: 0.5rem;
  }
</style>