<template>
  <line
    x1="0"
    :y1="top"
    :x2="width"
    :y2="top"
    :stroke-width="strokeWidth"
    class="th-section-divider"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { inverseScale } from '../lib/inverse-scale';
import { editor } from '../store';

export default defineComponent({
  props: {
    top: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  setup () {
    const strokeWidth = computed((): number => {
      return inverseScale(1, editor.getters.zoomRate());
    });

    return {
      strokeWidth
    };
  }
});
</script>

<style scoped>
.th-section-divider {
  stroke: #e0e0e0;
}
</style>
