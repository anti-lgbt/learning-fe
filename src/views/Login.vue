<template>
  <div class="login container">
    <AuthForm title="Đăng nhập" @submit.prevent="login">
      <AuthInput label="Email" v-model="email" :required="true" />
      <AuthInput v-model="password" label="Password" type="password" :required="true" />
      <a-button type="primary" html-type="submit" :loading="loading">Đăng nhập</a-button>
    </AuthForm>
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
