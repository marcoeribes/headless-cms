import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('classes', () => {
  
  const contact = ref({
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "(808) 808-8008"
  });
  const classes = ref([]);

  function getClasses() {
    fetch('http://localhost:3000/api/getEvents')
      .then(response => response.json())
      .then(responseBody => {
        classes.value = responseBody.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return {
    contact,
    classes,
    getClasses
  }
});
