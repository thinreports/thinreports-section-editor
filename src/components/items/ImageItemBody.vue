<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <image
    :xlink:href="href"
    :x="item.x"
    :y="item.y"
    :width="item.width"
    :height="item.height"
    preserveAspectRatio="none"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { ImageItem } from '@/types';

export default defineComponent({
  props: {
    item: {
      type: Object as () => ImageItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const href = computed((): string => {
      const data = item.value.data;
      return `data:${data.mimeType};base64,${data.base64}`;
    });

    return {
      href
    };
  }
});
</script>
