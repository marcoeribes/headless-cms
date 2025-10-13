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
import Calendar from 'primevue/calendar';

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
    username: '',
    firstName: '',
    middleInitial: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    dlNumber: '',
    caseNumber: '',
});

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
};

const resolver = ({ values }) => {
    const errors = {};

    if (!values.username) {
        errors.username = [{ message: 'Username is required.' }];
    }

    if (!values.username) {
        errors.username = [{ message: 'Username is required.' }];
    }

    return {
        values, // (Optional) Used to pass current form values to submit event.
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
                        <RadioButtonGroup name="options" class="flex flex-wrap gap-6">
                            <div class="flex items-center gap-2">
                                <RadioButton inputId="option1" value="option1" />
                                <label for="option1" class="text-gray-700 dark:text-white">Option 1</label>
                            </div>
                            <div class="flex items-center gap-2">
                                <RadioButton inputId="option2" value="option2" />
                                <label for="option2" class="text-gray-700 dark:text-white">Option 2</label>
                            </div>
                        </RadioButtonGroup>
                    </div>

                    <!-- Input Fields Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FloatLabel variant="on">
                            <InputText id="firstName" v-model="$form.firstName" maxlength="35" autocomplete="off" />
                            <label for="firstName">First Name</label>
                        </FloatLabel>

                        <FloatLabel variant="on">
                            <InputText
                                id="middleInitial"
                                v-model="$form.middleInitial"
                                maxlength="1"
                                autocomplete="off"
                            />
                            <label for="middleInitial">Middle Initial</label>
                        </FloatLabel>

                        <FloatLabel variant="on">
                            <InputText id="lastName" v-model="$form.lastName" maxlength="35" autocomplete="off" />
                            <label for="lastName">Last Name</label>
                        </FloatLabel>

                        <FloatLabel variant="on">
                            <InputMask id="dob" v-model="$form.dob" mask="99/99/9999" />
                            <label for="dob">Date of Birth</label>
                        </FloatLabel>

                        <FloatLabel variant="on">
                            <InputMask id="phone" v-model="$form.phone" mask="(999) 999-9999" />
                            <label for="phone">Phone Number</label>
                        </FloatLabel>

                        <FloatLabel variant="on">
                            <InputText id="email" v-model="$form.email" type="email" autocomplete="off" />
                            <label for="email">Email Address</label>
                        </FloatLabel>

                        <FloatLabel variant="on">
                            <InputText id="dlNumber" v-model="$form.dlNumber" maxlength="9" autocomplete="off" />
                            <label for="dlNumber">AZ Driver License #</label>
                        </FloatLabel>

                        <FloatLabel variant="on">
                            <InputText id="caseNumber" v-model="$form.caseNumber" autocomplete="off" />
                            <label for="caseNumber">Case #</label>
                        </FloatLabel>

                        <FloatLabel variant="on">
                            <InputText name="username" type="text" fluid />
                            <label for="caseNumber">Case #</label>
                        </FloatLabel>
                        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
                            $form.username.error?.message
                        }}</Message>
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
