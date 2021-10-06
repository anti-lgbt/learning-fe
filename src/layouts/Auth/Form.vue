<template>
  <div class="auth-form-container">
    <div class="auth-form-title">
      {{ title }}
    </div>
    <form class="auth-form" @submit="event => $emit('submit', event)">
      <slot />
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Form extends Vue {
  @Prop() readonly title!: string;
}
</script>

<style lang="less">
.auth-form {
  > * {
    margin-top: 12px;

    &:first-child {
      margin-top: 0;
    }
  }

  &-footer {
    display: flex;
    justify-content: space-between;

    a {
      color: rgb(82, 144, 238);
    }
  }

  &-container {
    width: 550px;
    background: #fff;
    padding: 20px 30px;
    margin: 150px auto;
  }

  &-title {
    border-left: 4px solid;
    padding-left: 12px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
    color: #1890ff;
  }
}
</style>
