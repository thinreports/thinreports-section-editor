<template>
  <li class="th-menu-parent uk-parent">
    <a
      href="#"
      @click.prevent
    >{{ title }} <span uk-nav-parent-icon /></a>
    <ul class="uk-nav-sub">
      <slot />
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  }
});
</script>

<style scoped>
.th-menu-parent a {
  color: #444;
}
</style>
