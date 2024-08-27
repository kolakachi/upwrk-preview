import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';

const routes = [
  { path: '/', component: Home },
];

const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes
});

export default router;
