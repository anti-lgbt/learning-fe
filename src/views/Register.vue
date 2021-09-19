<template>
  <div class="register">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit.prevent="register">
      <a-form-item label="Full name">
        <a-input v-model="full_name" />
      </a-form-item>
      <a-form-item label="Email">
        <a-input v-model="email" />
      </a-form-item>
      <a-form-item label="Password">
        <a-input-password v-model="password" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit" :loading="UserController.loading">Đăng ký</a-button>
      </a-form-item>
    </a-form>
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
