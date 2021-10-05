<template>
  <div class="page-admin container">
    <Menu title="Quản lý">
      <router-link to="/admin/product_types" class="menu-item">
        Danh Mục
      </router-link>
      <router-link to="/admin/products" class="menu-item">
        Sản Phẩm
      </router-link>
      <router-link to="/admin/users" class="menu-item">
        Khách Hàng
      </router-link>
      <router-link to="/admin/stats" class="menu-item">
        Thống Kê
      </router-link>
    </Menu>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Menu from '@/components/Menu.vue';

@Component({
  components: {
    Menu,
  },
})
export default class Admin extends Vue {}
</script>

<style lang="less">
.page-admin {
  margin-top: 24px !important;
}
</style>
