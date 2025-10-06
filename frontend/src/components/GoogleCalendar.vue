<script setup>
  const originalCalendarUrl = "https://calendar.google.com/calendar/embed?src=fea36fefd66cf60e363e16dbb4981172875779e12da7881227802bca853b68c1%40group.calendar.google.com&ctz=America%2FPhoenix";
  const calendarUrl = "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FPhoenix&showPrint=0&showCalendars=0&title=Schedule&showTitle=0&src=ZmVhMzZmZWZkNjZjZjYwZTM2M2UxNmRiYjQ5ODExNzI4NzU3NzllMTJkYTc4ODEyMjc4MDJiY2E4NTNiNjhjMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23d50000&color=%23009688";
</script>

<template>
  <div style="max-width: 800px; margin: 0 auto;">
    <div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 75%;">
      <iframe  
        :src="calendarUrl"
        style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" 
        allowfullscreen>
      </iframe>
    </div>
  </div>
</template> 