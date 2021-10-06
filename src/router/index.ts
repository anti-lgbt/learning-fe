import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { UserController } from '@/controllers';
import Admin from '@/views/Admin.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import ProductInfo from '@/views/ProductInfo.vue';
import ProductList from '@/views/ProductList.vue';
import Profile from '@/views/Profile.vue';
import Register from '@/views/Register.vue';

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
    meta: {
      guestOnly: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guestOnly: true,
    },
  },
  {
    path: '/forgot_password',
    name: 'forgot_password',
    component: ForgotPassword,
    meta: {
      guestOnly: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'product_types',
        component: () => import('@/views/Admin/ProductTypes.vue'),
      },
      {
        path: 'products',
        component: () => import('@/views/Admin/Products.vue'),
      },
      {
        path: 'users',
        component: () => import('@/views/Admin/Users.vue'),
      },
      {
        path: 'stats',
        component: () => import('@/views/Admin/Stats.vue'),
      },
    ],
    meta: {
      requireAuth: true,
      adminOnly: true,
    },
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

  if (to.meta?.guestOnly && UserController.state === 'active') {
    return next('/');
  } else if (to.meta?.requireAuth && UserController.state !== 'active') {
    return next('/login');
  } else {
    return next();
  }
});

export default router;
