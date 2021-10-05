<template>
  <div class="register">
    <AuthForm title="Đăng ký" @submit.prevent="register">
      <AuthInput label="Full Name" v-model="full_name" :required="true" />
      <AuthInput label="Email" v-model="email" :required="true" :error="email_error" />
      <AuthInput label="Password" type="password" v-model="password" :required="true" :error="password_error" />
      <a-button type="primary" html-type="submit" :loading="loading">Đăng ký</a-button>
    </AuthForm>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { AuthMixin } from '@/mixins';

@Component({})
export default class Register extends Mixins(AuthMixin) {}
</script>

<style lang="less">
.register {}
</style>
