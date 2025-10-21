<script setup>
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';

const success = ref(null);

onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
        success.value = true;
    } else if (params.get('canceled') === 'true') {
        success.value = false;
    }
});
</script>

<template>
    <div class="container mx-auto flex items-center justify-center h-full w-full">
        <Card class="max-w-md w-full text-center shadow-lg rounded-2xl">
            <template #content>
                <div v-if="success === true">
                    <Message severity="success" class="mb-4">
                        <div class="text-2xl font-bold">✅ Payment Successful!</div>
                        <p class="text-gray-600 mt-2">Thank you! Your payment has been completed successfully.</p>
                        <p class="text-gray-600 mt-2">You will receive an email with your receipt.</p>
                    </Message>
                </div>

                <div v-else-if="success === false">
                    <Message severity="error" class="mb-4">
                        <div class="text-2xl font-bold">❌ Payment Failed</div>
                        <p class="text-gray-600 mt-2">
                            Something went wrong or you canceled the payment. Please try again.
                        </p>
                    </Message>
                </div>

                <div v-else>
                    <ProgressSpinner style="width: 50px; height: 50px; color: #10b981" strokeWidth="4" />
                    <p class="text-gray-500 mt-3 text-lg">Processing...</p>
                </div>

                <router-link to="/" class="block mt-6">
                    <Button severity="info" label="Back to Home" icon="pi pi-home" text />
                </router-link>
            </template>
        </Card>
    </div>
</template>
