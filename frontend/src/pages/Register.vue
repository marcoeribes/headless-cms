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
    const dobPattern = /^(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(19\d{2}|200\d|201\d)$/;

    const requiredFields = ['options', 'firstName', 'lastName', 'dob', 'phone', 'email', 'dlNumber', 'caseNumber'];

    requiredFields.forEach((field) => {
        if (!values[field] || values[field].toString().trim() === '') {
            errors[field] = [{ message: `Required` }];
        }
    });

    if (values.dob && !values.dob.replace(/\D/g, '').match(dobPattern)) {
        errors.dob = [{ message: 'Invalid date of birth' }];
    }

    if (values.phone && !values.phone.replace(/\D/g, '').match(numericPattern)) {
        errors.phone = [{ message: 'Phone number must contain only numbers.' }];
    }

    if (values.email && !emailPattern.test(values.email)) {
        errors.email = [{ message: 'Invalid email address' }];
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
                <div class="p-6 border-b border-neutral-200/60 dark:border-neutral-800">
                    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        <!-- Image -->
                        <div class="md:col-span-4">
                            <div
                                class="aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-neutral-200/60 dark:ring-neutral-800"
                            >
                                <img
                                    :src="c.imageUrl"
                                    :alt="c.title"
                                    class="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        </div>

                        <!-- Meta + Actions -->
                        <div class="md:col-span-8 flex flex-col gap-4">
                            <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                                {{ c.title }}
                            </h1>

                            <!-- Chips / meta row -->
                            <div class="flex flex-wrap gap-2">
                                <span
                                    class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-surface-100 text-surface-600 dark:bg-neutral-800 dark:text-neutral-300 ring-1 ring-neutral-200/60 dark:ring-neutral-700"
                                >
                                    <i class="pi pi-calendar text-sm"></i>
                                    <span>{{ c.month }} {{ c.day }} @ {{ c.startTime }} - {{ c.endTime }}</span>
                                </span>

                                <span
                                    class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-surface-100 text-surface-600 dark:bg-neutral-800 dark:text-neutral-300 ring-1 ring-neutral-200/60 dark:ring-neutral-700"
                                >
                                    <i class="pi pi-map-marker text-sm"></i>
                                    <span>{{ c.location }}</span>
                                </span>
                            </div>

                            <!-- Price + CTA -->
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    {{ c.price }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <p class="mt-4"><i class="pi pi-info-circle"></i> {{ c.description }}</p>
                </div>
            </template>

            <template #content>
                <Form
                    v-slot="$form"
                    :initialValues="initialValues"
                    :resolver="resolver"
                    @submit="onFormSubmit"
                    :validateOnValueUpdate="false"
                    :validateOnBlur="true"
                    class="max-w-4xl mx-auto p-4 sm:p-6"
                >
                    <div class="bg-white dark:bg-neutral-900 space-y-8">
                        <!-- Header -->
                        <div class="space-y-1">
                            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Applicant Info</h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Please complete all required fields.</p>
                        </div>

                        <!-- Personal Details -->
                        <section class="space-y-3">
                            <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">Personal Details</h3>

                            <!-- Row 1: Names -->
                            <div class="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-6">
                                <!-- First Name -->
                                <div class="flex flex-col gap-1 min-w-0 md:col-span-5">
                                    <FloatLabel variant="on">
                                        <InputText
                                            id="firstName"
                                            name="firstName"
                                            maxlength="35"
                                            autocomplete="given-name"
                                            class="w-full"
                                        />
                                        <label for="firstName">First Name</label>
                                    </FloatLabel>
                                    <Message
                                        v-if="$form.firstName?.invalid"
                                        severity="error"
                                        size="small"
                                        variant="simple"
                                    >
                                        {{ $form.firstName.error?.message }}
                                    </Message>
                                </div>

                                <!-- Middle Initial (compact) -->
                                <div class="flex flex-col gap-1 min-w-0 md:col-span-2">
                                    <div class="max-w-24">
                                        <FloatLabel variant="on">
                                            <InputText
                                                id="middleInitial"
                                                name="middleInitial"
                                                maxlength="1"
                                                autocomplete="off"
                                                class="w-full text-center tracking-wider"
                                            />
                                            <label for="middleInitial">M.I.</label>
                                        </FloatLabel>
                                    </div>
                                    <Message
                                        v-if="$form.middleInitial?.invalid"
                                        severity="error"
                                        size="small"
                                        variant="simple"
                                    >
                                        {{ $form.middleInitial.error?.message }}
                                    </Message>
                                </div>

                                <!-- Last Name -->
                                <div class="flex flex-col gap-1 min-w-0 md:col-span-5">
                                    <FloatLabel variant="on">
                                        <InputText
                                            id="lastName"
                                            name="lastName"
                                            maxlength="35"
                                            autocomplete="family-name"
                                            class="w-full"
                                        />
                                        <label for="lastName">Last Name</label>
                                    </FloatLabel>
                                    <Message
                                        v-if="$form.lastName?.invalid"
                                        severity="error"
                                        size="small"
                                        variant="simple"
                                    >
                                        {{ $form.lastName.error?.message }}
                                    </Message>
                                </div>

                                <!-- Row 2: DOB & DL -->
                                <div class="flex flex-col gap-1 min-w-0 md:col-span-6">
                                    <FloatLabel variant="on">
                                        <InputMask
                                            id="dob"
                                            name="dob"
                                            mask="99/99/9999"
                                            placeholder="MM/DD/YYYY"
                                            autocomplete="bday"
                                            class="w-full"
                                        />
                                        <label for="dob">Date of Birth</label>
                                    </FloatLabel>
                                    <Message v-if="$form.dob?.invalid" severity="error" size="small" variant="simple">
                                        {{ $form.dob.error?.message }}
                                    </Message>
                                </div>

                                <div class="flex flex-col gap-1 min-w-0 md:col-span-6">
                                    <FloatLabel variant="on">
                                        <InputText
                                            id="dlNumber"
                                            name="dlNumber"
                                            maxlength="9"
                                            autocomplete="off"
                                            class="w-full"
                                        />
                                        <label for="dlNumber">Driver License #</label>
                                    </FloatLabel>
                                    <Message
                                        v-if="$form.dlNumber?.invalid"
                                        severity="error"
                                        size="small"
                                        variant="simple"
                                    >
                                        {{ $form.dlNumber.error?.message }}
                                    </Message>
                                </div>
                            </div>
                        </section>

                        <!-- Contact Details -->
                        <section class="space-y-3">
                            <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">Contact Details</h3>
                            <div class="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-6">
                                <!-- Phone -->
                                <div class="flex flex-col gap-1 min-w-0 md:col-span-6">
                                    <FloatLabel variant="on">
                                        <InputMask
                                            id="phone"
                                            name="phone"
                                            mask="(999) 999-9999"
                                            placeholder="(555) 555-5555"
                                            autocomplete="tel"
                                            class="w-full"
                                        />
                                        <label for="phone">Phone Number</label>
                                    </FloatLabel>
                                    <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">
                                        {{ $form.phone.error?.message }}
                                    </Message>
                                </div>

                                <!-- Email -->
                                <div class="flex flex-col gap-1 min-w-0 md:col-span-6">
                                    <FloatLabel variant="on">
                                        <InputText
                                            id="email"
                                            name="email"
                                            type="email"
                                            autocomplete="email"
                                            class="w-full"
                                        />
                                        <label for="email">Email Address</label>
                                    </FloatLabel>
                                    <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                                        {{ $form.email.error?.message }}
                                    </Message>
                                </div>
                            </div>
                        </section>

                        <!-- Additional Info -->
                        <section class="space-y-3">
                            <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">Additional Info</h3>
                            <div class="grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-6">
                                <!-- Case Number -->
                                <div class="flex flex-col gap-1 min-w-0 md:col-span-6">
                                    <FloatLabel variant="on">
                                        <InputText
                                            id="caseNumber"
                                            name="caseNumber"
                                            autocomplete="off"
                                            class="w-full"
                                        />
                                        <label for="caseNumber">Case #</label>
                                    </FloatLabel>
                                    <Message
                                        v-if="$form.caseNumber?.invalid"
                                        severity="error"
                                        size="small"
                                        variant="simple"
                                    >
                                        {{ $form.caseNumber.error?.message }}
                                    </Message>
                                </div>

                                <!-- Option Selection -->
                                <fieldset class="flex flex-col gap-2 md:col-span-6">
                                    <legend class="block font-medium text-sm text-gray-700 dark:text-white">
                                        Select an Option
                                    </legend>
                                    <RadioButtonGroup name="option" class="flex flex-wrap gap-4">
                                        <div class="flex items-center gap-2">
                                            <RadioButton inputId="option1" value="option1" />
                                            <label for="option1" class="text-gray-700 dark:text-white">Option 1</label>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <RadioButton inputId="option2" value="option2" />
                                            <label for="option2" class="text-gray-700 dark:text-white">Option 2</label>
                                        </div>
                                    </RadioButtonGroup>
                                    <Message
                                        v-if="$form.option?.invalid"
                                        severity="error"
                                        size="small"
                                        variant="simple"
                                    >
                                        {{ $form.option.error?.message }}
                                    </Message>
                                </fieldset>
                            </div>
                        </section>

                        <!-- Actions -->
                        <div class="flex justify-center pt-2">
                            <Button type="submit" label="Submit" class="w-full sm:w-auto" />
                        </div>
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
