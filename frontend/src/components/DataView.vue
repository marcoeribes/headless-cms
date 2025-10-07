<script setup>
import { useRouter } from 'vue-router';
import { useStore } from '@/store.js';
import { storeToRefs } from 'pinia';
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'


const store = useStore();
const { classes } = storeToRefs(store);
const router = useRouter();

function goToClassDetails(item) {
  if (item && item.id) {
    router.push({ 
      name: 'class', 
      params: { id: item.id } 
    });
  }
}
</script>

<template>
    <div class="card">
        <h3 class="text-2xl font-bold text-gray-800 text-center">Upcoming Classes</h3>
        <DataView :value="classes" paginator :rows="5" :layout="layout">
            <template #list="slotProps">
                <div class="flex flex-col">
                    <div v-for="(item, index) in slotProps.items" :key="index">
                    <div
                        class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                        :class="{ 'border-t border-gray-200 dark:border-gray-600': index !== 0 }"
                    >                            
                        <div class="md:w-40 relative">
                            <img
                                class="w-[320px] h-[100px] object-cover object-center block mx-auto rounded"
                                :src="item.imageUrl"
                                :alt="item.title"
                            />                            
                            </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                <div class="flex flex-col items-start gap-2 ">
                                    <div class="text-xl font-medium bg-surface-100 p-1 rounded-full">{{ item.title }}</div>
                                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm flex items-center bg-surface-100 p-1 rounded-full">
                                        <i class="pi pi-calendar mr-1 text-base align-middle"></i>
                                        {{ item.month }} {{ item.day }} @ {{ item.startTime }} - {{ item.endTime }}
                                    </span>
                                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm flex items-center bg-surface-100 p-1 rounded-full">
                                        <i class="pi pi-map-marker mr-1 text-base align-middle"></i>
                                        {{ item.location }}
                                    </span>
                                </div>
                                <div class="flex flex-col md:items-end gap-8">
                                    <span class="text-xl font-semibold">{{ item.price }}</span>
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button
                                        label="Details"
                                        icon="pi pi-info-circle"
                                        severity="info"
                                        class="flex-auto md:flex-initial whitespace-nowrap"
                                        @click="goToClassDetails(item)"
                                        ></Button>                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
</template>

<style scoped>
.card {
    background: #fff;
    border: 1px solid #eee; /* Changed to a grey border */
    padding: 2rem;
    border-radius: 1rem; /* More rounded corners */
    margin-bottom: 1rem;
}
</style>
