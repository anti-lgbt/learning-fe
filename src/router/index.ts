import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import ProductInfo from '@/views/ProductInfo.vue';
import ProductList from '@/views/ProductList.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Profile from '@/views/Profile.vue';
import { UserController } from '@/controllers';

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
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

let first_route = true;

router.beforeEach(async (to, from, next) => {
  if (first_route) {
    await UserController.get_logged();

    first_route = false;
  }

  return next();
});

export default router;
