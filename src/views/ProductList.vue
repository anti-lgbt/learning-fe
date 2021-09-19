<template>
  <div class="product-list-page container">
    <Category />
    <ProductList :title="title" :products="products" :loading="loading" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import ProductList from '@/components/ProductList.vue';
import Category from '@/layouts/ProductList/Category.vue';
import PublicController from '@/controllers/public';

@Component({
  components: {
    ProductList,
    Category,
  },
})
export default class ProductListPage extends Vue {
  loading = false;
  products = Array<Product>();

  get title() {
    return this.type?.length ? this.type : 'Kết quả';
  }

  get type() {
    return this.$route.query.type as string;
  }

  get name() {
    return this.$route.query.name as string;
  }

  mounted() {
    this.get_products();
  }

  async get_products() {
    this.loading = true;
    let payload = {
      limit: 25,
      page: 1,
    };

    if (this.type?.length) {
      payload = Object.assign(payload, { type: this.type });
    }

    if (this.name?.length) {
      payload = Object.assign(payload, { name: this.name });
    }

    try {
      const { data } = await PublicController.get_products(payload);
      this.products = data;
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }

  @Watch('type')
  @Watch('name')
  onTypeChanged() {
    this.products = [];

    this.get_products();
  }
}
</script>

<style lang="less">
.product-list-page {
  display: flex;

  .category {
    width: 250px;
  }

  .product-list {
    width: calc(100% - 250px);

    .product-item {
      width: 33.3333333%;
    }
  }
}
</style>
