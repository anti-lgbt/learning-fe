<template>
  <div class="product-info">
    <div class="product-info-content container">
      <div class="product-info-image">
        <img
          :src="config.api_url + '/public/products/' + product_id + '/image'"
        />
      </div>
      <div class="product-info-details">
        <div class="product-info-details-title">{{ name }}</div>
        <div class="product-info-details-price">{{ price }} đ</div>
        <div class="product-info-details-stock-left">
          Tình trạng: <span>{{ stock_left > 0 ? "Còn hàng" : "Hết hàng" }}</span>
        </div>
        <button class="product-info-button" :disabled="stock_left == 0">THÊM VÀO GIỎ</button>
      </div>
    </div>

    <div class="container">
      <ProductListSlide title="Sản phẩm liên quan" :products="same_products" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductListSlide from '@/components/ProductListSlide.vue';
import Controller from '@/controllers';

@Component({
  components: {
    ProductListSlide,
  },
})
export default class ProductInfo extends Vue {
  loading = false;
  product: Product | null = null;

  same_products = Array<Product>();

  get product_id() {
    return Number(this.$route.params.id);
  }

  get price() {
    return Number(this.product?.price || '0.0').toLocaleString();
  }

  get name() {
    return this.product?.name;
  }

  get stock_left() {
    return this.product?.stock_left || 0;
  }

  async mounted() {
    await this.get_product();
    this.get_same_product();
  }

  async get_product() {
    this.loading = true;
    try {
      const { data } = await Controller.get_product(this.product_id);
      this.product = data;
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }

  async get_same_product() {
    try {
      const { data } = await Controller.get_products({
        type: this.product?.type,
      });
      this.same_products = data;
    } catch (error) {
      return error;
    }
  }
}
</script>

<style lang="less">
.product-info {
  margin: 20px auto;

  &-content {
    display: flex;
  }

  &-image {
    width: 625px;

    img {
      width: 100%;
    }
  }

  &-details {
    width: calc(100% - 625px);
    padding-left: 20px;

    &-title {
      font-size: 30px;
      margin: 3.5px 0 7px;
    }

    &-price {
      color: #a0122b;
      font-size: 26px;
      font-weight: 700;
      display: inline-block;
      margin-bottom: 8px;
    }

    &-stock-left {
      margin-bottom: 12px;
      font-size: 16px;

      span {
        font-weight: 500;
      }
    }
  }

  &-button {
    max-width: 250px;
    width: 100%;
    display: block;
    padding: 0;
    border: 0;
    font-weight: 600;
    background: #007aff;
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
    line-height: 36px;
    text-align: center;
    letter-spacing: 2px;
    border-radius: 3px;
    border: 2px solid #007aff;

    &:disabled {
      background: rgb(101, 105, 107);
      border: none;
    }
  }
}
</style>
