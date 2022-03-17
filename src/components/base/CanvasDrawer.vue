<template>
  <rect
    x="0"
    y="0"
    :width="width"
    :height="height"
    class="th-canvas-drawer"
    @pointerdown="onPointerDown"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  emits: ['startDraw'],
  setup (_, { emit }) {
    const onPointerDown = () => {
      emit('startDraw');
    };

    return {
      onPointerDown
    };
  }
});
</script>

<style scoped>
.th-canvas-drawer {
  fill: #ffffff;
  stroke: none;
  fill-opacity: 0;
  cursor: crosshair;
}
</style>
