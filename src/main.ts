import Vue from 'vue';
import { Button, Layout } from 'ant-design-vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import App from './App.vue';
import router from './router';
import store from './store';
import config from './config';
import 'swiper/css/swiper.css';

Vue.use(Button);
Vue.use(Layout);
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;
Vue.prototype.config = config;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
