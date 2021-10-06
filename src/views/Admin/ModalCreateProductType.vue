<template>
  <a-modal v-model="showing" title="Tạo mới danh mục" class="modal-create-product" :confirmLoading="loading" @ok="create_product_type">
    <div class="form-row">
      <div class="form-row-label">
        Tên danh mục
      </div>
      <a-input v-model="name" placeholder="Tên danh mục" />
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
export default class ModalCreateProductType extends Vue {
  @Prop() product_types!: any[];

  loading = false;
  showing = false;
  name = '';

  async create_product_type() {
    this.loading = true;

    try {
      const { data } = await AdminController.create_product_type(this.name);
      notification.success({
        message: 'Tạo danh mục thành công!',
        description: '',
      });
      this.$emit('success', data);
      this.showing = false;
      this.name = '';
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="less">
.modal-create-product-type {
  .form-row {
    margin-bottom: 12px;

    &-label {
      line-height: 35px;
      font-size: 16px;
    }
  }
}
</style>
