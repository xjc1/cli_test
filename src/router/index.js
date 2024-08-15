import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/oval',
    name: 'Oval',
    component: ()=>import('@/views/oval/index.vue'),
  },
  {
    path: '/compressFile',
    name: 'compressFile',
    component: () => import('@/views/compressFile/index.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test.vue'),
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/views/superMap'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
