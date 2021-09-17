<template>
  <div class="product-list">
    <div class="container">
      <div class="product-list-title">
        {{ title }}
      </div>
      <div class="product-list-content">
        <ProductItem v-for="(product, index) in products" :key="index" :product="product" />
      </div>
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
  @Prop() title!: string;
  @Prop() products!: Product[];
}
</script>

<style lang="less">

</style>
