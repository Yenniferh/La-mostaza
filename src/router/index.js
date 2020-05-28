import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeLayout from '../layout/HomeLayout.vue';
import DashboardLayout from '../layout/DashboardLayout.vue';
import store from '@/store/index.js';

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
    path: '/admin',
    redirect: '/admin/dashboard',
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      if (to.name !== 'Login' && !store.state.user.isLoggued)
        next({ name: 'Home' });
      else next();
    },
    children: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
      },
      {
        path: '/admin/menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue'),
      },
      {
        path: '/admin/inventario',
        name: 'Inventario',
        component: () => import('../views/Inventario.vue'),
      },
      {
        path: '/admin/ordenes',
        name: 'Ordenes',
        component: () => import('../views/Ordenes.vue'),
      },
      {
        path: '/admin/descuentos',
        name: 'Descuentos',
        component: () => import('../views/Descuentos.vue'),
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
