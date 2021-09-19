<template>
  <div class="category">
    <div class="category-title">DANH MỤC</div>
    <router-link
      v-for="(type, index) in types"
      :key="index"
      :to="`/product-list?type=${type.name}`"
      :class="['category-item', { 'category-item-selected': current_type == type.name }]"
    >
      {{ type.name }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { PublicController } from '@/controllers';

@Component({})
export default class Category extends Vue {
  types = Array<string>();

  get current_type() {
    return this.$route.query.type as string;
  }

  mounted() {
    this.get_product_types();
  }

  async get_product_types() {
    try {
      const { data } = await PublicController.get_product_types();
      this.types = data;
    } catch (error) {
      return error;
    }
  }
}
</script>

<style lang="less">
.category {
  margin-top: 100px;
  padding-right: 20px;

  &-title {
    font-size: 20px;
    font-weight: 500;
  }

  &-item {
    display: block;
    font-size: 16px;
    line-height: 30px;
    color: rgb(93, 146, 226);

    &:hover {
      color: rgb(93, 146, 226);
    }

    &-selected {
      text-decoration: underline;
    }
  }
}
</style>
