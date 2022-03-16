<template>
  <ItemEntity
    :item="item"
    @itemDrag="dragStart"
    @itemClick="activate"
  >
    <BoxItemHighlighter
      v-if="isActive"
      :item-bounds="item"
    />
    <ImageBlockItemBody :item="item" />
  </ItemEntity>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import { report } from '../../store';
import BoxItemHighlighter from './BoxItemHighlighter.vue';
import ImageBlockItemBody from './ImageBlockItemBody.vue';
import ItemEntity from './ItemEntity.vue';
import { ImageBlockItem } from '@/types';

export default defineComponent({
  components: {
    ItemEntity,
    ImageBlockItemBody,
    BoxItemHighlighter
  },
  props: {
    item: {
      type: Object as () => ImageBlockItem,
      required: true
    }
  },
  setup (props, { emit }) {
    const { item } = toRefs(props);

    const isActive = computed((): boolean => {
      return report.getters.isActiveItem(item.value.uid);
    });

    const dragStart = () => {
      emit('itemDragStart', item.value);
    };
    const activate = () => {
      report.actions.activateEntity({ uid: item.value.uid, type: 'item' });
    };

    return {
      isActive,
      dragStart,
      activate
    };
  }
});
</script>
