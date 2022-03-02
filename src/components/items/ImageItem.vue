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
    <ImageItemBody :item="item" />
  </ItemEntity>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { report } from '../../store';
import BoxItemHighlighter from './BoxItemHighlighter.vue';
import ImageItemBody from './ImageItemBody.vue';
import ItemEntity from './ItemEntity.vue';
import { ImageItem } from '@/types';

export default defineComponent({
  components: {
    ItemEntity,
    ImageItemBody,
    BoxItemHighlighter
  },
  props: {
    item: {
      type: Object as () => ImageItem,
      required: true
    }
  },
  emits: ['itemDragStart'],
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
