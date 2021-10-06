<template>
  <div class="product-types">
    <a-table :columns="columns" :data-source="data" :loading="loading">
      <span slot="created_at" slot-scope="created_at">{{ moment(created_at).format("DD/MM/YYY") }}</span>
      <template
        v-for="col in ['name']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Xác nhận</a>
            <a-popconfirm title="Bạn chắc chắn muốn huỷ chỉnh sửa?" @confirm="() => cancel(record.key)">
              <a>Huỷ</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== -1" @click="() => edit(record.key)">Edit</a>
            <a-popconfirm title="Bạn chắc chắn muốn xoá" @confirm="() => delete_product_type(record.key)">
              <a>Xoá</a>
            </a-popconfirm>
          </span>
        </div>
      </template>

      <template slot="footer">
        <div class="table-footer">
          <a-button type="primary" @click="ModalCreateProductType.showing = true">Tạo mới</a-button>
        </div>
      </template>
    </a-table>
    <ModalCreateProductType ref="ModalCreateProductType" @success="d => data.push(d)" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Ref } from 'vue-property-decorator';
import { notification } from 'ant-design-vue';
import { AdminController } from '@/controllers';
import AdminMixin from './mixins';
import ModalCreateProductType from './ModalCreateProductType.vue';

@Component({
  components: {
    ModalCreateProductType,
  },
})
export default class ProductTypes extends Mixins(AdminMixin) {
  @Ref('ModalCreateProductType') ModalCreateProductType!: ModalCreateProductType;
  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      scopedSlots: { customRender: 'created_at' },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ]

  mounted() {
    this.get_product_types();
  }

  async get_product_types() {
    this.loading = true;
    try {
      const { data } = await AdminController.get_product_types();
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

  async delete_product_type(key: number) {
    this.loading = true;
    const index = this.data.findIndex((item) => key === item.key);
    if (index === -1) return;

    try {
      await AdminController.delete_product_type(this.data[index].id);
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
      await AdminController.update_product_type(item.id, item.name);
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
