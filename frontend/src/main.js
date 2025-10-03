import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import "./assets/main.css";
import App from './App.vue';
import router from './router'

const app = createApp(App);
app.use(router)
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