<template>
  <div class="product-list">
    <div class="product-list-title">
      {{ title }}
    </div>
    <div class="product-list-content">
      <a-skeleton active v-if="loading" />
      <ProductItem v-for="(product, index) in products" :key="index" :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {
    ProductItem: () => import('./ProductItem.vue'),
  },
})
export default class ProductList extends Vue {
  @Prop() loading!: boolean;
  @Prop() title!: string;
  @Prop() products!: Product[];
}
</script>

<style lang="less">

</style>
