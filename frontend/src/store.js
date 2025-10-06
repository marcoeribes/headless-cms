import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('classes', () => {
  const classes = ref([]);

  function getClasses() {
    fetch('http://localhost:3000/api/getEvents')
      .then(response => response.json())
      .then(responseBody => {
        classes.value = responseBody.data;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return {
    classes,
    getClasses
  }
});
