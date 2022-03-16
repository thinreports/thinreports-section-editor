<template>
  <line
    :x1="item.x1"
    :y1="item.y1"
    :x2="item.x2"
    :y2="item.y2"
    :style="style"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { LineItem } from '@/types';

type Style = {
  strokeWidth: number;
  stroke: string;
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
      type: Object as () => LineItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const style = computed((): Style => {
      return {
        strokeWidth: item.value.style.borderWidth,
        stroke: item.value.style.borderColor,
        strokeDasharray: STROKE_DASHARRAY_MAP[item.value.style.borderStyle]
      };
    });

    return {
      style
    };
  }
});
</script>
