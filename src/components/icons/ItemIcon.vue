<template>
  <i :class="iconClass" />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { ItemType } from '../../types';

export default defineComponent({
  props: {
    type: {
      type: String as () => ItemType,
      required: true
    }
  },
  setup (props) {
    const { type } = toRefs(props);

    const iconClass = computed(() => {
      switch (type.value) {
        case 'rect': return 'mdi mdi-rectangle-outline';
        case 'ellipse': return 'mdi mdi-ellipse-outline';
        case 'line': return 'mdi mdi-vector-line';
        case 'image': return 'mdi mdi-image';
        case 'text': return 'mdi mdi-format-text';
        case 'text-block': return 'mdi mdi-text-recognition';
        case 'image-block': return 'mdi mdi-image-size-select-large';
        case 'stack-view': return 'mdi mdi-table-column';
        default: throw new Error('Invalid item type');
      }
    });

    return {
      iconClass
    };
  }
});
</script>
