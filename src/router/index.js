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
    component: () => import('@/views/oval/index.vue'),
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
    name: 'map',
    component: () => import('@/views/map/index.vue'),
  },
  {
    path: '/location',
    name: 'location',
    component: () => import('@/views/map/Location.vue'),
  },
  {
    path: '/bMap',
    name: 'bMap',
    component: () => import('@/views/map/Bmap.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
