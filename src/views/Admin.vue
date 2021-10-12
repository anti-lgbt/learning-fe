<template>
  <div class="page-admin">
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
      <router-link to="/admin/statistics" class="menu-item">
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
  display: flex;
  justify-content: space-between;

  height: 100%;
  width: 100%;
  padding: 0 12px;
  margin: 0 auto;

  .menu {
    width: 350px !important;
    margin-right: 16px;
  }

  > * {
    width: 100%;
    background: #fff;

    table a {
      color: blue !important;

      & + a {
        margin-left: 8px;
      }
    }
  }

  .ant-table-footer {
    padding: 0;
    background: #fff;
  }

  .table-footer {
    width: 100%;
    padding: 20px;
    text-align: right;

    a {
      color: blue;
    }
  }
}
</style>
