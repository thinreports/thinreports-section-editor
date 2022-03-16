<template>
  <g>
    <rect
      :x="itemBounds.x"
      :y="itemBounds.y"
      :width="itemBounds.width"
      :height="itemBounds.height"
      class="th-stack-view-body"
      :stroke-width="strokeWidth"
    />
  </g>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { inverseScale } from '../../lib/inverse-scale';
import { editor } from '../../store';
import { BoundingBox } from '@/types';

export default defineComponent({
  props: {
    itemBounds: {
      type: Object as () => BoundingBox,
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
.th-stack-view-body {
  stroke-dasharray: 2,3;
  stroke: #aaaaaa;
  stroke-linecap: square;
  stroke-linejoin: round;
  fill-opacity: 0;
  cursor: default;
}
</style>
