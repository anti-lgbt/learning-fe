<template>
  <div class="profile-info-name">
    <a-input v-if="edit_full_name" v-model="cache_edit_full_name" />
    <span v-else class="profile-info-text">{{ UserController.full_name }}</span>
    <a-icon type="edit" @click="on_edit_full_name" />
  </div>
</template>

<script lang="ts">
import { notification } from 'ant-design-vue';
import { Vue, Component } from 'vue-property-decorator';
import { UserController } from '@/controllers';
import ApiClient from '@/library/ApiClient';

@Component({})
export default class ProfileInfoName extends Vue {
  edit_full_name = false;

  cache_edit_full_name = '';

  mounted() {
    this.cache_edit_full_name = UserController.full_name as string;
  }

  async on_edit_full_name() {
    this.edit_full_name = !this.edit_full_name;

    if (this.edit_full_name) return;
    if (this.cache_edit_full_name === UserController.full_name) return;

    try {
      await new ApiClient().put('resource/users', { full_name: this.cache_edit_full_name });
      UserController.full_name = this.cache_edit_full_name;

      notification.success({
        message: 'Cập nhật tên thành công',
        description: '',
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
</script>
