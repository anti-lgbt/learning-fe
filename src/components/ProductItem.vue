<template>
  <div class="product-item">
    <router-link :to="`/product-info/${product.id}`" class="product-item-image">
      <img :src="config.api_url + '/public/products/' + product.id + '/image'" />
      <div class="box-see">
        XEM CHI TIẾT
      </div>
    </router-link>
    <div class="product-item-details">
      <router-link :to="`/product-info/${product.id}`" class="product-item-name">
        {{ product.name }}
      </router-link>
      <div :class="['product-item-price', { 'has-discount': Number(product.discount_percentage) > 0 }]">
        {{ price }} đ <span v-if="Number(product.discount_percentage) > 0" class="default-price">{{ default_price }} đ</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class ProductItem extends Vue {
  @Prop() product!: Product;

  get price() {
    return (Number(this.product.price) * (1 - Number(this.product.discount_percentage) / 100)).toLocaleString();
  }

  get default_price() {
    return (Number(this.product.price)).toLocaleString();
  }
}
</script>

<style lang="less">
.product-item {
  display: inline-block;
  width: 25%;
  padding: 0 16px;

  &-image {
    position: relative;
    display: block;
    width: 100%;
    height: 250px;
    background-color: #fff;
    overflow: hidden;

    img {
      width: 100%;
    }

    &:hover {
      .box-see {
        bottom: 0;
      }
    }

    .box-see {
      position: absolute;
      width: 100%;
      height: 35px;
      line-height: 35px;
      background-color: #668eca;
      color: #fff;
      bottom: -35px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      transition: all .3s;
    }
  }

  &-details {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  &-name {
    font-size: 16px;
    margin-bottom: 8px;
  }

  &-price {
    display: flex;
    font-size: 22px;
    font-weight: 700;
    align-items: center;

    .default-price {
      margin-left: 8px;
      font-size: 14px;
      color: #b7b9bc;
      text-decoration: line-through;
    }
  }
}
</style>
