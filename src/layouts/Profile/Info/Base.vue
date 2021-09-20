<template>
  <div class="profile-info">
    <Avatar />
    <Name />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Avatar from './Avatar.vue';
import Name from './Name.vue';

@Component({
  components: {
    Avatar,
    Name,
  },
})
export default class ProfileInfo extends Vue {

}
</script>
