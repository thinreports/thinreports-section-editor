<template>
  <div>
    <RectItemProperties
      v-if="isRectItem"
      :item="item"
    />
    <EllipseItemProperties
      v-if="isEllipseItem"
      :item="item"
    />
    <LineItemProperties
      v-if="isLineItem"
      :item="item"
    />
    <TextItemProperties
      v-if="isTextItem"
      :item="item"
    />
    <TextBlockItemProperties
      v-if="isTextBlockItem"
      :item="item"
    />
    <ImageItemProperties
      v-if="isImageItem"
      :item="item"
    />
    <ImageBlockItemProperties
      v-if="isImageBlockItem"
      :item="item"
    />
    <StackViewItemProperties
      v-if="isStackViewItem"
      :item="item"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import EllipseItemProperties from './EllipseItemProperties.vue';
import ImageBlockItemProperties from './ImageBlockItemProperties.vue';
import ImageItemProperties from './ImageItemProperties.vue';
import LineItemProperties from './LineItemProperties.vue';
import RectItemProperties from './RectItemProperties.vue';
import StackViewItemProperties from './StackViewItemProperties.vue';
import TextBlockItemProperties from './TextBlockItemProperties.vue';
import TextItemProperties from './TextItemProperties.vue';
import { AnyItem } from '@/types';

export default defineComponent({
  components: {
    RectItemProperties,
    EllipseItemProperties,
    LineItemProperties,
    TextItemProperties,
    TextBlockItemProperties,
    ImageItemProperties,
    ImageBlockItemProperties,
    StackViewItemProperties
  },
  props: {
    item: {
      type: Object as () => AnyItem,
      required: true
    }
  },
  setup (props) {
    const { item } = toRefs(props);

    const isRectItem = computed((): boolean => {
      return item.value.type === 'rect';
    });
    const isEllipseItem = computed((): boolean => {
      return item.value.type === 'ellipse';
    });
    const isLineItem = computed((): boolean => {
      return item.value.type === 'line';
    });
    const isTextItem = computed((): boolean => {
      return item.value.type === 'text';
    });
    const isTextBlockItem = computed((): boolean => {
      return item.value.type === 'text-block';
    });
    const isImageItem = computed((): boolean => {
      return item.value.type === 'image';
    });
    const isImageBlockItem = computed((): boolean => {
      return item.value.type === 'image-block';
    });
    const isStackViewItem = computed((): boolean => {
      return item.value.type === 'stack-view';
    });

    return {
      isRectItem,
      isEllipseItem,
      isLineItem,
      isTextItem,
      isTextBlockItem,
      isImageItem,
      isImageBlockItem,
      isStackViewItem
    };
  }
});
</script>

<style scoped></style>
