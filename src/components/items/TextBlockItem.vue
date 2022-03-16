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
    <TextBlockItemBody :item="item" />
  </ItemEntity>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api';
import { report } from '../../store';
import BoxItemHighlighter from './BoxItemHighlighter.vue';
import ItemEntity from './ItemEntity.vue';
import TextBlockItemBody from './TextBlockItemBody.vue';
import { TextBlockItem } from '@/types';

export default defineComponent({
  components: {
    ItemEntity,
    TextBlockItemBody,
    BoxItemHighlighter
  },
  props: {
    item: {
      type: Object as () => TextBlockItem,
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
