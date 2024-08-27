import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import Dashboard from './components/Dashboard.vue';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } // Mark the route as requiring auth
  },
];

const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes
});

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('authToken');

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!token) {
        return next('/login');
      }

      try {
        console.log(token);
        const response = await axios.get(`/api/user`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data.id);
        if (response.data.id) {
          next();
        } else {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          next('/login');
        }
      } catch (error) {
        console.log(error)
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        next('/login');
      }
    } else {
      next();
    }
  });

export default router;
