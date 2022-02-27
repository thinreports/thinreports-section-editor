<template>
  <rect
    :x="bounds.x"
    :y="bounds.y"
    :width="bounds.width"
    :height="bounds.height"
    class="th-stack-view-modifier"
    :stroke-width="frameWidth"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from '@vue/composition-api';
import { inverseScale } from '../../lib/inverse-scale';
import { editor } from '../../store';
import { BoundingBox } from '@/types';

export default defineComponent({
  props: {
    itemBounds: {
      type: Object as () => BoundingBox,
      required: true
    }
  },
  setup (props, { emit }) {
    const { itemBounds } = toRefs(props);

    const pointerDown = ref<boolean>(false);

    const bounds = computed((): BoundingBox => {
      return {
        x: itemBounds.value.x - frameWidth.value / 2,
        y: itemBounds.value.y - frameWidth.value / 2,
        width: itemBounds.value.width + frameWidth.value,
        height: itemBounds.value.height + frameWidth.value
      };
    });
    const frameWidth = computed(() => {
      return inverseScale(10, editor.getters.zoomRate());
    });

    const onPointerDown = () => {
      pointerDown.value = true;
    };
    const onPointerMove = () => {
      if (pointerDown.value) {
        emitModifierDrag();
        pointerDown.value = false;
      }
    };
    const onPointerUp = () => {
      if (pointerDown.value) {
        emitModifierClick();
      }
      pointerDown.value = false;
    };
    const emitModifierClick = () => {
      emit('modifierClick');
    };
    const emitModifierDrag = () => {
      emit('modifierDrag');
    };

    return {
      bounds,
      frameWidth,
      onPointerDown,
      onPointerMove,
      onPointerUp
    };
  }
});
</script>

<style scoped>
.th-stack-view-modifier {
  stroke: #cccccc;
  stroke-opacity: 0.7;
  stroke-linecap: square;
  stroke-linejoin: round;
  fill: none;
  cursor: move;
}
</style>
