<template>
  <h2>Home</h2>
  <button @click="goToAbout">Go to About</button>
  <GoogleCalendar />
  <h2>Done</h2>
</template>

<script>
import GoogleCalendar from '../components/GoogleCalendar.vue';

export default {
  components: {
    GoogleCalendar,
  },
  methods: {
    goToAbout() {
      this.$router.push('/about')
      },
  },
}
</script>