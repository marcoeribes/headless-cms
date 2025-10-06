<script setup>
import { useRouter } from 'vue-router';
import GoogleCalendar from '../components/GoogleCalendar.vue';
import DataView from '@/components/DataView.vue';
import { useStore } from '@/store.js';
import { storeToRefs } from 'pinia';
import Listbox from 'primevue/listbox';

const store = useStore();
const { classes } = storeToRefs(store);
const router = useRouter();

function onClassSelect(event) {
  const selectedItem = event.value;

  if (selectedItem && selectedItem.id) {
    router.push({ 
      name: 'class', 
      params: { id: selectedItem.id } 
    });
  }
}
</script>

<template>
  <div class="page-container">
    <h2>Welcome</h2>
    <p>
      We offer convenient, flexible, and affordable options to help you meet your goals. Whether in-person or online, our programs are designed to be accessible and easy to follow.

      Led by knowledgeable and dedicated instructors, our sessions provide a supportive and engaging learning environment.

      If participation is required or recommended, registering early helps ensure you stay on track and meet any necessary requirements.

      Don’t miss out—
      Sign up today and take the next step forward.
    </p>
    <DataView />
    <GoogleCalendar />
    <div>
      <Listbox 
        v-model="selectedClass" 
        :options="classes" 
        optionLabel="title" 
        @change="onClassSelect" 
        class="w-full md:w-56" 
        :filter="true"
        filterPlaceholder="Search classes"
      >
      </Listbox>
    </div>
  </div>
</template>

