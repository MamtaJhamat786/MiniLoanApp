import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Import the views/components for routing
import PostiveDecision from '@/views/PostiveDecision.vue';
import NegativeDecision from '@/views/NegativeDecision.vue';
import HomePage from '@/views/HomePage.vue';

// Define the routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/success',
    name: 'Success',
    component: PostiveDecision,
  },
  {
    path: '/negative',
    name: 'Negative',
    component: NegativeDecision,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Export the router to be used in main.ts
export default router;
