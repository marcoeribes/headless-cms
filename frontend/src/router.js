import { createWebHistory, createRouter } from 'vue-router';

import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Faq from './pages/Faq.vue';
import Class from './pages/Class.vue';
import Register from './pages/Register.vue';
import PaymentStatus from './pages/PaymentStatus.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/faq', name: 'faq', component: Faq },
    { path: '/class/:id', name: 'class', component: Class },
    { path: '/register/:id', name: 'register', component: Register },
    { path: '/payment-status', name: 'payment-status', component: PaymentStatus },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
