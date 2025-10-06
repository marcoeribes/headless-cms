<script setup>
import faqImage from '@/assets/images/faq.webp';
import Panel from 'primevue/panel';

</script>

<template>
    <div Class="page-container">
        <h2>FAQs</h2>
        <h4>What is Template Class?</h4>
        <p>
            Template Class is a [duration]-hour course or event designed to provide important 
            information, training, or certification. Attendance may be required or recommended depending 
            on your situation.
        </p>

        <img :src="faqImage" alt="FAQ" Template Class="faq-image"/>


        <h4>What is the difference between Template Class and [Alternative Program]?</h4>
        <p>
            Template Class is a structured course or event with a set duration and content, while 
            [Alternative Program] is a different option that may offer alternative benefits or outcomes.
        </p>

        <h4>Will attending Template Class affect my record or status?</h4>
        <p>
            No, attending Template Class does not impact your record or status. It is designed to 
            provide education or fulfill a requirement.
        </p>

        <h4>Is attendance or completion of Template Class reported to any outside organizations?</h4>
        <p>
            Completion may be reported to relevant organizations if applicable, but it typically does not 
            affect other records or insurance.
        </p>

        <h4>How do I know if I need to attend Template Class?</h4>
        <p>
            If you received a notification or invitation specifying attendance, it will include details such 
            as your name and the reason for attending. Otherwise, attendance may be optional or recommended.
        </p>

        <h4>Who should attend Template Class?</h4>
        <p>
            - Individuals seeking to meet specific requirements<br>
            - Those interested in gaining knowledge or certification<br>
            - People invited or registered for the event
        </p>

        <Panel header="">
            <h4>YOOOO</h4>
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Panel>

        <h4>What if I was asked or ordered to attend Template Class?</h4>
        <p>
            If you received official documentation requiring attendance, please bring it with you 
            and register beforehand.
        </p>

        <h4>How do I register for Template Class?</h4>
        <p>
            You can register by calling (123) 456-7890 or online at www.exampleevent.com. Visit our registration 
            page for current schedules.
        </p>

        <h4>How much does Template Class cost?</h4>
        <p>
            Prices start at $XXX and include all necessary fees. Discounts may be available for early registration 
            or pre-payment. Accepted payment methods include cash, money order, or cashier’s check.
        </p>

        <h4>What do I need to bring on the day of the event?</h4>
        <p>
            - Valid government-issued ID or proof of identity<br>
            - Registration confirmation or invitation<br>
            - Payment receipt or payment method
        </p>

        <h4>How long is the event or Template Class?</h4>
        <p>
            The event lasts approximately [duration] hours, including breaks. Virtual options may be split 
            into multiple sessions.
        </p>

        <h4>Is my completion of Template Class documented?</h4>
        <p>
            Yes, upon successful completion, you will receive a certificate or proof of attendance. 
            This may be sent electronically to any designated organizations if required.
        </p>

        <h4>Can I reschedule my attendance?</h4>
        <p>Yes, please contact us at (123) 456-7890 to reschedule.</p>

        <h4>Can I get a refund if I cannot attend?</h4>
        <p>
            Refunds are available if the event is canceled by the provider. If you notify us at least one day 
            before the event, you may reschedule. To request a refund, email info@exampleevent.com. Refunds will 
            be processed within 4 business days.
        </p>
    </div>
</template>

<style scoped>
  .faq-image {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1rem 0;
  }

  .page-container p {
    margin-top: 0;
    margin-bottom: 2.5rem;
    text-align: left;
  }

  .page-container h4 {
    text-align: left;
  }

</style>