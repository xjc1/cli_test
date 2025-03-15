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
    path: '/tableMerge',
    name: 'tableMerge',
    component: () => import('@/views/tableMerge/index.vue'),
  },
  {
    path: '/eMap',
    name: 'eMap',
    component: () => import('@/views/scMap/EMap.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
