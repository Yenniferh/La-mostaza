import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeLayout from '../layout/HomeLayout.vue';
import DashboardLayout from '../layout/DashboardLayout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: HomeLayout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Login.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
