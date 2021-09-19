<template>
  <a-layout-header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="header-logo">
          <img src="@/assets/logo.png" />
        </router-link>
        <form class="header-search" @submit.prevent="search_product">
          <input v-model="search" type="text" />
          <button type="submit">TÌM KIẾM</button>
        </form>
        <div class="header-nav">
          <router-link v-for="(type, index) in types" :key="index" :to="`/product-list?type=${type.name}`" class="header-nav-item">
            {{ type.name.toUpperCase() }}
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

            <router-link v-if="UserController.state == 'admin'" to="/admin">
              Quản trị
            </router-link>

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
  types = Array<string>();
  search = '';

  mounted() {
    this.get_product_types();
  }

  async get_product_types() {
    try {
      const { data } = await PublicController.get_product_types();
      this.types = data;
    } catch (error) {
      return error;
    }
  }

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

    input {
      height: 35px;
      line-height: 35px;
      width: 100%;
      border: 1px solid rgb(173, 177, 185);
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
    }
  }
}
</style>
