<template>
  <div class="auth-input">
    <div v-if="label" class="auth-input-label">
      {{ label }} <span v-if="required" class="auth-input-label-required">*</span>
    </div>
    <a-input-password v-if="type == 'password'" :value="value" :type="type" :placeholder="placeholder" @input="event => $emit('input', event.target.value)" />
    <a-input v-else :value="value" :type="type" :placeholder="placeholder" @input="event => $emit('input',  event.target.value)" />
    <div v-if="error" class="auth-input-error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Input extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly type!: string;
  @Prop() readonly label!: string;
  @Prop() readonly placeholder!: string;
  @Prop() readonly required!: boolean;
  @Prop() readonly error!: string;
}
</script>

<style lang="less">
.auth-input {
  &-label {
    height: 30px;
    line-height: 30px;

    &-required {
      color: rgb(235, 62, 62);
    }
  }

  &-error {
    height: 20px;
    line-height: 20px;
    margin-left: 8px;
    color: rgb(235, 62, 62);
  }
}
</style>
