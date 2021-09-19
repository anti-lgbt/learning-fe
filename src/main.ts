import Vue from 'vue';
import {
  Button, Layout, Input, Form, Icon, Skeleton,
} from 'ant-design-vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import App from './App.vue';
import router from './router';
import store from './store';
import config from './config';
import 'swiper/css/swiper.css';
import { PublicController, UserController } from '@/controllers';

Vue.use(Button);
Vue.use(Layout);
Vue.use(Input);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Skeleton);
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;
Vue.prototype.config = config;
Vue.prototype.UserController = UserController;
Vue.prototype.PublicController = PublicController;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
