<template>
  <ellipse
    :cx="item.cx"
    :cy="item.cy"
    :rx="item.rx"
    :ry="item.ry"
    :style="style"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import { EllipseItem } from '@/types';

type Style = {
  strokeWidth: number;
  stroke: string;
  fill: string;
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
      type: Object as () => EllipseItem,
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
        strokeDasharray: STROKE_DASHARRAY_MAP[item.value.style.borderStyle]
      };
    });

    return {
      style
    };
  }
});
</script>
