<template>
  <div class="users">
    <a-table :columns="columns" :data-source="data" :loading="loading">
      <template
        v-for="col in ['password', 'full_name', 'role', 'state']"
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
          <template v-else-if="col === 'password'">
            HIDDEN
          </template>
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
            <a-popconfirm title="Bạn chắc chắn muốn xoá" @confirm="() => delete_user(record.id)">
              <a>Xoá</a>
            </a-popconfirm>
          </span>
        </div>
      </template>

      <template slot="footer">
        <table class="table-footer ant-table-body">
          <colgroup><col><col><col><col><col><col><col></colgroup>
          <tbody class="ant-table-tbody">
            <tr class="ant-table-row ant-table-row-level-0">
              <td>
                NULL
              </td>
              <td>
                <a-input v-model="newUserObj.email" placeholder="Email" />
              </td>
              <td>
                <a-input v-model="newUserObj.password" placeholder="Password" />
              </td>
              <td>
                <a-input v-model="newUserObj.full_name" placeholder="Full Name" />
              </td>
              <td>
                <a-input v-model="newUserObj.role" placeholder="Role" />
              </td>
              <td>
                <a-input v-model="newUserObj.state" placeholder="State" />
              </td>
              <td>
                <div>
                  <a @click.prevent="create_user">Tạo mới</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { notification } from 'ant-design-vue';
import { Component, Mixins } from 'vue-property-decorator';
import { AdminController } from '@/controllers';
import AdminMixin from './mixins';

@Component({})
export default class Users extends Mixins(AdminMixin) {
  newUserObj = {};
  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      scopedSlots: { customRender: 'password' },
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      scopedSlots: { customRender: 'full_name' },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      scopedSlots: { customRender: 'role' },
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      scopedSlots: { customRender: 'state' },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ];

  mounted() {
    this.get_users();
  }

  async get_users() {
    this.loading = true;
    try {
      const { data } = await AdminController.get_users();
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

  async onSave(key: number) {
    this.loading = true;
    try {
      const item = this.data.find((item) => item.key === key);
      await AdminController.update_user(item.id, item.full_name, item.role, item.state, item.password);
      this.cacheData = this.data.map((item: any) => ({ ...item }));
    } catch (error) {
      const index = this.data.findIndex((item) => key === item.key);
      if (index >= 0) Object.assign(this.data[index], this.cacheData.find((item) => key === item.key));
      return error;
    } finally {
      this.loading = false;
    }
  }

  async delete_user(id: number) {
    this.loading = true;
    const index = this.data.findIndex((item) => id === item.id);
    if (index === -1) return;

    try {
      await AdminController.delete_user(this.data[index].id);
      this.data.splice(index, 1);
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }

  async create_user() {
    this.loading = true;

    try {
      const { data } = await AdminController.create_user(this.newUserObj);
      this.data.push(data);
      notification.success({
        message: 'Tạo user thành công!',
        description: '',
      });
    } catch (error) {
      return error;
    } finally {
      this.loading = false;
    }
  }
}
</script>
