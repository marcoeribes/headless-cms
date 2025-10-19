<script setup>
import faqImage from '@/assets/images/faq.webp';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
</script>

<template>
  <div class="container mx-auto px-4 py-10" style="max-width: 1000px">
    <h2 class="text-3xl font-bold mb-6 text-center">FAQs</h2>

    <div class="flex justify-center mb-10">
      <img :src="faqImage" alt="FAQ" class="max-w-full w-96 rounded-lg shadow-lg" />
    </div>

    <Accordion :multiple="true">
      <AccordionTab header="What is Template Class?">
        <p class="mt-0 mb-4 text-left">
          Template Class is a <strong>[duration]</strong>-hour course or event designed to provide important 
          information, training, or certification. Attendance may be required or recommended depending 
          on your situation.
        </p>
      </AccordionTab>

      <AccordionTab header="What is the difference between Template Class and [Alternative Program]?">
        <p class="mt-0 mb-4 text-left">
          Template Class is a structured course or event with a set duration and content, while 
          [Alternative Program] is a different option that may offer alternative benefits or outcomes.
        </p>
      </AccordionTab>

      <AccordionTab header="Will attending Template Class affect my record or status?">
        <p class="mt-0 mb-4 text-left">
          No, attending Template Class does not impact your record or status. It is designed to 
          provide education or fulfill a requirement.
        </p>
      </AccordionTab>

      <AccordionTab header="Is attendance or completion of Template Class reported to any outside organizations?">
        <p class="mt-0 mb-4 text-left">
          Completion may be reported to relevant organizations if applicable, but it typically does not 
          affect other records or insurance.
        </p>
      </AccordionTab>

      <AccordionTab header="How do I know if I need to attend Template Class?">
        <p class="mt-0 mb-4 text-left">
          If you received a notification or invitation specifying attendance, it will include details such 
          as your name and the reason for attending. Otherwise, attendance may be optional or recommended.
        </p>
      </AccordionTab>

      <AccordionTab header="Who should attend Template Class?">
        <ul class="list-disc ml-6 mt-0 mb-4 text-left">
          <li>Individuals seeking to meet specific requirements</li>
          <li>Those interested in gaining knowledge or certification</li>
          <li>People invited or registered for the event</li>
        </ul>
      </AccordionTab>

      <AccordionTab header="Extra Info Panel Example">
        <div class="p-2">
          <h4 class="text-lg font-semibold mb-2">YOOOO</h4>
          <p class="mt-0 mb-4 text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua...
          </p>
        </div>
      </AccordionTab>

      <AccordionTab header="What if I was asked or ordered to attend Template Class?">
        <p class="mt-0 mb-4 text-left">
          If you received official documentation requiring attendance, please bring it with you 
          and register beforehand.
        </p>
      </AccordionTab>

      <AccordionTab header="How do I register for Template Class?">
        <p class="mt-0 mb-4 text-left">
          You can register by calling <strong>(123) 456-7890</strong> or online at 
          <a href="https://www.exampleevent.com" target="_blank" class="text-blue-600 underline">
            www.exampleevent.com
          </a>. Visit our registration page for current schedules.
        </p>
      </AccordionTab>

      <AccordionTab header="How much does Template Class cost?">
        <p class="mt-0 mb-4 text-left">
          Prices start at <strong>$XXX</strong> and include all necessary fees. Discounts may be available 
          for early registration or pre-payment. Accepted payment methods include cash, money order, or cashier’s check.
        </p>
      </AccordionTab>

      <AccordionTab header="What do I need to bring on the day of the event?">
        <ul class="list-disc ml-6 mt-0 mb-4 text-left">
          <li>Valid government-issued ID or proof of identity</li>
          <li>Registration confirmation or invitation</li>
          <li>Payment receipt or payment method</li>
        </ul>
      </AccordionTab>

      <AccordionTab header="How long is the event or Template Class?">
        <p class="mt-0 mb-4 text-left">
          The event lasts approximately <strong>[duration]</strong> hours, including breaks. Virtual options may be split 
          into multiple sessions.
        </p>
      </AccordionTab>

      <AccordionTab header="Is my completion of Template Class documented?">
        <p class="mt-0 mb-4 text-left">
          Yes, upon successful completion, you will receive a certificate or proof of attendance. 
          This may be sent electronically to any designated organizations if required.
        </p>
      </AccordionTab>

      <AccordionTab header="Can I reschedule my attendance?">
        <p class="mt-0 mb-4 text-left">
          Yes, please contact us at <strong>(123) 456-7890</strong> to reschedule.
        </p>
      </AccordionTab>

      <AccordionTab header="Can I get a refund if I cannot attend?">
        <p class="mt-0 mb-4 text-left">
          Refunds are available if the event is canceled by the provider. If you notify us at least one day 
          before the event, you may reschedule. To request a refund, email 
          <a href="mailto:info@exampleevent.com" class="text-blue-600 underline">info@exampleevent.com</a>. 
          Refunds will be processed within 4 business days.
        </p>
      </AccordionTab>
    </Accordion>
  </div>
</template>