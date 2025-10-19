import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia'

import "./assets/main.css";
import App from './App.vue';
import router from './router'

const app = createApp(App);
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        /*options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }*/
    }
 });
app.mount('#app');