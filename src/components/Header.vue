<template>
  <a-layout-header class="header">
    <div class="container">
      <div class="header-content">
        <div class="header-logo">
          <img src="@/assets/logo.png" />
        </div>
        <div class="header-nav">
          <a class="header-nav-item">ĐỒNG HỒ</a>
          <a class="header-nav-item">LẮC TAY</a>
          <a class="header-nav-item"></a>
          <a class="header-nav-item">ĐỒNG HỒ</a>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
}
</script>

<style lang="less">
.ant-layout-header {
  height: 60px;
  line-height: 1.5;
  background-color: white;
}

.header {
  &-content {
    height: 100%;
    padding: 6px 0;
    display: flex;
    justify-content: space-between;
  }

  &-logo {
    height: 100%;
    display: flex;
    align-items: center;

    img {
      height: 100%;
    }
  }

  &-nav {
    display: flex;
    align-items: center;

    &-item {
      color: rgb(34, 41, 58);
      margin: 0 12px;
      font-size: 16px;

      &:hover {
        color: rgb(34, 41, 58);
        text-decoration: underline;
      }
    }
  }
}
</style>
