<template>
  <div class="products">
    <a-table :columns="columns" :data-source="data" :loading="loading">
      <template
        v-for="col in ['product_type_id', 'name', 'price', 'discount_percentage', 'stock_left', 'special']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-select v-if="record.editable && col == 'product_type_id'" :value="record.product_type_id" style="width: 150px" @change="value => handleChange(value, record.key, col)">
            <a-select-option v-for="type of types" :key="type.id" :value="type.id">
              {{ type.name }}
            </a-select-option>
          </a-select>
          <a-input
            v-else-if="record.editable && col !== 'special'"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else-if="col === 'product_type_id'">
            {{ types.find(type => type.id === record.product_type_id).name }}
          </template>
          <template v-else-if="col === 'special'">
            <a-checkbox :checked="record.special"  :disabled="editingKey != record.key" @change="e => handleChange(e.target.checked, record.key, col)" />
          </template>
          <template v-else-if="col === 'discount_percentage'">
            {{ text }}%
          </template>
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <a-modal v-model="record.modal_image" title="Ảnh sản phẩm" :footer="false" wrapClassName="modal-image">
            <div class="upload-image" @mouseover="image_hover = true" @mouseleave="image_hover = false">
              <img :src="imageUrl.length ? imageUrl : `/api/v2/public/products/${record.id}/image`" />
              <div class="upload-image-container" :class="{'profile-info-avatar-upload-hoving': image_hover}">
                <a-upload
                  class="image-uploader"
                  :file-list="files"
                  :show-upload-list="false"
                  :customRequest="info => handleUpload(info, record.id)"
                  :before-upload="beforeUpload"
                >
                  <div>
                    <a-icon type="upload" />
                  </div>
                </a-upload>
                <div v-if="image_loading" class="upload-image-loading">
                  <a-icon type="loading" />
                </div>
              </div>
            </div>
          </a-modal>
          <span v-if="record.editable">
            <a @click="openModalImage(record.key)">Ảnh</a>
            <a @click="() => save(record.key)">Xác nhận</a>
            <a-popconfirm title="Bạn chắc chắn muốn huỷ chỉnh sửa?" @confirm="() => cancel(record.key)">
              <a>Huỷ</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="openModalImage(record.key)">Ảnh</a>
            <a :disabled="editingKey !== -1" @click="() => edit(record.key)">Edit</a>
            <a-popconfirm title="Bạn chắc chắn muốn xoá" @confirm="() => delete_product(record.key)">
              <a>Xoá</a>
            </a-popconfirm>
          </span>
        </div>
      </template>

      <template slot="expandedRowRender" slot-scope="record">
        <div style="margin-bottom: 12px; font-size: 16px; font-weight: bold;">Mô tả:</div>
        <template v-if="record.editable">
          <a-textarea
            style="margin: -5px 0"
            :value="record.description"
            @change="e => handleChange(e.target.value, record.key, 'description')"
          />
        </template>
        <template v-else>
          {{ record.description }}
        </template>
      </template>
      <template slot="footer">
        <div class="table-footer">
          <a-button type="primary" @click="ModalCreateProduct.showing = true">Tạo mới</a-button>
        </div>
      </template>
    </a-table>
    <ModalCreateProduct ref="ModalCreateProduct" :product_types="types" @success="d => data.push(d)" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Ref } from 'vue-property-decorator';
import { notification } from 'ant-design-vue';
import { AdminController } from '@/controllers';
import AdminMixin from './mixins';
import ApiClient from '@/library/ApiClient';
import ModalCreateProduct from './ModalCreateProduct.vue';

function getBase64(img: Blob, callback: (data: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

@Component({
  components: {
    ModalCreateProduct,
  },
})
export default class Products extends Mixins(AdminMixin) {
  @Ref('ModalCreateProduct') ModalCreateProduct!: ModalCreateProduct;

  newProductObj = {};
  imageUrl = '';
  image_loading = false;
  image_hover = false;
  files = Array<File>();
  types = [];
  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'product_type_id',
      key: 'product_type_id',
      scopedSlots: { customRender: 'product_type_id' },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      scopedSlots: { customRender: 'price' },
    },
    {
      title: 'Giảm %',
      dataIndex: 'discount_percentage',
      key: 'discount_percentage',
      scopedSlots: { customRender: 'discount_percentage' },
    },
    {
      title: 'Đặc biệt',
      dataIndex: 'special',
      key: 'special',
      scopedSlots: { customRender: 'special' },
    },
    {
      title: 'Số lượng',
      dataIndex: 'stock_left',
      key: 'stock_left',
      scopedSlots: { customRender: 'stock_left' },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ]

  async mounted() {
    await this.get_product_types();
    this.get_products();
  }

  beforeUpload(file: File) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.$message.error('You can only upload JPG file!');

      return false;
    }
    this.files = [file];
    return isJpgOrPng;
  }

  async handleUpload(info: any, id: number) {
    this.image_loading = true;
    const file: File = info.file;
    const form = new FormData();

    form.append('image', file);

    try {
      await new ApiClient().post(`admin/products/${id}/image`, form);
      getBase64(file, (imageUrl) => {
        this.imageUrl = imageUrl;
      });
      notification.success({
        message: 'Cập nhật ảnh thành công',
        description: '',
      });
    } catch (error) {
      return error;
    } finally {
      this.image_loading = false;
    }
  }

  openModalImage(key: number) {
    const index = this.data.findIndex((item) => key === item.key);

    this.$set(this.data[index], 'modal_image', true);
  }

  async get_product_types() {
    try {
      const { data } = await AdminController.get_product_types();
      this.types = data;
    } catch (error) {
      return error;
    }
  }

  async get_products() {
    this.loading = true;
    try {
      const { data } = await AdminController.get_products();
      this.data = data.map((row: any) => {
        row.key = row.id;

        return row;
      });
      this.cacheData = data.map((item: any) => ({ ...item }));
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }

  async delete_product(key: number) {
    this.loading = true;
    const index = this.data.findIndex((item) => key === item.key);
    if (index === -1) return;

    try {
      await AdminController.delete_product(this.data[index].id);
      this.data.splice(index, 1);
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }

  async onSave(key: number) {
    this.loading = true;
    try {
      const item = this.data.find((item) => item.key === key);
      await AdminController.update_product(item.id, item.product_type_id, item.name, item.description, item.price, item.discount_percentage, item.special, Number(item.stock_left));
      this.cacheData = this.data.map((item: any) => ({ ...item }));
    } catch (error) {
      const index = this.data.findIndex((item) => key === item.key);
      if (index >= 0) Object.assign(this.data[index], this.cacheData.find((item) => key === item.key));
      return error;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="less">
.modal-image {
  img {
    width: 100%;
  }

  .upload-image {
    position: relative;

    &-loading {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      text-align: center;
      font-size: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: not-allowed;
    }

    &-container {
      position: absolute;
      height: 100%;
      width: 100%;
      text-align: center;
      bottom: 0;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }
  }

  .image-uploader {
    height: 100%;
    width: 100%;
    display: block;

    .ant-upload {
      height: 100%;
      width: 100%;

      > div {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
          font-size: 80px;
          opacity: 0;
        }
      }
    }
  }
}
</style>
