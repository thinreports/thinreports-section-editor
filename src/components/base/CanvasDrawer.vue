<template>
  <rect
    x="0"
    y="0"
    :width="width"
    :height="height"
    class="th-canvas-drawer"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

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
  setup (_, { emit }) {
    const pointerDown = ref(false);

    const emitStartDraw = () => {
      emit('startDraw');
    };
    const onPointerDown = () => {
      pointerDown.value = true;
    };
    const onPointerMove = () => {
      if (pointerDown.value) {
        emitStartDraw();
        pointerDown.value = false;
      }
    };
    const onPointerUp = () => {
      pointerDown.value = false;
    };

    return {
      onPointerDown,
      onPointerMove,
      onPointerUp
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
