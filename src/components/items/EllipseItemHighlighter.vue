<template>
  <ellipse
    :cx="item.cx"
    :cy="item.cy"
    :rx="rx"
    :ry="ry"
    :stroke-width="strokeWidth"
    class="th-ellipse-highlighter"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import { inverseScale } from '../../lib/inverse-scale';
import { calcDiv, calcPlus } from '../../lib/strict-calculator';
import { editor } from '../../store';
import { EllipseItem } from '@/types';

export default defineComponent({
  props: {
    item: {
      type: Object as () => EllipseItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const strokeWidth = computed((): number => {
      return inverseScale(3, editor.getters.zoomRate());
    });
    const extraSize = computed((): number => {
      return calcPlus(calcDiv(item.value.style.borderWidth, 2), calcDiv(strokeWidth.value, 2));
    });
    const rx = computed((): number => {
      return calcPlus(item.value.rx, extraSize.value);
    });
    const ry = computed((): number => {
      return calcPlus(item.value.ry, extraSize.value);
    });

    return {
      rx,
      ry,
      strokeWidth
    };
  }
});
</script>

<style scoped>
.th-ellipse-highlighter {
  stroke: var(--th-active-color);
  stroke-linecap: square;
  stroke-linejoin: round;
  stroke-opacity: 0.4;
  fill: none;
}
</style>
