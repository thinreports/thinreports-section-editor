<template>
  <g
    :class="['th-item-entity', { 'unselectable': !isSelectMode }]"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <slot />
  </g>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { editor } from '../../store';
import { AnyItem } from '@/types';

export default defineComponent({
  props: {
    item: {
      type: Object as () => AnyItem,
      required: true
    }
  },
  emits: ['itemClick', 'itemDrag'],
  setup (_, { emit }) {
    const pointerDown = ref<boolean>(false);

    const isSelectMode = computed((): boolean => {
      return editor.getters.isSelectMode();
    });

    const emitItemClick = () => {
      emit('itemClick');
    };
    const emitItemDrag = () => {
      emit('itemDrag');
    };
    const onPointerDown = () => {
      pointerDown.value = true;
      emitItemClick();
    };
    const onPointerMove = () => {
      if (pointerDown.value) {
        emitItemDrag();
        pointerDown.value = false;
      }
    };
    const onPointerUp = () => {
      pointerDown.value = false;
    };

    return {
      isSelectMode,
      onPointerDown,
      onPointerMove,
      onPointerUp
    };
  }
});
</script>

<style scoped>
.th-item-entity {
  cursor: move;
}

.th-item-entity.unselectable {
  pointer-events: none;
  cursor: default;
}
</style>
