import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getClasses } from '@/api/events.js';

export const useStore = defineStore('classes', () => {
    const contact = ref({
        name: 'John Doe',
        email: 'johndoe@email.com',
        phone: '(808) 808-8008',
    });
    const classes = ref([]);

    async function loadClasses() {
        try {
            const data = await getClasses();
            classes.value = data;
        } catch (error) {
            console.error('Error loading classes:', error);
        }
    }

    return {
        contact,
        classes,
        loadClasses,
    };
});
