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
      <div class="product-info-comment">
        <div class="product-info-comment-title">
          Bình luận về sản phẩm
        </div>

        <a-empty v-if="comments.length == 0" description="Sản phẩm chưa có bình luận nào" class="product-info-comment-note" />
        <a-comment v-for="(comment, index) in comments" :key="index">
          <a slot="author">{{ comment.full_name }}</a>
          <a-avatar
            slot="avatar"
            src="/api/v2/public/users/avatar?id=1"
            icon="avatar"
            :size="50"
            :alt="comment.full_name"
          />
          <p slot="content">{{ comment.content }}</p>
          <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ moment(comment.created_at).fromNow() }}</span>
          </a-tooltip>
        </a-comment>

        <template v-if="UserController.state == 'active'">
          <a-textarea
            v-model="input_comment"
            placeholder="Viết bình luận về sản phẩm"
            :auto-size="{ minRows: 2, maxRows: 6 }"
          />

          <a-button type="primary" @click="send_comment">Gửi bình luận</a-button>
        </template>
        <div v-else class="product-info-comment-note">
          Đăng nhập để bình luận về sản phẩm này
        </div>
      </div>
    </div>

    <div class="container">
      <ProductListSlide title="Sản phẩm liên quan" :products="same_products" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import ProductListSlide from '@/components/ProductListSlide.vue';
import PublicController from '@/controllers/public';

@Component({
  components: {
    ProductListSlide,
  },
})
export default class ProductInfo extends Vue {
  loading = false;
  product: Product | null = null;
  input_comment = '';

  comments = Array<Comment>();
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
    this.get_comments();
    await this.get_product();
    this.get_same_product();
  }

  async get_product() {
    this.loading = true;
    try {
      const { data } = await PublicController.get_product(this.product_id);
      this.product = data;
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }

  async get_comments() {
    (window as any).moment = moment;

    try {
      const { data } = await PublicController.get_comments(this.product_id);
      this.comments = data;
    } catch (error) {
      return error;
    }
  }

  async get_same_product() {
    try {
      const { data } = await PublicController.get_products({
        type: this.product?.type,
      });
      this.same_products = data;
    } catch (error) {
      return error;
    }
  }

  async send_comment() {
    try {
      const { data } = await PublicController.send_comment(this.product_id, this.input_comment);

      this.comments.push(data);
      this.input_comment = '';
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

  &-comment {
    margin-top: 20px;
    margin-bottom: 20px;

    &-title {
      font-size: 36px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 16px;
    }

    .ant-comment-inner {
      padding: 0;
      margin-bottom: 16px;
    }

    .ant-comment-content-author > * {
      font-size: 14px;
      line-height: 24px
    }

    .ant-comment-content-detail p {
      font-size: 16px;
    }

    button {
      margin-top: 16px;
    }

    &-note {
      font-size: 16px;
      text-align: center;
      font-weight: 500;
      color: #007aff;
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
