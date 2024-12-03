import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './home.vue';
import Count from './playground/count.vue';
import CountV3 from './playground/count-v3.vue';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/count',
            component: Count
        },
        {
            path: '/count-v3',
            component: CountV3
        },
        {
            path: '/',
            component: Home
        }
    ]
});
