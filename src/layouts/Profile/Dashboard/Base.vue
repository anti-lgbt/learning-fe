<template>
  <div class="profile-dashboard">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Thông tin">
        Email: {{ UserController.email }}
      </a-tab-pane>
      <a-tab-pane key="2" tab="Đổi mật khẩu">
        <ChangePassword />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ChangePassword from './ChangePassword.vue';

@Component({
  components: {
    ChangePassword,
  },
})
export default class ProfileDashboardBase extends Vue {

}
</script>
