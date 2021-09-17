<template>
  <a-layout id="app">
    <Header />
    <a-layout-content>
      <router-view/>
    </a-layout-content>
    <Footer />
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {

}
</script>

<style lang="less">
.ant-layout {
  min-height: 100vh;
}

.container {
  height: 100%;
  width: 1200px;
  margin: 0 auto;
}

.product-list {
  margin: 30px 0;

  &-title {
    font-size: 36px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 40px;
  }

  &-content {
    //
  }
}
</style>
