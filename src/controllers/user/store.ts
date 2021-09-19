import Vue from 'vue';
import VueCompositionAPI, { reactive } from '@vue/composition-api';

Vue.use(VueCompositionAPI);

export default reactive<{
  full_name: string | null;
  email: string | null;
  state: UserState | null;
  role: UserRole | null;
}>({
  full_name: null,
  email: null,
  state: null,
  role: null,
});
