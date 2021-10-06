<template>
  <div class="users">
    <a-table :columns="columns" :data-source="data" :loading="loading">
      <template
        v-for="col in ['full_name', 'role', 'state']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-select v-if="record.editable && col === 'role'" :value="record.role">
            <a-select-option v-for="r in ['member', 'admin']" :key="r" :value="r">
              {{ r }}
            </a-select-option>
          </a-select>
          <a-select v-else-if="record.editable && col === 'state'" :value="record.state">
            <a-select-option v-for="s in ['active', 'deleted']" :key="s" :value="s">
              {{ s }}
            </a-select-option>
          </a-select>
          <a-input
            v-else-if="record.editable"
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
          <a-modal v-model="record.modal_avatar" title="Avatar" :footer="false" wrapClassName="modal-avatar">
            <div class="upload-avatar" @mouseover="image_hover = true" @mouseleave="image_hover = false">
              <img :src="imageUrl.length ? imageUrl : `/api/v2/public/users/avatar?id=${record.id}`" />
              <div class="upload-avatar-container" :class="{'profile-info-avatar-upload-hoving': image_hover}">
                <a-upload
                  class="avatar-uploader"
                  :file-list="files"
                  :show-upload-list="false"
                  :customRequest="info => handleUpload(info, record.id)"
                  :before-upload="beforeUpload"
                >
                  <div>
                    <a-icon type="upload" />
                  </div>
                </a-upload>
                <div v-if="avatar_loading" class="upload-avatar-loading">
                  <a-icon type="loading" />
                </div>
              </div>
            </div>
          </a-modal>
          <span v-if="record.editable">
            <a @click="openModalAvatar(record.key)">Ảnh</a>
            <a @click="() => save(record.key)">Xác nhận</a>
            <a-popconfirm title="Bạn chắc chắn muốn huỷ chỉnh sửa?" @confirm="() => cancel(record.key)">
              <a>Huỷ</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="openModalAvatar(record.key)">Ảnh</a>
            <a :disabled="editingKey !== -1" @click="() => edit(record.key)">Edit</a>
            <a-popconfirm title="Bạn chắc chắn muốn xoá" @confirm="() => delete_user(record.id)">
              <a>Xoá</a>
            </a-popconfirm>
          </span>
        </div>
      </template>

      <template slot="expandedRowRender" slot-scope="record">
        <div style="margin-bottom: 12px; font-size: 16px; font-weight: bold;">Mật khẩu:</div>
        <template v-if="record.editable">
          <a-input
            style="margin: -5px 0"
            :value="record.password"
            placeholder="Mật khẩu"
            @change="e => handleChange(e.target.value, record.key, 'password')"
          />
        </template>
      </template>
      <template slot="footer">
        <div class="table-footer">
          <a-button type="primary" @click="ModalCreateUser.showing = true">Tạo mới</a-button>
        </div>
      </template>
    </a-table>
    <ModalCreateUser ref="ModalCreateUser" @success="d => data.push(d)" />
  </div>
</template>

<script lang="ts">
import { notification } from 'ant-design-vue';
import { Component, Mixins, Ref } from 'vue-property-decorator';
import { AdminController } from '@/controllers';
import AdminMixin from './mixins';
import ModalCreateUser from './ModalCreateUser.vue';
import ApiClient from '@/library/ApiClient';

function getBase64(img: Blob, callback: (data: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

@Component({
  components: {
    ModalCreateUser,
  },
})
export default class Users extends Mixins(AdminMixin) {
  @Ref('ModalCreateUser') ModalCreateUser!: ModalCreateUser;
  avatar_loading = false;
  image_hover = false;
  imageUrl = '';
  files: File[] = [];
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

  openModalAvatar(key: number) {
    const index = this.data.findIndex((item) => key === item.key);

    this.$set(this.data[index], 'modal_avatar', true);
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
    this.avatar_loading = true;
    const file: File = info.file;
    const form = new FormData();

    form.append('avatar', file);

    try {
      await new ApiClient().post(`admin/users/${id}/avatar`, form);
      getBase64(file, (imageUrl) => {
        this.imageUrl = imageUrl;
      });
      notification.success({
        message: 'Cập nhật avatar thành công',
        description: '',
      });
    } catch (error) {
      return error;
    } finally {
      this.avatar_loading = false;
    }
  }
}
</script>

<style lang="less">
.modal-create-user {
  .form-row {
    margin-bottom: 12px;

    &-label {
      line-height: 35px;
      font-size: 16px;
    }
  }
}

.modal-avatar {
  img {
    width: 100%;
  }

  .upload-avatar {
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

  .avatar-uploader {
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
