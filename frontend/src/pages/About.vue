<script setup>
import aboutUsImage from '@/assets/images/about-us.webp';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
</script>

<template>
  <div class="container mx-auto px-4 py-12 max-w-[1000px]">
    <Card>
      <template #title>
        <h2 class="text-3xl font-bold text-center text-gray-800">About Us</h2>
      </template>

      <template #content>
        <!-- About Us Text & Image -->
        <div class="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div class="space-y-5">
            <p class="text-gray-700 leading-relaxed">
              We offer both in-person and virtual classes led by experienced, professional instructors. 
              Our team brings a diverse background in education, communication, and community engagement. 
              We're passionate about sharing knowledge and strive to make every learning experience engaging, 
              interactive, and accessible to all participants.
            </p>
            <p class="text-gray-700 leading-relaxed">
              Our goal is to help attendees leave with a deeper understanding of the subject matter and practical 
              tools they can use in everyday life. Whether in a classroom or online setting, our sessions are 
              designed to be meaningful, enjoyable, and impactful.
            </p>
          </div>
          <div>
            <img :src="aboutUsImage" alt="About Us" class="w-full h-auto rounded-lg shadow-md" />
          </div>
        </div>

        <!-- Mission -->
        <Divider />
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p class="text-gray-700 leading-relaxed mb-8">
          Our mission is to provide high-quality instruction that empowers individuals to 
          grow, learn, and apply new skills with confidence.
        </p>

        <!-- Team -->
        <Divider />
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
        <div class="space-y-5">
          <p class="text-gray-700 leading-relaxed">
            Our team is made up of dedicated educators and facilitators who are committed to creating a positive 
            and inclusive learning environment. We value each participant’s perspectives and aim to deliver content 
            in a way that resonates with a wide range of learners.
          </p>
          <p class="text-gray-700 leading-relaxed">
            We believe that every session should not only meet expectations, but provide lasting value that 
            participants can carry forward.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Thank you for choosing our program. We look forward to welcoming you to one of our upcoming classes or events.
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>

/* Override PrimeVue Card styles */
.p-card {
  background-color: #f9f9f9 !important;
  border: none !important;
  box-shadow: none !important;
  /* Remove padding if you want it flush, or adjust as needed */
}
</style>
