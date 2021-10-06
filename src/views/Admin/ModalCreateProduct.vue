<template>
  <a-modal v-model="showing" title="Tạo mới sản phẩm" class="modal-create-product" :confirmLoading="loading" @ok="create_product">
    <div class="form-row">
      <div class="form-row-label">
        Loại sản phẩm
      </div>
      <a-select v-model="product_type_id" style="width: 150px">
        <a-select-option v-for="type in product_types" :key="type.id" :value="type.id">
          {{ type.name }}
        </a-select-option>
      </a-select>
    </div>
    <div class="form-row">
      <div class="form-row-label">
        Tên sản phẩm
      </div>
      <a-input v-model="name" placeholder="Tên sản phẩm" />
    </div>
    <div class="form-row">
      <div class="form-row-label">
        Mô tả sản phẩm
      </div>
      <a-textarea v-model="description" placeholder="Mô tả" />
    </div>
    <div class="form-row">
      <div class="form-row-label">
        Giá
      </div>
      <a-input v-model="price" placeholder="Giá" />
    </div>
    <div class="form-row">
      <div class="form-row-label">
        Giảm %
      </div>
      <a-input v-model="discount_percentage" placeholder="Giảm %" />
    </div>
    <div class="form-row">
      <div class="form-row-label">
        Đặc biệt
      </div>
      <a-checkbox v-model="special" />
    </div>
    <div class="form-row">
      <div class="form-row-label">
        Số lượng
      </div>
      <a-input v-model.number="stock_left" placeholder="Số lượng" />
    </div>
    <div class="form-row">
      <div class="form-row-label">
        Ảnh
      </div>
      <a-input ref="input" type="file" style="width: auto;height: 100%;" @change="onImageChanged" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { notification } from 'ant-design-vue';
import {
  Vue,
  Component,
  Prop,
  Ref,
} from 'vue-property-decorator';
import { AdminController } from '@/controllers';

@Component({})
export default class ModalCreateProduct extends Vue {
  @Prop() product_types!: any[];

  loading = false;
  showing = false;
  product_type_id: number | null = null;
  name = '';
  description = '';
  price = '';
  discount_percentage = '';
  special = false;
  stock_left = 0;
  image: File | null = null;

  onImageChanged(event: any) {
    this.image = event.target.files[0];
  }

  async create_product() {
    this.loading = true;

    const form = new FormData();
    form.set('product_type_id', this.product_type_id as never);
    form.set('name', this.name);
    form.set('description', this.description);
    form.set('price', this.price);
    form.set('discount_percentage', this.discount_percentage);
    form.set('special', this.special as never);
    form.set('stock_left', this.stock_left as never);
    form.set('image', this.image as File);

    try {
      const { data } = await AdminController.create_product(form);
      notification.success({
        message: 'Tạo sản phẩm thành công!',
        description: '',
      });
      this.$emit('success', data);
      this.showing = false;
      this.product_type_id = null;
      this.name = '';
      this.description = '';
      this.price = '';
      this.discount_percentage = '';
      this.special = false;
      this.stock_left = 0;
      this.image = null;
      (this.$refs.input as any).$refs.input.value = undefined;
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="less">
.modal-create-product {
  .form-row {
    margin-bottom: 12px;

    &-label {
      line-height: 35px;
      font-size: 16px;
    }
  }
}
</style>
