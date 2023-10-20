import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/article/:postId',
    name: 'post',
    props: true,
    component: () => import('../views/ArticleView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  /*scrollBehavior() {
    return { top: 0 };
  },*/
});

export default router;
