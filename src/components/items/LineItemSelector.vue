<template>
  <line
    :x1="item.x1"
    :y1="item.y1"
    :x2="item.x2"
    :y2="item.y2"
    :stroke-width="strokeWidth"
    class="selector"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { inverseScale } from '../../lib/inverse-scale';
import { editor } from '../../store';
import { LineItem } from '@/types';

export default defineComponent({
  props: {
    item: {
      type: Object as () => LineItem,
      required: true
    }
  },
  setup () {
    const strokeWidth = computed((): number => {
      return inverseScale(10, editor.getters.zoomRate());
    });

    return {
      strokeWidth
    };
  }
});
</script>

<style scoped>
.selector {
  stroke: #ffffff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-opacity: 0;
}
</style>
