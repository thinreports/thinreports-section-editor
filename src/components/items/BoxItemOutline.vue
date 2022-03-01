<template>
  <rect
    :x="bounds.x"
    :y="bounds.y"
    :width="bounds.width"
    :height="bounds.height"
    :stroke-width="strokeWidth"
    class="th-box-item-outline"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { inverseScale } from '../../lib/inverse-scale';
import { editor } from '../../store';
import { Bounds } from '@/types';

export default defineComponent({
  props: {
    bounds: {
      type: Object as () => Bounds,
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
.th-box-item-outline {
  stroke: #999;
  fill: none;
}
</style>
