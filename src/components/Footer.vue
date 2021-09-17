<template>
  <a-layout-footer class="footer">
    <div class="container">
      <div class="footer-nav">
        <div class="footer-logo">
          <img src="@/assets/logo.png" />
        </div>
        <div class="footer-desc">
          Đây là một trang web ngớ ngẩn và tôi cũng không biết tại sao tôi phải tạo ra nó nữa thật là ngớ ngẩn quá đi mà
        </div>
      </div>
      <div class="footer-nav">
        <div class="footer-nav-title">Example</div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
      </div>
      <div class="footer-nav">
        <div class="footer-nav-title">Example</div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
      </div>
      <div class="footer-nav">
        <div class="footer-nav-title">Example</div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
        <div class="footer-nav-item">
          <a>Example</a>
        </div>
      </div>
    </div>
  </a-layout-footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Footer extends Vue {

}
</script>

<style lang="less">
.footer {
  height: 300px;
  padding-top: 50px;
  padding-bottom: 0;
  padding-right: 0;
  padding-left: 0;
  background-color: rgb(162, 175, 196);

  .container {
    display: flex;
  }

  &-logo {
    width: 75%;

    img {
      width: 100%;
    }
  }

  &-desc {
    font-size: 16px;
    margin-top: 20px;
  }

  &-nav {
    display: block;
    flex: 1;
    padding-right: 12px;

    &-title {
      font-weight: 500;
      font-size: 24px;
      margin-bottom: 20px;
    }

    &-item {
      font-size: 16px;
      line-height: 36px;

      a {
        color: #1f3963;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
