<template>
  <div class="banner">
    <img src="@/assets/banner.gif" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Banner extends Vue {

}
</script>

<style lang="less">
.banner {
  width: 100%;

  img {
    width: 100%;
  }
}
</style>
