import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import ProductInfo from '@/views/ProductInfo.vue';
import ProductList from '@/views/ProductList.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product-info/:id',
    name: 'ProductInfo',
    component: ProductInfo,
  },
  {
    path: '/product-list',
    name: 'ProductList',
    component: ProductList,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
