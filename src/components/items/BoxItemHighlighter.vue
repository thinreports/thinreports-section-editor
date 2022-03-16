<template>
  <rect
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    :stroke-width="strokeWidth"
    :rx="radius"
    :ry="radius"
    class="th-box-item-highlighter"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import { inverseScale } from '../../lib/inverse-scale';
import { calcMinus, calcPlus, calcMul, calcDiv } from '../../lib/strict-calculator';
import { editor } from '../../store';
import { BoundingBox } from '@/types';

export default defineComponent({
  props: {
    itemBounds: {
      type: Object as () => BoundingBox,
      required: true
    },
    itemStrokeWidth: {
      type: Number,
      default: 0
    },
    itemBorderRadius: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const { itemBounds, itemStrokeWidth, itemBorderRadius } = toRefs(props);

    const strokeWidth = computed((): number => {
      return inverseScale(3, editor.getters.zoomRate());
    });
    const extraSize = computed((): number => {
      return calcPlus(calcDiv(itemStrokeWidth.value, 2), calcDiv(strokeWidth.value, 2));
    });
    const x = computed((): number => {
      return calcMinus(itemBounds.value.x, extraSize.value);
    });
    const y = computed((): number => {
      return calcMinus(itemBounds.value.y, extraSize.value);
    });
    const width = computed((): number => {
      return calcPlus(itemBounds.value.width, calcMul(extraSize.value, 2));
    });
    const height = computed((): number => {
      return calcPlus(itemBounds.value.height, calcMul(extraSize.value, 2));
    });
    const radius = computed((): number => {
      return itemBorderRadius.value !== 0 ? itemBorderRadius.value + 1 : 0;
    });

    return {
      x,
      y,
      width,
      height,
      strokeWidth,
      radius
    };
  }
});
</script>

<style scoped>
.th-box-item-highlighter {
  stroke: var(--th-active-color);
  stroke-linecap: square;
  stroke-linejoin: round;
  stroke-opacity: 0.4;
  fill: none;
}
</style>
