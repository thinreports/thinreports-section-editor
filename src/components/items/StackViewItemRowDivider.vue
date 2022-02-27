<template>
  <line
    :x1="x1"
    :y1="y1"
    :x2="x2"
    :y2="y2"
    :stroke-width="strokeWidth"
    class="th-stack-view-row-divider"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import { calcPlus } from '../../lib/strict-calculator';
import { inverseScale } from '@/lib/inverse-scale';
import { editor } from '@/store';

export default defineComponent({
  props: {
    top: {
      type: Number,
      required: true
    },
    left: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const { top, left, width } = toRefs(props);

    const x1 = computed((): number => {
      return left.value;
    });
    const y1 = computed((): number => {
      return top.value;
    });
    const x2 = computed((): number => {
      return calcPlus(left.value, width.value);
    });
    const y2 = computed((): number => {
      return top.value;
    });
    const strokeWidth = computed((): number => {
      return inverseScale(1, editor.getters.zoomRate());
    });

    return {
      x1,
      y1,
      x2,
      y2,
      strokeWidth
    };
  }
});
</script>

<style scoped>
.th-stack-view-row-divider {
  stroke: #e0e0e0;
}
</style>
