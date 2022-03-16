<template>
  <rect
    :x="item.x"
    :y="item.y"
    :width="item.width"
    :height="item.height"
    :style="style"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import { RectItem } from '@/types';

type Style = {
  strokeWidth: number;
  stroke: string;
  fill: string;
  rx: number;
  ry: number;
  strokeDasharray: 'none' | '2,2' | '1,1';
};

const STROKE_DASHARRAY_MAP = {
  solid: 'none',
  dashed: '2,2',
  dotted: '1,1'
} as const;

export default defineComponent({
  props: {
    item: {
      type: Object as () => RectItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const style = computed((): Style => {
      return {
        strokeWidth: item.value.style.borderWidth,
        stroke: item.value.style.borderColor,
        fill: item.value.style.fillColor,
        strokeDasharray: STROKE_DASHARRAY_MAP[item.value.style.borderStyle],
        rx: item.value.borderRadius,
        ry: item.value.borderRadius
      };
    });

    return {
      style
    };
  }
});
</script>
