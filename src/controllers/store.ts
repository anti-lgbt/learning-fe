import Vue from 'vue';
import VueCompositionAPI, { reactive } from '@vue/composition-api';

Vue.use(VueCompositionAPI);

export default reactive<{ carts: number[] }>({
  carts: (localStorage.getItem('carts') || '').split(',').map((cart) => Number(cart)),
});
