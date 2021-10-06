import Vue from 'vue';
import {
  Button, Layout, Input, Form, Icon, Skeleton, Avatar, Tabs, Upload, Comment, Tooltip, Empty, Table, Popconfirm, Modal, Checkbox, Select,
} from 'ant-design-vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';
import config from './config';
import 'swiper/css/swiper.css';
import { AdminController, PublicController, UserController } from '@/controllers';

Vue.use(Button);
Vue.use(Layout);
Vue.use(Input);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Skeleton);
Vue.use(Avatar);
Vue.use(Tabs);
Vue.use(Upload);
Vue.use(Comment);
Vue.use(Tooltip);
Vue.use(Empty);
Vue.use(Checkbox);
Vue.use(Table);
Vue.use(Popconfirm);
Vue.use(Modal);
Vue.use(Select);
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;
Vue.prototype.config = config;
Vue.prototype.UserController = UserController;
Vue.prototype.PublicController = PublicController;
Vue.prototype.AdminController = AdminController;
Vue.prototype.moment = moment;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
