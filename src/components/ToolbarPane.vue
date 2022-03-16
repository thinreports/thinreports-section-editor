<template>
  <div class="th-toolbar uk-flex uk-flex-column">
    <ToolSelect />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ToolSelect from './toolbar/ToolSelect.vue';

export default defineComponent({
  components: {
    ToolSelect
  }
});
</script>

<style scoped>
.th-toolbar {
  font-size: 0.8rem;
  background-color: #444;
}

.th-toolbar-menu {
  padding: 8px;
}
</style>
