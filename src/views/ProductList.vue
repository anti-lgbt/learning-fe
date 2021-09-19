<template>
  <div class="product-list-page">
    <ProductList :title="title" :products="products" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import ProductList from '@/components/ProductList.vue';
import Controller from '@/controllers';

@Component({
  components: {
    ProductList,
  },
})
export default class ProductListPage extends Vue {
  products = Array<Product>();

  get title() {
    return this.type?.length ? this.type : `Kết quả tìm kiếm của: ${this.name}`;
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
      const { data } = await Controller.get_products(payload);
      this.products = data;
    } catch (error) {
      return error;
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

</style>
