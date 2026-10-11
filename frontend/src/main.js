import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import './style.css';

import HomeView from './views/HomeView.vue';
import LevelView from './views/LevelView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/level/:id', component: LevelView, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
