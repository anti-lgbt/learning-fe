<template>
  <a-modal v-model="showing" title="Tạo mới user" class="modal-create-user" :confirmLoading="loading" @ok="create_user">
    <div class="form-row">
      <div class="form-row-label">
        Email
      </div>
      <a-input v-model="email" placeholder="Email" />
    </div>
    <div class="form-row">
      <div class="form-row-label">
        Full name
      </div>
      <a-input v-model="full_name" placeholder="Full name" />
    </div>
    <div class="form-row">
      <div class="form-row-label">
        Role
      </div>
      <a-select v-model="role" style="width: 150px">
        <a-select-option v-for="r in ['member', 'admin']" :key="r" :value="r">
          {{ r }}
        </a-select-option>
      </a-select>
    </div>
    <div class="form-row">
      <div class="form-row-label">
        State
      </div>
      <a-select v-model="state" style="width: 150px">
        <a-select-option v-for="s in ['active', 'deleted']" :key="s" :value="s">
          {{ s }}
        </a-select-option>
      </a-select>
    </div>
    <div class="form-row">
      <div class="form-row-label">
        Avatar
      </div>
      <a-input ref="input" type="file" style="width: auto;height: 100%;" @change="onAvatarChanged" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { notification } from 'ant-design-vue';
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';
import { AdminController } from '@/controllers';

@Component({})
export default class ModalCreateUser extends Vue {
  @Prop() product_types!: any[];

  loading = false;
  showing = false;
  email = '';
  full_name = '';
  role = 'member';
  state = 'active';
  avatar: File | null = null;

  onAvatarChanged(event: any) {
    this.avatar = event.target.files[0];
  }

  async create_user() {
    this.loading = true;

    const form = new FormData();
    form.set('email', this.email);
    form.set('full_name', this.full_name);
    form.set('role', this.role);
    form.set('state', this.state);
    form.set('avatar', this.avatar as File);

    try {
      const { data } = await AdminController.create_user(form);
      notification.success({
        message: 'Tạo user thành công!',
        description: '',
      });
      this.$emit('success', data);
      this.showing = false;
      this.email = '';
      this.full_name = '';
      this.role = 'member';
      this.state = 'active';
      this.avatar = null;
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
