<template>
  <div class="login container">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit.prevent="login">
      <a-form-item label="Email">
        <a-input v-model="email" />
      </a-form-item>
      <a-form-item label="Password">
        <a-input-password v-model="password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit" :loading="UserController.loading">Đăng nhập</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { AuthMixin } from '@/mixins';

@Component
export default class Login extends Mixins(AuthMixin) {}
</script>

<style lang="less">
.login {
  margin-top: 20px;
}
</style>
