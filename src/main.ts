import Vue from 'vue';
import { Button, Layout } from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Button);
Vue.use(Layout);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
