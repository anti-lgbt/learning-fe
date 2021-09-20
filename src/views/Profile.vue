<template>
  <div class="profile">
    <div class="container">
      <ProfileInfo />
      <ProfileDashboard />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProfileInfo from '@/layouts/Profile/Info/Base.vue';
import ProfileDashboard from '@/layouts/Profile/Dashboard/Base.vue';

@Component({
  components: {
    ProfileInfo,
    ProfileDashboard,
  },
})
export default class Profile extends Vue {}
</script>

<style lang="less">
.profile {
  margin: 20px 0;

  .container {
    display: flex;
    justify-content: space-between;
  }

  &-info {
    text-align: center;
    width: 200px;

    &-avatar {
      position: relative;
      height: 200px;
      width: 200px;
      background: #ccc;
      border-radius: 50%;
      cursor: pointer;

      &-upload {
        border-radius: 50%;
        position: absolute;
        height: 100%;
        width: 100%;
        text-align: center;
        bottom: 0;
        transition: all 0.2s ease-in-out;

        &-hoving {
          background-color: rgba(0,0,0, 0.15);

          i {
            opacity: 1 !important;
          }
        }

        .ant-avatar {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
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
    }

    &-name {
      position: relative;
      margin-top: 20px;
      font-size: 30px;
      font-weight: 500;

      input {
        text-align: center;
        background-color: transparent;
        border-bottom: 1px solid;
        font-size: 30px;
        font-weight: 500;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;

        &:focus {
          box-shadow: none;
        }
      }

      i {
        position: absolute;
        top: 12px;
        right: 8px;
        font-size: 20px;
      }
    }
  }

  &-dashboard {
    width: calc(100% - 220px);

    .ant-tabs-bar {
      background-color: #fff;
      border: 1px solid #e8e8e8;
    }

    .ant-tabs-tabpane {
      padding: 8px;
      background-color: #fff;
      border: 1px solid #e8e8e8;
    }

    .ant-tabs-nav .ant-tabs-tab {
      margin: 0 8px;
    }

    .change-password-form {}
  }
}
</style>
