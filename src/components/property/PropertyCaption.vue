<template>
  <div class="th-property-pane-caption">
    {{ caption }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    caption: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.th-property-pane-caption {
  margin-bottom: 16px;
}
</style>
