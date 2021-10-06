<template>
  <a-layout-header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="header-logo">
          <img src="@/assets/logo.png" />
        </router-link>
        <form class="header-search" @submit.prevent="search_product">
          <a-input v-model="search" type="text" />
          <a-button type="submit" :disabled="!search">TÌM KIẾM</a-button>
        </form>
        <div class="header-nav">
          <router-link to="/product-list" class="header-nav-item">
            DANH MỤC
          </router-link>

          <router-link v-if="UserController.role == 'admin'" to="/admin/product_types" class="header-nav-item" :class="{ 'router-link-exact-active router-link-active': $route.path.includes('/admin/') }">
            QUẢN TRỊ
          </router-link>

          <template v-if="UserController.state != 'active'">
            <router-link to="/login" class="header-nav-item">
              <a-button>Đăng nhập</a-button>
            </router-link>

            <router-link to="/register" class="header-nav-item">
              <a-button>Đăng ký</a-button>
            </router-link>
          </template>
          <template v-else>
            <div class="header-nav-item">
              Xin chào:
              <router-link to="/profile">
                {{ UserController.full_name }}
              </router-link>
            </div>

            <a-icon type="logout" @click="logout" />
          </template>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import PublicController from '@/controllers/public';
import { UserController } from '@/controllers';

@Component
export default class Header extends Vue {
  search = '';

  search_product() {
    if (this.search.length === 0) return;

    this.$router.push(`/product-list?name=${this.search}`);
  }

  logout() {
    UserController.logout();
  }
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

  &-search {
    width: 350px;
    margin: auto 0;
    display: flex;
    align-items: center;

    input {
      height: 35px;
      line-height: 35px;
      padding: 0 12px;
    }

    button {
      margin-left: 12px;
      font-size: 12px;
      width: 100px;
    }
  }

  &-nav {
    display: flex;
    align-items: center;

    &-item {
      color: rgb(34, 41, 58);
      margin: 0 12px;
      font-size: 16px;

      &.router-link-active {
        text-decoration: underline;
      }
    }
  }
}
</style>
