<template>
  <line
    x1="-1"
    y1="0"
    x2="-1"
    :y2="height"
    :stroke="strokeWidth"
    class="th-stack-view-row-highlighter"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { inverseScale } from '@/lib/inverse-scale';
import { editor } from '@/store';

export default defineComponent({
  props: {
    height: {
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
.th-stack-view-row-highlighter {
  stroke: var(--th-active-color);
}
</style>
