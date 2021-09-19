<template>
  <div class="home">
    <Banner />
    <ProductList title="Sản Phẩm Hot" :products="HotProducts" />
    <ProductList title="Sản Phẩm Giảm Giá" :products="SaleProducts" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Controller from '@/controllers';
import Banner from '@/layouts/Home/Banner.vue';
import ProductList from '@/components/ProductList.vue';

@Component({
  components: {
    Banner,
    ProductList,
  },
})
export default class Home extends Vue {
  HotProducts = Array<Product>();
  SaleProducts = Array<Product>();

  mounted() {
    this.get_hot_products();
    this.get_sale_products();
  }

  async get_hot_products() {
    try {
      const { data } = await Controller.get_products({
        order_by: 'view_count',
        ordering: 'desc',
        special: true,
        page: 1,
        limit: 25,
      });
      this.HotProducts = data;
    } catch (error) {
      return error;
    }
  }

  async get_sale_products() {
    try {
      const { data } = await Controller.get_products({
        order_by: 'discount_percentage',
        ordering: 'desc',
        discounting: true,
        page: 1,
        limit: 25,
      });
      this.SaleProducts = data;
    } catch (error) {
      return error;
    }
  }
}
</script>
