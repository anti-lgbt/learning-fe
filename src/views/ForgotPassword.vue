<template>
  <div class="login container">
    <AuthForm title="Quên mật khẩu" @submit.prevent="forgot_password">
      <AuthInput label="Email" v-model="email" :required="true" />
      <a-button type="primary" html-type="submit" :loading="loading">Quên mật khẩu</a-button>
    </AuthForm>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { AuthMixin } from '@/mixins';

@Component
export default class ForgotPassword extends Mixins(AuthMixin) {}
</script>
