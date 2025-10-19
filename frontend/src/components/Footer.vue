<template>
  <footer class="footer">
    <p class="footer-text">&copy; 2025 School CMS. All rights reserved.</p>
  </footer>
</template>

<script setup>
defineOptions({
  name: 'AppFooter'
});
</script>

<style scoped>
.footer {
  width: 100%;
  height: 100px; /* More conventional height */
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-text {
  margin: 0;
  font-size: 1rem;
  color: #333;
}
</style>
