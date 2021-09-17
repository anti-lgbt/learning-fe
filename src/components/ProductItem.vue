<template>
  <div class="product-item"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class ProductItem extends Vue {
  @Prop() product!: Product;
}
</script>

<style lang="less">

</style>
