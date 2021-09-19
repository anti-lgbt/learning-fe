<template>
  <div class="product-list product-list-slide">
    <div class="product-list-title">
      {{ title }}
    </div>
    <div class="product-list-content">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(product, index) in products" :key="index">
          <ProductItem :product="product" />
        </swiper-slide>
      </swiper>
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
export default class ProductListSlide extends Vue {
  @Prop() title!: string;
  @Prop() products!: Product[];

  swiperOptions = {
    slidesPerView: 4,
  };
}
</script>

<style lang="less">
.product-list-slide {
  .product-item {
    width: 100%;
  }
}
</style>
