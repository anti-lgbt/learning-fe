<template>
  <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" class="change-password-form" @submit.prevent="change_password">
    <a-form-item label="Mật khẩu cũ" required>
      <a-input-password v-model="old_password" name="old_password" placeholder="Nhập mật khẩu cũ" />
      <div class="ant-input-error">
        {{ old_password_error }}
      </div>
    </a-form-item>
    <a-form-item label="Mật khẩu mới" required>
      <a-input-password v-model="new_password" name="new_password" placeholder="Nhập mật khẩu mới" />
      <div class="ant-input-error">
        {{ new_password_error }}
      </div>
    </a-form-item>
    <a-form-item label="Xác nhận lại" required>
      <a-input-password v-model="confirm_password" name="confirm_password" placeholder="Nhập lại khẩu" />
      <div class="ant-input-error">
        {{ confirm_password_error }}
      </div>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" htmlType="submit">Đổi mật khẩu</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { AuthMixin } from '@/mixins';

@Component({})
export default class ProfileDashboardChangePassword extends Mixins(AuthMixin) {}
</script>
