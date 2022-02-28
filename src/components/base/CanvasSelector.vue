<template>
  <rect
    :x="bounds.x"
    :y="bounds.y"
    :width="bounds.width"
    :height="bounds.height"
    class="th-canvas-selector"
    @pointerdown="emitSelect"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { BoundingBox } from '@/types';

export default defineComponent({
  props: {
    bounds: {
      type: Object as () => BoundingBox,
      required: true
    }
  },
  setup (_, { emit }) {
    const emitSelect = () => {
      emit('select');
    };

    return {
      emitSelect
    };
  }
});
</script>

<style scoped>
.th-canvas-selector {
  fill: #ffffff;
  stroke: none;
  fill-opacity: 0;
}
</style>
