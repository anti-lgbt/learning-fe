<template>
  <div class="home">
    <Banner />
    <ProductList class="container" title="Sản Phẩm Hot" :products="HotProducts" :loading="LoadingHotProducts" />
    <ProductList class="container" title="Sản Phẩm Giảm Giá" :products="SaleProducts" :loading="LoadingSaleProducts" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PublicController from '@/controllers/public';
import Banner from '@/layouts/Home/Banner.vue';
import ProductList from '@/components/ProductList.vue';

@Component({
  components: {
    Banner,
    ProductList,
  },
})
export default class Home extends Vue {
  LoadingHotProducts = false;
  LoadingSaleProducts = false;
  HotProducts = Array<Product>();
  SaleProducts = Array<Product>();

  mounted() {
    this.get_hot_products();
    this.get_sale_products();
  }

  async get_hot_products() {
    this.LoadingHotProducts = true;
    try {
      const { data } = await PublicController.get_products({
        order_by: 'view_count',
        ordering: 'desc',
        special: true,
        page: 1,
        limit: 25,
      });
      this.HotProducts = data;
    } catch (error) {
      return error;
    } finally {
      this.LoadingHotProducts = false;
    }
  }

  async get_sale_products() {
    this.LoadingSaleProducts = true;
    try {
      const { data } = await PublicController.get_products({
        order_by: 'discount_percentage',
        ordering: 'desc',
        discounting: true,
        page: 1,
        limit: 25,
      });
      this.SaleProducts = data;
    } catch (error) {
      return error;
    } finally {
      this.LoadingSaleProducts = false;
    }
  }
}
</script>
