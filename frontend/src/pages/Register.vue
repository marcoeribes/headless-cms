<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store.js';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';
import RadioButton from 'primevue/radiobutton';
import RadioButtonGroup from 'primevue/radiobuttongroup';
import { redirectCheckout } from '@/api/events';

const store = useStore();
const route = useRoute();

const { classes } = storeToRefs(store);
const classId = computed(() => route.params.id?.toString());

const c = computed(() => {
    if (classes.value && classId.value) {
        return classes.value.find((item) => item.id.toString() === classId.value);
    }
    return null;
});

const initialValues = ref({
    option: '',
    firstName: '',
    middleInitial: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    dlNumber: '',
    caseNumber: '',
});

const onFormSubmit = async ({ valid, values }) => {
    if (!valid) return;

    values.eventId = classId.value;

    try {
        const response = await redirectCheckout({
            registration: values,
            event: c.value,
        });
    } catch (error) {
        console.error('Registration failed:', error);
    }
};

const resolver = ({ values }) => {
    const errors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numericPattern = /^\d+$/;

    const requiredFields = ['options', 'firstName', 'lastName', 'dob', 'phone', 'email', 'dlNumber', 'caseNumber'];

    requiredFields.forEach((field) => {
        if (!values[field] || values[field].toString().trim() === '') {
            errors[field] = [{ message: `${field} is required.` }];
        }
    });

    if (values.dob && !values.dob.replace(/\D/g, '').match(numericPattern)) {
        errors.dob = [{ message: 'Date of Birth must contain only numbers.' }];
    }

    if (values.phone && !values.phone.replace(/\D/g, '').match(numericPattern)) {
        errors.phone = [{ message: 'Phone number must contain only numbers.' }];
    }

    if (values.email && !emailPattern.test(values.email)) {
        errors.email = [{ message: 'Invalid email address.' }];
    }

    return {
        values,
        errors,
    };
};
</script>

<template>
    <div v-if="c" class="container mx-auto px-4 py-12 max-w-[1000px]">
        <Card class="p-6">
            <template #header>
                <div class="text-2xl font-bold">{{ c.title }}</div>
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4">
                    <div class="md:w-40 relative">
                        <div class="w-full aspect-[16/9]">
                            <img
                                class="w-full h-full object-cover object-center rounded"
                                :src="c.imageUrl"
                                :alt="c.title"
                            />
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                        <div class="flex flex-col items-start gap-2">
                            <span
                                class="font-medium text-surface-500 dark:text-surface-400 text-sm flex items-center bg-surface-100 p-1 rounded-full"
                            >
                                <i class="pi pi-calendar mr-1 text-base align-middle"></i>
                                {{ c.month }} {{ c.day }} @ {{ c.startTime }} - {{ c.endTime }}
                            </span>
                            <span
                                class="font-medium text-surface-500 dark:text-surface-400 text-sm flex items-center bg-surface-100 p-1 rounded-full"
                            >
                                <i class="pi pi-map-marker mr-1 text-base align-middle"></i>
                                {{ c.location }}
                            </span>
                        </div>
                        <div class="flex flex-col md:items-end gap-8">
                            <span class="text-xl font-semibold">{{ c.price }}</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                <Button
                                    label="Details"
                                    icon="pi pi-info-circle"
                                    severity="info"
                                    class="flex-auto md:flex-initial whitespace-nowrap"
                                    @click="goToClassDetails(c)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #content>
                <p class="mt-4"><i class="pi pi-info-circle"></i> {{ c.description }}</p>

                <Form
                    v-slot="$form"
                    :initialValues="initialValues"
                    :resolver="resolver"
                    @submit="onFormSubmit"
                    class="flex flex-col gap-6 mt-6"
                >
                    <!-- Radio Button Group -->
                    <div>
                        <label class="block mb-2 font-medium text-sm text-gray-700 dark:text-white"
                            >Select an Option</label
                        >
                        <RadioButtonGroup name="option" class="flex flex-wrap gap-6">
                            <div class="flex items-center gap-2">
                                <RadioButton inputId="option1" value="option1" />
                                <label for="option1" class="text-gray-700 dark:text-white">Option 1</label>
                            </div>
                            <div class="flex items-center gap-2">
                                <RadioButton inputId="option2" value="option2" />
                                <label for="option2" class="text-gray-700 dark:text-white">Option 2</label>
                            </div>
                        </RadioButtonGroup>
                        <Message v-if="$form.options?.invalid" severity="error" size="small" variant="simple">{{
                            $form.options.error?.message
                        }}</Message>
                    </div>

                    <!-- Input Fields Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- First Name -->
                        <div class="flex flex-col gap-1">
                            <FloatLabel variant="on">
                                <InputText id="firstName" name="firstName" maxlength="35" autocomplete="off" />
                                <label for="firstName">First Name</label>
                            </FloatLabel>
                            <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.firstName.error?.message }}
                            </Message>
                        </div>

                        <!-- Middle Initial -->
                        <div class="flex flex-col gap-1">
                            <FloatLabel variant="on">
                                <InputText id="middleInitial" name="middleInitial" maxlength="1" autocomplete="off" />
                                <label for="middleInitial">Middle Initial</label>
                            </FloatLabel>
                            <Message v-if="$form.middleInitial?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.middleInitial.error?.message }}
                            </Message>
                        </div>

                        <!-- Last Name -->
                        <div class="flex flex-col gap-1">
                            <FloatLabel variant="on">
                                <InputText id="lastName" name="lastName" maxlength="35" autocomplete="off" />
                                <label for="lastName">Last Name</label>
                            </FloatLabel>
                            <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.lastName.error?.message }}
                            </Message>
                        </div>

                        <!-- Date of Birth -->
                        <div class="flex flex-col gap-1">
                            <FloatLabel variant="on">
                                <InputMask id="dob" name="dob" mask="99/99/9999" />
                                <label for="dob">Date of Birth</label>
                            </FloatLabel>
                            <Message v-if="$form.dob?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.dob.error?.message }}
                            </Message>
                        </div>

                        <!-- Phone Number -->
                        <div class="flex flex-col gap-1">
                            <FloatLabel variant="on">
                                <InputMask id="phone" name="phone" mask="(999) 999-9999" />
                                <label for="phone">Phone Number</label>
                            </FloatLabel>
                            <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.phone.error?.message }}
                            </Message>
                        </div>

                        <!-- Email Address -->
                        <div class="flex flex-col gap-1">
                            <FloatLabel variant="on">
                                <InputText id="email" name="email" type="email" autocomplete="off" />
                                <label for="email">Email Address</label>
                            </FloatLabel>
                            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.email.error?.message }}
                            </Message>
                        </div>

                        <!-- Driver License # -->
                        <div class="flex flex-col gap-1">
                            <FloatLabel variant="on">
                                <InputText id="dlNumber" name="dlNumber" maxlength="9" autocomplete="off" />
                                <label for="dlNumber">Driver License #</label>
                            </FloatLabel>
                            <Message v-if="$form.dlNumber?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.dlNumber.error?.message }}
                            </Message>
                        </div>

                        <!-- Case Number -->
                        <div class="flex flex-col gap-1">
                            <FloatLabel variant="on">
                                <InputText id="caseNumber" name="caseNumber" autocomplete="off" />
                                <label for="caseNumber">Case #</label>
                            </FloatLabel>
                            <Message v-if="$form.caseNumber?.invalid" severity="error" size="small" variant="simple">
                                {{ $form.caseNumber.error?.message }}
                            </Message>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="flex justify-end">
                        <Button type="submit" label="Submit" class="w-full sm:w-auto" />
                    </div>
                </Form>
            </template>
        </Card>
    </div>

    <div v-else-if="classes.length === 0">
        <p>Loading class data...</p>
    </div>

    <div v-else>
        <p>
            Class with ID <strong>{{ classId }}</strong> not found.
        </p>
    </div>
</template>

<style scoped></style>
