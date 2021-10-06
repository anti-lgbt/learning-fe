<template>
  <div class="profile-info-avatar" @mouseover="onAvatarHover" @mouseleave="onAvatarBlur">
    <a-avatar v-if="loading" :size="200" icon="loading" />
    <a-avatar v-else :size="200" icon="user" :src="avatar" />
    <div class="profile-info-avatar-upload" :class="{'profile-info-avatar-upload-hoving': avatar_hover}">
      <a-upload
        class="avatar-uploader"
        :file-list="files"
        :show-upload-list="false"
        :customRequest="handleUpload"
        :before-upload="beforeUpload"
      >
        <div>
          <a-icon type="upload" />
        </div>
      </a-upload>
    </div>
  </div>
</template>

<script lang="ts">
import { notification } from 'ant-design-vue';
import { Component, Vue } from 'vue-property-decorator';
import config from '@/config';
import ApiClient from '@/library/ApiClient';

function getBase64(img: Blob, callback: (data: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

@Component
export default class Avatar extends Vue {
  imageUrl = '';
  loading = false;
  files = Array<File>();
  avatar_hover = false;

  get avatar() {
    return this.imageUrl.length ? this.imageUrl : `${config.api_url}/resource/users/avatar`;
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

  async handleUpload(info: any) {
    this.loading = true;
    const file: File = info.file;
    const form = new FormData();

    form.append('avatar', file);

    try {
      await new ApiClient().post('resource/users/avatar', form);
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
      this.loading = false;
    }
  }

  onAvatarHover() {
    this.avatar_hover = true;
  }

  onAvatarBlur() {
    this.avatar_hover = false;
  }
}
</script>
