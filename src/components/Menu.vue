<template>
  <div class="menu">
    <div class="menu-title">
      {{ title }}
    </div>

    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Menu extends Vue {
  @Prop() readonly title!: string;
}
</script>

<style lang="less">
.menu {
  padding-bottom: 12px;
  background-color: #fff;
  width: 300px;
  border-radius: 8px;

  &-title {
    text-align: center;
    font-size: 20px;
    border-bottom: 1px solid #ccc;
  }

  &-item {
    padding: 0 16px;
    display: block;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    font-weight: 500;
    border-bottom: 1px solid #ccc;

    &.router-link-active, &:hover {
      background-color: rgba(0,0,0,0.15);
      text-decoration: none;
    }
  }
}
</style>
