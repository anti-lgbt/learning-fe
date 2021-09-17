<template>
  <div class="home">
    <Banner />
    <ProductList title="Sản Phẩm Hot" :products="HotProducts" />
    <ProductList title="Sản Phẩm Giảm Giá" :products="SaleProducts" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
}
</script>
